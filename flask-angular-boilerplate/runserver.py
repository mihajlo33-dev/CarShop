from backend.utils.factory import create_app
import os

class Config(object):
    DEBUG = False

if __name__ == '__main__':
        app = create_app(Config)
        app.run(port=5000, host="0.0.0.0", use_reloader=True)