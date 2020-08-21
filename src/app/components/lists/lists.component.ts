import { Component, Input, ViewChild } from '@angular/core';
import { WishesService } from 'src/app/services/wishes.service';
import { AlertController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {

  @ViewChild( 'taskLists' ) taskLists: IonList;
  @Input() toDo = true;

  constructor(public wishesService: WishesService,
    private alertController: AlertController,
    private router: Router) { }


  goToList(list: List) {

    if (this.toDo)
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    else
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);

  }

  removeList( id: number ){
    this.wishesService.removeList(id);
  }

  async editList( list: List){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New list name',
      inputs: [
        {
          name: 'listName',
          type: 'text',
          id: 'txtListName',
          value: list.title,
          placeholder: 'Write the new list name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.taskLists.closeSlidingItems();
          }
        },
        {
          text: 'Acept',
          cssClass: 'primary',
          handler: (data) => {

            if (data.listName.length == 0)
              return;

            list.title = data.listName;  
            this.taskLists.closeSlidingItems();

          }
        }
      ]
    });
    
    alert.present();

    this.wishesService.saveListsLocalStorage();
  }

}
