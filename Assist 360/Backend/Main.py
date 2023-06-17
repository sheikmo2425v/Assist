from Functions import signup, login, store_product, product, product_delete, order_product, admin_order, admin_brand
import requests


import os
from flask_cors import *
from flask import *

import json


app = Flask(__name__)
cros = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/Assist/signup', methods=['POST'], strict_slashes=False)
def Assist_signup():
    a = request.json
    return (signup.signup(a))


@app.route('/Assist/login', methods=['POST'], strict_slashes=False)
def Assist_login():
    a = request.json
    return (login.login(a))


@app.route('/Assist/store_product', methods=['POST'], strict_slashes=False)
def Assist_store_product():
    file = request.files['file']

    a = request.form

    return (store_product.store_product(a, file))


@app.route('/Assist/product', methods=['POST'], strict_slashes=False)
def Assist_product():

    return (product.product())


@app.route('/Assist/product_delete', methods=['POST'], strict_slashes=False)
def Assist_product_delete():
    a = request.json

    return (product_delete.product_delete(a))


@app.route('/Assist/order_product', methods=['POST'], strict_slashes=False)
def Assist_order_product():
    a = request.json

    return (order_product.order_product(a))


@app.route('/Assist/Admin_order_info', methods=['POST'], strict_slashes=False)
def Assist_Admin_order_info():

    return (admin_order.admin_order())


@app.route('/Assist/Admin_brand', methods=['POST'], strict_slashes=False)
def Assist_Admin_brand():
    print("sad")
    return (admin_brand.admin_brand())


if __name__ == "__main__":
    app.run(debug=True)
