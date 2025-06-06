import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


# Initialiser le modèle une seule fois
model = SentenceTransformer('all-MiniLM-L6-v2')

# Fonction de cleaning de la recette
def clean_english_recipe(text):
    text = text.lower() 
    text = re.sub(r'\d+', '', text) #Supprimer les chiffres
    text = re.sub(r'\b(teaspoons?|tablespoons?|cups?|grams?|g|kg|ml|cl|oz|pounds?|lb|liters?)\b', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = nltk.word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens] #Réduit les mots à leur forme de base
    tokens = [word for word in tokens if len(word) > 2]
    cleaned_text = " ".join(tokens)

    return cleaned_text

# Fonction pour encoder la recette apres nettoyage
def get_embedding_from_text(text: str):
    cleaned_text = clean_english_recipe(text)
    embedding = model.encode([cleaned_text])[0].astype("float32") #prendre juste le vecteur comme valeur de return
    faiss.normalize_L2(embedding.reshape(1, -1))

    return embedding

# Fonction de recherche FAISS de 100 top produits similaires
def find_top_k_similars(input_text, index_path="index_produits.faiss", metadata_path="produits_metadata.csv", k=100):
    query_embedding = get_embedding_from_text(input_text).reshape(1, -1)
    index = faiss.read_index(index_path)
    df = pd.read_csv(metadata_path)
    distances, indices = index.search(query_embedding, k)
    results = df.iloc[indices[0]].copy()
    results['similarity_score'] = distances[0]
    results = results.drop_duplicates(subset='product_name')

    return results

if __name__ == "__main__":
    user_input = "1 cup of low-fat milk, 2 tablespoons cocoa powder, a pinch of salt and vanilla"
    print(clean_english_recipe(user_input))
    print(get_embedding_from_text(user_input)[:5]," ...")
    print("\n Top 10 product recommendations:\n")
    recommendations = find_top_k_similars(user_input)
    for i, row in recommendations.iterrows():
        print(f"- {row['product_name']} (similarity: {row['similarity_score']:.4f})")
