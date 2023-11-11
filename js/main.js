// Swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    slidesPerView: 2,
    spaceBetween: 20,
    direction: 'horizontal',
    loop: true,
    slidesPerGroup: 2,
    centeredSlides: false,
  
    // Navigation arrows
    navigation: {
      nextEl: '.mentors__next',
      prevEl: '.mentors__prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      }
    },
  });

// Popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
};

const popupCloseIcon = document.querySelectorAll('.popup__cross');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index ++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
};

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__wrapper')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
};

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';

    if (lockPadding.length > 0){
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.computedStyleMap.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
};

function bodyUnlock () {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
};

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// Burger menu
const navBtn = document.querySelector('.nav-button');
const navBtnClose = document.querySelector('.menu__cross');
const mobileNav = document.querySelector('.burger-menu');
const mobileNavContent = document.querySelector('.burger-menu__wrapper');
const links = document.querySelectorAll('.menu__nav-link');

// Клик по кнопке
navBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    openMobileNav();
})

// Клик по кнопке
navBtnClose.addEventListener('click', function (event) {
    event.stopPropagation();
    closeMobileNav();
})

for (let index = 0; index < links.length; index++) {
  const link = links[index];
  link.addEventListener("click", function (event) {
      event.stopPropagation();
      closeMobileNav();
  });
}

// Клик по окну за пределами навигации
window.addEventListener('click', function () {
    if (body.classList.contains('no-scroll')) {
        closeMobileNav();
    }
});

// Останавливаем клик внутри открытой мобильной навигации
mobileNavContent.addEventListener('click', function (event) {
    event.stopPropagation();
});

function openMobileNav () {
    mobileNav.classList.add('burger-menu-active');
    // navBtn.classList.toggle('nav-button-close');
    body.classList.add('no-scroll');
};

function closeMobileNav () {
    mobileNav.classList.remove('burger-menu-active');
    // navBtn.classList.toggle('nav-button-close');
    body.classList.remove('no-scroll');
};

// Cart
// Cart open and close
const cartLinks = document.querySelectorAll('.cart-link');

if (cartLinks.length > 0) {
    for (let index = 0; index < cartLinks.length; index++) {
        const cartLink = cartLinks[index];
        cartLink.addEventListener("click", function (e) {
            const cartName = cartLink.getAttribute('href').replace('#', '');
            const curentCart = document.getElementById(cartName);
            cartOpen(curentCart);
            e.preventDefault();
        });
    }
};

const cartCloseIcon = document.querySelectorAll('.cart__cross');
if (cartCloseIcon.length > 0) {
    for (let index = 0; index < cartCloseIcon.length; index ++) {
        const el = cartCloseIcon[index];
        el.addEventListener('click', function (e) {
            cartClose(el.closest('.cart'));
            e.preventDefault();
        });
    }
};

function cartOpen(curentCart) {
    if (curentCart && unlock) {
        const cartActive = document.querySelector('.cart.open');
        if (cartActive) {
            cartClose(cartActive, false);
        } else {
            bodyLock();
        }
        curentCart.classList.add('open');
        curentCart.addEventListener("click", function (e) {
            if (!e.target.closest('.cart__wrapper')) {
                cartClose(e.target.closest('.cart'));
            }
        });
    }
};

function cartClose(cartActive, doUnlock = true) {
    if (unlock) {
        cartActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const cartActive = document.querySelector('.cart.open');
        cartClose(cartActive);
    }
});

//Cart counter
const counterPlus = document.querySelector('.counter__plus');
const counterMinus = document.querySelector('.counter__minus');
const counterNum = document.querySelector('.counter__number');
const counterSum1 = document.querySelector('.sum__number');
const counterSum2 = document.querySelector('.cart__bottom');
const counterReset = document.querySelector('.sum__cross');

counterPlus.addEventListener("click", function (event){

    counterNum.innerText = ++counterNum.innerText;

    sum();

});

counterMinus.addEventListener("click", function (event){

    if (counterNum.innerText > 1) {
        counterNum.innerText = --counterNum.innerText;
    }
    sum();

});

function sum() {
    counterSum1.innerText = `${counterNum.innerText * 3} 000 р.`;
    counterSum2.innerText = `Сумма: ${counterNum.innerText * 3} 000 р.`;
}

counterReset.addEventListener("click", function (event){

    counterNum.innerText = 1;

    sum();

});