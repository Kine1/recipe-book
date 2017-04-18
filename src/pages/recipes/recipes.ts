import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {

  constructor(private navCtrl: NavController) {}

  onNewRecipe() {
    this.navCtrl.push('EditRecipe', { mode: 'Nova'});
  }

}
