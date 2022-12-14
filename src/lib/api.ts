const BASE_URL = "http://localhost:1337/api";

// https://strapi-production-9ef0.up.railway.app/admin

const { STRAPI_TOKEN } = import.meta.env;

const fetchAPI = async (url) => {
  const headers = {
    Authorization: `bearer ${STRAPI_TOKEN}`,
  };
  const res = await fetch(url, {
    method: "GET",
    headers,
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
};

export const getAllPagesWithSlugs = async () => {
  const data = await fetchAPI(`${BASE_URL}/components?populate=*`);
  return data;
};

export const getMenu = async () => {
  const data = await fetchAPI(`${BASE_URL}/menus?nested&populate=*`);
  return data;
};
