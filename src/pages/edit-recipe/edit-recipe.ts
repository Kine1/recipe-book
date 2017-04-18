import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipe implements OnInit {
  mode = 'Nova';
  selectOptions = ['Fácil', 'Médio', 'Difícil'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
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
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      dificulty: new FormControl('Médio', Validators.required),
      ingredients: new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
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
