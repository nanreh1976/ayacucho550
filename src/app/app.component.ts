import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedService } from './logged.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proyecto-final-7380';
  $estado;
  

  constructor( private loggedService: LoggedService, private router: Router,){
    this.$estado = loggedService.logged$;
  }
  ngOnInit(): void {
    this.$estado.subscribe;
    
    this.comprobarEstado();    
  }

  comprobarEstado(): void {
  if(this.$estado.value){
      
      this.router.navigate(['playa'])  
      console.log("logueado");
      console.log(this.$estado);
      
      
    } else{      
      console.log("no logueado");
      
      this.router.navigate(['login']) 
    } 
  }
}
