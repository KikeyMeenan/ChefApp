angular.module('chefApp', ['ui.bootstrap', 'ngRoute', 'chefCore', 'ngMockE2E'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'chef-app/recipes/recipes.html',
                controller: 'RecipesController as vm'
            })
            .when('/Ingredients', {
                templateUrl: 'chef-app/ingredients/home.html',
                controller: 'IngredientsController as vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($httpBackend){
        
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
            },
            {
                "ingredientId" : 7,
                "name": "Rice",
                "vegetarian": true,
                "vegan": true
            },
            {
                "ingredientId" : 8,
                "name": "Bread",
                "vegetarian": true,
                "vegan": true
            },
            {
                "ingredientId" : 9,
                "name": "Cheese",
                "vegetarian": true,
                "vegan": false
            }
        ];

        var types = [
            {
                "typeId": 1,
                "name": "Salad"
            },
            {
                "typeId": 2,
                "name": "Chinese"
            },
            {
                "typeId": 3,
                "name": "American"
            },
            {
                "typeId": 4,
                "name": "Italian"
            }            
        ];

        var recipes = [
            {
                "recipeId": 1,
                "name": "Egg Salad",
                "type": types[0],
                "rating": 4,
                "difficulty": 1,
                "vegetarian": true,
                "vegan": false,
                "ingredients": [
                    ingredients[0],
                    ingredients[3],
                    ingredients[4]
                ],
                "typeMatch": false,
                "ingredientMatch": false
            },
            {
                "recipeId": 2,
                "name": "Fried Rice",
                "type": types[1],
                "rating": 6,
                "difficulty": 5,
                "vegetarian": true,
                "vegan": false,
                "ingredients": [
                    ingredients[4],
                    ingredients[6]
                ],
                "typeMatch": false,
                "ingredientMatch": false
            },
            {
                "recipeId": 3,
                "name": "Hamburger",
                "type": types[2],
                "rating": 5,
                "difficulty": 4,
                "vegetarian": false,
                "vegan": false,
                "ingredients": [
                    ingredients[0],
                    ingredients[3],
                    ingredients[5],
                    ingredients[7],
                    ingredients[8],
                ],
                "typeMatch": false,
                "ingredientMatch": false
            }
        ];
        
        var headers = {
            headers: {'Content-Type': 'application/json'}
        };

        $httpBackend.whenGET(function(s){
            return (s.indexOf('recipesApi') !== -1);
        }).respond(200, recipes, headers);

        $httpBackend.whenGET(function(s){
            return (s.indexOf('ingredientsApi') !== -1);
        }).respond(200, ingredients, headers);

        $httpBackend.whenGET(function(s){
            return (s.indexOf('typesApi') !== -1);
        }).respond(200, types, headers);

        $httpBackend.whenGET(/.*/).passThrough();
    });