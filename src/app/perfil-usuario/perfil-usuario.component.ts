import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/autentificacion/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(
    public authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.getuser();
  }


  
getuser(){
  console.log(JSON.parse(localStorage.getItem('user')||`{}`))
 
 }
}
