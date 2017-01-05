angular.module('chefApp', ['ui.bootstrap', 'ngRoute', 'chefCore', 'ngMockE2E'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'chef-app/recipes/recipes.html',
                controller: 'RecipesController as vm'
            })
            .when('/Ingredients', {
                templateUrl: 'chef-app/ingredients/home.html',
                controller: 'IngredientsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($httpBackend){
        var data = [
            {
                "recipeId": 1,
                "name": "Egg Salad",
                "rating": 4,
                "difficulty": 1,
                "vegetarian": true,
                "vegan": false
            },
            {
                "recipeId": 2,
                "name": "Fried Rice",
                "rating": 6,
                "difficulty": 5,
                "vegetarian": true,
                "vegan": true
            },
            {
                "recipeId": 3,
                "name": "Hamburger",
                "rating": 5,
                "difficulty": 4,
                "vegetarian": false,
                "vegan": false
            }
        ];
        
        var headers = {
            headers: {'Content-Type': 'application/json'}
        };

        $httpBackend.whenGET(function(s){
            return (s.indexOf('recipesApi') !== -1);
        }).respond(200, data, headers);

        $httpBackend.whenGET(/.*/).passThrough();
    });