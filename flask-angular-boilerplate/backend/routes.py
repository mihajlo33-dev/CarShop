from flask import Blueprint, jsonify, request
from sqlalchemy import select, delete
from .models import brand,models,fuel,car
from .methods import sqlExe, sqlAction, validateFields
from datetime import datetime

# notes Bluebrint (all the routes that are used for the notes model - they use the /api/note prefix)
noteRoutes = Blueprint("notes", __name__, url_prefix='/api/note')
brandRoutes = Blueprint("brand", __name__, url_prefix='/api/brand')
modelsRoutes = Blueprint("models", __name__, url_prefix='/api/models')
fuelRoutes = Blueprint("fuel", __name__, url_prefix='/api/fuel')
carRoutes = Blueprint("car", __name__, url_prefix='/api/car')








@brandRoutes.route('/get',methods=["POST"])
def get_brands():
    query = select([brand.c.brandId, brand.c.brandName])
    get_multiple = True

    if request.get_json().get("brandId", False):
        brandId = request.get_json()["brandId"]
        query = query.where(brand.c.brandId == brandId)
        get_multiple = False

    elif request.get_json().get("brandNameFilter", False):
        search_text = "".join(("%", request.get_json()["brandNameFilter"], "%"))
        query = query.where(brand.c.brandId.like(search_text))

    result = sqlExe(query, multiple=get_multiple)

    return jsonify(result)


@brandRoutes.route('/create', methods=["POST"])
def create_brand():
    data = request.get_json()

    if not validateFields(data, ["brandName"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "brandName": data["brandName"]

    }

    query = brand.insert().values(data)
    result = sqlAction(query)

    return jsonify(success=True)

@brandRoutes.route('/modify/<brandId>', methods=["POST"])
def modify_brand(brandId):
    data = request.get_json()

    if not validateFields(data, ["brandName"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "brandName": data["brandName"],
    }
    query = brand.update().values(data).where(brand.c.brandId==brandId)
    result = sqlAction(query)

    return jsonify(success=True)


@brandRoutes.route('/delete/<brandId>', methods=["POST"])
def delete_brand(brandId):
    query = delete(brand).where(brand.c.brandId == brandId)
    result = sqlAction(query)

    return jsonify(success=True)


@modelsRoutes.route('/get', methods=["POST"])
def get_models():
    query = select([models.c.modelsId, models.c.modelName])
    get_multiple = True

    if request.get_json().get("modelsId", False):
        modelsId = request.get_json()["modelsId"]
        query = query.where(models.c.modelsId == modelsId)
        get_multiple = False

    elif request.get_json().get("modelNameFilter", False):
        search_text = "".join(("%", request.get_json()["modelNameFilter"], "%"))
        query = query.where(models.c.modelsId.like(search_text))

    result = sqlExe(query, multiple=get_multiple)

    return jsonify(result)


@modelsRoutes.route('/create', methods=["POST"])
def create_models():
    data = request.get_json()

    if not validateFields(data, ["modelName"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "modelName": data["modelName"]

    }

    query = models.insert().values(data)
    result = sqlAction(query)

    return jsonify(success=True)

@modelsRoutes.route('/modify/<modelsId>', methods=["POST"])
def modify_models(modelsId):
    data = request.get_json()

    if not validateFields(data, ["modelName"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "modelName": data["modelName"],
    }
    query = models.update().values(data).where(models.c.modelsId==modelsId)
    result = sqlAction(query)

    return jsonify(success=True)


@modelsRoutes.route('/delete/<modelsId>', methods=["POST"])
def delete_models(modelsId):
    query = delete(models).where(models.c.modelsId == modelsId)
    result = sqlAction(query)

    return jsonify(success=True)


@fuelRoutes.route('/get',methods=["POST"])
def get_fuel():
    query = select([fuel.c.fuelId, fuel.c.fuel])
    get_multiple = True

    if request.get_json().get("fuelId", False):
        fuelId = request.get_json()["fuelId"]
        query = query.where(fuel.c.fuelId == fuelId)
        get_multiple = False

    elif request.get_json().get("fuelFilter", False):
        search_text = "".join(("%", request.get_json()["fuelFilter"], "%"))
        query = query.where(fuel.c.fuelId.like(search_text))

    result = sqlExe(query, multiple=get_multiple)

    return jsonify(result)


@fuelRoutes.route('/create', methods=["POST"])
def create_fuel():
    data = request.get_json()

    if not validateFields(data, ["fuel"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "fuel": data["fuel"]

    }

    query = fuel.insert().values(data)
    result = sqlAction(query)

    return jsonify(success=True)

@fuelRoutes.route('/modify/<fuelId>', methods=["POST"])
def modify_fuel(fuelId):
    data = request.get_json()

    if not validateFields(data, ["fuel"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "fuel": data["fuel"],
    }
    query = fuel.update().values(data).where(fuel.c.fuelId==fuelId)
    result = sqlAction(query)

    return jsonify(success=True)


@fuelRoutes.route('/delete/<fuelId>', methods=["POST"])
def delete_fuel(fuelId):
    query = delete(fuel).where(fuel.c.fuelId == fuelId)
    result = sqlAction(query)

    return jsonify(success=True)


@carRoutes.route('/get', methods=["POST"])
def get_car():
    query = select([car.c.carId, car.c.brand, car.c.model, car.c.year, car.c.price, car.c.fuel, car.c.reg, car.c.color,car.c.km])
    get_multiple = True

    if request.get_json().get("id", False):
        carId = request.get_json()["id"]
        query = query.where(car.c.carId == carId)
        get_multiple = False

    elif request.get_json().get("brandFilter", False):
        search_text = "".join(("%", request.get_json()["brandFilter"], "%"))
        query = query.where(car.c.brand.like(search_text))

    result = sqlExe(query, multiple=get_multiple)

    return jsonify(result)


@carRoutes.route('/create', methods=["POST"])
def create_car():
    data = request.get_json()

    if not validateFields(data, ["brand", "model", "year", "price", "fuel", "reg", "color", "km"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "brand": data["brand"],
        "model": data["model"],
        "year": data["year"],
        "price": data["price"],
        "fuel": data["fuel"],
        "reg": data["reg"],
        "color": data["color"],
        "km": data["km"]
    }

    query = car.insert().values(data)
    result = sqlAction(query)

    return jsonify(success=True)


@carRoutes.route('/modify/<carId>', methods=["POST"])
def modify_car(carId):
    data = request.get_json()

    if not validateFields(data, ["carId", "brand", "model",  "model",  "year",  "price",  "fuel",  "reg",  "color",  "km"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "brand": data["brand"],
        "model": data["model"],
        "year": data["year"],
        "price": data["price"],
        "fuel": data["fuel"],
        "reg": data["reg"],
        "color": data["color"],
        "km": data["km"]

    }
    query = car.update().values(data).where(car.c.carId == carId)
    result = sqlAction(query)

    return jsonify(success=True)


@noteRoutes.route('/delete/<carId>', methods=["POST"])
def delete_note(carId):
    query = delete(car).where(car.c.carId == carId)
    result = sqlAction(query)

    return jsonify(success=True)


@noteRoutes.route('/get', methods=["POST"])
def get_notes():
    query = select([notes.c.Id, notes.c.Title, notes.c.Description, notes.c.DateCreated])
    get_multiple = True

    if request.get_json().get("id", False):
        id =  request.get_json()["id"]
        query = query.where(notes.c.Id == id)
        get_multiple = False

    elif request.get_json().get("titleFilter", False):
        search_text =  "".join(("%", request.get_json()["titleFilter"], "%"))
        query = query.where(notes.c.Title.like(search_text))

    result = sqlExe(query, multiple=get_multiple)

    return jsonify(result)


@noteRoutes.route('/create', methods=["POST"])
def create_note():
    data = request.get_json()

    if not validateFields(data, ["Title", "Description"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "Title": data["Title"],
        "Description": data["Description"],
        "DateCreated": datetime.utcnow()
    }
    
    query = notes.insert().values(data)
    result = sqlAction(query)

    return jsonify(success=True)

@noteRoutes.route('/modify/<id>', methods=["POST"])
def modify_note(id):
    data = request.get_json()

    if not validateFields(data, ["Id", "Title", "Description"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "Title": data["Title"],
        "Description": data["Description"]
    }
    query = notes.update().values(data).where(notes.c.Id==id)
    result = sqlAction(query)

    return jsonify(success=True)

@noteRoutes.route('/delete/<id>', methods=["POST"])
def delete_note(id):
    
    query = delete(notes).where(notes.c.Id == id)
    result = sqlAction(query)

    return jsonify(success=True)

