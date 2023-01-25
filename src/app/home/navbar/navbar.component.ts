import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$!:any;

  constructor(private storageService: StorageService,) { }

  ngOnInit(): void {
    this.user$ = this.storageService.usuario$
  }

}
