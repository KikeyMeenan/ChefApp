angular.module('chefCore')
    .factory('IngredientService', function($resource){
        var token = 'myToken';
        return $resource('ingredientsApi/:ingredientId', { ingredientId: '@id' }, {
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