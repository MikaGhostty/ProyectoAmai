document.addEventListener("DOMContentLoaded", function () {
    const mesasContainer = document.getElementById("mesas");
    const menuPopup = document.getElementById("menuPopup");
    const mesaNumero = document.getElementById("mesaNumero");
    const abrirMesaBtn = document.getElementById("abrirMesa");
    const menosPersonas = document.getElementById("menosPersonas");
    const masPersonas = document.getElementById("masPersonas");
    const contadorPersonas = document.getElementById("contadorPersonas");
    let currentMesa = null;

    // Crear mesas dinámicamente
    for (let i = 1; i <= 15; i++) {
        let mesa = document.createElement("div");
        mesa.classList.add("mesa");
        mesa.textContent = i;
        mesa.dataset.numero = i;
        mesa.addEventListener("click", function () {
            currentMesa = mesa;
            mesaNumero.textContent = mesa.dataset.numero;
            menuPopup.style.display = "block";
        });
        mesasContainer.appendChild(mesa);
    }

    // Botón para abrir mesa
    abrirMesaBtn.addEventListener("click", function () {
        if (currentMesa) {
            currentMesa.classList.add("abierta");
        }
    });

    // Control de personas
    menosPersonas.addEventListener("click", function () {
        let count = parseInt(contadorPersonas.textContent);
        if (count > 0) contadorPersonas.textContent = count - 1;
    });

    masPersonas.addEventListener("click", function () {
        let count = parseInt(contadorPersonas.textContent);
        contadorPersonas.textContent = count + 1;
    });
});
