import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingListService} from'../shopping-list.service';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f',{static:false})slForm:NgForm;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.slService.startedEditing.subscribe(
      (index) =>{
        this.editedItemIndex=index;
        this.editMode=true;
       this.editedItem= this.slService.getIngredient(index)
       this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
      }
    )
  }

  onSubmit(form:NgForm) {
  const value=form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    this.slForm.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  

}
