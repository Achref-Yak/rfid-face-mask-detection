import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizeUserComponent } from './components/authorize-user/authorize-user.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/Dashboard/Dashboard.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
const routes: Routes = [
  { path: 'authorization', component: AuthorizeUserComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthorizeUserComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
