angular.module('chefApp')
    .controller('RecipesController', function($scope, TypeService, IngredientService){
        var vm = this;
        
        vm.types = [];
        vm.ingredients = [];
        vm.filters = [];

        TypeService.query(function(data){
            vm.types = data;
        });

        IngredientService.query(function(data){
            vm.ingredients = data;
        });

    });