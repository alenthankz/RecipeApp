import { Injectable} from '@angular/core';
import { Recipe } from './recipe.model';
import {Ingredient} from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Grilled steak ',
      'A super-tasty steak with french fries ',
      'https://previews.123rf.com/images/gbh007/gbh0071712/gbh007171200468/92226027-grilled-steak-with-french-fries-on-white-background.jpg',
      [
        new Ingredient('Meat', 3),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];
  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index];
  }
  constructor(private slService : ShoppingListService) { }

  addIngredientsToShoppingList(ingrdients : Ingredient[]){
     for(let ingredient of ingrdients){
       this.slService.addIngredient(ingredient);
     }
  }
}
