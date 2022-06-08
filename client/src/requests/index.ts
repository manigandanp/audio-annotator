import axios from "axios";

const get = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(`[Fetch Failed] for ${url} with ${err}`));

const post = (url: string, data: any) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(`[POST Failed] for ${url} with ${err}`));

const update = (url: string, data: any) =>
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(`[PATCH Failed] for ${url} with ${err}`));

const postFormData = (url: string, data: FormData) =>
  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => console.log(`[POST Failed] for ${url} with ${err}`));

const remove = (url: string, data: object) =>
  fetch(url, { method: "DELETE" })
    .then((data) => data.json())
    .catch((err) => console.log(`[Delete Failed] ${url} with ${err}`));

// Not able to download files with fetch (filename headers is not available in cors)
const download = (url: string) =>
  axios
    .get(url, { responseType: "blob" })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", res.headers["x-filename"]);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    })
    .catch((err) => console.log(`[Fetch Failed] for ${url} with ${err}`));

export { get, post, postFormData, remove, download, update };
