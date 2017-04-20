import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeModel } from "../../models/recipe.model";
import { RecipesService } from "../../services/recipes.service";
import { ShoppingListService } from "../../services/shopping-list.service";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class Recipe implements OnInit {

  recipe: RecipeModel;
  index: number;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private shoppingListService: ShoppingListService,
              private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push('EditRecipe', {mode: 'Edição', recipe: this.recipe, index: this.index});
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

  onAddIngredients() {
    this.shoppingListService.addItens(this.recipe.ingredients);
  }

}
