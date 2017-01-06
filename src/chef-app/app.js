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
        var recipes = [
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

        var ingredients = [
            {
                "ingredientId" : 1,
                "name": "Onion",
                "vegetarian": true,
                "vegan": true
            },
            {
                "ingredientId" : 2,
                "name": "Chicken",
                "vegetarian": false,
                "vegan": false
            },
            {
                "ingredientId" : 3,
                "name": "Milk",
                "vegetarian": true,
                "vegan": false
            },
            {
                "ingredientId" : 4,
                "name": "Tomato",
                "vegetarian": true,
                "vegan": true
            },
            {
                "ingredientId" : 5,
                "name": "Eggs",
                "vegetarian": true,
                "vegan": false
            },
            {
                "ingredientId" : 6,
                "name": "Beef",
                "vegetarian": false,
                "vegan": false
            }
        ]
        
        var headers = {
            headers: {'Content-Type': 'application/json'}
        };

        $httpBackend.whenGET(function(s){
            return (s.indexOf('recipesApi') !== -1);
        }).respond(200, recipes, headers);

        $httpBackend.whenGET(function(s){
            return (s.indexOf('ingredientsApi') !== -1);
        }).respond(200, ingredients, headers);

        $httpBackend.whenGET(/.*/).passThrough();
    });