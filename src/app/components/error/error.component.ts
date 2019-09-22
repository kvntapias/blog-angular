import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public pagetitle : string;
  constructor() {    
    this.pagetitle = 'Error, pagina no encontrada.';
 }

  ngOnInit() {
  }

}
