import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

df = pd.read_csv("100K_df.csv", on_bad_lines='skip')


text_columns = ['product_name', 'brands', 'main_category', 'categories', 'ingredients_text']
df[text_columns] = df[text_columns].fillna('')  # Remplacer les NaN par des chaînes vides
df['final_string'] = df[text_columns].agg(' '.join, axis=1)  # Concaténer les colonnes

# Charger le modèle All-MiniLM pour faire embeddings d=384
model = SentenceTransformer('all-MiniLM-L6-v2')  

# Calculer les embeddings
embeddings = model.encode(df['final_string'].tolist(), show_progress_bar=True)
embeddings = np.array(embeddings).astype("float32")  # FAISS exige float32

faiss.normalize_L2(embeddings) #rendre les valeurs entre 0 et 1


dimension = embeddings.shape[1]
index = faiss.IndexFlatIP(dimension)  # (dot) Index pour similarité cosinus sur vecteurs normalisés

# Ajouter les vecteurs à l'index
index.add(embeddings)

faiss.write_index(index, "index_produits.faiss")

df.to_csv("produits_metadata.csv", index=False)
