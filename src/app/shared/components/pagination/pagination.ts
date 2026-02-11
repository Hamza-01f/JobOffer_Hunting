import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {

  @Input() currentPage = 0;
  @Input() totalPages = 0;

  @Output() pageChange = new EventEmitter<number>();
  
  goPrev(){
    if(this.currentPage > 0){
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goNext(){
    if(this.currentPage < this.totalPages - 1){
      this.pageChange.emit(this.currentPage+1);
    }
  }


}
