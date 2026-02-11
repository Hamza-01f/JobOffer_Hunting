import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})

export class Search {

  @Output() search = new EventEmitter<{keyword: string , level: string}>();

  form!: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      keyword: ['',[]],
      level: ['',[]]
    });
  }

  submit(){
    this.search.emit(this.form.value)
  }

}
