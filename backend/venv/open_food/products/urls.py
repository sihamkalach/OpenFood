from django.urls import path
from .views import ping_mongo , import_products_view , list_products , product_detail , filters_view 
from .views import recipe_products_recommend

urlpatterns = [
    path('api/ping-mongo', ping_mongo),
    path('import-products/', import_products_view, name='import_products'),
    path('api/products/', list_products),
    path('api/products/<int:product_code>/', product_detail),
    path('api/filters/', filters_view, name='filters'),
    path('api/recommendation/', recipe_products_recommend, name='recipe_products_recommend'),
]