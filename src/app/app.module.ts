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
import { TarifasComponent } from './tarifas/tarifas.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { PlayaViewComponent } from './playa/playa-view/playa-view.component';
import { PlayaControlComponent } from './playa/playa-control/playa-control.component';
import { ClientesViewComponent } from './clientes/clientes-view/clientes-view.component';
import { ClientesControlComponent } from './clientes/clientes-control/clientes-control.component';

import { VehiculosControlComponent } from './vehiculos/vehiculos-control/vehiculos-control.component';
import { VehiculosFormComponent } from './vehiculos/vehiculos-form/vehiculos-form.component';
import { VehiculosViewComponent } from './vehiculos/vehiculos-view/vehiculos-view.component';


import { TicketEntradaComponent } from './ticket-entrada/ticket-entrada.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { BtnReimpresionComponent } from './shared/btn-reimpresion/btn-reimpresion.component';
import { FacturacionControlComponent } from './facturacion/facturacion-control/facturacion-control.component';
import { FacturacionViewComponent } from './facturacion/facturacion-view/facturacion-view.component';
import { FacturacionFormComponent } from './facturacion/facturacion-form/facturacion-form.component';





//se crea una const del tipo Routes para guardar todas las rutas
//esto importa la clase Routes 
const appRoutes: Routes = [
  { path: '', component: HomeComponent }, //las '' es la ruta al home
  { path: 'login', component: LoginComponent } // la ruta al login
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
    TarifasComponent,
      
    DashboardComponent,
    PagenotfoundComponent,
    ClientesFormComponent,
    PlayaViewComponent,
    PlayaControlComponent,
    ClientesViewComponent,
    ClientesControlComponent,
 
    VehiculosControlComponent,
    VehiculosFormComponent,
    VehiculosViewComponent,


    TicketEntradaComponent,
    BtnReimpresionComponent,
    FacturacionControlComponent,
    FacturacionViewComponent,
    FacturacionFormComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPrintElementModule,
    NgxBarcode6Module,
    RouterModule.forRoot([
      {path: 'home', component: AppComponent},
      {path: 'playa', component: PlayaControlComponent  },

      {path: 'facturacion', component:FacturacionControlComponent },
    //  {path: 'ticketE', component: TicketEntradaComponent },
      {path: 'tarifas', component: TarifasComponent},
      {path: 'clientes', component: ClientesControlComponent},
      {path: 'vehiculos', component: VehiculosControlComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'ocupacion', component: OcupacionComponent},
      {path: 'login', component: LoginComponent }, // la ruta al login
      {path: '', redirectTo: '/playa', pathMatch: 'full'},
      {path: '**', component: PagenotfoundComponent}
    ]),
    NgbModule, //se importa la clase RouterModule y se le indica la const donde estan las rutas
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),



  ],
  providers: [LoggedService, ServicioDatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
