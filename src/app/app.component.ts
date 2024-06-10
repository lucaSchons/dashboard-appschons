import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard-appschons';
  produtos!: Observable<any>;

  constructor(private firestore: Firestore){
    const collectionProduto = collection(this.firestore, 'pedido_item');
    collectionData(collectionProduto, { idField: 'id' }).subscribe(res => {
      console.log(res);
    });
    // this.produtos = collectionData(collectionProduto, { idField: 'id' });
    
  }

}
