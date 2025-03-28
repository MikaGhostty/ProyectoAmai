
Run
Copy code
document.addEventListener("DOMContentLoaded", function () {
    const mesasContainer = document.getElementById("mesas");
    const menuPopup = document.getElementById("menuPopup");
    const cartaPopup = document.getElementById("cartaPopup");
    const mesaNumero = document.getElementById("mesaNumero");
    const abrirMesaBtn = document.getElementById("abrirMesa");
    const menosPersonas = document.getElementById("menosPersonas");
    const masPersonas = document.getElementById("masPersonas");
    const contadorPersonas = document.getElementById("contadorPersonas");
    const toggleAreaBtn = document.getElementById("toggleArea");
    const areaTitle = document.getElementById("areaTitle");
    const overlay = document.getElementById("overlay");
    const verCartaBtn = document.getElementById("verCarta");
    const productosContainer = document.getElementById("productosContainer");
    const carritoList = document.getElementById("carritoList");
    const totalPrecio = document.getElementById("totalPrecio");
    const cerrarCartaBtn = document.getElementById("cerrarCarta");

    let currentMesa = null;
    let area = "salon";
    let carrito = [];

    // Ejemplo de productos (deberías reemplazar esto con los datos de tu PDF)
    const productos = [
        { nombre: "Cerveza", precio: 5, categoria: "Bebidas" },
        { nombre: "Café", precio: 3, categoria: "Cafeteria" },
        { nombre: "Jugo de Naranja", precio: 4, categoria: "Jugos" },
        { nombre: "Té Verde", precio: 2, categoria: "Te" },
        { nombre: "Infusión de Manzanilla", precio: 2.5, categoria: "Infusiones" },
        // Agrega más productos según sea necesario
    ];

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
            if (currentMesa.classList.contains("abierta")) {
                // Cerrar la mesa
                currentMesa.classList.remove("abierta");
                currentMesa.style.backgroundColor = "red"; // Cambiar a color rojo
                abrirMesaBtn.textContent = "Abrir Mesa"; // Cambiar texto a "Abrir Mesa"
            } else {
                // Abrir la mesa
                currentMesa.classList.add("abierta");
                currentMesa.style.backgroundColor = "green"; // Cambiar a color verde
                abrirMesaBtn.textContent = "Cerrar Mesa"; // Cambiar texto a "Cerrar Mesa"
            }
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

    // Mostrar la carta de productos
    verCartaBtn.addEventListener("click", function () {
        mostrarCarta();
        menuPopup.style.display = "none";
        overlay.style.display = "block";
        cartaPopup.style.display = "block";
    });

    // Mostrar productos en la carta
    function mostrarCarta() {
        productosContainer.innerHTML = ""; // Limpiar el contenedor de productos
        const categorias = [...new Set(productos.map(p => p.categoria))]; // Obtener categorías únicas

        categorias.forEach(categoria => {
            const categoriaDiv = document.createElement("div");
            categoriaDiv.innerHTML = `<h3>${categoria}</h3>`;
            productos.filter(p => p.categoria === categoria).forEach(producto => {
                const productoDiv = document.createElement("div");
                productoDiv.classList.add("producto");
                productoDiv.innerHTML = `
                    ${producto.nombre} - $${producto.precio}
                    <button class="menos" data-nombre="${producto.nombre}">-</button>
                    <span class="cantidad" data-nombre="${producto.nombre}">0</span>
                    <button class="mas" data-nombre="${producto.nombre}">+</button>
                `;
                categoriaDiv.appendChild(productoDiv);
            });
            productosContainer.appendChild(categoriaDiv);
        });

        // Agregar eventos a los botones de cantidad
        document.querySelectorAll('.mas').forEach(btn => {
            btn.addEventListener('click', function () {
                const nombreProducto = btn.dataset.nombre;
                const cantidadSpan = document.querySelector(`.cantidad[data-nombre="${nombreProducto}"]`);
                let cantidad = parseInt(cantidadSpan.textContent);
                cantidadSpan.textContent = cantidad + 1;

                // Agregar al carrito
                agregarAlCarrito(nombreProducto);
            });
        });

        document.querySelectorAll('.menos').forEach(btn => {
            btn.addEventListener('click', function () {
                const nombreProducto = btn.dataset.nombre;
                const cantidadSpan = document.querySelector(`.cantidad[data-nombre="${nombreProducto}"]`);
                let cantidad = parseInt(cantidadSpan.textContent);
                if (cantidad > 0) {
                    cantidadSpan.textContent = cantidad - 1;

                    // Quitar del carrito
                    quitarDelCarrito(nombreProducto);
                }
            });
        });
    }

    // Agregar producto al carrito
    function agregarAlCarrito(nombreProducto) {
        const productoEnCarrito = carrito.find(item => item.nombre === nombreProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ nombre: nombreProducto, cantidad: 1 });
        }
        actualizarCarrito();
    }

    // Quitar producto del carrito
    function quitarDelCarrito(nombreProducto) {
        const productoEnCarrito = carrito.find(item => item.nombre === nombreProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad -= 1;
            if (productoEnCarrito.cantidad === 0) {
                carrito = carrito.filter(item => item.nombre !== nombreProducto);
            }
        }
        actualizarCarrito();
    }

    // Actualizar el carrito
    function actualizarCarrito() {
        carritoList.innerHTML = ""; // Limpiar la lista del carrito
        let total = 0;

        carrito.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.nombre} - Cantidad: ${item.cantidad}`;
            carritoList.appendChild(li);
            const producto = productos.find(p => p.nombre === item.nombre);
            total += producto.precio * item.cantidad;
        });

        totalPrecio.textContent = total.toFixed(2); // Mostrar el total
    }

    // Cerrar el menú de la carta
    cerrarCartaBtn.addEventListener("click", function () {
        cartaPopup.style.display = "none";
        overlay.style.display = "none";
    });

    // Cerrar el menú emergente al hacer clic fuera
    overlay.addEventListener("click", function () {
        menuPopup.style.display = "none";
        cartaPopup.style.display = "none";
        overlay.style.display = "none";
    });
});