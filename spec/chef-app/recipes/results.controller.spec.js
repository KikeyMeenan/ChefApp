describe('Results Controller', function () {
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
                ]
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
                ]
            },
            {
                "recipeId": 3,
                "name": "Hamburger",
                "type": types[3],
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
                ]
            }
        ];

    var Filters = [
        {
            "filterType": "type",
            "id": 2
        },
        {
            "filterType": "type",
            "id": 3
        }
    ]

    var expectedResults = [
        recipes[1],
        recipes[2]
    ]

    var $controller;
    var $q;
    var $rootScope;
    var $scope;
    var RecipeService;

    beforeEach(module('chefApp'));

    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _RecipeService_){
        $controller = _$controller_;
        $scope = {};
        $q = _$q_;
        $rootScope = _$rootScope_;
        RecipeService = _RecipeService_;
    }));

    it('should get all recipes', function(){
        spyOn(RecipeService, 'query').and.callFake(function(cb){
            cb(recipes);
        });

        $scope.Filters = Filters;

        var ctrl = $controller('ResultsController', {
            $scope: $scope,
            RecipeService: RecipeService
        });
        
        expect(ctrl.results).toBe(expectedResults);
    });
});