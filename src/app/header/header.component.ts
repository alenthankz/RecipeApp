import { Component } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private storeData: DataStorageService){}
  onSaveData(){
    this.storeData.storeRecipes();
  }
  onFetchData(){
    this.storeData.fetchRecipes();
  }
}
