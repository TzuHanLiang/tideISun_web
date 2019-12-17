const els = {
  navigationButton: document.querySelector(".navigation__button"),
  navigationModal: document.querySelector(".navigation__modal"),
  navigationCheckbox: document.querySelector(".navigation__checkbox"),
  header: document.querySelector(".header"),
  headerTextAnimated: document.querySelector(".header__text--animated")
};
const headerTextList = ["金融科技", "媒體", "融資", "區塊鏈", "投資業務"];
let animateHeaderTextInterval;
const handleHeaderTextAnimation = () => {
  animateHeaderTextInterval = setInterval(() => {
    if (els.headerTextAnimated.childElementCount > 0)
      els.headerTextAnimated.innerHTML = "";
    const markup = `<div class="heading-primary-1 heading-primary-1--main">${headerTextList[0]}</div>`;
    els.headerTextAnimated.insertAdjacentHTML("afterbegin", markup);
    headerTextList.push(headerTextList.shift());
  }, 2000);
};
window.onload = () => {
  handleHeaderTextAnimation();
  console.log(window.innerHeight);
};

els.navigationCheckbox.addEventListener(
  "change",
  _ => {
    els.navigationCheckbox.checked
      ? (els.navigationModal.style.pointerEvents = "stroke")
      : (els.navigationModal.style.pointerEvents = "none");
  },
  false
);
els.navigationModal.addEventListener(
  "click",
  _ => {
    els.navigationCheckbox.checked = false;
  },
  false
);

window.onscroll = () => {
  if (Math.round(window.scrollY) > 30) {
    els.navigationButton.classList.add("scrolled");
    els.header.classList.add("scrolled");
  } else {
    els.navigationButton.classList.remove("scrolled");
    els.header.classList.remove("scrolled");
  }
  console.log(window.scrollY);
};
