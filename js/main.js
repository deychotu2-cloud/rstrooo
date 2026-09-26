// ==================================================
// CAFE ADDA - MAIN JAVASCRIPT
// ==================================================

document.addEventListener("DOMContentLoaded", function () {


    // ==================================================
    // DARK MODE
    // ==================================================

    const darkModeToggle =
        document.getElementById("darkModeToggle");

    const darkModeIcon =
        darkModeToggle.querySelector("i");


    // Load saved theme

    const savedTheme =
        localStorage.getItem("cafeAddaTheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        darkModeIcon.classList.remove("bi-moon-fill");

        darkModeIcon.classList.add("bi-sun-fill");

    }


    // Toggle theme

    darkModeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        const isDark =
            document.body.classList.contains("dark-mode");


        if (isDark) {

            darkModeIcon.classList.remove("bi-moon-fill");

            darkModeIcon.classList.add("bi-sun-fill");

            localStorage.setItem(
                "cafeAddaTheme",
                "dark"
            );

        } else {

            darkModeIcon.classList.remove("bi-sun-fill");

            darkModeIcon.classList.add("bi-moon-fill");

            localStorage.setItem(
                "cafeAddaTheme",
                "light"
            );

        }

    });



    // ==================================================
    // ACTIVE NAVBAR LINK
    // ==================================================

    const sections =
        document.querySelectorAll("header, section");

    const navLinks =
        document.querySelectorAll(".navbar .nav-link");


    function updateActiveNav() {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

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

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();



    // ==================================================
    // MOBILE NAVBAR CLOSE
    // ==================================================

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const navbar =
                document.querySelector(".navbar-collapse");


            if (navbar.classList.contains("show")) {

                const bsCollapse =
                    bootstrap.Collapse.getInstance(navbar) ||
                    new bootstrap.Collapse(navbar);


                bsCollapse.hide();

            }

        });

    });



    // ==================================================
    // GALLERY LIGHTBOX
    // ==================================================

    const galleryButtons =
        document.querySelectorAll("[data-gallery-image]");


    const galleryModalImage =
        document.getElementById("galleryModalImage");


    galleryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const imagePath =
                this.getAttribute("data-gallery-image");


            galleryModalImage.src =
                imagePath;

        });

    });



    // ==================================================
    // BOOKING FORM VALIDATION
    // ==================================================

    const bookingForm =
        document.getElementById("bookingForm");


    const formMessage =
        document.getElementById("formMessage");


    if (bookingForm) {


        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                let formIsValid = true;


                // NAME

                const fullName =
                    document.getElementById("fullName");


                const nameValue =
                    fullName.value.trim();


                if (
                    nameValue.length < 2 ||
                    nameValue.length > 50
                ) {

                    fullName.classList.add(
                        "is-invalid"
                    );

                    formIsValid = false;

                } else {

                    fullName.classList.remove(
                        "is-invalid"
                    );

                    fullName.classList.add(
                        "is-valid"
                    );

                }



                // EMAIL

                const email =
                    document.getElementById("email");


                const emailValue =
                    email.value.trim();


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(emailValue) ||
                    emailValue.length > 100
                ) {

                    email.classList.add(
                        "is-invalid"
                    );

                    formIsValid = false;

                } else {

                    email.classList.remove(
                        "is-invalid"
                    );

                    email.classList.add(
                        "is-valid"
                    );

                }



                // GUESTS

                const guests =
                    document.getElementById("guests");


                const guestsValue =
                    Number(guests.value);


                if (
                    !Number.isInteger(guestsValue) ||
                    guestsValue < 1 ||
                    guestsValue > 20
                ) {

                    guests.classList.add(
                        "is-invalid"
                    );

                    formIsValid = false;

                } else {

                    guests.classList.remove(
                        "is-invalid"
                    );

                    guests.classList.add(
                        "is-valid"
                    );

                }



                // DATE

                const date =
                    document.getElementById("date");


                if (!date.value) {

                    date.classList.add(
                        "is-invalid"
                    );

                    formIsValid = false;

                } else {

                    date.classList.remove(
                        "is-invalid"
                    );

                    date.classList.add(
                        "is-valid"
                    );

                }



                // MESSAGE

                const message =
                    document.getElementById("message");


                const messageValue =
                    message.value.trim();


                if (
                    messageValue.length < 10 ||
                    messageValue.length > 300
                ) {

                    message.classList.add(
                        "is-invalid"
                    );

                    formIsValid = false;

                } else {

                    message.classList.remove(
                        "is-invalid"
                    );

                    message.classList.add(
                        "is-valid"
                    );

                }



                // FINAL RESULT

                if (formIsValid) {

                    formMessage.innerHTML = `
                        <div class="alert alert-success">
                            <strong>Reservation request sent!</strong>
                            We will contact you soon to confirm your table.
                        </div>
                    `;


                    bookingForm.reset();


                    const validFields =
                        bookingForm.querySelectorAll(
                            ".is-valid"
                        );


                    validFields.forEach(
                        function (field) {

                            field.classList.remove(
                                "is-valid"
                            );

                        }
                    );


                } else {

                    formMessage.innerHTML = `
                        <div class="alert alert-danger">
                            Please correct the highlighted fields
                            and try again.
                        </div>
                    `;

                }

            }
        );



        // Remove invalid state while typing

        const formInputs =
            bookingForm.querySelectorAll(
                "input, textarea"
            );


        formInputs.forEach(function (input) {

            input.addEventListener(
                "input",
                function () {

                    if (
                        this.value.trim() !== ""
                    ) {

                        this.classList.remove(
                            "is-invalid"
                        );

                    }

                }
            );

        });

    }



    // ==================================================
    // TODAY'S SPECIAL
    // ==================================================

    const pujaBadge =
        document.querySelector(
            ".puja-section .badge"
        );


    if (pujaBadge) {

        pujaBadge.style.display =
            "inline-block";

    }



    // ==================================================
    // MINIMUM BOOKING DATE
    // ==================================================

    const dateInput =
        document.getElementById("date");


    if (dateInput) {

        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        const formattedDate =
            `${year}-${month}-${day}`;


        dateInput.setAttribute(
            "min",
            formattedDate
        );

    }



    // ==================================================
    // CURRENT YEAR
    // ==================================================

    const footerYear =
        document.querySelector(
            "footer small"
        );


    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} Cafe Adda. All rights reserved.`;

    }

});