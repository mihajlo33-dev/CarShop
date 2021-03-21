# I suggest putting this into env variables for security reasons
DB_URI = 'mysql://root:mihajlo@localhost/car'

SECRET_KEY = "thisissecret"


# configuration object for Flask application
class Config(object):
    DEBUG = True