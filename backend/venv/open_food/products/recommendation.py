# recommendation.py
import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Initialize SentenceTransformer model once
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load metadata and index (once, for performance)
metadata_df = pd.read_csv("C:\\Users\\hp\\Desktop\\Open_food_facts\\backend\\venv\\open_food\\products\\produits_metadata.csv")
faiss_index = faiss.read_index("C:\\Users\\hp\\Desktop\\Open_food_facts\\backend\\venv\\open_food\\products\\index_produits.faiss")

# Text cleaning function
def clean_english_recipe(text):
    text = text.lower()
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'\b(teaspoons?|tablespoons?|cups?|grams?|g|kg|ml|cl|oz|pounds?|lb|liters?)\b', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = nltk.word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    tokens = [word for word in tokens if len(word) > 2]
    return " ".join(tokens)

# Embed the recipe input
def get_embedding_from_text(text: str):
    cleaned = clean_english_recipe(text)
    embedding = model.encode([cleaned])[0].astype("float32")
    faiss.normalize_L2(embedding.reshape(1, -1))
    return embedding.reshape(1, -1)

# Main recommendation function
def recommend_products(
    recipe_input,
    country=None,
    sugar_level=None,
    salt_level=None,
    fiber_level=None,
    energy_level=None,
    alcohol_presence=None,
    cholesterol_level=None,
    k=20
):
    # Encode user input
    query_embedding = get_embedding_from_text(recipe_input)

    # Search top-k similar products
    distances, indices = faiss_index.search(query_embedding, k)
    results = metadata_df.iloc[indices[0]].copy()
    results["similarity_score"] = distances[0]

    # Filter the results by optional filters
    if country:
        results = results[results["country"] == country]
    if sugar_level:
        results = results[results["sugar_level"] == sugar_level]
    if salt_level:
        results = results[results["salt_level"] == salt_level]
    if fiber_level:
        results = results[results["fiber_level"] == fiber_level]
    if energy_level:
        results = results[results["energy_level"] == energy_level]
    if alcohol_presence:
        results = results[results["alcohol_presence"] == alcohol_presence]
    if cholesterol_level:
        results = results[results["cholesterol_level"] == cholesterol_level]

    # Drop duplicates and keep most similar
    results = results.drop_duplicates(subset="product_name")
    top_results = results.sort_values("similarity_score", ascending=False).head(20)

   # Convert to list of dicts for JSON response
    top_results = top_results.replace({np.nan: None})
    recommendations = top_results.astype(object).where(pd.notnull(top_results), None)
    recommendations = recommendations.to_dict(orient="records")

    # Convert numpy types to native Python types
    for rec in recommendations:
        for key, val in rec.items():
            if isinstance(val, (np.generic, np.float32, np.float64, np.int64, np.int32)):
                rec[key] = val.item()

    return recommendations