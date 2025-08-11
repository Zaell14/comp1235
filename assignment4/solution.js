"use strict";

/**
 * Assignment 4 - solution.js
 * Implementations of 5 Async/Await functions
 */

/* =========================
   Async Function 1: Random Number
   getRandomNumber() -> resolves (after 0.5s) to an int in [1..5]
   ========================= */
async function getRandomNumber() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const num = Math.floor(Math.random() * 5) + 1; // 1..5
      resolve(num);
    }, 500);
  });
}

/* =========================
   Async Function 2: getNationality(name)
   Returns most probable nationality code (e.g., "GR")
   ========================= */
async function getNationality(name) {
  const url = `https://api.nationalize.io/?name=${encodeURIComponent(name)}`;
  const res = await fetch(url);
  const data = await res.json();

  // Pick the country with the highest probability
  const best = (data.country || []).reduce(
    (max, c) => (c.probability > (max?.probability ?? -1) ? c : max),
    null
  );

  return best ? best.country_id : null;
}

/* =========================
   Async Function 3: fetchProducts(id)
   Returns the product title, or error string per spec
   ========================= */
async function fetchProducts(id) {
  const url = `https://dummyjson.com/products/${encodeURIComponent(id)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data.title;
  } catch (error) {
    return `Could not get products: Error: ${error.message || error}`;
  }
}

/* =========================
   Async Function 4: searchStorePrice(product_name)
   Fetches inventory JSON and returns the price of the named product.
   Uses Array.prototype.find() and required error message format.
   ========================= */
async function searchStorePrice(product_name) {
  const url =
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const inventory = await res.json(); // array of { name, price }
    const item = inventory.find(
      (p) => p.name.toLowerCase() === String(product_name).toLowerCase()
    );
    // Return the numeric price (spec examples show numbers like 1.89)
    return item ? Number(item.price) : undefined;
  } catch (error) {
    return `Could not get products ${error.message || error}`;
  }
}

/* =========================
   Async Function 5: getStarWarsCharacters()
   Returns: { characters: { [name]: url } }
   Must use forEach()
   ========================= */
const getStarWarsCharacters = async () => {
  const url = "https://swapi.dev/api/people/";
  const res = await fetch(url);
  const data = await res.json(); // { results: [...] }

  const characters = {};
  (data.results || []).forEach((person) => {
    characters[person.name] = person.url;
  });

  return { characters };
};

/* Exports for testing */
module.exports = {
  getRandomNumber,
  getNationality,
  fetchProducts,
  searchStorePrice,
  getStarWarsCharacters,
};
