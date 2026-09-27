/* =========================================================
   ABDULLAH'S PERFUME STORE
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       1. ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks =
        document.querySelectorAll(".navbar a");

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });



    /* =====================================================
       2. MOBILE MENU
    ===================================================== */

    const header = document.querySelector(".header");
    const navbar = document.querySelector(".navbar");

    if (header && navbar) {

        let menuButton =
            document.querySelector(".menu-toggle");

        if (!menuButton) {

            menuButton =
                document.createElement("button");

            menuButton.className =
                "menu-toggle";

            menuButton.innerHTML = "☰";

            header.appendChild(menuButton);

        }

        menuButton.addEventListener(
            "click",
            function () {

                navbar.classList.toggle("show");

            }
        );


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navbar.classList.remove("show");

                }
            );

        });

    }



    /* =====================================================
       3. SEARCH
    ===================================================== */

    const searchIcon =
        document.querySelector(".search-icon");

    if (searchIcon) {

        searchIcon.style.cursor = "pointer";

        searchIcon.addEventListener(
            "click",
            function () {

                let searchBox =
                    document.querySelector(".site-search");

                if (!searchBox) {

                    searchBox =
                        document.createElement("div");

                    searchBox.className =
                        "site-search";

                    searchBox.innerHTML = `
                        <div class="search-inner">

                            <input
                                type="text"
                                id="searchInput"
                                placeholder="Search perfume..."
                            >

                            <button id="closeSearch">
                                ×
                            </button>

                        </div>
                    `;

                    document.body.appendChild(
                        searchBox
                    );


                    const input =
                        document.getElementById(
                            "searchInput"
                        );

                    input.focus();


                    input.addEventListener(
                        "keyup",
                        function () {

                            const searchValue =
                                input.value
                                .toLowerCase()
                                .trim();

                            const cards =
                                document.querySelectorAll(
                                    ".card, .product-card"
                                );

                            cards.forEach(
                                function (card) {

                                    const text =
                                        card.textContent
                                        .toLowerCase();

                                    if (
                                        text.includes(
                                            searchValue
                                        )
                                    ) {

                                        card.style.display =
                                            "";

                                    } else {

                                        card.style.display =
                                            "none";

                                    }

                                }
                            );

                        }
                    );


                    document
                        .getElementById("closeSearch")
                        .addEventListener(
                            "click",
                            function () {

                                searchBox.remove();

                            }
                        );

                }

            }
        );

    }



    /* =====================================================
       4. SHOPPING BAG / CART
    ===================================================== */

    let cart =
        JSON.parse(
            localStorage.getItem(
                "perfumeCart"
            )
        ) || [];


    function saveCart() {

        localStorage.setItem(
            "perfumeCart",
            JSON.stringify(cart)
        );

    }


    function updateCartCount() {

        const total =
            cart.reduce(
                function (sum, item) {

                    return sum + item.quantity;

                },
                0
            );


        const cartIcons =
            document.querySelectorAll(
                ".header-icons span"
            );


        cartIcons.forEach(
            function (icon) {

                if (
                    icon.textContent.includes("🛍")
                ) {

                    icon.setAttribute(
                        "data-count",
                        total
                    );

                }

            }
        );

    }


    updateCartCount();



    /* =====================================================
       5. ADD TO CART BUTTONS
    ===================================================== */

    const addButtons =
        document.querySelectorAll(
            ".add-to-cart, .add-cart, .cart-btn"
        );


    addButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(
                            ".card, .product-card"
                        );


                    if (!card) return;


                    const nameElement =
                        card.querySelector(
                            "h3, h2, .product-name"
                        );


                    const priceElement =
                        card.querySelector(
                            ".price, .product-price"
                        );


                    const name =
                        nameElement
                            ? nameElement.textContent.trim()
                            : "Perfume";


                    const price =
                        priceElement
                            ? priceElement.textContent.trim()
                            : "Price unavailable";


                    const existing =
                        cart.find(
                            function (item) {

                                return item.name === name;

                            }
                        );


                    if (existing) {

                        existing.quantity++;

                    } else {

                        cart.push({

                            name: name,

                            price: price,

                            quantity: 1

                        });

                    }


                    saveCart();

                    updateCartCount();


                    const originalText =
                        button.textContent;


                    button.textContent =
                        "ADDED ✓";


                    setTimeout(
                        function () {

                            button.textContent =
                                originalText;

                        },
                        1500
                    );

                }
            );

        }
    );



    /* =====================================================
       6. CART ICON
    ===================================================== */

    const cartIcon =
        Array.from(
            document.querySelectorAll(
                ".header-icons span"
            )
        ).find(
            function (icon) {

                return icon.textContent.includes(
                    "🛍"
                );

            }
        );


    if (cartIcon) {

        cartIcon.style.cursor =
            "pointer";


        cartIcon.addEventListener(
            "click",
            function () {

                showCart();

            }
        );

    }



    /* =====================================================
       7. CART WINDOW
    ===================================================== */

    function showCart() {

        let cartBox =
            document.querySelector(
                ".cart-popup"
            );


        if (cartBox) {

            cartBox.remove();

            return;

        }


        cartBox =
            document.createElement("div");

        cartBox.className =
            "cart-popup";


        let cartHTML = `

            <div class="cart-header">

                <h3>
                    YOUR CART
                </h3>

                <button id="closeCart">
                    ×
                </button>

            </div>

            <div class="cart-items">
        `;


        if (cart.length === 0) {

            cartHTML += `
                <p class="empty-cart">
                    Your cart is empty.
                </p>
            `;

        } else {

            cart.forEach(
                function (item, index) {

                    cartHTML += `

                        <div class="cart-item">

                            <div>

                                <strong>
                                    ${item.name}
                                </strong>

                                <p>
                                    ${item.price}
                                </p>

                                <small>
                                    Quantity:
                                    ${item.quantity}
                                </small>

                            </div>

                            <button
                                class="remove-item"
                                data-index="${index}"
                            >
                                Remove
                            </button>

                        </div>

                    `;

                }
            );

        }


        cartHTML += `
            </div>

            <div class="cart-footer">

                <button
                    id="checkoutButton"
                    class="checkout-btn"
                >
                    CHECKOUT
                </button>

            </div>
        `;


        cartBox.innerHTML =
            cartHTML;


        document.body.appendChild(
            cartBox
        );


        document
            .getElementById("closeCart")
            .addEventListener(
                "click",
                function () {

                    cartBox.remove();

                }
            );


        document
            .querySelectorAll(".remove-item")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const index =
                                Number(
                                    button.dataset.index
                                );

                            cart.splice(
                                index,
                                1
                            );

                            saveCart();

                            updateCartCount();

                            cartBox.remove();

                            showCart();

                        }
                    );

                }
            );


        const checkout =
            document.getElementById(
                "checkoutButton"
            );


        if (checkout) {

            checkout.addEventListener(
                "click",
                function () {

                    if (cart.length === 0) {

                        alert(
                            "Your cart is empty."
                        );

                        return;

                    }


                    alert(
                        "Thank you! Your order has been received."
                    );


                    cart = [];

                    saveCart();

                    updateCartCount();

                    cartBox.remove();

                }
            );

        }

    }



    /* =====================================================
       8. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (formMessage) {

                    formMessage.textContent =
                        "Thank you! Your message has been received.";

                }


                contactForm.reset();


                setTimeout(
                    function () {

                        if (formMessage) {

                            formMessage.textContent =
                                "";

                        }

                    },
                    4000
                );

            }
        );

    }



    /* =====================================================
       9. SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const target =
                            document.querySelector(
                                link.getAttribute(
                                    "href"
                                )
                            );


                        if (target) {

                            event.preventDefault();


                            target.scrollIntoView({
                                behavior:
                                    "smooth"
                            });

                        }

                    }
                );

            }
        );



    /* =====================================================
       10. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".card, .service-card, .why-card, .service-feature, .contact-item"
        );


    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(
        function (element) {

            element.classList.add(
                "reveal"
            );

            revealObserver.observe(
                element
            );

        }
    );



    /* =====================================================
       11. IMAGE LOADING EFFECT
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        function (image) {

            image.addEventListener(
                "load",
                function () {

                    image.classList.add(
                        "image-loaded"
                    );

                }
            );

        }
    );



    /* =====================================================
       12. BACK TO TOP BUTTON
    ===================================================== */

    const backTop =
        document.createElement(
            "button"
        );


    backTop.className =
        "back-to-top";

    backTop.innerHTML =
        "↑";

    backTop.title =
        "Back to top";


    document.body.appendChild(
        backTop
    );


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

            }

        }
    );


    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );



    /* =====================================================
       13. CURRENT YEAR
    ===================================================== */

    const year =
        new Date().getFullYear();


    document
        .querySelectorAll(
            ".copyright"
        )
        .forEach(
            function (element) {

                element.innerHTML =
                    element.innerHTML.replace(
                        "2026",
                        year
                    );

            }
        );


});