// Carga modular de componentes
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el header
    fetch('components/header.html')
        .then(res => res.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);

            const toggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('.nav-links');
            const header = document.querySelector('.header');

            // Abrir / cerrar menú
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                nav.classList.toggle('open');
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                const clickDentroDelMenu = nav.contains(e.target) || toggle.contains(e.target);
                if (!clickDentroDelMenu && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    toggle.classList.remove('active');
                }
            });

            // Evaluar posición inicial del header
            const evaluarHeader = () => {
                if (!header) return;
                if (window.scrollY > 20) {
                    header.classList.add('scrolled');
                    header.classList.remove('transparent');
                } else {
                    header.classList.remove('scrolled');
                    header.classList.add('transparent');
                }
            };

            // Ejecutar al cargar y al hacer scroll
            evaluarHeader();
            window.addEventListener('scroll', evaluarHeader);

            // Scroll suave + cerrar menú móvil al hacer clic en un enlace
            document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
                link.addEventListener('click', function (e) {
                    const destino = document.querySelector(this.getAttribute('href'));
                    if (destino) {
                        e.preventDefault();

                        // Cierra el menú (si estaba abierto)
                        const nav = document.querySelector('.nav-links');
                        const toggle = document.querySelector('.menu-toggle');
                        nav.classList.remove('open');
                        toggle.classList.remove('active');

                        // Inicia scroll suave
                        destino.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            
  
  
        });

    // Cargar el footer
    fetch('components/footer.html')
        .then(res => res.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
    
  
});
  
  