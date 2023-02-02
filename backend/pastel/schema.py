from marshmallow import fields, validate
from marshmallow_sqlalchemy import SQLAlchemySchema
from marshmallow_sqlalchemy.fields import Nested
from .database import Ingredient, Product, Sale

class IngredientDto(SQLAlchemySchema):
    class Meta:
        model = Ingredient
        load_instance = True

    id = fields.Str(dump_only=True)
    name = fields.Str(required=True)
    um = fields.Str(required=True)
    qty = fields.Int(required=True)
    created = fields.DateTime(dump_only=True)
    updated = fields.DateTime(dump_only=True)

class ProductDto(SQLAlchemySchema):
    class Meta:
        model = Product
        load_instance = True

    id = fields.Str(dump_only=True)
    name = fields.Str(validate=validate.Length(min=1))
    price = fields.Str(validate=validate.Length(min=1))
    ingredients = Nested(IngredientDto, many=True)
    created = fields.DateTime(dump_only=True)
    updated = fields.DateTime(dump_only=True)

class SaleDto(SQLAlchemySchema):
    class Meta:
        model = Sale
        load_instance = True

    id = fields.Str(dump_only=True)
    product_id = fields.Str(required=True)
    qty = fields.Int(required=True)
    production_date = fields.Date(dump_only=True)
    created = fields.DateTime(dump_only=True)
    updated = fields.DateTime(dump_only=True)
