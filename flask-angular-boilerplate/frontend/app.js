// routing system for the application
// angularJS routing system works with views and controllers each seperate route can have a diff HTML tempalte (views directory) 
// and a diff Controller (app.controller)
var app = angular.module('appTitleGoesHere', [], function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', { templateUrl: "./views/default.html", controller: "DefController" })
        .when('/preview/:id', { templateUrl: "./views/note_preview.html", controller: "PreviewController" })
        .when('/edit/:id', { templateUrl: "./views/note_form.html", controller: "NoteModifyController" })
        .when('/create', { templateUrl: "./views/note_form.html", controller: "NoteCreateController" })
        .when('/preview/:id', {templateUrl:"./views/brand_preview.html", controller:"PreviewController"})
        .when('/edit/:id', {templateUrl:"./views/brand_form.html", controller:"BrandModifyController"})
        .when('/create', { templateUrl: "./views/brand_form.html", controller: "BrandCreateController" })
        .when('/brand', { templateUrl: "./views/defaultBrand.html", controller: "DefController" })
        .when('/preview/:id', {templateUrl:"./views/models_preview.html", controller:"PreviewController"})
        .when('/edit/:id', {templateUrl:"./views/models_form.html", controller:"ModelsModifyController"})
        .when('/create', { templateUrl: "./views/models_form.html", controller: "ModelsCreateController" })
        .when('/models', { templateUrl: "./views/defaultModels.html", controller: "DefController" })
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
    $scope.notes = [];
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
        if (confirm("Are you sure you want to delete this note?")) {
            $brands.delete(id).then(function(result) {
                alert("Note was deleted")
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// preview for a single brand
app.controller('PreviewBrandController', function ($scope, $navigate, $routeParams,$brands) {
    $scope.note = {};
    $scope.init = function() {
        $brands.getById($routeParams.id).then(function(result) {
            $scope.brand = result;
        });


    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyBrand = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.deleteBrand = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $notes.delete(id).then(function(result) {
                alert("Note was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});

// form for creating brands
app.controller('BrandCreateController', function ($scope, $navigate,$brands) {
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

// form for modifying brands
app.controller('BrandModifyController', function ($scope, $navigate,$routeParams,$brands) {
    $scope.note = {};
    $scope.isEdit = true;

    $scope.init = function() {
        $brands.getById($routeParams.id).then(function(result) {
            $scope.brand = result;
        });
    }

    $scope.deleteBrand = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
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
    $scope.notes = [];
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
        if (confirm("Are you sure you want to delete this note?")) {
            $models.delete(id).then(function(result) {
                alert("Model was deleted")
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});

// preview for a single model
app.controller('PreviewModelController', function ($scope, $navigate, $routeParams,$models) {
    $scope.model = {};
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
        if (confirm("Are you sure you want to delete this note?")) {
            $models.delete(id).then(function(result) {
                alert("Model was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// form for creating brands
app.controller('ModelCreateController', function ($scope, $navigate,$models) {
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
    $scope.model = {};
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
        if (confirm("Are you sure you want to delete this note?")) {
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


// home page controller (shows all the notes in the database)
app.controller('DefController', function ($scope, $navigate, $notes, $timeout,) {
    $scope.notes = [];
    $scope.filterText = "";
    $scope.init = function() {
        $notes.get($scope.filterText).then(function(result) {
            $scope.notes = result;
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

    $scope.createNote = function() {
        $navigate.goTo("/#/create");
    }

    $scope.modifyNote = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.previewNote = function(id) {
        $navigate.goTo(["/#/preview/", id].join(""));
    }

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $notes.delete(id).then(function(result) {
                alert("Note was deleted")
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});


// preview for a single note
app.controller('PreviewController', function ($scope, $navigate, $notes, $routeParams) {
    $scope.note = {};
    $scope.init = function() {
        $notes.getById($routeParams.id).then(function(result) {
            $scope.note = result;
        });
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyNote = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $notes.delete(id).then(function(result) {
                alert("Note was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }
});

// form for creating notes
app.controller('NoteCreateController', function ($scope, $navigate, $notes) {
    $scope.init = function() {};
    $scope.note = {
        "Title": "",
        "Description": ""
    };

    $scope.submit = function() {
        $notes.create($scope.note).then(function(result) {
            alert("Note was created!");
            $navigate.goTo("/#/");
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

// form for modifying notes
app.controller('NoteModifyController', function ($scope, $navigate, $notes, $routeParams) {
    $scope.note = {};
    $scope.isEdit = true;

    $scope.init = function() {
        $notes.getById($routeParams.id).then(function(result) {
            $scope.note = result;
        });
        $notes.getById($routeParams.id).then(function(result) {
            $scope.brand = result;
        });
    }

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $notes.delete(id).then(function(result) {
                alert("Note was deleted");
                $navigate.goTo("/#/"); // go to home page after delete
            });
        }
    }

    $scope.submit = function() {
        $notes.modify($routeParams.id, $scope.note).then(function(result) {
            alert("Note was updated!");
            $navigate.goTo(["/#/preview/", $routeParams.id].join(""));
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});
