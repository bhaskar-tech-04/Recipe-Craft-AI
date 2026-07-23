from flask import Blueprint, jsonify, request, render_template, abort
from backend.ai import generate_recipe
from backend.image_ai import generate_image
from backend.nutrition import calculate_nutrition

recipe_bp = Blueprint('recipe', __name__)

@recipe_bp.route('/')
def serve_root():
    return render_template('index.html')

@recipe_bp.route('/<page>')
def serve_page(page):
    allowed_pages = {'recipe.html', 'history.html', 'favorites.html'}
    if page in allowed_pages:
        return render_template(page)
    abort(404)

@recipe_bp.route('/api/recipes', methods=['POST'])
def create_recipe():
    data = request.json or {}
    prompt = data.get('prompt', 'Quick easy dinner')
    recipe = generate_recipe(prompt)
    recipe['nutrition'] = calculate_nutrition(recipe.get('ingredients', []))
    recipe['image_url'] = generate_image(prompt)
    return jsonify(recipe)

@recipe_bp.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})
