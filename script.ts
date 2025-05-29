declare const bootstrap: any;

interface Persona {
  nombre: string;
  edad: string;
  sexo: string;
  ocupacion: string;
  nivel: string;
}

let personas: Persona[] = [];

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("./data/data.csv");
  const text = await response.text();
  parseCSV(text);
  renderList(personas);
  setupSearch();
});

function parseCSV(data: string) {
  const lines = data.trim().split("\n").slice(1); // omitir encabezado
  personas = lines.map(line => {
    const [nombre, edad, sexo, ocupacion, nivel] = line.split(",");
return {
  nombre: nombre.replace(/"/g, ''),
  edad: edad.replace(/"/g, ''),
  sexo: sexo.replace(/"/g, ''),
  ocupacion: ocupacion.replace(/"/g, ''),
  nivel: nivel.replace(/"/g, '')
};
  });
}

function renderList(data: Persona[]) {
  const container = document.getElementById("data-container");
  if (!container) return;

  container.innerHTML = "";

  data.slice(0, 50).forEach((person, i) => {
    const col = document.createElement("div");
    col.className = "col";

    const button = document.createElement("button");
    button.className = "btn btn-outline-primary w-100 text-start py-3 btn-persona";
    button.innerText = `${i + 1}. ${person.nombre}`;

    button.addEventListener("click", () => showModal(person));

    col.appendChild(button);
    container.appendChild(col);
  });
}

function createItem(persona: Persona): HTMLElement {
  const div = document.createElement("div");
  div.className = "person-item";
  div.textContent = persona.nombre;
  div.addEventListener("click", () => showModal(persona));
  return div;
}

function showModal(persona: Persona) {
  const modalBody = document.getElementById("modal-content")!;
  modalBody.innerHTML = `
    <p><strong>Nombre:</strong> ${persona.nombre}</p>
    <p><strong>Edad:</strong> ${persona.edad}</p>
    <p><strong>Sexo:</strong> ${persona.sexo}</p>
    <p><strong>Ocupación:</strong> ${persona.ocupacion}</p>
    <p><strong>Nivel de estudios:</strong> ${persona.nivel}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById("infoModal")!);
 modal.show();
setTimeout(() => {
  document.getElementById("infoModal")?.focus();
}, 300);
}

function setupSearch() {
  const searchInput = document.getElementById("search") as HTMLInputElement;
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = personas.filter(p =>
      p.nombre.toLowerCase().includes(term)
    );
    renderList(filtered);
  });
}
