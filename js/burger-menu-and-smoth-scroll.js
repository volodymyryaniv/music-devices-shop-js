(function () {
  const iconBurger = document.querySelector(".navigation-burger");
  const navigationsBody = document.querySelector(".navigation-wrapper");
  iconBurger.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    iconBurger.classList.toggle("active");
    navigationsBody.classList.toggle("active");
    document.querySelector(".cart-link").classList.toggle("hidden");
  });

  const navLinks = document.querySelectorAll(".navigation__link[data-goto]");
  if (navLinks.length > 0) {
    navLinks.forEach((navLink) => {
      navLink.addEventListener("click", oneNavClick);
    });

    function oneNavClick(e) {
      const navLink = e.target;
      if (
        navLink.dataset.goto &&
        document.querySelector(navLink.dataset.goto)
      ) {
        const gotoBlock = document.querySelector(navLink.dataset.goto);
        const gotoBlockLength =
          gotoBlock.getBoundingClientRect().top + window.pageYOffset;

        if (iconBurger.classList.contains("active")) {
          document.body.classList.remove("lock");
          iconBurger.classList.remove("active");
          navigationsBody.classList.remove("active");
          document.querySelector(".cart-link").classList.add("hidden");
        }

        window.scrollTo({
          top: gotoBlockLength,
          behavior: "smooth",
        });
        e.preventDefault();
      }
    }
  }
})();
