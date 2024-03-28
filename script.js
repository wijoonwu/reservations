document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  generateCalendar(currentYear, currentMonth);

  const closeModalButton = document.querySelector(".close-button");
  closeModalButton.addEventListener("click", closeModal);
});

const reservations = {};

function generateCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // Clear existing calendar

  // Days of the week headers
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysOfWeek.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    calendar.appendChild(dayElement);
  });

  // Get the first day of the month
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill in the blanks for days of previous month
  for (let i = 0; i < firstDay; i++) {
    const blankDay = document.createElement("div");
    calendar.appendChild(blankDay);
  }

  // Fill in the days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.className = "day";
    const dateStr = `${year}-${month + 1}-${day}`;

    dayElement.addEventListener("click", () => openModal(dateStr));

    if (reservations[dateStr]) {
      reservations[dateStr].forEach((reservation) => {
        const reservationDiv = document.createElement("div");
        reservationDiv.textContent = `${reservation.name}, ${reservation.time}`;
        dayElement.appendChild(reservationDiv);
      });
    }

    calendar.appendChild(dayElement);
  }
}

function openModal(dateStr) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  const saveButton = document.querySelector(".save-button");
  saveButton.onclick = () => saveReservation(dateStr);
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function saveReservation(dateStr) {
  const name = document.getElementById("nameInput").value;
  const time = document.getElementById("timeInput").value;

  if (!reservations[dateStr]) {
    reservations[dateStr] = [];
  }

  reservations[dateStr].push({ name, time });
  closeModal();
  generateCalendar(new Date().getFullYear(), new Date().getMonth());
}
