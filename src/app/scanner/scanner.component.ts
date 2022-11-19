import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  barcode: string='';
  values: string[] =[];
  constructor() { }

  ngOnInit(): void {
  }
  onKey(event: any) {
    this.barcode=event.target.value;
}

}
