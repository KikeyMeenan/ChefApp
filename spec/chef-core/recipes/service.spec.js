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
        $httpBackend.expectGET('recipesApi').respond(200);

        RecipeService.query();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should get recipe by id', function(){
        $httpBackend.expectGET('recipesApi/1').respond(200);

        RecipeService.get({ recipeId: '1'});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should delete recipe by id', function(){
        $httpBackend.expectDELETE('recipesApi/1').respond(200);

        RecipeService.remove({ recipeId: '1'});

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

    it('should update recipe', function(){
        $httpBackend.expectPUT('recipesApi').respond(200);

        var recipe = new RecipeService({
            recipeId: '1',
            name: 'Egg Salad'
        });

        recipe.$update();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should authenticate requests', function(){
        var headerData = function(headers){
            return angular.fromJson(headers).authToken === 'myToken';
        };

        var matchAny = /.*/;
        
        //setup expectations on httpbackend
        $httpBackend.whenGET(matchAny, headerData).respond(200);

        $httpBackend.expectPOST(matchAny, matchAny, headerData).respond(200);

        $httpBackend.expectPUT(matchAny, matchAny, headerData).respond(200);

        $httpBackend.expectDELETE(matchAny, headerData).respond(200);


        var recipeService = { recipeId: '1', name: 'Egg Salad' };

        //setup requests
        RecipeService.query();
        RecipeService.get({recipeId: '1'});
        new RecipeService(recipeService).$save();
        new RecipeService(recipeService).$update();
        new RecipeService(recipeService).$remove();

        //perform requests and check for errors
        expect($httpBackend.flush).not.toThrow();
    });
})