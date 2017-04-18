import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list.service";
import { Ingredient } from "../../models/ingredient";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingList {
  ingredients: Ingredient[] =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shoppingService: ShoppingListService) {}

  ionViewWillEnter() {
    this.loadItens();
  }

  //Aqui utilizamos a maneira de criar form diretamente no HTML e pegamos a
  // referência. Template Driven Form
  onAddItem(form: NgForm) {
    this.shoppingService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItens();
  }

  onRemoveItem(index: number) {
    this.shoppingService.removeItem(index);
    this.loadItens();
  }

  loadItens() {
    this.ingredients = this.shoppingService.getItens();
  }



}
