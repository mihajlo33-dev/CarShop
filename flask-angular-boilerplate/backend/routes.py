from functools import wraps
from certifi import where
from flask import Blueprint, jsonify, request, app, make_response
from sqlalchemy import select, delete

from .models import brand,models,fuel,car,user
from .methods import sqlExe, sqlAction, validateFields
from datetime import datetime
import  uuid
from werkzeug.security import generate_password_hash,check_password_hash
import  jwt



# notes Bluebrint (all the routes that are used for the notes model - they use the /api/note prefix)
brandRoutes = Blueprint("brand", __name__, url_prefix='/api/brand')
modelsRoutes = Blueprint("models", __name__, url_prefix='/api/models')
fuelRoutes = Blueprint("fuel", __name__, url_prefix='/api/fuel')
carRoutes = Blueprint("car", __name__, url_prefix='/api/car')
userRoutes = Blueprint("user", __name__, url_prefix='/api/user')



def token_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):

      token = None

      if 'x-access-tokens' in request.headers:
         token = request.headers['x-access-tokens']

      if not token:
         return jsonify({'message': 'a valid token is missing'})

      try:
         data = jwt.decode(token, app().config[SECRET_KEY])
         current_user = user.query.filter_by(id=data['id']).first()
      except:
        return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
   return decorator







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


@fuelRoutes.route('/get', methods=["POST"])
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
    query = fuel.update().values(data).where(fuel.c.fuelId == fuelId)
    result = sqlAction(query)

    return jsonify(success=True)


@fuelRoutes.route('/delete/<fuelId>', methods=["POST"])
def delete_fuel(fuelId):
    query = delete(fuel).where(fuel.c.fuelId == fuelId)
    result = sqlAction(query)

    return jsonify(success=True)


@carRoutes.route('/get', methods=["POST"])
def get_car():
    query = select([car.c.carId, brand.c.brandName, models.c.modelName, car.c.year, car.c.price, fuel.c.fuel, car.c.reg , car.c.color,car.c.km])\
    .select_from(car.outerjoin(brand, brand.c.brandId == car.c.brandId).outerjoin(models, models.c.modelsId == car.c.modelsId).outerjoin(fuel, fuel.c.fuelId == car.c.fuelId))
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

    if not validateFields(data, ["brand", "models", "year", "price", "fuel", "reg", "color", "km"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "brandId": data["brandId"],
        "modelsId": data["modelsId"],
        "year": data["year"],
        "price": data["price"],
        "fuelId": data["fuelId"],
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

    if not validateFields(data, ["brand", "models", "year",  "price",  "fuel",  "reg",  "color",  "km" ]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "brandId": data["brandId"],
        "modelsId": data["modelsId"],
        "year": data["year"],
        "price": data["price"],
        "fuelId": data["fuelId"],
        "reg": data["reg"],
        "color": data["color"],
        "km": data["km"]

    }
    query = car.update().values(data).where(car.c.carId == carId)
    result = sqlAction(query)

    return jsonify(success=True)

@carRoutes.route('/delete/<carId>', methods=["POST"])
def delete_fuel(carId):
    query = delete(car).where(car.c.carId == carId)
    result = sqlAction(query)

    return jsonify(success=True)

@userRoutes.route('/get', methods=["POST"])
def get_user():
    query = select([user.c.id, user.c.name, user.c.password])
    get_multiple = True

    if request.get_json().get("id", False):
        id = request.get_json()["id"]
        query = query.where(user.c.id == id)
        get_multiple = False

    elif request.get_json().get("nameFilter", False):
        search_text = "".join(("%", request.get_json()["nameFilter"], "%"))
        query = query.where(user.c.name.like(search_text))

    result = sqlExe(query, multiple=get_multiple)

    return jsonify(result)


@userRoutes.route('/register', methods=["POST"])
def register_user():
    data = request.get_json()

    if not validateFields(data, ["name", "password"]):
        return jsonify(success=False, message="Invalid form data")

    hashed_password = generate_password_hash(data['password'], method='sha256')

    data = {
        "name": data["name"],
        "password": hashed_password,

    }


    query = user.insert().values(data)
    result = sqlAction(query)

    return jsonify(success=True)


@userRoutes.route('/modify/<id>', methods=["POST"])
def modify_user(id):
    data = request.get_json()

    if not validateFields(data, ["name",  "password"]):
        return jsonify(success=False, message="Invalid form data")

    data = {
        "name": data["name"],
        "password": data["password"],
    }
    query = user.update().values(data).where(user.c.id == id)
    result = sqlAction(query)

    return jsonify(success=True)

@userRoutes.route('/delete/<id>', methods=["POST"])
def delete_user(id):
    query = delete(user).where(user.c.id == id)
    result = sqlAction(query)

    return jsonify(success=True)

@userRoutes.route('/login', methods=["POST"])
def login_user(user = user):
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})

    user = user.query.filter_by(name=user.name).first()

    if check_password_hash(user.password, auth.password):
        token = jwt.encode(
            {'id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
            app().config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})

    return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})


