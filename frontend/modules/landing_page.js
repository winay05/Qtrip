import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let cities = null;
  try {
    cities = await (await fetch(`${config.backendEndpoint}/cities`)).json();
  } catch (err) {
    console.log(err);
  } finally {
    return cities;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  // row
  //   col
  //     a
  //       card
  //         card-img
  //         card-txt

  //row element
  let parent = document.getElementById("data");

  //col element
  let div = document.createElement("div");
  div.className = "col-6 col-md-3";

  let link = document.createElement("a");
  link.href = `./pages/adventures/?city=${id}`;
  link.id = id;
  //card to be put inside col
  let card = document.createElement("div");
  card.className = "tile";
  // card.id=id;

  link.appendChild(card);
  div.appendChild(link);
  parent.appendChild(div);

  // card img
  let img = document.createElement("img");
  img.src = image;
  img.className = "img-fluid";
  card.appendChild(img);

  //card text
  let tileTxt = document.createElement("div");
  tileTxt.className = "tile-text";
  card.appendChild(tileTxt);

  let h5 = document.createElement("h5");
  h5.innerText = city;
  tileTxt.appendChild(h5);

  let p = document.createElement("p");
  p.innerText = description;
  tileTxt.appendChild(p);
}

export { init, fetchCities, addCityToDOM };
