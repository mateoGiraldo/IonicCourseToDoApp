import { ListItem } from './list-item.model';

export class List{

    id: number;
    title: string;
    createDate: Date;
    finishedDate: Date;
    finished: boolean;
    items: ListItem[];

    constructor( title: string){

        this.id = new Date().getTime();
        this.title = title;
        this.createDate = new Date;
        this.finished = false;
        this.items = [];
    }
}