import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Footer} from './footer/footer';
import {Navbar} from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
