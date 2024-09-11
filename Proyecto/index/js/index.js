document.addEventListener("DOMContentLoaded", () => {
    const cart = document.querySelector(".cart");
    const menu = document.querySelector(".menu");
    const cartIcon = document.querySelector(".cart-icon");
    const menuIcon = document.querySelector(".header__icon img[src='img/menu.png']");
    const closeMenuIcon = document.querySelector(".close__menu img");
    const closeCartIcon = document.querySelector(".close__cart img");
    const cartItemsContainer = cart.querySelector('.cart__items');
    const cartBadge = document.querySelector(".cart-badge");

    let cartItemCount = 0; // Para llevar la cuenta de los productos en el carrito

    // Aseguramos que el carrito y el menú estén ocultos desde el principio
    cart.classList.add("hidden");
    menu.classList.add("hidden");

    const updateCartBadge = () => {
        cartBadge.textContent = cartItemCount;
    };

    // Función para cerrar cualquier ventana abierta (menu o carrito) al hacer clic fuera
    const closeOnClickOutside = (event) => {
        if (event.target.closest(".cart__item") || event.target.closest(".remove")) {
            return;
        }

        if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
            menu.classList.remove("show");
            menu.classList.add("hidden");
        }

        if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
            cart.classList.remove("show");
            cart.classList.add("hidden");
        }
    };

    cartIcon.addEventListener("click", () => {
        cart.classList.toggle("show");
        cart.classList.toggle("hidden");

        if (menu.classList.contains("show")) {
            menu.classList.remove("show");
            menu.classList.add("hidden");
        }
    });

    menuIcon.addEventListener("click", () => {
        menu.classList.toggle("show");
        menu.classList.toggle("hidden");

        if (cart.classList.contains("show")) {
            cart.classList.remove("show");
            cart.classList.add("hidden");
        }
    });

    closeMenuIcon.addEventListener("click", () => {
        menu.classList.remove("show");
        menu.classList.add("hidden");
    });

    closeCartIcon.addEventListener("click", () => {
        cart.classList.remove("show");
        cart.classList.add("hidden");
    });

    document.addEventListener("click", closeOnClickOutside);

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productItem = event.target.closest(".products__item");
            const productName = productItem.querySelector(".products__name").textContent;
            const productPrice = productItem.querySelector(".products__price").textContent;
            const productImage = productItem.querySelector(".products__image").src;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart__item");

            cartItem.innerHTML = `
                <img class="cart__image" src="${productImage}" alt="${productName}">
                <p class="cart__product-name">${productName}</p>
                <p class="cart__price">${productPrice}</p>
                <i class="remove"><img src="img/borrar.jpg" alt="Icono Quitar"></i>
            `;

            cart.querySelector(".cart__header").insertAdjacentElement("afterend", cartItem);

            cartItem.querySelector(".remove img").addEventListener("click", () => {
                cartItem.remove();
                cartItemCount--;
                updateCartBadge();
            });

            cartItemCount++;
            updateCartBadge();
        });
    });
});
