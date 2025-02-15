document.addEventListener("DOMContentLoaded", () => {
    // Elementos de la página
    const projectItems = document.querySelectorAll(".project-item");
    const expandedProject = document.getElementById("expanded-project-container");
    const projectTitle = document.getElementById("project-title");
    const projectContent = document.getElementById("project-content");
    const projectsSidebar = document.querySelector(".projects-sidebar");
    const projectsGrid = document.querySelector(".projects-grid");
    const navbarLinks = document.querySelectorAll("#navbar a");
    const welcomeText = document.getElementById("welcome-text");

    // Ocultar la barra lateral y el contenedor expandido al inicio
    projectsSidebar.style.display = "none";
    expandedProject.style.display = "none";

    // Smooth scrolling para navegación
    navbarLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Animación del texto de bienvenida
    const welcomeMessages = ["Bienvenido", "Welcome", "Willkommen", "Benvenuto", "欢迎", "ברוך הבא"];
    let index = 0;
    setInterval(() => {
        welcomeText.textContent = welcomeMessages[index];
        index = (index + 1) % welcomeMessages.length;
    }, 900);

    // Datos de los proyectos con imágenes y contenido estructurado
    const projectData = {
        "project-management": {
            title: "Project Management",
            content: `
                <div class="project-cards-container">
                    <div class="project-card">
                        <h3>Desarrollo de procesos</h3>
                        <img src="https://imgur.com/yOMPsBx.jpg" alt="Desarrollo de procesos">
                        <p>Certificaciones para áreas de cobranza</p>
                        <p>Implementación de procesos para certificaciones</p>
                    </div>
                    <div class="project-card">
                        <h3>Digitalización y automatización</h3>
                        <img src="https://imgur.com/GgaDYAr.jpg" alt="Digitalización y automatización">
                        <p>Middleware de Integración para Cobranza</p>
                    </div>
                    <div class="project-card">
                        <h3>Gestión de Equipos y Proyectos</h3>
                        <img src="https://imgur.com/5lKcJzj.jpg" alt="Gestión de Equipos y Proyectos">
                        <p>Coordinación de Equipos Multidisciplinarios</p>
                    </div>
                </div>
            `
        },
        "programming": {
            title: "Programming",
            content: "<p>Developed multiple projects including this portfolio.</p>"
        },
        "content-creation": {
            title: "Content Creation",
            content: "<p>Produced Shamoun Podcast and artistic reviews.</p>"
        },
        "design": {
            title: "Design",
            content: "<p>Designed this portfolio and visual assets.</p>"
        }
    };

    // Manejo de clic en los proyectos
    projectItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.stopPropagation();

            const projectId = this.id;
            console.log("Proyecto seleccionado:", projectId);

            if (projectData[projectId]) {
                console.log("Mostrando contenido...");
                expandedProject.style.display = "flex";
                expandedProject.classList.add("active");
                projectTitle.innerHTML = projectData[projectId].title;
                projectContent.innerHTML = projectData[projectId].content;

                // Ocultar la cuadrícula y mover los otros proyectos a la barra lateral
                projectsGrid.style.display = "none";
                projectsSidebar.innerHTML = "";
                projectsSidebar.style.display = "flex";

                projectItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const clone = otherItem.cloneNode(true);
                        clone.addEventListener("click", function (e) {
                            e.stopPropagation();
                            document.querySelector(`#${otherItem.id}`).dispatchEvent(new Event("click"));
                        });
                        projectsSidebar.appendChild(clone);
                    }
                });
            }
        });
    });

    // Cerrar la vista expandida si se hace clic fuera del contenido
    document.addEventListener("click", (event) => {
        const isClickInsideProject = expandedProject.contains(event.target) || projectsSidebar.contains(event.target);
        const isClickOnProjectItem = event.target.classList.contains("project-item");

        if (!isClickInsideProject && !isClickOnProjectItem) {
            console.log("Cerrando la vista expandida...");
            expandedProject.style.display = "none";
            expandedProject.classList.remove("active");
            projectsSidebar.style.display = "none";
            projectsGrid.style.display = "flex";
        }
    });

    // Control del menú hamburguesa en dispositivos móviles
    const menuToggle = document.querySelector(".menu-toggle");
    const navbarMenu = document.querySelector("#navbar ul");

    menuToggle.addEventListener("click", () => {
        navbarMenu.classList.toggle("active");
    });
});