//importar modulos
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//importar componentes
import{ LoginComponent } from './components/login/login.component';
import{ RegisterComponent } from './components/register/register.component';

//DEFINIR RUTAS
const appRoutes : Routes = [
    {path : '', component : LoginComponent},
    {path : 'inicio', component : LoginComponent},
    {path : 'login', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
];
//EXPORTAR CONFIG
export const AppRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);