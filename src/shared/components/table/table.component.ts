import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../pagination/pagination-model';
import { PaginationComponent } from "../pagination/pagination";

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'image' | 'number' | 'date' | 'boolean' | 'actions';
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableAction {
  label: string;
  icon?: string;
  color?: string;
  callback: (item: any) => void;
}

@Component({
  selector: 'app-table',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
 @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() title?: string;
  @Input() pageSize: number = 10;
  @Input() sortable: boolean = true;
  @Input() rowActions: TableAction[] = [];
  @Input() globalActions: TableAction[] = [];
  @Input() emptyMessage?: string;
  @Input() loading: boolean = false;
  @Input() pagination!: Pagination;

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();


  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();
  @Output() pageChange = new EventEmitter<number>();

  currentPage: number = 1;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedImage: string | null = null;

  // get paginatedData(): any[] {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   return this.data.slice(startIndex, startIndex + this.pageSize);
  // }

  // get totalPages(): number {
  //   return Math.ceil(this.data.length / this.pageSize);
  // }

  // get startIndex(): number {
  //   return (this.currentPage - 1) * this.pageSize;
  // }

  // get endIndex(): number {
  //   return Math.min(this.startIndex + this.pageSize, this.data.length);
  // }

  ngOnInit(): void {
    // Inicialización si es necesaria
    //console.log(this.pagination);
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.sortChange.emit({ column: this.sortColumn, direction: this.sortDirection });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'fas fa-sort';
    return this.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pagination.count) {
      console.log(`Navigating to page ${page}`);
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  // getVisiblePages(): number[] {
  //   const delta = 2;
  //   const range = [];
  //   const rangeWithDots = [];

  //   for (let i = Math.max(2, this.currentPage - delta);
  //        i <= Math.min(this.totalPages - 1, this.currentPage + delta);
  //        i++) {
  //     range.push(i);
  //   }

  //   if (this.currentPage - delta > 2) {
  //     rangeWithDots.push(1, -1);
  //   } else {
  //     rangeWithDots.push(1);
  //   }

  //   rangeWithDots.push(...range);

  //   if (this.currentPage + delta < this.totalPages - 1) {
  //     rangeWithDots.push(-1, this.totalPages);
  //   } else {
  //     rangeWithDots.push(this.totalPages);
  //   }

  //   return rangeWithDots.filter(page => page > 0);
  // }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getImageSrc(src: string | null | undefined): string {
    if (!src) return 'assets/images/no-image.png';
    return src;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/no-image.png';
  }

  onImageClick(src: string): void {
    if (src && src !== 'assets/images/no-image.png') {
      this.selectedImage = src;
    }
  }

  closeImageModal(): void {
    this.selectedImage = null;
  }

  formatNumber(value: any): string {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('es-CO').format(value);
  }

  formatDate(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('es-CO');
  }
}
