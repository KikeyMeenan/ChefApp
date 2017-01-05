angular.module('chefApp')
    .controller('RecipesController', function($scope, RecipeService){
        var vm = this;
        
        vm.results = [];

        RecipeService.query(function(data){
            vm.results = data;
        });

    });