//importar modulos
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//importar componentes
import{ LoginComponent } from './components/login/login.component';
import{ RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import{ UserEditComponent } from './components/user-edit/user-edit.component';

//DEFINIR RUTAS
const appRoutes : Routes = [
    {path : '', component : HomeComponent},
    {path : 'inicio', component : HomeComponent},
    {path : 'login', component : LoginComponent},
    {path : 'logout/:sure', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
    {path : 'ajustes', component : UserEditComponent},
    {path : '**', component : ErrorComponent}
];
//EXPORTAR CONFIG
export const AppRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);