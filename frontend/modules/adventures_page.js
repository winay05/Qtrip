import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=")[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let adventures = null;
  try {
    adventures = await (
      await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    ).json();
    // console.log(adventures);
  } catch (err) {
    console.log(err);
  } finally {
    return adventures;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // console.log(adventures);
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  // <div class="col-6 col-md-3">
  //   <a href="/pages/adventures/resort/">
  //     <div class="card adventure-card">
  //       <div class="embed-responsive embed-responsive-1by1">
  //         <img
  //           class="card-img-top embed-responsive-item"
  //           src="/assets/adventures/resort.jpg"
  //           alt="resort-img"
  //         />
  //       </div>
  //       <!-- <img src="/assets/adventures/resort.jpg" class="img-card-top img-fluid" alt="resort-img"> -->
  //       <div class="card-text">
  //         <p>Resort</p>
  //         <p>$1200</p>
  //       </div>
  //     </div>
  //   </a>
  // </div>

  // }
  adventures.forEach((curAdventure) => {
    let parent = document.getElementById("data");
    // parent.style="display: flex;justify-content: space-between;overflow:hidden;"

    let col = document.createElement("div");
    col.className = "col-6 col-md-3 mb-4";
    parent.appendChild(col);

    let categoryBanner = document.createElement("p");
    categoryBanner.className = "category-banner";
    categoryBanner.innerHTML = curAdventure.category;

    // col.appendChild(categoryBanner);

    let link = document.createElement("a");
    link.href = `detail/?adventure=${curAdventure.id}`;
    link.id = curAdventure.id;
    col.appendChild(link);

    link.appendChild(categoryBanner);
    let card = document.createElement("div");
    card.className = "card activity-card";
    link.appendChild(card);

    // let imgDiv = document.createElement('div');
    // imgDiv.className = 'embed-responsive embed-responsive-4by3';

    let img = document.createElement("img");
    img.className = "card-img top img-fluid";
    img.src = curAdventure.image;
    // imgDiv.appendChild(img);

    // card.appendChild(imgDiv);
    card.appendChild(img);

    let textRow1 = document.createElement("div");
    textRow1.className = "mx-2 mb-0 d-flex justify-content-between";

    card.appendChild(textRow1);
    let p1 = document.createElement("p");
    p1.innerHTML = curAdventure.name;
    let p2 = document.createElement("p");
    p2.innerHTML = ` ₹${curAdventure.costPerHead}`;
    textRow1.appendChild(p1);
    textRow1.appendChild(p2);

    let textRow2 = document.createElement("div");
    textRow2.className = "mx-2 mb-0 d-flex justify-content-between";

    card.appendChild(textRow2);
    let p3 = document.createElement("p");
    p3.innerHTML = "Duration";
    let p4 = document.createElement("p");
    p4.innerHTML = `${curAdventure.duration} Hours`;
    textRow2.appendChild(p3);
    textRow2.appendChild(p4);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(
    (adventure) => adventure.duration >= low && adventure.duration <= high
  );
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((adventure) => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let newList = list;
  if (filters.category.length > 0) {
    newList = filterByCategory(newList, filters.category);
  }
  if (filters.duration.length > 0) {
    let rg = filters.duration.split("-");
    newList = filterByDuration(newList, parseInt(rg[0]), parseInt(rg[1]));
  }
  // Place holder for functionality to work in the Stubs
  return newList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let filters = localStorage.getItem("filters")
    ? JSON.parse(localStorage.getItem("filters"))
    : null;
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  let parent = document.getElementById("category-list");

  filters.category.forEach((el) => {
    let pill = document.createElement("span");
    pill.className = "category-filter alert";
    pill.innerText = el;

    //using jquery to add close button
    $(pill).append(
      `<button type="button" data-dismiss="alert" class="close" aria-label="Close" onClick="removePill(event)" >
      <span aria-hidden="true">&times;</span>
    </button>`
      //   //   // `<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>`
    );
    parent.appendChild(pill);

    // pill.append(`<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>`);
    // document.createElement("button").createAttribute("data-dismiss", "close");
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
