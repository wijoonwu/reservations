let reservations = [];

function addReservation() {
  const time = document.getElementById("timeInput").value;
  const name = document.getElementById("nameInput").value;
  if (!time || !name) {
    alert("Please fill in both time and name.");
    return;
  }
  reservations.push({ time, name });
  updateReservationsList();
  document.getElementById("timeInput").value = "";
  document.getElementById("nameInput").value = "";
}

function updateReservationsList() {
  const listElement = document.getElementById("reservationsList");
  listElement.innerHTML = "";
  reservations.forEach((reservation) => {
    const reservationElement = document.createElement("div");
    reservationElement.textContent = `Time: ${reservation.time}, Name: ${reservation.name}`;
    listElement.appendChild(reservationElement);
  });
}
