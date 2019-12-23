const els = {
  navigationButton: document.querySelector(".navigation__button"),
  navigation: document.querySelector(".navigation"),
  navigationModal: document.querySelector(".navigation__modal"),
  navigationCheckbox: document.querySelector(".navigation__checkbox"),
  header: document.querySelector(".header"),
  router: document.querySelector(".router"),
  tabView: document.querySelector(".tab__view"),
  footer: document.querySelector("footer.footer"),
  headerTextAnimated: document.querySelector(".header__text--animated"),
  inputEmail: document.querySelector(".contact input[type='email']"),
  inputSubject: document.querySelector(".contact input[type='text']"),
  inputMessage: document.querySelector(".contact #message"),
  sendButton: document.querySelector(".form > .btn-outline")
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
  router.route(window.location.hash);
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
els.navigation.addEventListener(
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

const to = promise => {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err, null]);
};
const makeRequest = opts => {
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      // only run if the request is complete
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        // If successful
        opts.responseType === "arraybuffer"
          ? resolve(new Uint8Array(xhr.response))
          : resolve(JSON.parse(xhr.responseText));
      } else {
        // If false
        reject(xhr.response);
      }
    };
    // Setup HTTP request
    xhr.open(opts.method || "GET", opts.url, true);
    if (opts.headers) {
      Object.keys(opts.headers).forEach(key =>
        xhr.setRequestHeader(key, opts.headers[key])
      );
    }
    // Send the request
    if (opts.contentType === "application/json") {
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(JSON.stringify(opts.payload));
    } else {
      xhr.send(opts.payload);
    }
  });
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
      els.router.className = "router router--about";
      break;
    case hash.startsWith("#founder"):
      els.router.className = "router router--founder";
      break;
    case hash.startsWith("#social"):
      els.router.className = "router router--social";
      break;
    case hash.startsWith("#recruiting"):
      els.router.className = "router router--recruiting";
      break;
    case hash.startsWith("#contact"):
      els.router.className = "router router--contact";
      break;
    default:
      els.router.className = "router router--main";
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
