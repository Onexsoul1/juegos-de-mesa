import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CategoriaComponent } from './pages/categoria/categoria';
import { LoginComponent } from './pages/login/login';
import { AdminComponent } from './pages/admin/admin';
import { PerfilComponent } from './pages/perfil/perfil';
import { RegistroComponent } from './pages/registro/registro';
import { EstrategiaComponent } from './pages/estrategia/estrategia';
import { CooperativosComponent } from './pages/cooperativos/cooperativos';
import { FamiliaresComponent } from './pages/familiares/familiares';
import { InfantilesComponent } from './pages/infantiles/infantiles';
import { ProfileComponent } from './pages/profile/profile';
import {RecuperarComponent} from './pages/recuperar/recuperar';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categoria/:tipo', component: CategoriaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'estrategia', component: EstrategiaComponent },
  { path: 'cooperativos', component: CooperativosComponent },
  { path: 'familiares', component: FamiliaresComponent },
  { path: 'infantiles', component: InfantilesComponent },
  { path: 'profile', component: ProfileComponent }, 
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'admin-productos', component: AdminProductosComponent }

];
