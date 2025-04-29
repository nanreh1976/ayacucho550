import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'ParkUP';

  clientes!: any;
  vehiculos!: any;
  tarifas!: any;
  collapsed = true;

  constructor() {}

  ngOnInit(): void {}
}
