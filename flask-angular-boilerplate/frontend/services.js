var app = angular.module('AvtoShop', [], function ($routeProvider, $locationProvider) {
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

app.service('$brand', function($http) {
    this.brand_api_uri = '/api/brand/';
    this.default_options = function(url_ending, data) {
        return {
            url: [this.brand_api_uri, url_ending].join(""),
            method: 'POST',
            data: data
        };
    }

    this.get = function(titleFilter) {
        return $http(this.default_options('get', {brandNameFilter: brandNameFilter})).then(function(response) {
            return response.data;
        });
    };

    this.create = function(data) {
        return $http(this.default_options('create', data)).then(function(response) {
            return response.data;
        });
    };

    this.modify = function(id, data) {
        return $http(this.default_options('modify/'+id, data)).then(function(response) {
            return response.data;
        });
    };

    this.delete = function(id) {
        return $http(this.default_options('delete/'+id, {})).then(function(response) {
            return response.data;
        });
    };

    this.getById = function(id) {
        return $http(this.default_options('get', {id: id})).then(function(response) {
            return response.data;
        });
    }
});

app.service('$models', function($http) {
    this.models_api_uri = '/api/models/';
    this.default_options = function(url_ending, data) {
        return {
            url: [this.models_api_uri, url_ending].join(""),
            method: 'POST',
            data: data
        };
    }

    this.get = function(titleFilter) {
        return $http(this.default_options('get', {modelNameFilter: modelNameFilter})).then(function(response) {
            return response.data;
        });
    };

    this.create = function(data) {
        return $http(this.default_options('create', data)).then(function(response) {
            return response.data;
        });
    };

    this.modify = function(id, data) {
        return $http(this.default_options('modify/'+id, data)).then(function(response) {
            return response.data;
        });
    };

    this.delete = function(id) {
        return $http(this.default_options('delete/'+id, {})).then(function(response) {
            return response.data;
        });
    };

    this.getById = function(id) {
        return $http(this.default_options('get', {id: id})).then(function(response) {
            return response.data;
        });
    }
});

app.service('$fuel', function($http) {
    this.fuel_api_uri = '/api/fuel/';
    this.default_options = function(url_ending, data) {
        return {
            url: [this.fuel_api_uri, url_ending].join(""),
            method: 'POST',
            data: data
        };
    }

    this.get = function(titleFilter) {
        return $http(this.default_options('get', {fuelNameFilter: fuelNameFilter})).then(function(response) {
            return response.data;
        });
    };

    this.create = function(data) {
        return $http(this.default_options('create', data)).then(function(response) {
            return response.data;
        });
    };

    this.modify = function(id, data) {
        return $http(this.default_options('modify/'+id, data)).then(function(response) {
            return response.data;
        });
    };

    this.delete = function(id) {
        return $http(this.default_options('delete/'+id, {})).then(function(response) {
            return response.data;
        });
    };

    this.getById = function(id) {
        return $http(this.default_options('get', {id: id})).then(function(response) {
            return response.data;
        });
    }
});

app.service('$car', function($http) {
    this.car_api_uri = '/api/car/';
    this.default_options = function(url_ending, data) {
        return {
            url: [this.car_api_uri, url_ending].join(""),
            method: 'POST',
            data: data
        };
    }

    this.get = function(titleFilter) {
        return $http(this.default_options('get', {brandFilter: brandFilter})).then(function(response) {
            return response.data;
        });
    };

    this.create = function(data) {
        return $http(this.default_options('create', data)).then(function(response) {
            return response.data;
        });
    };

    this.modify = function(id, data) {
        return $http(this.default_options('modify/'+id, data)).then(function(response) {
            return response.data;
        });
    };

    this.delete = function(id) {
        return $http(this.default_options('delete/'+id, {})).then(function(response) {
            return response.data;
        });
    };

    this.getById = function(id) {
        return $http(this.default_options('get', {id: id})).then(function(response) {
            return response.data;
        });
    }
});


// Custom navigation service
app.service('$navigate', function() {
    this.goBack = function() {
        history.go(-1);
    }
    
    this.goTo = function(url) {
        window.location.href = url;
    }
})