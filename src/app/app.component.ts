import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, collection, collectionData, updateDoc } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { doc } from 'firebase/firestore';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard-appschons';
  
  variavel_pedidos!: Observable<any[]>;
  pedidosFiltrados!: Observable<any[]>;

  pedidoEmAberto: boolean = true;
  pedidoFinalizado: boolean = false;

  constructor(private firestore: Firestore) {
    const collectionProduto = collection(this.firestore, 'pedido_item');
    this.variavel_pedidos = collectionData(collectionProduto, { idField: 'id' });
    this.pedidosFiltrados = this.variavel_pedidos.pipe(
      map((pedidos: any[]) => pedidos.filter(pedido => pedido.status === 'aberto'))
    );
  }

  obterPedidosEmAberto() {
    this.pedidoEmAberto = true;
    this.pedidoFinalizado = false;
    this.pedidosFiltrados = this.variavel_pedidos.pipe(
      map(pedidos => pedidos.filter(pedido => pedido.status === 'aberto'))
    );
  }

  obterPedidosFinalizados() {
    this.pedidoEmAberto = false;
    this.pedidoFinalizado = true;
    this.pedidosFiltrados = this.variavel_pedidos.pipe(
      map(pedidos => pedidos.filter(pedido => pedido.status === 'finalizado'))
    );
  }

  updateData(id: string, pedido: any){
    const docInstance = doc(this.firestore, 'pedido_item', id);
    const updateData = {
      items: pedido.items,
      valor_total: pedido.valor_total,
      user: pedido.user,
      phone: pedido.phone,
      status: "finalizado"
    }

    updateDoc(docInstance, updateData)
    .then(() => {
      console.log('atualizado porra!!!');
    })
    .catch((err) => {
      console.log(err);
    })
  } 
  
}
