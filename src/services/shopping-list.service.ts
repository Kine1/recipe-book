import { Ingredient } from "../models/ingredient";

export class ShoppingListService {

  private ingredients: Array<Ingredient> = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItens(items: Array<Ingredient>) {
    //spread operator (...) Desconstrói o array em uma lista de itens individuais,
    //dessa forma é possível adicioná-los ao array.
    this.ingredients.push(...items);
  }

  getItens() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }



}
