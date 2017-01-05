angular.module('chefCore', ['ngResource'])
    .factory('RecipeService', function($resource){
        var token = 'myToken';
        return $resource('recipesApi/:recipeId', { recipeId: '@id' }, {
            update: {
                method: 'PUT',
                headers: { 'authToken': token }
            },
            get: {
                method: 'GET',
                headers: { 'authToken': token }
            },
            query: {
                method: 'GET',
                headers: { 'authToken': token },
                isArray: true
            },
            save: {
                method: 'POST',
                headers: { 'authToken': token }
            },
            remove: {
                method: 'DELETE',
                headers: { 'authToken': token }
            },
        });
    });