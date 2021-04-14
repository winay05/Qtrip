import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let reservations = null;
  try {
    reservations = await (
      await fetch(`${config.backendEndpoint}/reservations/`)
    ).json();
  } catch (err) {
    console.log(err);
  } finally {
    // console.log(reservations);
    return reservations;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if (reservations.length < 1) {
    document
      .getElementById("no-reservation-banner")
      .setAttribute("style", "display:block");

    document
      .getElementById("reservation-table-parent")
      .setAttribute("style", "display:none");
  } else {
    document
      .getElementById("no-reservation-banner")
      .setAttribute("style", "display:none");

    document
      .getElementById("reservation-table-parent")
      .setAttribute("style", "display:block");
  }

  let parent = document.getElementById("reservation-table");

  reservations.forEach((el) => {
    let row = document.createElement("tr");

    let transactionId = document.createElement("td");
    transactionId.innerHTML = el.id;
    row.appendChild(transactionId);

    let bookingName = document.createElement("td");
    bookingName.innerHTML = el.name;
    row.appendChild(bookingName);

    let adventure = document.createElement("td");
    adventure.innerHTML = el.adventureName;
    row.appendChild(adventure);

    let noPersons = document.createElement("td");
    noPersons.innerHTML = el.person;
    row.appendChild(noPersons);

    let dt = document.createElement("td");
    dt.innerHTML = new Date(el.date).toLocaleDateString("en-IN");
    row.appendChild(dt);

    let price = document.createElement("td");
    price.innerHTML = el.price;
    row.appendChild(price);

    let bookingTime = document.createElement("td");
    let options = {
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    bookingTime.innerHTML = Intl.DateTimeFormat("en-IN", options).format(
      new Date(el.time)
    );
    row.appendChild(bookingTime);

    // row
    //   td
    //     btn
    //       actionButton(having link)

    let action = document.createElement("td");

    let btn = document.createElement("button");
    btn.role = "button";
    btn.className = "button reservation-visit-button";
    btn.id = el.id;

    let actionButton = document.createElement("a");
    actionButton.href = `/pages/adventures/detail/?adventure=${el.adventure}`;
    actionButton.innerHTML = "Visit Adventure";

    btn.appendChild(actionButton);
    action.appendChild(btn);
    row.appendChild(action);

    parent.appendChild(row);
  });
}

export { fetchReservations, addReservationToTable };
