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
import { LoggedService } from './logged.service';
import { BtnAgregarComponent } from './shared/btn-agregar/btn-agregar.component';
import { BtnEditarComponent } from './shared/btn-editar/btn-editar.component';
import { BtnEliminarComponent } from './shared/btn-eliminar/btn-eliminar.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { ServicioDatosService } from './servicio-datos.service';
import { PlayaFormComponent } from './playa/playa-form/playa-form.component';
import { FilterPipe } from './filter.pipe';
import { TarifasComponent } from './tarifas/tarifas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { PlayaViewComponent } from './playa/playa-view/playa-view.component';
import { PlayaControlComponent } from './playa/playa-control/playa-control.component';





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
    ClientesComponent,
    DashboardComponent,
    PagenotfoundComponent,
    ClientesFormComponent,
    PlayaViewComponent,
    PlayaControlComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'home', component: AppComponent},
      {path: 'playa', component: PlayaControlComponent  },
      {path: 'tarifas', component: TarifasComponent},
      {path: 'clientes', component: ClientesComponent},
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
