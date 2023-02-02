from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class Ingredient(db.Model):
    __tablename__ = "ingredient"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    um = db.Column(db.String)
    qty = db.Column(db.Integer)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    created = db.Column(db.DateTime, default=datetime.datetime.now)
    updated = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

class Product(db.Model):
    __tablename__ = "product"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, default=0, nullable=False)
    ingredients: db.Mapped[Ingredient] = db.relationship(cascade="all, delete-orphan")
    created = db.Column(db.DateTime, default=datetime.datetime.now)
    updated = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

    @staticmethod
    def from_dict(data):
        x = Product()
        x.id = data.get('id', None)
        x.name = data.get('name', None)

        return x

class Sale(db.Model):
    __tablename__ = "sale"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    qty = db.Column(db.Integer, nullable=False)
    production_date = db.Column(db.Date, default=datetime.datetime.now, nullable=False)
    created = db.Column(db.DateTime, default=datetime.datetime.now)
    updated = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

def init_app(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
