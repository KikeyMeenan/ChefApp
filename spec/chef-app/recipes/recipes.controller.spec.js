describe('Recipes Controller', function(){
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
    
    var $controller;
    var $rootScope;
    var $scope;
    var TypeService;
    var IngredientService;

    beforeEach(module('chefApp'));

    beforeEach(inject(function(_$controller_, _TypeService_, _IngredientService_, _$rootScope_){
        $scope = {};
        $controller = _$controller_;
        TypeService = _TypeService_;
        IngredientService = _IngredientService_;
        $rootScope = _$rootScope_;
    }));

    it('should get all Recipe Types', function(){
        spyOn(TypeService, 'query').and.callFake(function(cb){
            cb(types);
        });

        var ctrl = $controller('RecipesController', {
            $scope: $scope,
            TypeService: TypeService,
            IngredientService: IngredientService
        });
        
        expect(ctrl.types).toBe(types);
    });

    it('should get all Ingredients', function(){
        spyOn(IngredientService, 'query').and.callFake(function(cb){
            cb(ingredients);
        });

        var ctrl = $controller('RecipesController', {
            $scope: $scope,
            TypeService: TypeService,
            IngredientService: IngredientService
        });
        
        expect(ctrl.ingredients).toBe(ingredients);
    });
});