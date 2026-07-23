from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from backend.routes import recipe_bp

load_dotenv()

app = Flask(
    __name__,
    static_folder='static',
    static_url_path='',
    template_folder='templates',
)
app.config.from_object('backend.config.Config')
CORS(app)

app.register_blueprint(recipe_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
