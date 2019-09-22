import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public pagetitle : string;
  constructor() {
    this.pagetitle = "Registro de usuario";
  }

  ngOnInit() {
    console.log("componenten  de registro");
  }
}
