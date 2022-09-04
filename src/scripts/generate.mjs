import { polyfill } from "@astropub/webapi";
import { loadEnv } from "vite";
const { STRAPI_TOKEN, STRAPI_ADMIN } = loadEnv("production", process.cwd(), "");

polyfill(globalThis, {
  exclude: "window document",
});

const BASE_URL = "http://localhost:1337/api";

const fetchAPI = async (url, method = "GET") => {
  const headers = {
    Authorization: `bearer ${STRAPI_TOKEN}`,
  };
  const res = await fetch(url, {
    method,
    headers,
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
};

const res = await fetchAPI(`${BASE_URL}/components?populate=*`);
console.log(JSON.stringify(res, null, 2));

const pages = res.map((obj) => {
  return obj.attributes.Page;
});

console.log(JSON.stringify(pages, null, 2));

const fetchPostAPI = async (url, method = "GET", data) => {
  const headers = {
    "Content-Type": "application/json",

    Authorization: `bearer ${STRAPI_ADMIN}`,
  };
  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
};

// const resPost = await fetchPostAPI(`${BASE_URL}/menus/3`, "PUT", {
//   data: {
//     title: "test",
//     items: [
//       {
//         title: "testeste",
//         url: "/test",
//         target: "_self",
//       },
//     ],
//   },
// });

// console.log(resPost);
