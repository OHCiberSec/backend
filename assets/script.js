document.addEventListener('DOMContentLoaded', () => {
  const seleccionTema = document.getElementById('seleccion-tema');
  
  seleccionTema.addEventListener('change', fetchData);

  fetchData();

  async function fetchData() {
    const temaSeleccionado = seleccionTema.value;
    let url = `https://api.stackexchange.com/2.2/questions?order=desc&sort=votes&site=stackoverflow`;

    if (temaSeleccionado) {
      url += `&tagged=${temaSeleccionado}`;
    }

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      mostrarDatos(datos);
    } catch (error) {
      console.error('¡error al obtener las preguntas:', error);
    }
  }

  function mostrarDatos(datos) {
    const contenedor = document.getElementById('contenedor-datos');
    contenedor.innerHTML = ''; 

    datos.items.forEach(pregunta => {
      const div = document.createElement('div');
      div.classList.add('pregunta');
      div.innerHTML = `
        <h2>${pregunta.title}</h2>
        <p>Puntuación: ${pregunta.score}</p>
        <p>Etiquetas: ${pregunta.tags.join(', ')}</p>
        <p>Link: <a href="${pregunta.link}" target="_blank">Ver pregunta</a></p>
      `;
      contenedor.appendChild(div);
    });
  }
});
