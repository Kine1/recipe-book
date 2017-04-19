import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Recipe } from "../../models/recipe";
import { RecipesService } from "../../services/recipes.service";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {
  recipes: Recipe[];

  constructor(private navCtrl: NavController,
              private recipesService: RecipesService) {
  }

  onNewRecipe() {
    this.navCtrl.push('EditRecipe', {mode: 'Nova'});
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  onLoadRecipe() {

  }

}
