import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para @if y @for

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html', // Ruta corregida
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  soundtracks: any[] = [];
  filtrados: any[] = [];
  loading: boolean = true;

  async ngOnInit() {
    await this.cargarSoundtracks();
  }

  async cargarSoundtracks() {
    try {
      // Asegúrate de que soundtracks.json esté en la carpeta /assets
      const response = await fetch('assets/soundtracks.json');
      const data = await response.json();
      this.soundtracks = data.soundtracks;
      this.filtrados = this.soundtracks;
      this.loading = false;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  filtrar(event: any) {
    const texto = event.target.value.toLowerCase();
    this.filtrados = this.soundtracks.filter(s =>
      s.title.toLowerCase().includes(texto) ||
      s.game.toLowerCase().includes(texto)
    );
  }
  limpiarFiltros() {
    this.filtrados = [...this.soundtracks];

  }
}
