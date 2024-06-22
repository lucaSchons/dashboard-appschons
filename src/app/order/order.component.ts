import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, collection, collectionData, updateDoc } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { doc } from 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  variavel_pedidos!: Observable<any[]>;
  pedidosFiltrados!: Observable<any[]>;
  teste!: Observable<any[]>;
  pedidosOrdenados: any[] = [];

  pedidoEmAberto: boolean = true;
  pedidoFinalizado: boolean = false;

  constructor(private firestore: Firestore, private authService: AuthService) {
    const collectionProduto = collection(this.firestore, 'pedido_item');
    this.variavel_pedidos = collectionData(collectionProduto, { idField: 'id' });
    this.teste = this.variavel_pedidos.pipe(
      map((pedidos: any[]) => pedidos.filter(pedido => pedido.status === 'aberto'))
    );
    this.pedidosFiltrados = this.ordenarListaPorTimestamp(this.teste);

  }

  onLogout() {
    this.authService.logout();
  }

  ordenarListaPorTimestamp(lista: Observable<any[]>) {
     return lista.pipe( map (pedido => {
      return pedido.sort((a, b) => {
        const dateA = a.orderDate.toDate();
        const dateB = b.orderDate.toDate();
        return dateA.getTime() - dateB.getTime();
      });
    }))
  }

  obterPedidosEmAberto() {
    this.pedidoEmAberto = true;
    this.pedidoFinalizado = false;
    this.teste = this.variavel_pedidos.pipe(
      map(pedidos => pedidos.filter(pedido => pedido.status === 'aberto'))
    );
    this.pedidosFiltrados = this.ordenarListaPorTimestamp(this.teste);
  }

  obterPedidosFinalizados() {
    this.pedidoEmAberto = false;
    this.pedidoFinalizado = true;
    this.teste = this.variavel_pedidos.pipe(
      map(pedidos => pedidos.filter(pedido => pedido.status === 'finalizado'))
    );
    this.pedidosFiltrados = this.ordenarListaPorTimestamp(this.teste);

  }

  updateData(id: string, pedido: any) {
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
        console.log('update doc');
      })
      .catch((err) => {
        console.log(err);
      })
  }

}
