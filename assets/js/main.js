// Espera a que la página esté cargada antes de ejecutar cualquier script
document.addEventListener('DOMContentLoaded', () => {

    fetch('components/header.html')
        .then(res => res.text())
        .then(data => {
            // El resto de la lógica para el header DEBE estar aquí dentro
            document.body.insertAdjacentHTML('afterbegin', data);
            
            const toggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('.nav-links');
            const header = document.querySelector('.header');

            const evaluarHeader = () => {
                if (!header) {
                    console.error("Error: Header element not found.");
                    return;
                }
                console.log("Scroll position:", window.scrollY);
                if (window.scrollY > 20) {
                    header.classList.add('scrolled');
                    header.classList.remove('transparent');
                } else {
                    header.classList.remove('scrolled');
                    header.classList.add('transparent');
                }
            };

            // Estas dos líneas son cruciales y deben estar dentro de este bloque
            evaluarHeader();
            window.addEventListener('scroll', evaluarHeader);

            // Lógica para el menú móvil (abrir/cerrar)
            if (toggle && nav) {
                toggle.addEventListener('click', () => {
                    toggle.classList.toggle('active');
                    nav.classList.toggle('open');
                });
                document.addEventListener('click', (e) => {
                    const clickDentroDelMenu = nav.contains(e.target) || toggle.contains(e.target);
                    if (!clickDentroDelMenu && nav.classList.contains('open')) {
                        nav.classList.remove('open');
                        toggle.classList.remove('active');
                    }
                });
            }

            // Scroll suave + cerrar menú móvil al hacer clic en un enlace
            document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
                link.addEventListener('click', function (e) {
                    const destino = document.querySelector(this.getAttribute('href'));
                    if (destino) {
                        e.preventDefault();
                        if (nav && toggle) {
                            nav.classList.remove('open');
                            toggle.classList.remove('active');
                        }
                        destino.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });

    // =======================================
    // Lógica del contador (separada de la lógica del header)
    // =======================================
    const iniciarContador = (fechaObjetivo) => {
        const mesesEl = document.getElementById('meses');
        const diasEl = document.getElementById('dias');
        const horasEl = document.getElementById('horas');

        const actualizarContador = () => {
            const ahora = new Date();
            const fechaBoda = new Date(fechaObjetivo);
            let diferenciaTotalSegundos = (fechaBoda - ahora) / 1000;

            if (diferenciaTotalSegundos < 0) {
                const cuentaAtrasEl = document.getElementById('cuenta-atras');
                if (cuentaAtrasEl) {
                    cuentaAtrasEl.innerHTML = "<div class='decorado' style='font-size: 1.5rem;'>¡Llegó el gran día!</div>";
                }
                return;
            }
            const horas = Math.floor(diferenciaTotalSegundos / 3600) % 24;
            let anios = fechaBoda.getFullYear() - ahora.getFullYear();
            let meses = fechaBoda.getMonth() - ahora.getMonth();
            let dias = fechaBoda.getDate() - ahora.getDate();
            if (dias < 0) {
                meses--;
                const ultimoDiaMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate();
                dias = ultimoDiaMesAnterior + dias;
            }
            if (meses < 0) {
                anios--;
                meses += 12;
            }
            if (mesesEl) { mesesEl.innerText = meses; }
            if (diasEl) { diasEl.innerText = dias; }
            if (horasEl) { horasEl.innerText = String(horas).padStart(1, '0'); }
        };

        actualizarContador();
        setInterval(actualizarContador, 1000);
    };

    const fechaDeLaBoda = "June 20, 2026 19:00:00";
    if (document.getElementById('meses')) {
        iniciarContador(fechaDeLaBoda);
    }

    // =======================================
    // Lógica de carga de Footer
    // =======================================
    fetch('components/footer.html')
        .then(res => res.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
});