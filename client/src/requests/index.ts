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

export { get, post, postFormData, remove };
