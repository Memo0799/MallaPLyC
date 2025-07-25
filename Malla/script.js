document.addEventListener("DOMContentLoaded", function () {
  const prerrequisitos = {
    "ILLI090": ["ILLI070"],
    "PLAC114": ["PLAC095"],
    "ICED087": ["ICED071"],
    "PLAC121": ["PLAC083"],
    "ILLI130": ["ILLI090", "ICED096"],
    "PLAC125": ["PLAC095", "PLAC114", "PLAC093", "PLAC121", "PLAC083", "PLAC097"],
    // Puedes agregar más prerrequisitos aquí
  };

  const ramos = document.querySelectorAll(".ramo");

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

  ramos.forEach(ramo => {
    ramo.addEventListener("click", function () {
      if (!ramo.classList.contains("habilitado")) {
        alert("Este ramo no está habilitado aún.");
        return;
      }

      ramo.classList.toggle("completado");
      actualizarHabilitados();
    });
  });

  // Inicializa los habilitados al cargar
  actualizarHabilitados();
});
