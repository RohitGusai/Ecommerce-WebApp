
import { Component, inject, OnInit, ViewChild  } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../types/brand';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brand',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink, MatSortModule, MatPaginatorModule,MatButtonModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
    dataSource: MatTableDataSource<Brand>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    brandservice = inject(BrandService)

    constructor() {

      this.dataSource = new MatTableDataSource([] as any);
    }
    ngOnInit(): void {
      this.refresh();
    }
    refresh()
      {
        this.brandservice.getBrands().subscribe((res: any)=>
          {
            console.log(res)
            this.dataSource.data=res;
          })
      }
    deleteBrands(id:string)
    {
      this.brandservice.deleteBrands(id).subscribe((res)=>
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
