import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../data/product.model';
import { SearchService } from '../../services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent implements OnInit {
  products: Product[] = [];
  

  constructor(
    private router: Router,
    private searchService: SearchService,
    private route: ActivatedRoute,
    public Dialog:MatDialog
  ) {}

  openDialog(product:Product): void {
    const dialogRef = this.Dialog.open(ProductDetailDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      const type = params['type'] || 'Name';
      if (query) {
        this.searchService.search(query).subscribe({
          next: (result) => {
            this.products = result;
          }, 
          error: (error) => {
            console.error('Error al buscar productos', error);
          }
        });
      }
    });

    const navigation = this.router.getCurrentNavigation();
    this.products = navigation?.extras.state?.['searchResults'] as Product[];
  }
}