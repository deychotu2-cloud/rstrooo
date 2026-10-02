/* ================================================= */
/* ================= DARK MODE ===================== */
/* ================================================= */

const darkModeToggle = document.getElementById("darkModeToggle");

if (darkModeToggle) {

    const darkModeIcon = darkModeToggle.querySelector("i");


    // Check saved dark mode
    const savedMode = localStorage.getItem("darkMode");


    if (savedMode === "enabled") {

        document.body.classList.add("dark-mode");

        darkModeIcon.classList.remove("bi-moon-fill");
        darkModeIcon.classList.add("bi-sun-fill");

    }


    // Toggle dark mode
    darkModeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("darkMode", "enabled");

            darkModeIcon.classList.remove("bi-moon-fill");
            darkModeIcon.classList.add("bi-sun-fill");

        } else {

            localStorage.setItem("darkMode", "disabled");

            darkModeIcon.classList.remove("bi-sun-fill");
            darkModeIcon.classList.add("bi-moon-fill");

        }

    });

}


/* ================================================= */
/* ================= NAVBAR ======================== */
/* ================================================= */

const navLinks = document.querySelectorAll(".nav-link");

const navbarCollapse = document.getElementById("navbarNav");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");


        // Close mobile navbar
        if (
            navbarCollapse &&
            navbarCollapse.classList.contains("show")
        ) {

            const bsCollapse =
                bootstrap.Collapse.getInstance(navbarCollapse);

            if (bsCollapse) {
                bsCollapse.hide();
            }

        }

    });

});


/* ================================================= */
/* ============== ACTIVE NAVBAR LINK =============== */
/* ================================================= */

const sections = document.querySelectorAll(
    "header[id], section[id]"
);


window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


/* ================================================= */
/* ================= GALLERY MODAL ================= */
/* ================================================= */

const galleryImages =
    document.querySelectorAll(".gallery-img");

const modalImage =
    document.getElementById("modalImage");


galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

        modalImage.src = this.src;

        modalImage.alt = this.alt;

    });

});


/* ================================================= */
/* ================= BOOKING FORM ================== */
/* ================================================= */

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        event.stopPropagation();


        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const phone =
            document.getElementById("phone");

        const date =
            document.getElementById("date");

        const guests =
            document.getElementById("guests");

        const message =
            document.getElementById("message");


        let isValid = true;


        /* NAME */

        if (
            name.value.trim().length < 2 ||
            name.value.trim().length > 50
        ) {

            name.classList.add("is-invalid");

            isValid = false;

        } else {

            name.classList.remove("is-invalid");
            name.classList.add("is-valid");

        }


        /* EMAIL */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email.value.trim())) {

            email.classList.add("is-invalid");

            isValid = false;

        } else {

            email.classList.remove("is-invalid");
            email.classList.add("is-valid");

        }


        /* PHONE */

        const phonePattern =
            /^[0-9]{10,15}$/;


        if (!phonePattern.test(phone.value.trim())) {

            phone.classList.add("is-invalid");

            isValid = false;

        } else {

            phone.classList.remove("is-invalid");
            phone.classList.add("is-valid");

        }


        /* DATE */

        if (date.value === "") {

            date.classList.add("is-invalid");

            isValid = false;

        } else {

            date.classList.remove("is-invalid");
            date.classList.add("is-valid");

        }


        /* GUESTS */

        if (guests.value === "") {

            guests.classList.add("is-invalid");

            isValid = false;

        } else {

            guests.classList.remove("is-invalid");
            guests.classList.add("is-valid");

        }


        /* MESSAGE */

        if (
            message.value.trim().length < 10 ||
            message.value.trim().length > 500
        ) {

            message.classList.add("is-invalid");

            isValid = false;

        } else {

            message.classList.remove("is-invalid");
            message.classList.add("is-valid");

        }


        /* SUCCESS */

        if (isValid) {

            alert(
                "Thank you! Your table reservation request has been submitted."
            );

            bookingForm.reset();

            document
                .querySelectorAll(".is-valid")
                .forEach(function (element) {

                    element.classList.remove("is-valid");

                });

        }

    });

}


/* ================================================= */
/* ================= MIN DATE ====================== */
/* ================================================= */

const dateInput =
    document.getElementById("date");


if (dateInput) {

    const today =
        new Date().toISOString().split("T")[0];

    dateInput.min = today;

}


/* ================================================= */
/* ================= CURRENT YEAR ================== */
/* ================================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}
