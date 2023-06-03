import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-ticket-header',
  templateUrl: './ticket-header.component.html',
  styleUrls: ['./ticket-header.component.scss']
})
export class TicketHeaderComponent implements OnInit {

data:any

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.storageService.empresa$.subscribe((data) => {


      this.data = data;
      // console.log(this.data);
    });

}

}