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
const localize = locI18next.init(i18next, {
  selectorAttr: "data-i18n", // selector for translating elements
  targetAttr: "i18n-target",
  optionsAttr: "i18n-options",
  useOptionsAttr: false,
  parseDefaultValueFromContent: true
});
localize("body");

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
    // console.log(JSON.stringify(data));
    return data//JSON.stringify(data);
  }
};

const changeLn = async ln => {
  const lnText = await getLnText(ln);
  console.log(lnText);
  Array.from(document.querySelectorAll("[data-i18n]")).map(el => {
      console.log(el.dataset.i18n)
      el.innerHTML = lnText[el.dataset.i18n];
  });
};

changeLn("cn");
