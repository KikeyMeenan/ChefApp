describe('Recipe Controller', function(){
    var results = [
        {
            "recipeId": 1,
            "name": "Egg Salad"
        },
        {
            "recipeId": 2,
            "name": "Egg Fried Rice"
        },
        {
            "recipeId": 3,
            "name": "Hamburger"
        }
    ];

    var $scope;
    var $controller;
    var RecipeService;
    var $rootScope;

    beforeEach(module('chefApp'));

    beforeEach(inject(function(_$controller_, _RecipeService_, _$rootScope_){
        $scope = {};
        $controller = _$controller_;
        RecipeService = _RecipeService_;
        $rootScope = _$rootScope_;
    }));

    it('should get all Recipes', function(){
        spyOn(RecipeService, 'query').and.callFake(function(cb){
            cb(results);
        });

        var ctrl = $controller('RecipesController', {
            $scope: $scope,
            RecipeService: RecipeService
        });
        
        expect(ctrl.results).toBe(results);
    })
});