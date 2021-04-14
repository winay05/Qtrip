import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  return search.split("=")[1];
  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let details;
  try {
    details = await (
      await fetch(
        `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
      )
    ).json();

    // console.log(details);
  } catch (err) {
    console.log(err);
    details = null;
  } finally {
    // Place holder for functionality to work in the Stubs
    // console.log(details);
    return details;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  let imgGallery = document.getElementById("photo-gallery");
  adventure.images.forEach((img) => {
    let div = document.createElement("div");

    let photo = document.createElement("img");
    div.append(photo);
    photo.src = img;
    photo.className = "img-fluid activity-card-image";

    imgGallery.append(div);
  });

  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  // parent
  //   carousel
  //     ol
  //       li....
  //     carouselInner
  //     a
  //       prevBtn
  //     a
  //       nextBtn

  let parent = document.getElementById("photo-gallery");
  parent.textContent = "";

  let carousel = document.createElement("div");
  carousel.id = "imageCarousel";
  carousel.className = "carousel slide";
  carousel.setAttribute("data-ride", "carousel");

  parent.appendChild(carousel);

  let ol = document.createElement("ol");
  ol.className = "carousel-indicators";
  for (let i = 0; i < images.length; ++i) {
    let li = document.createElement("li");
    li.setAttribute("data-target", "#imageCarousel");
    li.setAttribute("data-slide-to", `${i}`);

    if (i == 0) {
      li.className = "active";
    }
    ol.appendChild(li);
  }

  carousel.appendChild(ol);

  let carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";
  for (let i = 0; i < images.length; ++i) {
    let div = document.createElement("div");
    div.className = "carousel-item";
    let img = document.createElement("img");
    img.className = "d-block w-100 img-fluid activity-card-image";
    img.src = images[i];
    img.alt = `slide-${i + 1}`;

    if (i == 0) {
      div.className = "carousel-item active";
    }
    div.appendChild(img);
    carouselInner.appendChild(div);
  }
  carousel.appendChild(carouselInner);

  let prevBtn = document.createElement("a");
  prevBtn.setAttribute("data-slide", "prev");
  prevBtn.className = "carousel-control-prev";
  prevBtn.href = "#imageCarousel";
  prevBtn.role = "button";
  $(prevBtn)
    .append(`<span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="sr-only">Previous</span>`);

  let nextBtn = document.createElement("a");
  nextBtn.setAttribute("data-slide", "next");
  nextBtn.className = "carousel-control-next";
  nextBtn.href = "#imageCarousel";
  nextBtn.role = "button";
  $(nextBtn)
    .append(`<span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="sr-only">Next</span>`);

  carousel.appendChild(prevBtn);
  carousel.appendChild(nextBtn);

  parent.appendChild(carousel);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  document.getElementById("reservation-person-cost").innerHTML =
    adventure.costPerHead;

  // adventure.available
  //   ? document
  //       .getElementById("reservation-panel-sold-out")
  //       .setAttribute("style", "display:none")
  //   : document
  //       .getElementById("reservation-panel-available")
  //       .setAttribute("style", "display:none");

  if (adventure.available === true) {
    document.getElementById("reservation-panel-available").style.display =
      "block";

    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";

    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost fielddocument.getElementById('reservation-cost').innerHTML = adventure.costPerHead*persons;
  document.getElementById("reservation-cost").innerHTML =
    adventure.costPerHead * persons;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS

  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $("#myForm").on("submit", (e) => {
    e.preventDefault();
    // console.log(`${$("#myForm").serialize()}&adventure=${adventure.id}`);

    $.ajax({
      method: "POST",
      url: `${config.backendEndpoint}/reservations/new`,
      data: `${$("#myForm").serialize()}&adventure=${adventure.id}`,
      success: function (data, textStatus, jQxhr) {
        window.alert("Success!");
        window.location.reload();
      },
      error: function (jqXhr, textStatus, errorThrown) {
        window.alert("Failed!");
      },
    });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved === true) {
    $("#reserved-banner").css("display", "block");
  } else {
    $("#reserved-banner").css("display", "none");
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
