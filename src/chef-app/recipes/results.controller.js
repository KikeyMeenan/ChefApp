angular.module('chefApp')
    .controller('ResultsController', function($scope, RecipeService){
        var vm = this;
        
        var filters = $scope.Filters;
        var filters = [
            {
                "type": "type",
                "id": 2
            },
            {
                "type": "type",
                "id": 3
            }
        ]
        var typeFilters = [];
        var ingredientFilters = [];

        vm.results = [];

        for (i = 0; i < filters.length; i++){
            if(filters[i].type == "type"){
                typeFilters.push(filters[i]);
            }

            if(filters[i].type == "ingredient"){
                ingredientFilters.push(filters[i]);
            }
        }

        console.log(typeFilters);
        console.log(ingredientFilters);

        RecipeService.query(function(data){
            if (data.length > 0){
                //check for matches
                for (d = 0; d < data.length; d++) { 
                    data[d].typeMatch = false;

                    //loop through type filters
                    for (t = 0; t < typeFilters.length; t++){
                        //check if recipe is of correct type
                        if (typeFilters[t].id == data[d].type.typeId){
                            //type match
                            data[d].typeMatch = true;
                        }
                        else {
                            if(data[d].typeMatch != true){
                                data[d].typeMatch = false;
                            }
                        }
                    }
                    //loop through ingredient filters
                    for (i = 0; i < ingredientFilters.length; i++){
                        //check if recipe ingredients contains ingredient
                        for(ing = 0; ing < data[d].ingredients.length; ing++){
                            //mark matching ingredients as a match
                            if(data[d].ingredients[ing].ingredientId == ingredientFilters[i].id){
                                data[d].ingredients[ing].ingredientMatch = true;
                            }
                            else {
                                data[d].ingredients[ing].ingredientMatch = false;
                            }
                        }
                    }
                }

                for (rec = 0; rec < data.length; rec++){
                    //add/remove type matches to results
                    if(typeFilters.length > 0){
                        //add type matches to results
                        if(data[rec].typeMatch == false){
                            //remove from results
                            for(res = 0; res < vm.results.length; res++){
                                if(vm.results[res].recipeId == data[rec].recipeId){
                                    vm.results.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        if(data[rec].typeMatch == true){
                            //if not already in list
                            var exists = false;
                            for(res = 0; res < vm.results.length; res++){
                                if(vm.results[res].recipeId == data[rec].recipeId){
                                    exists = true;
                                }
                            }
                            if(!exists){
                                //add to results
                                vm.results.push(data[rec]);
                            }
                        }
                    }

                    //add/remove ingredient matches to results
                    if(ingredientFilters.length > 0){
                        var matchingIngredients = 0;
                        //loop through ingredients
                        for(ingr = 0; data[rec].ingredients.length; ingr++){
                            //increment matching ingredients if a match is found
                            if(data[rec].ingredients[ingr].ingredientMatch == true){
                                matchingIngredients++;
                            }
                        }
                        //if it matches set recipe to 'ingredient match'
                        if(matchingIngredients > 0){
                            data[rec].ingredientMatch = true;
                        }
                        else {
                            data[rec].ingredientMatch = false;
                        }

                        if(data[rec].ingredientMatch == false){
                            //remove from results
                            for(res = 0; res < vm.results.length; res++){
                                if(vm.results[res].recipeId == data[rec].recipeId){
                                    vm.results.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        if(data[rec].ingredientMatch == true){
                            //if not already in results
                            var exists = false;
                            for(res = 0; res < vm.results.length; res++){
                                if(vm.results[res].recipeId == data[rec].recipeId){
                                    exists = true;
                                }
                            }
                            if(!exists){
                                vm.results.push(data[rec]);
                            }
                        }
                    }

                    
                }
            }
        });
    });