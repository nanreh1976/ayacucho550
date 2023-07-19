import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-agregar',

  template: `
    <button
      class="btn btn-outline-success align-middle text-center"
      style="border-radius: 10%;  margin: 10px;"
      [disabled]="disabled"
    >
     <!--  <i
        *ngIf="name !== 'Vehiculo'"
        class="fa fa-plus"
        style=" vertical-align: middle;"
      ></i> -->
      <i
        *ngIf="name === 'Vehiculo'"
        class="fa fa-car"
        style=" vertical-align: middle;"
      ></i>

      {{ name || 'Agregar' }}
    </button>
  `,
  styles: [`
   button{
    width:50px;
    height:40px;
  }
  `],
})
export class BtnAgregarComponent implements OnInit {
  @Input() name?: string;
  @Input() disabled!: boolean;
  constructor() {}

  ngOnInit(): void {}
}
