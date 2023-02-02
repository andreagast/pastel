from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from .views.product import init_app as product_init_app
from .views.sale import init_app as sale_init_app
from .database import init_app as db_init_app
from os import environ


app = Flask(__name__)
CORS(app)
# rest
api = Api(app)
# db
db_user = environ.get("DB_USER", "pastel")
db_pass = environ.get("DB_PASS", "password")
db_host = environ.get("DB_HOST", "localhost")
db_port = environ.get("DB_PORT", "5432")
db_name = environ.get("DB_NAME", "pastel")

final_url = f"postgresql+psycopg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
print(f"Final URL: {final_url}")
app.config["SQLALCHEMY_DATABASE_URI"] = final_url
db_init_app(app)
# views
product_init_app(api)
sale_init_app(api)
