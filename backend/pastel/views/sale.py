from flask import request
from flask_restful import Resource, Api
from marshmallow import ValidationError
from ..schema import SaleDto, ProductDto
from ..database import db, Sale, Product
import datetime

sale_schema = SaleDto()
product_schema = ProductDto()

class SalesResource(Resource):
    def post(self):
        try:
            sale : SaleDto = sale_schema.load(request.get_json(), session=db.session)

            product_id = int(sale.product_id)
            fresh = datetime.date.today()

            product = db.session.get(Product, sale.product_id)
            if not product:
                return {"message": f"Invalid product id: {sale.product_id}"}, 400

            original: Sale = db.session.query(Sale).where(Sale.product_id == product_id and Sale.production_date == fresh).first()

            if original:
                original.qty = original.qty + sale.qty
                db.session.add(original)
            else:
                db.session.add(sale)

            db.session.commit()
            return sale_schema.dump(original) if original else sale_schema.dump(sale)
        except ValidationError as ex:
            return {"message": "Invalid payload in request"}, 422

    def get(self):
        query = db.session.query(Sale)
        sales = sale_schema.dump(query, many=True)
        return { "count": len(sales), "sales": sales }


class SalesAvailableResource(Resource):
    def get(self):
        fresh = datetime.date.today()
        half = fresh - datetime.timedelta(days=1)
        stale = fresh - datetime.timedelta(days=1)

        query = db.session.query(Sale).where(Sale.production_date >= stale).all()
        sales = sale_schema.dump(query, many=True)
        print(sales)

        response = {
            "sale": {
                "fresh": [],
                "half": [],
                "stale": []
            },
            "products": []
        }

        product_ids = []

        for s in query:
            prod_date = s.production_date
            dumped = sale_schema.dump(s)
            if prod_date == fresh:
                response.get("sale").get("fresh").append(dumped)
            elif prod_date == half:
                response.get("sale").get("half").append(dumped)
            elif prod_date == stale:
                response.get("sale").get("stale").append(dumped)
            product_ids.append(s.product_id)

        products = db.session.query(Product).where(Product.id.in_({x for x in product_ids})).all()
        response["products"] = product_schema.dump(products, many=True)
        return response


class SaleResource(Resource):
    def delete(self, id):
        sale = db.session.get(Sale, id)
        if not sale:
            return {"message": "Not found"}, 404
        db.session.delete(sale)
        db.session.commit()
        return None, 204


def init_app(api: Api):
    api.add_resource(SalesResource, "/api/sale")
    api.add_resource(SalesAvailableResource, "/api/sale/available")
    api.add_resource(SaleResource, "/api/sale/<int:id>")
