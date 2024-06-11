import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard-appschons';
  
  produtos!: Observable<any[]>;

  constructor(private firestore: Firestore){
    const collectionProduto = collection(this.firestore, 'pedido_item');
    this.produtos = collectionData(collectionProduto, { idField: 'id' });
    
  }

}
