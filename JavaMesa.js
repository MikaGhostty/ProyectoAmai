document.addEventListener("DOMContentLoaded", function () {
    const mesasContainer = document.getElementById("mesas");
    const menuPopup = document.getElementById("menuPopup");
    const mesaNumero = document.getElementById("mesaNumero");
    const abrirMesaBtn = document.getElementById("abrirMesa");
    const menosPersonas = document.getElementById("menosPersonas");
    const masPersonas = document.getElementById("masPersonas");
    const contadorPersonas = document.getElementById("contadorPersonas");
    const toggleAreaBtn = document.getElementById("toggleArea");
    const areaTitle = document.getElementById("areaTitle");
    const overlay = document.getElementById("overlay");
    let currentMesa = null;
    let area = "salon";

    // Generar 15 mesas dinámicamente
    function renderMesas() {
        mesasContainer.innerHTML = ""; // Limpia el contenedor antes de volver a renderizar
        for (let i = 1; i <= 15; i++) {
            let mesa = document.createElement("div");
            mesa.classList.add("mesa");
            mesa.textContent = i;
            mesa.dataset.numero = i;

            // Evento para abrir el menú emergente
            mesa.addEventListener("click", function () {
                currentMesa = mesa;
                mesaNumero.textContent = mesa.dataset.numero;
                contadorPersonas.textContent = "0"; // Resetear contador de personas
                menuPopup.style.display = "block";
                overlay.style.display = "block";
            });

            mesasContainer.appendChild(mesa);
        }
    }

    // Renderiza las mesas por primera vez
    renderMesas();

    // Alternar entre "Salón" y "Terraza"
    toggleAreaBtn.addEventListener("click", function () {
        area = area === "salon" ? "terraza" : "salon";
        areaTitle.textContent = area === "salon" ? "Salón" : "Terraza";
        toggleAreaBtn.textContent = area === "salon" ? "Terraza" : "Salón";
        renderMesas();
    });

    // Cambiar el color de la mesa al abrirla
    abrirMesaBtn.addEventListener("click", function () {
        if (currentMesa) {
            currentMesa.classList.add("abierta");
            menuPopup.style.display = "none";
            overlay.style.display = "none";
        }
    });

    // Control de personas en la mesa
    menosPersonas.addEventListener("click", function () {
        let count = parseInt(contadorPersonas.textContent);
        if (count > 0) contadorPersonas.textContent = count - 1;
    });

    masPersonas.addEventListener("click", function () {
        let count = parseInt(contadorPersonas.textContent);
        contadorPersonas.textContent = count + 1;
    });

    // Cerrar el menú emergente al hacer clic fuera
    overlay.addEventListener("click", function () {
        menuPopup.style.display = "none";
        overlay.style.display = "none";
    });
});
