// routing system for the application
// angularJS routing system works with views and controllers each separate route can have a diff HTML template (views directory)
// and a diff Controller (app.controller)
var app = angular.module('app', [], function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/preview/:id', {templateUrl:"./views/brand_preview.html", controller:"PreviewBrandController"})
        .when('/edit/:id', {templateUrl:"./views/brand_form.html", controller:"BrandModifyController"})
        .when('/create', { templateUrl: "./views/brand_form.html", controller: "BrandCreateController" })
        .when('/brand', { templateUrl: "./views/defaultBrand.html", controller: "DefBrandController" })
        .when('/preview/:id', {templateUrl:"./views/models_preview.html", controller:"PreviewModelsController"})
        .when('/edit/:id', {templateUrl:"./views/models_form.html", controller:"ModelsModifyController"})
        .when('/create', { templateUrl: "./views/models_form.html", controller: "ModelsCreateController" })
        .when('/models', { templateUrl: "./views/defaultModels.html", controller: "DefModelsController" })
        .when('/preview/:id', {templateUrl:"./views/fuel_preview.html", controller:"PreviewFuelController"})
        .when('/edit/:id', {templateUrl:"./views/fuel_form.html", controller:"FuelModifyController"})
        .when('/create', { templateUrl: "./views/fuel_form.html", controller: "FuelCreateController" })
        .when('/fuel', { templateUrl: "./views/defaultFuel.html", controller: "DefFuelController" })
        .when('/preview/:id', {templateUrl:"./views/car_preview.html", controller:"PreviewCarController"})
        .when('/edit/:id', {templateUrl:"./views/car_form.html", controller:"CarModifyController"})
        .when('/create', { templateUrl: "./views/car_form.html", controller: "CarCreateController" })
        .when('/fuel', { templateUrl: "./views/defaultCar.html", controller: "DefCarController" })
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
}



// home page controller (shows all the brands in the database)
app.controller('DefBrandController', function ($scope, $navigate,$timeout,$brands) {
    $scope.brand = $brand.get();
    $scope.filterText = "";
    $scope.init = function() {
        $brands.get($scope.filterText).then(function(result) {
            $scope.brands = result;
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
        $navigate.goTo("/#/create");
    }

    $scope.modifyBrand = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.previewBrand = function(id) {
        $navigate.goTo(["/#/preview/", id].join(""));
    }

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you want to delete this brand?")) {
            $brands.delete(id).then(function(result) {
                alert("Brand was deleted")
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// preview for a single brand
app.controller('PreviewBrandController', function ($scope, $navigate, $routeParams,$brands) {
    $scope.brand = $brand.get();
    $scope.init = function() {
        $brands.getById($routeParams.id).then(function(result) {
            $scope.brand = result;
        });
    }


    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyBrand = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
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
app.controller('BrandCreateController', function ($scope, $navigate,$brands) {
    $scope.brand = $brand.get();
    $scope.init = function() {};
    $scope.note = {
        "brandName": ""
    };

    $scope.submit = function() {
        $brands.create($scope.brand).then(function(result) {
            alert("Brand was created!");
            $navigate.goTo("/#/");
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// form for modifying brands
app.controller('BrandModifyController', function ($scope, $navigate,$routeParams,$brands) {
    $scope.brand = $brand.get();
    $scope.isEdit = true;

    $scope.init = function() {
        $brands.getById($routeParams.id).then(function(result) {
            $scope.brand = result;
        });
    }

    $scope.deleteBrand = function(id) {
        if (confirm("Are you sure you want to delete this brand?")) {
            $brands.delete(id).then(function(result) {
                alert("Brand was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }

    $scope.submit = function() {
        $brands.modify($routeParams.id, $scope.brand).then(function(result) {
            alert("Brand was updated!");
            $navigate.goTo(["/#/preview/", $routeParams.id].join(""));
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// home page controller (shows all the models in the database)
app.controller('DefModelController', function ($scope, $navigate,$timeout,$models) {
    $scope.model = $models.get();
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

    $scope.createModel = function() {
        $navigate.goTo("/#/create");
    }

    $scope.modifyModel = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.previewModel = function(id) {
        $navigate.goTo(["/#/preview/", id].join(""));
    }

    $scope.deleteModel = function(id) {
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
    $scope.model = $models.get();
    $scope.init = function() {
        $models.getById($routeParams.id).then(function(result) {
            $scope.model = result;
        });


    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyModel = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.deleteModel = function(id) {
        if (confirm("Are you sure you want to delete this model?")) {
            $models.delete(id).then(function(result) {
                alert("Model was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// form for creating brands
app.controller('ModelCreateController', function ($scope, $navigate,$models) {
}
    $scope.model = $models.get();
    $scope.init = function() {};
    $scope.note = {
        "brandName": ""
    };

    $scope.submit = function() {
        $brands.create($scope.note).then(function(result) {
            alert("Brand was created!");
            $navigate.goTo("/#/");
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// form for modifying models
app.controller('ModelModifyController', function ($scope, $navigate, $models, $routeParams) {
    $scope.model = $models.get();
    $scope.isEdit = true;

    $scope.init = function() {
        $models.getById($routeParams.id).then(function(result) {
            $scope.model = result;
        });
        $models.getById($routeParams.id).then(function(result) {
            $scope.model = result;
        });
    }

    $scope.deleteModel = function(id) {
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
            $navigate.goTo(["/#/preview/", $routeParams.id].join(""));
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
        $navigate.goTo("/#/create");
    }

    $scope.modifyFuel = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.previewFuel = function(id) {
        $navigate.goTo(["/#/preview/", id].join(""));
    }

    $scope.deleteFuel = function(id) {
        if (confirm("Are you sure you want to delete this fuel?")) {
            $fuel.delete(id).then(function(result) {
                alert("Note was deleted")
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
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.deleteFuel = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $fuel.delete(id).then(function(result) {
                alert("Fuel was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});

// form for creating fuel
app.controller('FuelCreateController', function ($scope, $navigate, $fuel) {
}
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
            $navigate.goTo(["/#/preview/", $routeParams.id].join(""));
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
        $navigate.goTo("/#/create");
    }

    $scope.modifyCar = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.previewCar = function(id) {
        $navigate.goTo(["/#/preview/", id].join(""));
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
        $navigate.goTo(["/#/edit/", id].join(""));
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
app.controller('CarCreateController', function ($scope, $navigate, $car) {
    $scope.init = function() {};
    $scope.car = {
        "brand": "",
        "model": "",
        "model": "",
        "year": "",
        "price": "",
        "fuel": "",
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
            $navigate.goTo(["/#/preview/", $routeParams.id].join(""));
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});



