describe('Chef Core', function(){
    var RecipeService;
    var $httpBackend;

    beforeEach(module('chefCore'));

    beforeEach(inject(function(_RecipeService_, _$httpBackend_){
        RecipeService = _RecipeService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get recipes', function(){
        $httpBackend.expectGET('recipes').respond(200);

        RecipeService.query();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should create a recipe', function(){
        var expectedData = function(data){
            return angular.fromJson(data).recipeId === 1;
        };

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var recipe = new RecipeService({
            recipeId: 1,
            name: 'Egg Salad'
        });

        recipe.$save();

        expect($httpBackend.flush).not.toThrow();
    });
})