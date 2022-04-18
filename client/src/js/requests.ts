import $ from "jquery";

const get = (url: string, successCb: Function) =>
  fetch(url)
    .then((data) => data.json())
    .then((data) => successCb(data))
    .catch((err) => console.log(`[Fetch Failed] ${url} with ${err}`));

const post = (url: string, data: any, successCb: Function) => {
  console.log(data);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => successCb(data))
    .catch((err) => console.log(`[Fetch Failed] ${url} with ${err}`));
  //   $.ajax({ method: "POST", url: url, data: data, success: successCb });
};
const remove = (url: string, data: object, successCb: Function) =>
  $.ajax({ method: "DELETE", url: url, data: data, success: successCb });

export { get, post, remove };
