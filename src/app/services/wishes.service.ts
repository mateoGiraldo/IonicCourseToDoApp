import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {


  lists: List[] = [];
  constructor() {
    this.loadListsLocalStorage();
  }


  addList(title: string) {
    const list = new List(title);
    this.lists.push(list);
    this.saveListsLocalStorage();

    return list.id;
  }

  removeList(id: number) {
    this.lists = this.lists.filter( l => l.id != id);
    this.saveListsLocalStorage();
  }


  saveListsLocalStorage() {
    localStorage.setItem('dataLists', JSON.stringify(this.lists));
  }


  loadListsLocalStorage() {
    if (localStorage.getItem('dataLists'))
      this.lists = JSON.parse(localStorage.getItem('dataLists'));
  }

  getList(id: string | number): List{
    id = Number(id);

    return this.lists.find( lists => lists.id === id);
  }
}
