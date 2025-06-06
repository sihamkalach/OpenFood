import json
from .models import Product

def clean_value(value):
    # Convert any empty string, whitespace-only, or falsy value to None
    if value is None:
        return None
    if isinstance(value, str) and value.strip() == '':
        return None
    return value

def to_float(value):
    try:
        if value is None or (isinstance(value, str) and value.strip() == ''):
            return None
        return float(value)
    except (ValueError, TypeError):
        return None

def import_products_from_json():
    json_file_path = 'C:\\Users\\hp\\Desktop\\Open_food_facts\\backend\\venv\\open_food\\products\\openfood.json'
    
    with open(json_file_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)

    for item in data:
        try:
            Product(
                code = to_float(clean_value(item.get("code"))),
                product_name = clean_value(item.get("product_name")),
                brands = clean_value(item.get("brands")),
                main_category = clean_value(item.get("main_category")),
                categories = clean_value(item.get("categories")),
                countries = clean_value(item.get("countries")),
                stores = clean_value(item.get("stores")),
                ingredients_text = clean_value(item.get("ingredients_text")),
                quantity = clean_value(item.get("quantity")),
                energy_100g = to_float(clean_value(item.get("energy_100g"))),
                fat_100g = to_float(clean_value(item.get("fat_100g"))),
                saturated_fat_100g = to_float(clean_value(item.get("saturated_fat_100g"))),
                trans_fat_100g = to_float(clean_value(item.get("trans_fat_100g"))),
                cholesterol_100g = to_float(clean_value(item.get("cholesterol_100g"))),
                carbohydrates_100g = to_float(clean_value(item.get("carbohydrates_100g"))),
                sugars_100g = to_float(clean_value(item.get("sugars_100g"))),
                added_sugars_100g = to_float(clean_value(item.get("added_sugars_100g"))),
                sucrose_100g = to_float(clean_value(item.get("sucrose_100g"))),
                glucose_100g = to_float(clean_value(item.get("glucose_100g"))),
                fructose_100g = to_float(clean_value(item.get("fructose_100g"))),
                galactose_100g = to_float(clean_value(item.get("galactose_100g"))),
                lactose_100g = to_float(clean_value(item.get("lactose_100g"))),
                maltose_100g = to_float(clean_value(item.get("maltose_100g"))),
                fiber_100g = to_float(clean_value(item.get("fiber_100g"))),
                salt_100g = to_float(clean_value(item.get("salt_100g"))),
                added_salt_100g = to_float(clean_value(item.get("added_salt_100g"))),
                sodium_100g = to_float(clean_value(item.get("sodium_100g"))),
                alcohol_100g = to_float(clean_value(item.get("alcohol_100g"))),
                sugar_level = clean_value(item.get("sugar_level")),
                salt_level = clean_value(item.get("salt_level")),
                fiber_level = clean_value(item.get("fiber_level")),
                energy_level = clean_value(item.get("energy_level")),
                alcohol_presence = clean_value(item.get("alcohol_presence")),
                cholesterol_level = clean_value(item.get("cholesterol_level")),
                allergens_and_traces = clean_value(item.get("allergens_and_traces")),
                image_url = None
            ).save()
        except Exception as e:
            print(f"Erreur produit : {e}")
