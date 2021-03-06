app.service('$brand', function($http) {
    this.brand_api_uri = '/api/brand/';
    this.default_options = function(url_ending, data) {
        return {
            url: [this.brand_api_uri, url_ending].join(""),
            method: 'POST',
            data: data
        };
    }

    this.get = function(brandNameFilter) {
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

    this.get = function(modelNameFilter) {
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

    this.get = function(fuelNameFilter) {
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

    this.get = function(fuelFilter) {
        return $http(this.default_options('get', {fuelFilter: fuelFilter})).then(function(response) {
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





app.service('$user', function($http) {
    this.user_api_uri = '/api/user/';
    this.default_options = function(url_ending, data) {
        return {
            url: [this.car_api_uri, url_ending].join(""),
            method: 'POST',
            data: data
        };
    }

    this.get = function(nameFilter) {
        return $http(this.default_options('get', {nameFilter: nameFilter})).then(function(response) {
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