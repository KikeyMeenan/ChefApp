angular.module('chefApp').directive('recipeResult', function(){
    return {
        templateUrl: "chef-app/recipes/results.html",
        restrict: "E",
        scope: {
            result: "=result"
        },
        controller: 'ResultsController as vm'
    };
});