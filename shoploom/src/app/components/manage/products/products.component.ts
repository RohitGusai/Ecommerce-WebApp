import { ProductService } from './../../../services/product.service';
import { Component, inject, OnInit, ViewChild  } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Product } from '../../../types/product';


@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink, MatSortModule, MatPaginatorModule,MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

    displayedColumns: string[] = ['id', 'name','shortDescription','Price','Discount', 'action'];
        dataSource: MatTableDataSource<Product>;

        @ViewChild(MatPaginator) paginator!: MatPaginator;
        @ViewChild(MatSort) sort!: MatSort;

        productservice = inject(ProductService);

        constructor() {

          this.dataSource = new MatTableDataSource([] as any);
        }
        ngOnInit(): void {
          this.refresh();
        }
        refresh()
          {
            this.productservice.getAllProducts().subscribe((res: any)=>
              {
                console.log(res)
                this.dataSource.data=res;
              })
          }
        deleteProducts(id:string)
        {
          this.productservice.deleteProducts(id).subscribe((res:any)=>
          {
            alert("Deleted Successfully");
            this.refresh();
          })
        }


        ngAfterViewInit() {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

        applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();

          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }
}
