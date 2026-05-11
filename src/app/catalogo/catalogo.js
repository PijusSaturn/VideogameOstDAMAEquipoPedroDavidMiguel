class CatalogoSoundtracks {
  constructor() {
    this.soundtracks = [];
    this.soundtracksFiltrados = [];
    this.init();
  }

  async init() {
    this.mostrarLoader(true);
    await this.cargarSoundtracks();
    this.mostrarLoader(false);
    this.renderizarSoundtracks();
    this.bindEvents();
  }

  async cargarSoundtracks() {
    try {
      const response = await fetch('../data/soundtracks.json');
      const data = await response.json();
      this.soundtracks = data.soundtracks;
      this.soundtracksFiltrados = [...this.soundtracks];
    } catch (error) {
      console.error('Error cargando soundtracks:', error);
      document.getElementById('mensajeVacio').textContent = 'Error al cargar el catálogo';
      document.getElementById('mensajeVacio').classList.remove('hidden');
    }
  }

  bindEvents() {
    // Buscador
    document.getElementById('buscador').addEventListener('input', (e) => {
      this.filtrar(e.target.value);
    });

    // Filtros
    document.getElementById('filtroPlataforma').addEventListener('change', () => {
      this.filtrar();
    });

    document.getElementById('filtroAno').addEventListener('change', () => {
      this.filtrar();
    });

    // Limpiar filtros
    document.getElementById('limpiarFiltros').addEventListener('click', () => {
      this.limpiarFiltros();
    });

    // Modal
    document.querySelector('.close').addEventListener('click', () => {
      this.cerrarModal();
    });

    window.addEventListener('click', (e) => {
      if (e.target.id === 'playerModal') {
        this.cerrarModal();
      }
    });
  }

  filtrar(textoBuscador = '') {
    const plataforma = document.getElementById('filtroPlataforma').value;
    const ano = document.getElementById('filtroAno').value;

    this.soundtracksFiltrados = this.soundtracks.filter(soundtrack => {
      const coincideTexto = !textoBuscador ||
        soundtrack.title.toLowerCase().includes(textoBuscador.toLowerCase()) ||
        soundtrack.game.toLowerCase().includes(textoBuscador.toLowerCase()) ||
        soundtrack.composer.toLowerCase().includes(textoBuscador.toLowerCase());

      const coincidePlataforma = !plataforma || soundtrack.platform === plataforma;
      const coincideAno = !ano || this.getDecada(soundtrack.year).includes(ano);

      return coincideTexto && coincidePlataforma && coincideAno;
    });

    this.renderizarSoundtracks();
  }

  getDecada(ano) {
    if (ano >= 1980 && ano < 1990) return '1980s';
    if (ano >= 1990 && ano < 2000) return '1990s';
    if (ano >= 2000 && ano < 2010) return '2000s';
    return 'otros';
  }

  limpiarFiltros() {
    document.getElementById('buscador').value = '';
    document.getElementById('filtroPlataforma').value = '';
    document.getElementById('filtroAno').value = '';
    this.soundtracksFiltrados = [...this.soundtracks];
    this.renderizarSoundtracks();
  }

  renderizarSoundtracks() {
    const grid = document.getElementById('gridSoundtracks');
    const mensajeVacio = document.getElementById('mensajeVacio');

    if (this.soundtracksFiltrados.length === 0) {
      grid.innerHTML = '';
      mensajeVacio.classList.remove('hidden');
      return;
    }

    mensajeVacio.classList.add('hidden');

    grid.innerHTML = this.soundtracksFiltrados.map(soundtrack => `
            <div class="soundtrack-card" data-id="${soundtrack.id}">
                <img src="${soundtrack.cover}" alt="${soundtrack.title}" class="soundtrack-cover"
                     onerror="this.src='https://via.placeholder.com/300x200/667eea/ffffff?text=No+Image'">
                <div class="soundtrack-info">
                    <div class="soundtrack-title">${soundtrack.title}</div>
                    <div class="soundtrack-game">${soundtrack.game}</div>
                    <div class="soundtrack-meta">
                        <span>${soundtrack.platform} • ${soundtrack.year}</span>
                        <span>${soundtrack.duration}</span>
                    </div>
                    <div class="tags">
                        ${soundtrack.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

    // Bind click events a las cards
    document.querySelectorAll('.soundtrack-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id);
        this.abrirModal(id);
      });
    });
  }

  abrirModal(id) {
    const soundtrack = this.soundtracks.find(s => s.id === id);
    if (!soundtrack) return;

    document.getElementById('modalTitle').textContent = soundtrack.title;
    document.getElementById('modalGame').textContent = soundtrack.game;
    document.getElementById('modalComposer').textContent = `Compositor: ${soundtrack.composer}`;
    document.getElementById('modalCover').src = soundtrack.cover;
    document.getElementById('modalDuration').textContent = soundtrack.duration;

    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = soundtrack.audio;
    audioPlayer.load();

    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = soundtrack.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    document.getElementById('playerModal').style.display = 'block';
    audioPlayer.play().catch(e => console.log('Autoplay bloqueado'));
  }

  cerrarModal() {
    document.getElementById('playerModal').style.display = 'none';
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  mostrarLoader(mostrar) {
    document.getElementById('loader').classList.toggle('hidden', !mostrar);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new CatalogoSoundtracks();
});
