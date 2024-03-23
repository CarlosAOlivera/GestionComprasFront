import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../data/product.model';
import { SearchService } from '../../data/search.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  @Input() paraSexo: string = '';
  products: Product[] = [];
selectedProduct: any;
  modalService: any;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.paraSexo) {
    this.searchService.searchMostSearchedProducts(this.paraSexo)
      .subscribe(
        (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error al cargar los productos:',error)
      }
      );
    }  
  }

  loadMostSearchedProducts(): void {
    this.searchService.getMostSearchedProducts()
      .subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.error('Error al cargar los productos más buscados:', error);
        }
      );
  }

  openModal(product: Product, content: any): void {
    this.selectedProduct = product;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result: any) => {
      }, 
      (reason: any) => {
      }
    );
  }
  

openSidePanel() {
throw new Error('Method not implemented.');
}
isSidePanelVisible: any;

}