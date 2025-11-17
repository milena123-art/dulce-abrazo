// --- 1. Variables Globales ---
let carrito = []; 
let totalPrecio = 0;

// Elementos del DOM del carrito
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceDisplay = document.getElementById('total-price');
const cartCountDisplay = document.getElementById('cart-count');
const botonesAgregar = document.querySelectorAll('.add-to-cart');

// --- NUEVAS VARIABLES PARA EL CHAT ---
const chatButton = document.querySelector('.chat-ficticio');
const chaWindow = document.getElementById('chatWindow');
const closeChatButton = document.getElementById('closeChat');


// --- 2. Funciones de Renderizado ---
function actualizarCarritoUI() {
    // A) Limpia el contenedor de items
    cartItemsContainer.innerHTML = ''; 
    totalPrecio = 0;

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalPriceDisplay.textContent = `$0 ARS`;
        cartCountDisplay.textContent = 0;
        return;
    }

    // B) Recorre el array del carrito y renderiza los items
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalPrecio += subtotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item-detail');
        itemElement.innerHTML = `
            <p>${item.nombre} x ${item.cantidad}</p>
            <p>$${subtotal.toLocaleString('es-AR')} ARS</p>
            <button class="remove-item" data-id="${item.id}">-</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // C) Actualiza el total y el contador
    totalPriceDisplay.textContent = `$${totalPrecio.toLocaleString('es-AR')} ARS`;
    cartCountDisplay.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    // D) Reasigna los listeners a los nuevos botones de eliminar
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', manejarEliminarProducto);
    });
}


// --- 3. Funciones de Manejo de Eventos (Carrito) ---
function manejarAgregarProducto(event) {
    const boton = event.target;
    const precio = parseInt(boton.getAttribute('data-precio'));
    const card = boton.closest('.producto-card');
    const nombre = card.querySelector('h4').textContent;
    const id = nombre.replace(/\s/g, ''); 

    const existeItem = carrito.find(item => item.id === id);

    if (existeItem) {
        existeItem.cantidad += 1;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    actualizarCarritoUI();

    // Feedback visual
    boton.style.backgroundColor = '#8A2BE2'; 
    setTimeout(() => {
        boton.style.backgroundColor = '#B0E0E6';
    }, 150);
}

function manejarEliminarProducto(event) {
    const id = event.target.getAttribute('data-id');
    const itemIndex = carrito.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        if (carrito[itemIndex].cantidad > 1) {
            carrito[itemIndex].cantidad -= 1;
        } else {
            carrito.splice(itemIndex, 1);
        }
        
        actualizarCarritoUI();
    }
}

// --- NUEVAS VARIABLES PARA EL CHAT ---
const chaButton = document.querySelector('.chat-ficticio');
const chatWindow = document.getElementById('chatWindow');
const closeChaButton = document.getElementById('closeChat');


// --- 4. Funciones de Chat ---

/**
 * Muestra u oculta la ventana de chat.
 */
function toggleChatWindow() {
    // Si está oculto (display: none), lo muestra (display: flex), y viceversa
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
    }
}

// ... (todo el resto del código JS permanece igual) ...

// --- 5. Inicialización (Asignación de Event Listeners) ---
function inicializarEventos() {
    // ... (Eventos del carrito) ...

    // Eventos del Chat (NUEVO)
    
    // *** NUEVA PRUEBA: Si el elemento existe, añade el listener. ***
    if (chatButton) {
        chatButton.addEventListener('click', toggleChatWindow);
        // Prueba de que el botón fue encontrado
        console.log('Botón de chat encontrado y listener añadido.');
    } else {
        console.error('ERROR: No se encontró el botón con la clase .chat-ficticio.');
    }
    
    if (closeChatButton) {
        closeChatButton.addEventListener('click', toggleChatWindow);
    }
}

// Ejecuta la inicialización cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarEventos);