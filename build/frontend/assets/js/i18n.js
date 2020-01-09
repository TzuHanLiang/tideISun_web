let els = {
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
  sendButton: document.querySelector(".form > .btn-outline"),
  lnChoosers: document.querySelectorAll("[data-ln]"),
  headerLnChoice: document.querySelector(".header__language-choices"),
  navLnChioce: document.querySelector(".sub-menu"),
  html: document.querySelector("html")
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

//https://jsfiddle.net/jamuhl/ferfywyf/#tabs=js,result,html
// const localize = locI18next.init(i18next, {
//   selectorAttr: "data-i18n", // selector for translating elements
//   targetAttr: "i18n-target",
//   optionsAttr: "i18n-options",
//   useOptionsAttr: false,
//   parseDefaultValueFromContent: true
// });
// localize("body");

let headerTextList, animateHeaderTextInterval;

const handelHeaderText = ln =>
  ({
    en: ["Fintech", "Media", "Financing", "Blockchain", "Investment"],
    cn: ["金融科技", "媒体", "融资", "区块链", "投资业务"],
    tw: ["金融科技", "媒體", "融資", "區塊鏈", "投資業務"]
  }[ln]);

const handleHeaderTextAnimation = () => {
  animateHeaderTextInterval = setInterval(() => {
    if (els.headerTextAnimated.childElementCount > 0)
      els.headerTextAnimated.innerHTML = "";
    const markup = `<div class="heading-primary-1 heading-primary-1--main">${headerTextList[0]}</div>`;
    els.headerTextAnimated.insertAdjacentHTML("afterbegin", markup);
    headerTextList.push(headerTextList.shift());
  }, 2000);
};

const getLnText = async ln => {
  const opts = {
    contentType: "application/json",
    method: "GET",
    url: `${window.location.origin}${window.location.pathname}assets/i18n/${ln}.json`
  };
  let err, data;
  [err, data] = await to(makeRequest(opts));
  if (err) {
    console.log(err);
    // throw new Error(err)
  }
  if (data) {
    return data; //JSON.stringify(data);
  }
};

const changeLn = async ln => {
  const lnText = await getLnText(ln);
  Array.from(document.querySelectorAll("[data-i18n]")).map(el => {
    el.innerHTML = lnText[el.dataset.i18n];
  });
};

const handleLnChoosser = evt => {
  if (evt) {
    window.location.search = `?lang=${evt.target.dataset.ln}`;
  }
  if (window.location.href.includes(`?lang=`))
    els.html.lang = els.html.lang = window.location.href
      .replace(`${window.location.origin}${window.location.pathname}?lang=`, "")
      .replace(`${window.location.hash}`, "");

  let ln = els.html.lang;
  headerTextList = handelHeaderText(ln);
  clearInterval(animateHeaderTextInterval);
  changeLn(ln);
  handleHeaderTextAnimation();
  els.html.lang = ln;
  ln === "en"
    ? els.router.classList.add("en")
    : els.router.classList.remove("en");

  els.headerLnChoice.className = `header__language-choices ${ln}`;
  els.navLnChioce.className = `sub-menu ${ln}`;
};

Array.from(els.lnChoosers).map(lnChooser =>
  lnChooser.addEventListener("click", handleLnChoosser, false)
);
