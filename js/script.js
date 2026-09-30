// ========================================
// MENU MOBILE
// ========================================

// Sélection du bouton du menu
const menuButton = document.querySelector(".menu-button");

// Sélection du menu de navigation
const navMenu = document.querySelector(".nav-menu");

// Sélection de tous les liens du menu
const navLinks = document.querySelectorAll(".nav-menu a");

// Détection du clic sur le bouton
menuButton.addEventListener("click", function () {

    // Ajoute ou retire la classe "active"
    navMenu.classList.toggle("active");

});

// ========================================
// FERMETURE APRÈS UN CLIC SUR UN LIEN
// ========================================

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});

// ========================================
// GALERIE INTERACTIVE
// ========================================
// ========================================
// GALERIE INTERACTIVE
// ========================================

const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach(function (image, index) {

    image.addEventListener("click", function () {

        // Index de l'image actuellement affichée
        let currentIndex = index;


        // ================================
        // CRÉATION DE LA LIGHTBOX
        // ================================

        const lightbox = document.createElement("div");

        lightbox.classList.add("lightbox");


        // ================================
        // BOUTON DE FERMETURE
        // ================================

        const closeButton = document.createElement("button");

        closeButton.textContent = "×";

        closeButton.classList.add("lightbox-close");

        closeButton.setAttribute(
            "aria-label",
            "Fermer la galerie"
        );

        lightbox.appendChild(closeButton);


        // ================================
        // IMAGE AGRANDIE
        // ================================

        const largeImage = document.createElement("img");

        largeImage.src = image.src;
        largeImage.alt = image.alt;

        lightbox.appendChild(largeImage);


        // ================================
        // LÉGENDE
        // ================================

        const caption =
            image.parentElement.querySelector("figcaption");

        const largeCaption =
            document.createElement("p");

        largeCaption.textContent =
            caption.textContent;

        largeCaption.classList.add(
            "lightbox-caption"
        );

        lightbox.appendChild(largeCaption);


        // ================================
        // BOUTONS DE NAVIGATION
        // ================================

        const previousButton =
            document.createElement("button");

        const nextButton =
            document.createElement("button");

        previousButton.textContent = "‹";
        nextButton.textContent = "›";

        previousButton.classList.add(
            "lightbox-previous"
        );

        nextButton.classList.add(
            "lightbox-next"
        );

        previousButton.setAttribute(
            "aria-label",
            "Image précédente"
        );

        nextButton.setAttribute(
            "aria-label",
            "Image suivante"
        );

        lightbox.appendChild(previousButton);
        lightbox.appendChild(nextButton);


        // ================================
        // AFFICHER UNE IMAGE
        // ================================

        function showImage(index) {

            const selectedImage =
                galleryImages[index];

            largeImage.src =
                selectedImage.src;

            largeImage.alt =
                selectedImage.alt;

            const selectedCaption =
                selectedImage.parentElement
                    .querySelector("figcaption");

            largeCaption.textContent =
                selectedCaption.textContent;
        }


        // ================================
        // IMAGE SUIVANTE
        // ================================

        function showNextImage() {

            currentIndex++;

            if (currentIndex >= galleryImages.length) {
                currentIndex = 0;
            }

            showImage(currentIndex);
        }


        // ================================
        // IMAGE PRÉCÉDENTE
        // ================================

        function showPreviousImage() {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex =
                    galleryImages.length - 1;
            }

            showImage(currentIndex);
        }


        // ================================
        // FERMER LA LIGHTBOX
        // ================================

        function closeLightbox() {

            lightbox.remove();

            document.removeEventListener(
                "keydown",
                handleKeyboard
            );
        }


        // ================================
        // GESTION DU CLAVIER
        // ================================

        function handleKeyboard(event) {

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowRight") {
                showNextImage();
            }

            if (event.key === "ArrowLeft") {
                showPreviousImage();
            }
        }


        // ================================
        // BOUTON SUIVANT
        // ================================

        nextButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                showNextImage();

            }
        );


        // ================================
        // BOUTON PRÉCÉDENT
        // ================================

        previousButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                showPreviousImage();

            }
        );


        // ================================
        // BOUTON ×
        // ================================

        closeButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                closeLightbox();

            }
        );


        // ================================
        // CLIC SUR L'ARRIÈRE-PLAN
        // ================================

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {
                    closeLightbox();
                }

            }
        );


        // ================================
        // ACTIVATION DU CLAVIER
        // ================================

        document.addEventListener(
            "keydown",
            handleKeyboard
        );


        // ================================
        // AJOUT À LA PAGE
        // ================================

        document.body.appendChild(lightbox);

    });

});

// ========================================
// BOUTON RETOUR EN HAUT
// ========================================

const backToTopButton =
    document.querySelector(".back-to-top");

// ================================
// AFFICHER / CACHER LE BOUTON
// ================================

window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backToTopButton.style.display = "flex";

    } else {

        backToTopButton.style.display = "none";

    }

});

// ================================
// RETOUR EN HAUT
// ================================

backToTopButton.addEventListener(
    "click",
    function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);

// ========================================
// NAVIGATION ACTIVE
// ========================================

const sections =
    document.querySelectorAll("main section");

const navigationLinks =
    document.querySelectorAll(".nav-menu a");

const sectionObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(
                        function (link) {

                            link.classList.remove("active");

                        }
                    );

                    const activeLink =
                        document.querySelector(
                            '.nav-menu a[href="#' +
                            entry.target.id +
                            '"]'
                        );

                    if (activeLink) {

                        activeLink.classList.add("active");

                    }

                }

            });

        },
        {
            threshold: 0.3
        }
    );

sections.forEach(function (section) {

    sectionObserver.observe(section);

});