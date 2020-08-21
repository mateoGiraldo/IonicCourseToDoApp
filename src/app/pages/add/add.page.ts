import { Component, OnInit, ViewChild } from '@angular/core';
import { WishesService } from 'src/app/services/wishes.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ListItem } from 'src/app/models/list-item.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  list: List;
  itemName = '';
  
  constructor(private wishesService: WishesService,
              private route: ActivatedRoute,
              private alertController: AlertController) {

    const listId = this.route.snapshot.paramMap.get('listId');

    this.list = this.wishesService.getList(listId);
  }

  @ViewChild('itemsList') itemList : IonList;

  addItemTolist() {

    if (this.itemName.length === 0)
      return;

    const newItem = new ListItem(this.itemName);

    this.list.items.push(newItem);
    this.itemName = '';

    this.wishesService.saveListsLocalStorage();
  }

  onChangeCheckItem() {

    let itemsFinished = true;
    for (let item of this.list.items) {
      if (!item.finished) {
        itemsFinished = false;
        break;
      }
    }


    if(itemsFinished){
      this.list.finishedDate = new Date();
      this.list.finished = true;
      console.log(this.list);
    }
    else{
      this.list.finishedDate = null;
      this.list.finished = false;
    }

    this.wishesService.saveListsLocalStorage();
  }


  deleteItem( i:number ){
    this.list.items.splice( i , 1);
    this.wishesService.saveListsLocalStorage();
  }

  async editItem( i:number ){
    let value = this.list.items[i].desc;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New item name',
      inputs: [
        {
          name: 'itemName',
          type: 'text',
          id: 'txtItemName',
          placeholder: 'Write the new item name',
          value: value
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.itemList.closeSlidingItems();
          }
        },
        {
          text: 'Acept',
          cssClass: 'primary',
          handler: (data) => {

            if (data.itemName.length == 0)
              return;

            this.list.items[i].desc = data.itemName; 
            this.itemList.closeSlidingItems();

          }
        }
      ]
    });
    
    alert.present();

    this.wishesService.saveListsLocalStorage();

  }

}
