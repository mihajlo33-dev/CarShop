// CRUD service for Notes model
app.service('$notes', function($http) {
    this.notes_api_uri = '/api/note/';
    this.default_options = function(url_ending, data) {
        return {
            url: [this.notes_api_uri, url_ending].join(""),
            method: 'POST',
            data: data
        };
    }

    this.get = function(titleFilter) {
        return $http(this.default_options('get', {titleFilter: titleFilter})).then(function(response) {
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