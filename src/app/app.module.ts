import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


import { OcupacionComponent } from './ocupacion/ocupacion.component';

import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggedService } from './servicios/logged.service';
import { BtnAgregarComponent } from './shared/btn-agregar/btn-agregar.component';
import { BtnEditarComponent } from './shared/btn-editar/btn-editar.component';
import { BtnEliminarComponent } from './shared/btn-eliminar/btn-eliminar.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './servicios/data.service';
import { HttpClientModule } from '@angular/common/http';
import { ServicioDatosService } from './servicios/servicio-datos.service';
import { PlayaFormComponent } from './playa/playa-form/playa-form.component';
import { FilterPipe } from './servicios/filter.pipe';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { PlayaViewComponent } from './playa/playa-view/playa-view.component';
import { PlayaControlComponent } from './playa/playa-control/playa-control.component';
import { ClientesViewComponent } from './clientes/clientes-view/clientes-view.component';
import { ClientesControlComponent } from './clientes/clientes-control/clientes-control.component';


import { TicketEntradaComponent } from './ticket-entrada/ticket-entrada.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { BtnReimpresionComponent } from './shared/btn-reimpresion/btn-reimpresion.component';
import { TarifasControlComponent } from './tarifas/tarifas-control/tarifas-control.component';
import { TarifasViewComponent } from './tarifas/tarifas-view/tarifas-view.component';
import { TarifasFormComponent } from './tarifas/tarifas-form/tarifas-form.component';

import { FacturacionControlComponent } from './facturacion/facturacion-control/facturacion-control.component';
import { FacturacionViewComponent } from './facturacion/facturacion-view/facturacion-view.component';
import { FacturacionFormComponent } from './facturacion/facturacion-form/facturacion-form.component';
import { InicioComponent } from './inicio/inicio.component';
import { VehiculosFormComponent } from './clientes/vehiculos-form/vehiculos-form.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { AuthService } from './servicios/autentificacion/auth.service';
import { AuthGuard } from './servicios/guard/auth.guard';
import { ConsultaFacturacionComponent } from './facturacion/consulta-facturacion/consulta-facturacion.component';
import { CustomAdapterService } from './servicios/Fechas/calendario/custom-adapter.service';
import { CustomDateParserFormatterService } from './servicios/Fechas/calendario/custom-date-parser-formatter.service';
import { NgbTimeStringAdapterService } from './servicios/Fechas/calendario/ngb-time-string-adapter.service';





//se crea una const del tipo Routes para guardar todas las rutas
//esto importa la clase Routes 
const appRoutes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {path: 'home', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
  {path: 'playa', component: PlayaControlComponent, canActivate: [AuthGuard]  },
  {path: 'facturacion', component:FacturacionControlComponent, canActivate: [AuthGuard] },
//  {path: 'ticketE', component: TicketEntradaComponent },
  {path: 'tarifas', component: TarifasControlComponent, canActivate: [AuthGuard]},
  {path: 'clientes', component: ClientesControlComponent, canActivate: [AuthGuard]},
  
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'ocupacion', component: OcupacionComponent, canActivate: [AuthGuard]},
  //{path: 'login', component: LoginComponent }, // la ruta al login
 // {path: '', redirectTo: '/playa', pathMatch: 'full', canActivate: [AuthGuard]}, 

  
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OcupacionComponent,
    LoginComponent,
    HomeComponent,
    BtnAgregarComponent,
    BtnEditarComponent,
    BtnEliminarComponent,
    PlayaFormComponent,
    FilterPipe,

      
    DashboardComponent,
    PagenotfoundComponent,
    ClientesFormComponent,
    PlayaViewComponent,
    PlayaControlComponent,
    ClientesViewComponent,
    ClientesControlComponent,
 
   
    TicketEntradaComponent,
    BtnReimpresionComponent,

    TarifasControlComponent,
    TarifasViewComponent,
    TarifasFormComponent,

    FacturacionControlComponent,
    FacturacionViewComponent,
    FacturacionFormComponent,
    InicioComponent,
    VehiculosFormComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ConsultaFacturacionComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPrintElementModule,
    NgxBarcode6Module,
    RouterModule.forRoot(appRoutes),
    NgbModule, //se importa la clase RouterModule y se le indica la const donde estan las rutas
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [LoggedService, ServicioDatosService, AuthService, CustomAdapterService, CustomDateParserFormatterService, NgbTimeStringAdapterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
