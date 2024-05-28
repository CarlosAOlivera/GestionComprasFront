import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../data/product.model';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';
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
  selectedProduct: Product | undefined;

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    if (this.paraSexo) {
      this.searchService.getProducts(this.paraSexo)
        .subscribe(
          (products) => {
            this.products = products;
          },
          (error) => {
            console.error('Error al cargar los productos:', error);
          }
        );
    } else {
      this.productService.getAllProductos()
        .subscribe(
          (productos) => {
            this.products = productos;
          },
          (error) => {
            console.error('Error al cargar los productos:', error);
          }
        );
    }
  }

  openDialog(product: Product): void {
    this.dialog.open(ProductDetailDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { producto: product }
    });
  }

  editarProducto(producto: Product): void {
    // Implementar lógica para editar el producto
  }

  eliminarProducto(id: number): void {
    // Implementar lógica para eliminar el producto
  }
}
