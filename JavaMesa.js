document.addEventListener("DOMContentLoaded", function () {
    const elementos = {
        mesasContainer: document.getElementById("mesas"),
        cartaPopup: document.getElementById("cartaPopup"),
        overlay: document.getElementById("overlay"),
        verCartaBtn: document.getElementById("verCarta"),
        cerrarCartaBtn: document.getElementById("cerrarCarta"),
        productosContainer: document.getElementById("productosContainer"),
        carritoList: document.getElementById("carritoList"),
        totalPrecio: document.getElementById("totalPrecio"),
        seccionesContainer: document.getElementById("seccionesContainer"),
        menuPopup: document.getElementById("menuPopup"),
        mesaNumero: document.getElementById("mesaNumero"),
        abrirMesaBtn: document.getElementById("abrirMesa"),
        menosPersonas: document.getElementById("menosPersonas"),
        masPersonas: document.getElementById("masPersonas"),
        contadorPersonas: document.getElementById("contadorPersonas"),
        toggleAreaBtn: document.getElementById("toggleArea"),
        areaTitle: document.getElementById("areaTitle"),
    };

    let currentMesa = null;
    let area = "salon";
    let carrito = [];

    const productos = [
        { nombre: "Cerveza", precio: 5, categoria: "Bebidas" },
        { nombre: "Café", precio: 3, categoria: "Cafeteria" },
        { nombre: "Jugo de Naranja", precio: 4, categoria: "Jugos" },
        { nombre: "Té Verde", precio: 2, categoria: "Te" },
        { nombre: "Infusión de Manzanilla", precio: 2.5, categoria: "Infusiones" },
        { nombre: "Pizza", precio: 10, categoria: "Comida" },
        { nombre: "Hamburguesa", precio: 8, categoria: "Comida" },
        { nombre: "Ensalada", precio: 6, categoria: "Comida" },
    ];

    function renderSecciones() {
        elementos.seccionesContainer.innerHTML = "";
        const categorias = [...new Set(productos.map(p => p.categoria))];
        categorias.forEach(categoria => {
            const seccion = document.createElement("div");
            seccion.classList.add("seccion");
            seccion.textContent = categoria;
            seccion.addEventListener("click", () => mostrarProductosPorCategoria(categoria));
            elementos.seccionesContainer.appendChild(seccion);
        });
    }

    function mostrarProductosPorCategoria(categoria) {
        elementos.productosContainer.innerHTML = "";
        productos.filter(p => p.categoria === categoria).forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <span>${producto.nombre} - $${producto.precio}</span>
                <button class="menos" data-nombre="${producto.nombre}">-</button>
                <span class="cantidad" data-nombre="${producto.nombre}">0</span>
                <button class="mas" data-nombre="${producto.nombre}">+</button>
            `;
            elementos.productosContainer.appendChild(div);
        });
        agregarEventosCantidad();
    }

    function agregarEventosCantidad() {
        document.querySelectorAll('.mas').forEach(btn => btn.addEventListener('click', () => modificarCantidad(btn, 1)));
        document.querySelectorAll('.menos').forEach(btn => btn.addEventListener('click', () => modificarCantidad(btn, -1)));
    }

    function modificarCantidad(btn, cambio) {
        const nombre = btn.dataset.nombre;
        const cantidadSpan = document.querySelector(`.cantidad[data-nombre="${nombre}"]`);
        let cantidad = parseInt(cantidadSpan.textContent) + cambio;
        if (cantidad >= 0) {
            cantidadSpan.textContent = cantidad;
            cambio > 0 ? agregarAlCarrito(nombre) : quitarDelCarrito(nombre);
        }
    }

    function renderMesas() {
        elementos.mesasContainer.innerHTML = "";
        for (let i = 1; i <= 15; i++) {
            let mesa = document.createElement("div");
            mesa.classList.add("mesa");
            mesa.innerHTML = `<span>${i}</span>`;
            mesa.dataset.numero = i;
            mesa.addEventListener("click", () => abrirMesa(mesa));
            elementos.mesasContainer.appendChild(mesa);
        }
    }

    function abrirMesa(mesa) {
        currentMesa = mesa;
        elementos.mesaNumero.textContent = mesa.dataset.numero;
        elementos.menuPopup.style.display = "block";
        elementos.overlay.style.display = "block";
    }

    function agregarAlCarrito(nombre) {
        let item = carrito.find(i => i.nombre === nombre);
        item ? item.cantidad++ : carrito.push({ nombre, cantidad: 1 });
        actualizarCarrito();
    }

    function quitarDelCarrito(nombre) {
        let item = carrito.find(i => i.nombre === nombre);
        if (item) {
            item.cantidad--;
            if (item.cantidad === 0) carrito = carrito.filter(i => i.nombre !== nombre);
        }
        actualizarCarrito();
    }

    function actualizarCarrito() {
        elementos.carritoList.innerHTML = "";
        let total = 0;
        carrito.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.nombre} - Cantidad: ${item.cantidad}`;
            elementos.carritoList.appendChild(li);
            total += productos.find(p => p.nombre === item.nombre).precio * item.cantidad;
        });
        elementos.totalPrecio.textContent = `$${total.toFixed(2)}`;
    }

    elementos.verCartaBtn.addEventListener("click", () => {
        mostrarProductosPorCategoria(productos[0].categoria);
        elementos.overlay.style.display = "block";
        elementos.cartaPopup.style.display = "block";
    });

    elementos.cerrarCartaBtn.addEventListener("click", () => {
        elementos.cartaPopup.style.display = "none";
        elementos.overlay.style.display = "none";
    });

    elementos.overlay.addEventListener("click", () => {
        elementos.cartaPopup.style.display = "none";
        elementos.overlay.style.display = "none";
    });

    renderMesas();
    renderSecciones();
});
