import { Component, OnInit } from '@angular/core';
import { StorageService } from '../servicios/storage/storage.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  data$:any

  constructor(

    private storage:StorageService

  ) { }

  ngOnInit(): void {
    // this.data$ = this.storage.usuario$


    this.storage.usuario$
    .subscribe(data => this.data$ = data);
    console.log(this.data$)
  }



}
