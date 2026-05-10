import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { AboutUs } from './about-us/about-us';
import { Catalogo } from './catalogo/catalogo';
import { Contacto } from './contacto/contacto';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'about', component: AboutUs },
  { path: 'catalogo', component: Catalogo },
  { path: 'contacto', component: Contacto }
];
