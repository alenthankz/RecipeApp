import { Injectable} from '@angular/core';
import { Recipe } from './recipe.model';
import {Ingredient} from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged =new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Grilled steak ',
      'A super-tasty steak with french fries ',
      'https://lh3.googleusercontent.com/proxy/YLStQgowbT1i2Sv2ns9OAcRvsmc6r8wBTfFqC-h9YYPGkUvwkYIMyWD67QhaUpNv3AWDCzknE7UJv3DAs7WOSsEGPqCoyYovXWma7F5c9PYijpr8Us12JujeLxlIXG-sRort9LWquw1Qsc57qQyyV_jxhto',
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

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }
  updateRecipe(index: number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice())

  }

}
