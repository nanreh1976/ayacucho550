import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../servicios/storage/storage.service';

@Component({
  selector: 'app-limbo',
  templateUrl: './limbo.component.html',
  styleUrls: ['./limbo.component.scss']
})
export class LimboComponent implements OnInit {

  constructor( private storageService: StorageService, public router: Router) { }

  ngOnInit(): void {
  }

  salirLimbo(){
    this.storageService.clearAllLocalStorage();
    this.router.navigate(['']);
  }

}
