// routing system for the application
// angularJS routing system works with views and controllers each separate route can have a diff HTML template (views directory)
// and a diff Controller (app.controller)
var app = angular.module('app', [], function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/preview_brand/:id', {templateUrl:"./views/brand_preview.html", controller:"PreviewBrandController"})
        .when('/edit_brand/:id', {templateUrl:"./views/brand_form.html", controller:"BrandModifyController"})
        .when('/create_brand', { templateUrl: "./views/brand_form.html", controller: "BrandCreateController" })
        .when('/brand', { templateUrl: "./views/defaultBrand.html", controller: "DefBrandController" })
        .when('/preview_models/:id', {templateUrl:"./views/models_preview.html", controller:"PreviewModelsController"})
        .when('/edit_models/:id', {templateUrl:"./views/models_form.html", controller:"ModelsModifyController"})
        .when('/create_models', { templateUrl: "./views/models_form.html", controller: "ModelsCreateController" })
        .when('/models', { templateUrl: "./views/defaultModels.html", controller: "DefModelsController" })
        .when('/preview_fuel/:id', {templateUrl:"./views/fuel_preview.html", controller:"PreviewFuelController"})
        .when('/edit_fuel/:id', {templateUrl:"./views/fuel_form.html", controller:"FuelModifyController"})
        .when('/create_fuel', { templateUrl: "./views/fuel_form.html", controller: "FuelCreateController" })
        .when('/fuel', { templateUrl: "./views/defaultFuel.html", controller: "DefFuelController" })
        .when('/preview_car/:id', {templateUrl:"./views/car_preview.html", controller:"PreviewCarController"})
        .when('/edit_car/:id', {templateUrl:"./views/car_form.html", controller:"CarModifyController"})
        .when('/create_car', { templateUrl: "./views/car_form.html", controller: "CarCreateController" })
        .when('/car', { templateUrl: "./views/defaultCar.html", controller: "DefCarController" })
        .when('/preview_user/:id', {templateUrl:"./views/user_preview.html", controller:"PreviewUserController"})
        .when('/edit_user/:id', {templateUrl:"./views/user_form.html", controller:"UserModifyController"})
        .when('/register_user', { templateUrl: "./views/user_register.html", controller: "UserRegisterController" })
        .when('/user', { templateUrl: "./views/defaultUser.html", controller: "DefUserController" })
        .when('/login_user', {templateUrl:"./views/user_login.html", controller:"UserLoginController"})
        .when('/forgot', {templateUrl:"./views/forgot.html", controller:"ForgotController"})

        
        .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(false);

});

// global controller object
function MainCtrl($scope, $route, $routeParams, $navigate, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.home = function() {
        $navigate.goTo("/#/");
    }
    $scope.car = function() {
        $navigate.goTo("/#/car");
    }
    $scope.login = function() {
        $navigate.goTo("/#/login_user");
    }
    $scope.register = function() {
        $navigate.goTo("/#/register_user");
    }
}



// home page controller (shows all the brands in the database)
app.controller('DefBrandController', function ($scope, $navigate,$timeout,$brand) {
    $scope.brand = $brand.get();
    $scope.filterText = "";
    $scope.init = function() {
        $brand.get($scope.filterText).then(function(result) {
            $scope.brand = result;
        });
    }

    // timeout is used to avoid consant server calls (instead we use the debounce method)
    var _timeout = null;
    $scope.filter = function() {
        if(_timeout) { // if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }
        _timeout = $timeout(function() {
            $scope.init();
            _timeout = null;
        }, 800);
    }

    $scope.createBrand = function() {
        $navigate.goTo("/#/create_brand");
    }

    $scope.modifyBrand = function(id) {
        $navigate.goTo(["/#/edit_brand/", id].join(""));
    }

    $scope.previewBrand = function(id) {
        $navigate.goTo(["/#/preview_brand/", id].join(""));
    }

    $scope.deleteBrand = function(id) {
        if (confirm("Are you sure you want to delete this brand?")) {
            $brand.delete(id).then(function(result) {
                alert("Brand was deleted")
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// preview for a single brand
app.controller('PreviewBrandController', function ($scope, $navigate, $routeParams,$brand) {
    $scope.brand = $brand.get();
    $scope.init = function() {
        $brand.getById($routeParams.id).then(function(result) {
            $scope.brand = result;
        });
    }


    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyBrand = function(id) {
        $navigate.goTo(["/#/edit_brand/", id].join(""));
    }

    $scope.deleteBrand = function(id) {
        if (confirm("Are you sure you want to delete this brand?")) {
            $brand.delete(id).then(function(result) {
                alert("Brand was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});

// form for creating brands
app.controller('BrandCreateController', function ($scope, $navigate,$brand) {
    $scope.brand = $brand.get();
    $scope.init = function() {};
    $scope.brand = {
        "brandName": ""
    };

    $scope.submit = function() {
        $brand.create($scope.brand).then(function(result) {
            alert("Brand was created!");
            $navigate.goTo("/#/");
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// form for modifying brands
app.controller('BrandModifyController', function ($scope, $navigate,$routeParams,$brand) {
    $scope.brand = $brand.get();
    $scope.isEdit = true;

    $scope.init = function() {
        $brand.getById($routeParams.id).then(function(result) {
            $scope.brand = result;
        });
    }

    $scope.deleteBrand = function(id) {
        if (confirm("Are you sure you want to delete this brand?")) {
            $brand.delete(id).then(function(result) {
                alert("Brand was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }

    $scope.submit = function() {
        $brand.modify($routeParams.id, $scope.brand).then(function(result) {
            alert("Brand was updated!");
            $navigate.goTo(["/#/preview_brand/", $routeParams.id].join(""));
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// home page controller (shows all the models in the database)
app.controller('DefModelsController', function ($scope, $navigate,$timeout,$models) {
    $scope.models = $models.get();
    $scope.filterText = "";
    $scope.init = function() {
        $models.get($scope.filterText).then(function(result) {
            $scope.models = result;
        });
    }

    // timeout is used to avoid consant server calls (instead we use the debounce method)
    var _timeout = null;
    $scope.filter = function() {
        if(_timeout) { // if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }
        _timeout = $timeout(function() {
            $scope.init();
            _timeout = null;
        }, 800);
    }

    $scope.createModels = function() {
        $navigate.goTo("/#/create_models");
    }

    $scope.modifyModels = function(id) {
        $navigate.goTo(["/#/edit_models/", id].join(""));
    }

    $scope.previewModels = function(id) {
        $navigate.goTo(["/#/preview_models/", id].join(""));
    }

    $scope.deleteModels = function(id) {
        if (confirm("Are you sure you want to delete this model?")) {
            $models.delete(id).then(function(result) {
                alert("Model was deleted")
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});

// preview for a single model
app.controller('PreviewModelController', function ($scope, $navigate, $routeParams,$models) {
    $scope.models = $models.get();
    $scope.init = function() {
        $models.getById($routeParams.id).then(function(result) {
            $scope.models = result;
        });
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyModels = function(id) {
        $navigate.goTo(["/#/edit_models/", id].join(""));
    }

    $scope.deleteModels = function(id) {
        if (confirm("Are you sure you want to delete this model?")) {
            $models.delete(id).then(function(result) {
                alert("Model was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// form for creating models
app.controller('ModelsCreateController', function ($scope, $navigate,$models) {

    $scope.models = $models.get();
    $scope.init = function() {};
    $scope.models = {
        "modelName": ""
    };

    $scope.submit = function() {
        $models.create($scope.model).then(function(result) {
            alert("Model was created!");
            $navigate.goTo("/#/");
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }


});

// form for modifying models
app.controller('ModelModifyController', function ($scope, $navigate, $models, $routeParams) {
    $scope.models = $models.get();
    $scope.isEdit = true;

    $scope.init = function() {
        $models.getById($routeParams.id).then(function(result) {
            $scope.models = result;
        });
    }

    $scope.deleteModels = function(id) {
        if (confirm("Are you sure you want to delete this model?")) {
            $models.delete(id).then(function(result) {
                alert("Model was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }

    $scope.submit = function() {
        $models.modify($routeParams.id, $scope.model).then(function(result) {
            alert("Model was updated!");
            $navigate.goTo(["/#/preview_models/", $routeParams.id].join(""));
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// home page controller (shows all the fuel in the database)
app.controller('DefFuelController', function ($scope, $navigate, $fuel, $timeout,) {
    $scope.fuel = $fuel.get();
    $scope.filterText = "";
    $scope.init = function() {
        $fuel.get($scope.filterText).then(function(result) {
            $scope.fuel = result;
        });
    }

    // timeout is used to avoid consant server calls (instead we use the debounce method)
    var _timeout = null;
    $scope.filter = function() {
        if(_timeout) { // if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }
        _timeout = $timeout(function() {
            $scope.init();
            _timeout = null;
        }, 800);
    }

    $scope.createFuel = function() {
        $navigate.goTo("/#/create_fuel");
    }

    $scope.modifyFuel = function(id) {
        $navigate.goTo(["/#/edit_fuel/", id].join(""));
    }

    $scope.previewFuel = function(id) {
        $navigate.goTo(["/#/preview_fuel/", id].join(""));
    }

    $scope.deleteFuel = function(id) {
        if (confirm("Are you sure you want to delete this fuel?")) {
            $fuel.delete(id).then(function(result) {
                alert("Fuel was deleted")
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// preview for a single fuel
app.controller('PreviewFuelController', function ($scope, $navigate, $fuel, $routeParams) {
    $scope.fuel = $fuel.get();
    $scope.init = function() {
        $fuel.getById($routeParams.id).then(function(result) {
            $scope.fuel = result;
        });
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyFuel = function(id) {
        $navigate.goTo(["/#/edit_fuel/", id].join(""));
    }

    $scope.deleteFuel = function(id) {
        if (confirm("Are you sure you want to delete this fuel?")) {
            $fuel.delete(id).then(function(result) {
                alert("Fuel was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});

// form for creating fuel
app.controller('FuelCreateController', function ($scope, $navigate, $fuel) {

    $scope.fuel = $fuel.get();
    $scope.init = function() {};
    $scope.fuel = {
        "fuel": "",
    };

    $scope.submit = function() {
        $fuel.create($scope.fuel).then(function(result) {
            alert("Fuel was created!");
            $navigate.goTo("/#/");
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// form for modifying fuel
app.controller('FuelModifyController', function ($scope, $navigate, $fuel, $routeParams) {
    $scope.fuel = $fuel.get();
    $scope.isEdit = true;

    $scope.init = function() {
        $fuel.getById($routeParams.id).then(function(result) {
            $scope.fuel = result;
        });
    }

    $scope.deleteFuel = function(id) {
        if (confirm("Are you sure you want to delete this fuel?")) {
            $fuel.delete(id).then(function(result) {
                alert("Fuel was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }

    $scope.submit = function() {
        $fuel.modify($routeParams.id, $scope.fuel).then(function(result) {
            alert("Fuel was updated!");
            $navigate.goTo(["/#/preview_fuel/", $routeParams.id].join(""));
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// home page controller (shows all the cars in the database)
app.controller('DefCarController', function ($scope, $navigate, $car, $timeout,) {
    $scope.car = [];
    $scope.filterText = "";
    $scope.init = function() {
        $car.get($scope.filterText).then(function(result) {
            $scope.car = result;
        });
    }

    // timeout is used to avoid consant server calls (instead we use the debounce method)
    var _timeout = null;
    $scope.filter = function() {
        if(_timeout) { // if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }
        _timeout = $timeout(function() {
            $scope.init();
            _timeout = null;
        }, 800);
    }

    $scope.createCar = function() {
        $navigate.goTo("/#/create_car");
    }

    $scope.modifyCar = function(id) {
        $navigate.goTo(["/#/edit_car/", id].join(""));
    }

    $scope.previewCar = function(id) {
        $navigate.goTo(["/#/preview_car/", id].join(""));
    }

    $scope.deleteCar = function(id) {
        if (confirm("Are you sure you want to delete this car?")) {
            $car.delete(id).then(function(result) {
                alert("Car was deleted")
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// preview for a single car
app.controller('PreviewCarController', function ($scope, $navigate, $car, $routeParams) {
    $scope.car = {};
    $scope.init = function() {
        $car.getById($routeParams.id).then(function(result) {
            $scope.car = result;
        });
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyCar = function(id) {
        $navigate.goTo(["/#/edit_car/", id].join(""));
    }

    $scope.deleteCar = function(id) {
        if (confirm("Are you sure you want to delete this car?")) {
            $car.delete(id).then(function(result) {
                alert("Car was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});

// form for creating cars
app.controller('CarCreateController', function ($scope, $navigate, $car,$fuel,$models,$brand) {
    $scope.fuelOptions  = [];
    $scope.init = function(){
        $scope.fuelOptions = $fuel.get();
        $scope.modelsOptions = $models.get();
        $scope.brandOptions = $brand.get();
    };
    $scope.car = {
        "brandId": "",
        "modelsId": "",
        "year": "",
        "price": "",
        "fuelId": "",
        "reg": "",
        "color": "",
    };

    $scope.submit = function() {
        $car.create($scope.car).then(function(result) {
            alert("Car was created!");
            $navigate.goTo("/#/");
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// form for modifying cars
app.controller('CarModifyController', function ($scope, $navigate, $car, $routeParams) {
    $scope.car = {};
    $scope.isEdit = true;

    $scope.init = function() {
        $car.getById($routeParams.id).then(function(result) {
            $scope.car = result;
        });
        $car.getById($routeParams.id).then(function(result) {
            $scope.car = result;
        });
    }

    $scope.deleteCar = function(id) {
        if (confirm("Are you sure you want to delete this car?")) {
            $car.delete(id).then(function(result) {
                alert("Car was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }

    $scope.submit = function() {
        $car.modify($routeParams.id, $scope.car).then(function(result) {
            alert("Car was updated!");
            $navigate.goTo(["/#/preview_car/", $routeParams.id].join(""));
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});


// home page controller (shows all the users in the database)
app.controller('DefUserController', function ($scope, $navigate, $user, $timeout) {
    $scope.user = [];
    $scope.filterText = "";
    $scope.init = function() {
        $user.get($scope.filterText).then(function(result) {
            $scope.car = result;
        });
    }

    // timeout is used to avoid consant server calls (instead we use the debounce method)
    var _timeout = null;
    $scope.filter = function() {
        if(_timeout) { // if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }
        _timeout = $timeout(function() {
            $scope.init();
            _timeout = null;
        }, 800);
    }

    $scope.createUser = function() {

        $navigate.goTo("/#/register_user");
    }

    $scope.modifyUser = function(id) {
        $navigate.goTo(["/#/edit_user/", id].join(""));
    }

    $scope.previewUser= function(id) {
        $navigate.goTo(["/#/preview_user/", id].join(""));
    }

    $scope.deleteUser = function(id) {
        if (confirm("Are you sure you want to delete this user?")) {
            $car.delete(id).then(function(result) {
                alert("User was deleted")
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// preview for a single user
app.controller('PreviewUserController', function ($scope, $navigate, $user, $routeParams) {
    $scope.user = {};
    $scope.init = function() {
        $user.getById($routeParams.id).then(function(result) {
            $scope.user = result;
        });
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyUser = function(id) {
        $navigate.goTo(["/#/edit_user/", id].join(""));
    }

    $scope.deleteUser = function(id) {
        if (confirm("Are you sure you want to delete this user?")) {
            $user.delete(id).then(function(result) {
                alert("User was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});

// form for creating user
app.controller('UserRegisterController', function ($scope, $navigate, $user) {
    $scope.userOptions  = [];
    $scope.init = function(){
    };
    $scope.user = {
        
        
        "name":"",
        "password":"",

    };
    $scope.password_confirm = "";
    

    $scope.submit = function() {
        $user.create($scope.user).then(function(result) {
            alert("User was registred!");
            $navigate.goTo("/#/");
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// form for modifying users
app.controller('UserModifyController', function ($scope, $navigate, $user, $routeParams) {
    $scope.user = {};
    $scope.isEdit = true;

    $scope.init = function() {
        $user.getById($routeParams.id).then(function(result) {
            $scope.user = result;
        });
        $user.getById($routeParams.id).then(function(result) {
            $scope.user = result;
        });
    }

    $scope.deleteUser = function(id) {
        if (confirm("Are you sure you want to delete this user?")) {
            $user.delete(id).then(function(result) {
                alert("User was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }

    $scope.submit = function() {
        $user.modify($routeParams.id, $scope.user).then(function(result) {
            alert("User was updated!");
            $navigate.goTo(["/#/preview_user/", $routeParams.id].join(""));
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});


// preview for a single fuel
app.controller('UserLoginController', function ($scope, $navigate, $user, $routeParams) {
    $scope.fuel = $fuel.get();
    $scope.init = function() {
        $fuel.getById($routeParams.id).then(function(result) {
            $scope.fuel = result;
        });
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyFuel = function(id) {
        $navigate.goTo(["/#/edit_fuel/", id].join(""));
    }

    $scope.deleteFuel = function(id) {
        if (confirm("Are you sure you want to delete this fuel?")) {
            $fuel.delete(id).then(function(result) {
                alert("Fuel was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});






