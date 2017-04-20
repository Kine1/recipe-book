import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RecipesService } from "../../services/recipes.service";
import { RecipeModel } from "../../models/recipe.model";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipe implements OnInit {
  mode = 'Nova';
  selectOptions = ['Fácil', 'Médio', 'Difícil'];
  recipeForm: FormGroup;
  recipe: RecipeModel;
  index: number;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipesService: RecipesService,
              private navCtrl: NavController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edição') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  //Neste exemplo está sendo usado a maneira reativa de criar forms,
  // Reactive form, onde criamos o form internamente.
  //Criamos um FormGroup e então para cada input do form criamos um
  //FormControl onde é possível adicionar valores default, validações.
  //No HTML temos que dizer para a tag form que o seu atributo form deve
  //utilizar o nosso form (recipeForm) ao invés de usar o form padrão.
  //Em cada input devemos indicar através de formControlName a qual controle
  //cada input pertence.
  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Médio';
    let ingredients = [];

    if (this.mode == 'Edição') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      difficulty: new FormControl(difficulty, Validators.required),
      ingredients: new FormArray(ingredients)
    });
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }
    if (this.mode == 'Edição') {
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'O que você gostaria de fazer?',
      buttons: [
        {
          text: 'Adicionar Ingrediente',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remover Ingredientes',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;

            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              this.createToast('Ingredientes removidos!');
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Adicionar Ingrediente',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Adicionar',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              this.createToast('Por favor insira um valor válido.');
              return;
            }

            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            this.createToast('Item Adicionado');
          }
        }
      ]
    });
  }

  createToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-wrapper'
    });
    toast.present();
  }


}
