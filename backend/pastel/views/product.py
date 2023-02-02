from flask import request
from flask_restful import Resource, Api
from marshmallow import ValidationError
from ..schema import ProductDto, IngredientDto
from ..database import db, Product

product_schema = ProductDto()
ingredient_schema = IngredientDto()

class ProductsResource(Resource):
    def get(self):
        query = db.session.query(Product)
        products = product_schema.dump(query, many=True)
        return { "count": len(products), "products": products }

    def post(self):
        try:
            product = product_schema.load(request.get_json(), session=db.session)
            db.session.add(product)
            db.session.commit()
            return product_schema.dump(product)
        except ValidationError as ex:
            return {"message": "Invalid payload in request"}, 422

class ProductResource(Resource):
    def get(self, id):
        product = db.session.get(Product, id)
        if product:
            return product_schema.dump(product)

        return {"message": "Not found"}, 404

    def put(self, id):
        product = db.session.get(Product, id)
        if not product:
            return {"message": "Not found"}, 404

        try:
            new_product = product_schema.load(request.get_json(), session=db.session)
            # TODO check if there's a better way...
            product.name = new_product.name
            product.price = new_product.price
            product.ingredients = new_product.ingredients or []

            db.session.add(product)
            db.session.commit()

            return product_schema.dump(product)
        except ValidationError as ex:
            return {"message": "Invalid payload in request"}, 422

    def delete(self, id):
        product = db.session.get(Product, id)
        if not product:
            return {"message": "Not found"}, 404
        db.session.delete(product)
        db.session.commit()
        return None, 204


class IngredientsResource(Resource):
    def get(self, id):
        product = db.session.get(Product, id)
        if not product:
            return {"message": "Not found"}, 404
        return ingredient_schema.dump(product.ingredients, many=True)


def init_app(api: Api):
    api.add_resource(ProductsResource, "/api/product")
    api.add_resource(ProductResource, "/api/product/<int:id>")
    api.add_resource(IngredientsResource, "/api/product/<int:id>/ingredient")
