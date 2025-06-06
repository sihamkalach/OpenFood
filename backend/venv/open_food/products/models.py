from django.db import models

# create our product model
from mongoengine import Document, StringField, FloatField, URLField
class Product(Document):
    code = FloatField()  # double, nullable
    product_name = StringField()
    brands = StringField()
    main_category = StringField()
    categories = StringField()
    countries = StringField()
    stores = StringField()
    ingredients_text = StringField()
    quantity = StringField()
    # Nutrition values
    energy_100g = FloatField()
    fat_100g = FloatField()
    saturated_fat_100g = FloatField()
    trans_fat_100g = FloatField()
    cholesterol_100g = FloatField()
    carbohydrates_100g = FloatField()
    sugars_100g = FloatField()
    added_sugars_100g = FloatField()
    sucrose_100g = FloatField()
    glucose_100g = FloatField()
    fructose_100g = FloatField()
    galactose_100g = FloatField()
    lactose_100g = FloatField()
    maltose_100g = FloatField()
    fiber_100g = FloatField()
    salt_100g = FloatField()
    added_salt_100g = FloatField()
    sodium_100g = FloatField()
    alcohol_100g = FloatField()
    # Classification
    sugar_level = StringField()
    salt_level = StringField()
    fiber_level = StringField()
    energy_level = StringField()
    alcohol_presence = StringField()
    cholesterol_level = StringField()
    categories = StringField()
    allergens_and_traces = StringField()
    image_url = URLField()

