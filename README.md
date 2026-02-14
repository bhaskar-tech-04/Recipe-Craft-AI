# 🍳 Recipe Suggestions App

A Flask-based web application that recommends recipes based on ingredients provided by the user.

The app uses **TF-IDF Vectorization** and **Cosine Similarity** to find the most relevant recipes.

---

## 🚀 Features

- Enter ingredients separated by commas
- Suggests top 5 matching recipes
- Shows:
  - Matching ingredients
  - Missing ingredients
  - Similarity score
- Built using Flask and Scikit-learn

---

## 🛠 Tech Stack

- Python
- Flask
- Pandas
- Scikit-learn (TF-IDF + Cosine Similarity)
- HTML (Jinja2 Templates)

---

## 📂 Project Structure

```
Recipe-Suggestions/
│
├── app.py
├── data.csv
├── requirements.txt
├── README.md
│
├── templates/
│   ├── index.html
│   └── results.html
```

---

## ⚙️ Installation

1. Clone the repository:

```
git clone https://github.com/your-username/Recipe-Suggestions.git
cd Recipe-Suggestions
```

2. Create virtual environment:

```
python -m venv .venv
```

3. Activate environment:

Windows:
```
.venv\Scripts\activate
```

Mac/Linux:
```
source .venv/bin/activate
```

4. Install dependencies:

```
pip install -r requirements.txt
```

---

## ▶️ Run the App

```
python app.py
```

Open browser:

```
http://127.0.0.1:5000
```

---

## 🧠 How It Works

1. Ingredients are cleaned and normalized.
2. TF-IDF vectorizer converts ingredients into vectors.
3. Cosine similarity calculates closeness between user input and recipes.
4. Top matching recipes are returned.

---

## 📌 Example Input

```
egg, tomato
```

Returns:
- Tomato Omelette
- Pancakes
- Tomato Soup

---

## 📈 Future Improvements

- Ingredient synonym support
- Better ranking algorithm
- UI improvements
- Deploy to cloud (Render/Heroku)

---

## 👨‍💻 Author

bhaskar harugade
