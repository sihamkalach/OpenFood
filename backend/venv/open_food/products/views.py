from rest_framework.decorators import api_view
from rest_framework.response import Response
from mongoengine.connection import get_db
from pymongo.errors import ConnectionFailure
from .import_data import import_products_from_json
from django.http import JsonResponse
from .models import Product
from math import ceil
from bson import ObjectId
from mongoengine.errors import DoesNotExist
from django.views.decorators.csrf import csrf_exempt
import json
from .recommendation import recommend_products


# To check the connection to database
@api_view(['GET'])
def ping_mongo(request):
    try:
        db = get_db()
        return Response({"message": f"Successfully connected to MongoDB: {db.name}"})
    except ConnectionFailure as e:
        return Response({"error": f"Connection failed: {str(e)}"}, status=500)
    
# This To upload our data to mongodb
@api_view(['GET'])
def import_products_view(request):
    if request.method == 'GET':
        try:
            import_products_from_json()
            return JsonResponse({"message": "Import successful"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Use GET method"}, status=400)
@api_view(['GET'])
# build products api 
def list_products(request):
    # Pagination parameters
    page = int(request.GET.get('page', 1))
    page_size = int(request.GET.get('page_size', 20))

    # Get filters from query params
    category = request.GET.get('category')
    country = request.GET.get('country')
    sugar_level = request.GET.get('sugar_level')
    salt_level = request.GET.get('salt_level')
    fiber_level = request.GET.get('fiber_level')
    energy_level = request.GET.get('energy_level')
    alcohol_presence = request.GET.get('alcohol_presence')
    cholesterol_level = request.GET.get('cholesterol_level')
    search = request.GET.get('search')

    # Start with all products queryset
    products = Product.objects.all()

    # Apply filters one by one if provided
    if category:
        products = products.filter(main_category=category)
    if country:
        # If countries is a string field containing multiple countries separated by commas,
        # you can do a contains filter; else adjust accordingly
        products = products.filter(countries__icontains=country)
    if sugar_level:
        products = products.filter(sugar_level=sugar_level)
    if salt_level:
        products = products.filter(salt_level=salt_level)
    if fiber_level:
        products = products.filter(fiber_level=fiber_level)
    if energy_level:
        products = products.filter(energy_level=energy_level)
    if alcohol_presence:
        products = products.filter(alcohol_presence=alcohol_presence)
    if cholesterol_level:
        products = products.filter(cholesterol_level=cholesterol_level)
    if search:
        products = products.filter(product_name__icontains=search)

    # Total count after filters
    total = products.count()

    # Pagination logic
    start = (page - 1) * page_size
    end = start + page_size
    products = products[start:end]

    # Prepare response data
    data = [
        {
            "id": str(product.id),
            "code":product.code,
            "product_name": product.product_name,
            "brands": product.brands,
            "main_category": product.main_category,
            "image_url": product.image_url,
            "quantity": product.quantity,
            # You can add more fields if needed
        }
        for product in products
    ]

    return JsonResponse({
        "products": data,
        "total_pages": ceil(total / page_size),
        "current_page": page,
    })
@api_view(['GET']) 
# get product by its id 
def product_detail(request, product_code):
    try:
        # Recherche par attribut 'code' (supposé unique)
        product = Product.objects.get(code=product_code)
        
        product_dict = product.to_mongo().to_dict()
        product_dict["_id"] = str(product_dict["_id"])  # convertir ObjectId en string
        return JsonResponse(product_dict, safe=False)
    except DoesNotExist:
        return JsonResponse({"error": "Product not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
# get filters
def filters_view(request):
    def get_sorted_distinct(field):
        # Use distinct with field param directly (for MongoEngine or similar)
        values = Product.objects.distinct(field)
        cleaned = sorted(set(str(v).strip() for v in values if v and str(v).strip()))
        return cleaned

    categories = get_sorted_distinct('main_category')
    countries = get_sorted_distinct('countries')
    sugar_levels = get_sorted_distinct('sugar_level')
    salt_levels = get_sorted_distinct('salt_level')
    fiber_levels = get_sorted_distinct('fiber_level')
    energy_levels = get_sorted_distinct('energy_level')
    alcohol_presences = get_sorted_distinct('alcohol_presence')
    cholesterol_levels = get_sorted_distinct('cholesterol_level')

    return JsonResponse({
        "categories": categories,
        "countries": countries,
        "sugar_levels": sugar_levels,
        "salt_levels": salt_levels,
        "fiber_levels": fiber_levels,
        "energy_levels": energy_levels,
        "alcohol_presences": alcohol_presences,
        "cholesterol_levels": cholesterol_levels,
    })

#products recommendation
@csrf_exempt
def recipe_products_recommend(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            recipe_input = data.get("recipeInput", "")
            country = data.get("selectedCountry")
            sugar_level = data.get("selectedSugarLevel")
            salt_level = data.get("selectedSaltLevel")
            fiber_level = data.get("selectedFiberLevel")
            energy_level = data.get("selectedEnergyLevel")
            alcohol_presence = data.get("selectedAlcoholPresence")
            cholesterol_level = data.get("selectedCholesterolLevel")

            recommendations = recommend_products(
                recipe_input=recipe_input,
                country=country,
                sugar_level=sugar_level,
                salt_level=salt_level,
                fiber_level=fiber_level,
                energy_level=energy_level,
                alcohol_presence=alcohol_presence,
                cholesterol_level=cholesterol_level,
            )
            print(type(recommendations))
            return JsonResponse({"recommendations": recommendations}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)