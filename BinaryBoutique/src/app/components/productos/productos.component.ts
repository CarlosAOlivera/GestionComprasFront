import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../data/product.model';
import { SearchService } from '../../data/search.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';



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

  constructor(
    private searchService: SearchService,
    public dialog: MatDialog
  ) {}

  openDialog(product: Product): void {
    this.dialog.open(ProductDetailDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { product: product }
    });
  }

  ngOnInit(): void {
    this.loadMostSearchedProducts()
  }

  /*loadProducts(): void {
    if (this.paraSexo) {
    this.searchService.getProducts(this.paraSexo)
      .subscribe(
        (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error al cargar los productos:',error)
      }
      );
    }  
  }*/

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