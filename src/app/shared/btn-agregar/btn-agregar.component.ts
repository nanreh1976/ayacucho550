import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-agregar',

  template: `
<button class="btn btn-primary" style="border-radius: 10%;  margin: 10px;">
   <i class="fa fa-plus" style=" vertical-align: middle;"></i>
   {{name || "Agregar"}}
</button>
`,
styles: [
  `

  `
]
  


})
export class BtnAgregarComponent implements OnInit {

  @Input() name?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
