import { Component } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public wishesService: WishesService,
    private alertController: AlertController,
    private router: Router) {

  }

  async addList() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'List name',
      inputs: [
        {
          name: 'listName',
          type: 'text',
          id: 'txtListName',
          placeholder: 'Write the list name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Acept',
          cssClass: 'primary',
          handler: (data) => {

            if (data.listName.length == 0)
              return;

            const listId = this.wishesService.addList(data.listName);
            this.router.navigateByUrl(`/tabs/tab1/add/${listId}`);
            // this.itemList.closeSlidingItems();  


          }
        }
      ]
    });

    alert.present();
  }//fin editList


}
