const navToggle = document.querySelector(".nav-toggle")! as HTMLButtonElement;
const links = document.querySelector(".links")! as HTMLUListElement;

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});
