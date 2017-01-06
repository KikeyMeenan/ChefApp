describe('Chef Core', function(){
    var IngredientService;
    var $httpBackend;

    beforeEach(module('chefCore'));

    beforeEach(inject(function(_IngredientService_, _$httpBackend_){
        IngredientService = _IngredientService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get ingredients', function(){
        $httpBackend.expectGET('ingredientsApi').respond(200);

        IngredientService.query();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should get ingredient by id', function(){
        $httpBackend.expectGET('ingredientsApi/1').respond(200);

        IngredientService.get({ ingredientId: '1'});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should delete ingredient by id', function(){
        $httpBackend.expectDELETE('ingredientsApi/1').respond(200);

        IngredientService.remove({ ingredientId: '1'});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should create a ingredient', function(){
        var expectedData = function(data){
            return angular.fromJson(data).ingredientId === 1;
        };

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var ingredient = new IngredientService({
            ingredientId: 1,
            name: 'Egg'
        });

        ingredient.$save();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should update ingredient', function(){
        $httpBackend.expectPUT('ingredientsApi').respond(200);

        var ingredient = new IngredientService({
            ingredientId: '1',
            name: 'Egg'
        });

        ingredient.$update();

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


        var ingredientService = { ingredientId: '1', name: 'Egg Salad' };

        //setup requests
        IngredientService.query();
        IngredientService.get({ingredientId: '1'});
        new IngredientService(ingredientService).$save();
        new IngredientService(ingredientService).$update();
        new IngredientService(ingredientService).$remove();

        //perform requests and check for errors
        expect($httpBackend.flush).not.toThrow();
    });
})