describe('Chef Core', function(){
    var TypeService;
    var $httpBackend;

    beforeEach(module('chefCore'));

    beforeEach(inject(function(_TypeService_, _$httpBackend_){
        TypeService = _TypeService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get types', function(){
        $httpBackend.expectGET('typesApi').respond(200);

        TypeService.query();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should get type by id', function(){
        $httpBackend.expectGET('typesApi/1').respond(200);

        TypeService.get({ typeId: '1'});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should delete type by id', function(){
        $httpBackend.expectDELETE('typesApi/1').respond(200);

        TypeService.remove({ typeId: '1'});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should create a type', function(){
        var expectedData = function(data){
            return angular.fromJson(data).typeId === 1;
        };

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var type = new TypeService({
            typeId: 1,
            name: 'Salad'
        });

        type.$save();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should update type', function(){
        $httpBackend.expectPUT('typesApi').respond(200);

        var type = new TypeService({
            typeId: '1',
            name: 'Salad'
        });

        type.$update();

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


        var typeService = { typeId: '1', name: 'Salad' };

        //setup requests
        TypeService.query();
        TypeService.get({typeId: '1'});
        new TypeService(typeService).$save();
        new TypeService(typeService).$update();
        new TypeService(typeService).$remove();

        //perform requests and check for errors
        expect($httpBackend.flush).not.toThrow();
    });
})