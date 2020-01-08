els.navigationCheckbox.addEventListener(
  "change",
  _ => {
    els.navigationCheckbox.checked
      ? (els.navigationModal.style.pointerEvents = "stroke")
      : (els.navigationModal.style.pointerEvents = "none");
  },
  false
);
els.navigation.addEventListener(
  "click",
  _ => {
    els.navigationCheckbox.checked = false;
  },
  false
);

window.onscroll = evt => {
  if (Math.round(window.pageYOffset) > 30) {
    els.navigationButton.classList.add("scrolled");
    els.header.classList.add("scrolled");
  } else {
    els.navigationButton.classList.remove("scrolled");
    els.header.classList.remove("scrolled");
  }
  console.log(window.pageYOffset);
};

const regExp = {
  email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
};

const sendEmail = async _ => {
  const opts = {
    contentType: "application/json",
    method: "POST",
    url: `/nowhere`,
    payload: {
      email: els.inputEmail.value,
      subject: els.inputSubject.value,
      content: els.inputMessage.value
    }
  };
  let err, data;
  [err, data] = await to(makeRequest(opts));
  if (err) {
    console.log(err);
    // throw new Error(err)
  }
  if (data) {
    console.log(data);
    return;
  }
};

els.sendButton.addEventListener("click", sendEmail, false);

const Router = function() {};

Router.prototype.route = async hash => {
  console.trace(hash);
  window.scrollY = 0;
  switch (true) {
    case hash.startsWith("#about"):
      els.router.className = els.router.className.includes("en")
        ? "router router--about en"
        : "router router--about";
      break;
    case hash.startsWith("#founder"):
      els.router.className = els.router.className.includes("en")
        ? "router router--founder en"
        : "router router--founder";
      break;
    case hash.startsWith("#social"):
      els.router.className = els.router.className.includes("en")
        ? "router router--social en"
        : (els.router.className = "router router--social");
      break;
    case hash.startsWith("#recruiting"):
      els.router.className = els.router.className.includes("en")
        ? "router router--recruiting en"
        : (els.router.className = "router router--recruiting");
      break;
    case hash.startsWith("#contact"):
      els.router.className = els.router.className.includes("en")
        ? "router router--contact en"
        : (els.router.className = "router router--contact");
      break;
    default:
      els.router.className = els.router.className.includes("en")
        ? "router router--main en"
        : (els.router.className = "router router--main");
      break;
  }
};
const router = new Router();

window.addEventListener(
  "popstate",
  _ => {
    router.route(window.location.hash);
  },
  false
);

const handelTabView = evt => {
  if (evt.target.matches("[data-type='suntv']")) {
    console.log(evt.target.dataset.type);
    els.tabView.className = `tab__view ${evt.target.dataset.type}`;
  }
  if (evt.target.matches("[data-type='financial']")) {
    console.log(evt.target.dataset.type);
    els.tabView.className = `tab__view ${evt.target.dataset.type}`;
  }
  if (evt.target.matches("[data-type='technology']")) {
    console.log(evt.target.dataset.type);
    els.tabView.className = `tab__view ${evt.target.dataset.type}`;
  }
  if (evt.target.matches("[data-type='investment']")) {
    console.log(evt.target.dataset.type);
    els.tabView.className = `tab__view ${evt.target.dataset.type}`;
  }
};

els.tabView.addEventListener("click", handelTabView, false);

window.onload = () => {
  headerTextList = handelHeaderText('cn');
  handleHeaderTextAnimation();
  router.route(window.location.hash);
};
