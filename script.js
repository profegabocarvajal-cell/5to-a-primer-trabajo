document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENÚ MÓVIL DESPLEGABLE ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar el menú móvil automáticamente al hacer clic en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });


    // --- 2. CUENTA REGRESIVA DINÁMICA ---
    // Define la fecha de graduación o evento (puedes cambiarla al día exacto)
    const graduationDate = new Date('July 15, 2027 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = graduationDate - now;

        if (distance < 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();


    // --- 3. MURO DE MENSAJES INTERACTIVO ---
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages-container');

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const author = document.getElementById('author-name').value.trim();
        const recipient = document.getElementById('recipient-name').value.trim();
        const text = document.getElementById('message-text').value.trim();

        if (!author || !text) return;

        // Crear la tarjeta del nuevo mensaje
        const messageCard = document.createElement('div');
        messageCard.className = 'bg-slate-900 border border-slate-800 p-6 rounded-2xl relative shadow-md animate-fade-in';
        
        messageCard.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="font-bold text-amber-400">${escapeHTML(author)}</span>
                <span class="text-xs text-slate-500">Justo ahora</span>
            </div>
            <p class="text-slate-300 text-sm leading-relaxed mb-4">"${escapeHTML(text)}"</p>
            ${recipient ? `<span class="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full inline-block">Para: ${escapeHTML(recipient)}</span>` : ''}
        `;

        // Insertar al principio del contenedor
        messagesContainer.prepend(messageCard);

        // Limpiar formulario
        messageForm.reset();
    });

    // Función auxiliar de seguridad para evitar inyecciones HTML en los inputs
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

});