//importar modulos
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//importar componentes
import{ LoginComponent } from './components/login/login.component';
import{ RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import{ UserEditComponent } from './components/user-edit/user-edit.component';
import{ CategoryNewComponent } from './components/category-new/category-new.component';

import { PostNewComponent } from "./components/post-new/post-new.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { PostEditComponent } from "./components/post-edit/post-edit.component";
import { CategoryDetailComponent } from "./components/category-detail/category-detail.component";
import { IndentityGuard } from './services/identity.guard';
import { ProfileComponent } from './components/profile/profile.component';


//DEFINIR RUTAS
const appRoutes : Routes = [
    {path : '', component : HomeComponent},
    {path : 'inicio', component : HomeComponent},
    {path : 'login', component : LoginComponent},
    {path : 'logout/:sure', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
    {path : 'ajustes', component : UserEditComponent, canActivate : [IndentityGuard]},
    {path : 'crear-categoria', component : CategoryNewComponent, canActivate : [IndentityGuard]},
    {path: 'crear-post', component : PostNewComponent , canActivate : [IndentityGuard]},
    {path: 'entrada/:id', component : PostDetailComponent },
    {path: 'editar-entrada/:id', component : PostEditComponent, canActivate : [IndentityGuard] },
    {path: 'categoria/:id', component : CategoryDetailComponent },
    {path: 'perfil/:id', component : ProfileComponent },

    {path : '**', component : ErrorComponent}
];
//EXPORTAR CONFIG
export const AppRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);