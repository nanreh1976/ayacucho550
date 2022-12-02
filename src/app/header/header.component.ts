import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { BehaviorSubject } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/autentificacion/auth.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  

  // propiedades NgbModal

  closeResult: string = ''

  // open(content: any) {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }


  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }


  constructor( //private modalService: NgbModal,
     private router: Router, 
     private authService: AuthService ) {

   
  }



  ngOnInit(): void {
   
  }


  // save() { this.modalService.dismissAll(); }



  // openLoginForm() {
  //   {
  //     const modalRef = this.modalService.open(LoginComponent,
  //       {
  //         // scrollable: false,
  //         windowClass: 'myCustomModalClass',
  //         // keyboard: false,
  //         // backdrop: 'static'
  //       })

  //     modalRef.result.then((result) => {
  //       console.log(result);
       
  //     }, (reason) => { });
  //   }
  // }

  logout() {
    this.authService
      .logout()      
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

}
