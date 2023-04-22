import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-vehiculo',
  template: `
<div>
  <h2>{{ title }}</h2>
  <p>{{ message }}</p>
  <button (click)="close()">Close</button>
</div>
  `
})
export class AgregarVehiculoComponent implements OnInit {
  ngOnInit(): void {

  }
  @Input() title!: string;
  @Input() message!: string;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}




