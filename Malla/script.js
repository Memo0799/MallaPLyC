document.addEventListener("DOMContentLoaded", function () {
  const prerrequisitos = {
    "ILLI090": ["ILLI070"],
    "PLAC114": ["PLAC095"],
    "ICED087": ["ICED071"],
    "PLAC121": ["PLAC083"],
    "ILLI130": ["ILLI090", "ICED096"],
    "PLAC125": ["PLAC095", "PLAC114", "PLAC093", "PLAC121", "PLAC083", "PLAC097"],
    "ILLI160": ["ILLI125"],
    "ILLI165": ["ILLI135"],
    "ILLI175": ["ILLI145"],
    "ILLI182": ["ILLI165"],
    "ICED192": ["ICED096"],
    "ILLI194": ["ILLI182"],
    "ILLI204": ["ICED192"],
    "ELECT112": ["ICED150", "ILLI165", "ILLI182", "ILLI194", "ICED156", "ILLI168", "ILLI185", "ILLI200", "ILLI173", "ILLI190", "ILLI188", "ICED139", "ILLI202", "ICED195", "ELECT100", "ELECT101", "ELECT111", "ELECT118", "ELECT129", "ELECT130", "ILLI141", "ILLI174", "ILLI160", "ICED192", "ILLI204", "ILLI145", "ILLI151", "ILLI197"],
    "ELECT116": ["ICED150", "ILLI165", "ILLI182", "ILLI194", "ICED156", "ILLI168", "ILLI185", "ILLI200", "ILLI173", "ILLI190", "ILLI188", "ICED139", "ILLI202", "ICED195", "ELECT100", "ELECT101", "ELECT111", "ELECT118", "ELECT129", "ELECT130", "ILLI141", "ILLI174", "ILLI160", "ICED192", "ILLI204", "ILLI145", "ILLI151", "ILLI197"],
    "ILLI206": ["ICED150", "ILLI165", "ILLI182", "ILLI194", "ICED156", "ILLI168", "ILLI185", "ILLI200", "ILLI173", "ILLI190", "ILLI188", "ICED139", "ILLI202", "ICED195", "ELECT100", "ELECT101", "ELECT111", "ELECT118", "ELECT129", "ELECT130", "ILLI141", "ILLI174", "ILLI160", "ICED192", "ILLI204", "ILLI145", "ILLI151", "ILLI197"],
    "ILLI210": ["ICED150", "ILLI165", "ILLI182", "ILLI194", "ICED156", "ILLI168", "ILLI185", "ILLI200", "ILLI173", "ILLI190", "ILLI188", "ICED139", "ILLI202", "ICED195", "ELECT100", "ELECT101", "ELECT111", "ELECT118", "ELECT129", "ELECT130", "ILLI141", "ILLI174", "ILLI160", "ICED192", "ILLI204", "ILLI145", "ILLI151", "ILLI197"],
    "ILLI295": ["ILLI208", "ILLI210"],
    "ILLI299": ["ILLI206"],
    // Puedes agregar más prerrequisitos aquí
  };

  const ramos = document.querySelectorAll(".ramo");

const contadorDiv = document.createElement("div");
  contadorDiv.id = "contador-aprobados";
  contadorDiv.style.padding = "10px";
  contadorDiv.style.textAlign = "center";
  contadorDiv.style.fontWeight = "bold";
  contadorDiv.innerHTML = 'Ramos aprobados: <span id="aprobados">0</span>';
  document.body.insertBefore(contadorDiv, document.body.firstChild);
    
const estadoGuardado = JSON.parse(localStorage.getItem("ramosCompletados")) || [];
  
  function actualizarContador() {
    const aprobados = document.querySelectorAll(".ramo.completado").length;
    document.getElementById("aprobados").textContent = aprobados;
  }

  function guardarEstado() {
    const completados = Array.from(ramos)
      .filter(r => r.classList.contains("completado"))
      .map(r => r.id);
    localStorage.setItem("ramosCompletados", JSON.stringify(completados));
  }

  // Función para verificar si se pueden habilitar ramos
  function actualizarHabilitados() {
    ramos.forEach(ramo => {
      const id = ramo.id;
      if (prerrequisitos[id]) {
        // Para habilitar, todos los prerrequisitos deben estar completados
        const todosCumplidos = prerrequisitos[id].every(prId => {
          const prereqRamo = document.getElementById(prId);
          return prereqRamo.classList.contains("completado");
        });

        if (todosCumplidos) {
          ramo.classList.add("habilitado");
        } else {
          ramo.classList.remove("habilitado");
          ramo.classList.remove("completado"); // opcional: desmarca si ya estaba completado
        }
      }
    });
  }

  estadoGuardado.forEach(id => {
    const ramo = document.getElementById(id);
    if (ramo) {
      ramo.classList.add("completado");
    }
  });

  ramos.forEach(ramo => {
    ramo.addEventListener("click", function () {
      if (!ramo.classList.contains("habilitado")) {
        alert("Este ramo no está habilitado aún.");
        return;
      }

      ramo.classList.toggle("completado");
      actualizarHabilitados();
      actualizarContador();
    });
  });

  // Inicializa los habilitados al cargar
  actualizarHabilitados();
  actualizarContador();
});
