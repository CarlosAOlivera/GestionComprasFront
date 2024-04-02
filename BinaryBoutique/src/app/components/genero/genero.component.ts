import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../data/product.model';
import { SearchService } from '../../data/search.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {
  @Input() paraSexo: string='';
  products: Product[] = [];
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
    this.loadProductsBySexo();
  }

  loadProductsBySexo(): void {
    this.searchService.getProductsByGender(this.paraSexo)
      .subscribe(
        (products) => {
        this.products = products;
      },
      (error) => {
        console.error(`Error al cargar productos para ${this.paraSexo}`, error)
      }
      );
    }
  
}


