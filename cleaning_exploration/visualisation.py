import matplotlib.pyplot as plt
import pandas as pd 
from pyspark.sql import SparkSession
from pyspark.sql.functions import count, when, col, round, abs, split, explode, trim

spark = SparkSession.builder \
    .appName("OpenFoodFactsDeepCleaning") \
    .getOrCreate()

df = spark.read.csv("100K_df.csv", sep=',', header=True, inferSchema=True)

level_cols = ["fat_level", "sugar_level", "salt_level", "fiber_level", "energy_level", "alcohol_presence", "cholesterol_level", ]

# Pour chaque colonne : compter les occurrences, convertir en Pandas et tracer
for col_name in level_cols:
    # Compter le nombre d'occurrences de chaque catégorie
    counts_df = df.groupBy(col_name).count().orderBy("count", ascending=False)

    # Convertir en DataFrame Pandas
    counts_pd = counts_df.toPandas()

    # Afficher le bar plot
    plt.figure(figsize=(6, 4))
    plt.bar(counts_pd[col_name], counts_pd["count"], color="#4CAF50", edgecolor="black")
    plt.title(f"Répartition des produits selon {col_name.replace('_', ' ')}")
    plt.xlabel("Niveau")
    plt.ylabel("Nombre de produits")
    plt.grid(axis="y", linestyle="--", alpha=0.7)
    plt.tight_layout()
    plt.show()

category_counts_spark = (
    df.filter(col("main_category").isNotNull())
      .groupBy("main_category")
      .agg(count("*").alias("count"))
      .orderBy(col("count").desc())
)

# Conversion en Pandas pour la visualisation
category_counts_pd = category_counts_spark.toPandas()

# Regrouper les plus petites catégories sous "Autres"
top_n = 10
top_categories = category_counts_pd[:top_n].copy()
other_sum = category_counts_pd["count"][top_n:].sum()
if other_sum > 0:
    top_categories.loc[len(top_categories)] = ["Others", other_sum]

# Création du pie chart
plt.figure(figsize=(7, 7))
plt.pie(
    top_categories["count"],
    labels=top_categories["main_category"],
    autopct='%1.1f%%',
    startangle=140,
    colors=plt.cm.tab20.colors
)
plt.title("Répartition des produits par catégorie principale (main_category)")
plt.axis("equal")
plt.tight_layout()
plt.show()

df_countries = df.withColumn("country", explode(split(col("countries"), ",")))

# Nettoyer les espaces blancs
df_countries = df_countries.withColumn("country", trim(col("country")))

# Compter le nombre de produits par pays
country_counts = (
    df_countries.groupBy("country")
    .agg(count("*").alias("count"))
    .orderBy(col("count").desc())
)

# Conversion vers Pandas
country_counts_pd = country_counts.limit(10).toPandas()

# Création du Pie Chart
plt.figure(figsize=(8, 8))
plt.pie(
    country_counts_pd["count"],
    labels=country_counts_pd["country"],
    autopct='%1.1f%%',
    startangle=140,
    colors=plt.cm.tab10.colors  # Choix de palette
)
plt.title("Répartition des produits par pays (Top 10)")
plt.axis("equal")
plt.tight_layout()
plt.show()