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

import { DataService } from './servicios/data.service';
import { HttpClientModule } from '@angular/common/http';

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
import { ConsultaFacturacionComponent } from './facturacion/consulta-facturacion/consulta-facturacion.component';
import { CustomAdapterService } from './servicios/Fechas/calendario/custom-adapter.service';
import { CustomDateParserFormatterService } from './servicios/Fechas/calendario/custom-date-parser-formatter.service';
import { NgbTimeStringAdapterService } from './servicios/Fechas/calendario/ngb-time-string-adapter.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AuthService } from './servicios/autentificacion/auth.service';




//se crea una const del tipo Routes para guardar todas las rutas
//esto importa la clase Routes 
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full', },
  {path: 'home', component: AppComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'inicio', component: InicioComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'playa', component: PlayaControlComponent, ...canActivate(redirectUnauthorizedToLogin)  },
  {path: 'facturacion', component:FacturacionControlComponent, ...canActivate(redirectUnauthorizedToLogin) },
//  {path: 'ticketE', component: TicketEntradaComponent },
  {path: 'tarifas', component: TarifasControlComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'clientes', component: ClientesControlComponent, ...canActivate(redirectUnauthorizedToLogin) },
  
  {path: 'dashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'ocupacion', component: OcupacionComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'login', component: LoginComponent,   }, // la ruta al login
 // {path: '', redirectTo: '/playa', pathMatch: 'full', canActivate: [AuthGuard]}, 

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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

  ],
  providers: [LoggedService, CustomAdapterService, CustomDateParserFormatterService, NgbTimeStringAdapterService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
