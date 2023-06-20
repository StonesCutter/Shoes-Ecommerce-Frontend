import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() pageSelected = new EventEmitter<number>();
  @Output() pageSizeSelected = new EventEmitter<number>();
  @Output() paginationModified = new EventEmitter<{ pageSize: number, pageIndex: number }>(); // Update the event output

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event) => {
      const page = event.pageIndex + 1;
      this.pageSelected.emit(page);
    });
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSizeSelected.emit(pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log("page size: ", this.pageSize, " page index: ", this.pageIndex);
    this.paginationModified.emit({ pageSize: this.pageSize, pageIndex: this.pageIndex }); // Emit pageSize and pageIndex as an object
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-paginator',
//   templateUrl: './paginator.component.html',
//   styleUrls: ['./paginator.component.scss']
// })
// export class PaginatorComponent {

// }
