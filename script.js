document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  generateCalendar(today.getFullYear(), today.getMonth());

  document.querySelector(".close-button").addEventListener("click", closeModal);
});

const reservations = {};

function generateCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // Clear the calendar

  // Create the days of the week headers
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysOfWeek.forEach((day) => {
    const dayHeader = document.createElement("div");
    dayHeader.textContent = day;
    calendar.appendChild(dayHeader);
  });

  // Calculate the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Calculate what day of the week the month starts on
  const firstDayOfMonth = new Date(year, month).getDay();

  // Add blanks for the days of the week before the first of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const blankDay = document.createElement("div");
    calendar.appendChild(blankDay);
  }

  // Fill in the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.innerHTML = `<strong>${day}</strong>`;

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    // Check if there are reservations for this day
    if (reservations[dateStr]) {
      const reservationsList = document.createElement("ul");
      reservations[dateStr].forEach((res) => {
        const li = document.createElement("li");
        li.textContent = `${res.name} at ${res.time}`;
        reservationsList.appendChild(li);
      });
      dayElement.appendChild(reservationsList);
    }

    dayElement.addEventListener("click", () => openModal(dateStr));
    calendar.appendChild(dayElement);
  }
}

function openModal(dateStr) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  document.querySelector(".save-button").onclick = () => {
    const name = document.getElementById("nameInput").value.trim();
    const time = document.getElementById("timeInput").value.trim();
    if (!name || !time) {
      alert("Please enter both a name and a time.");
      return;
    }

    if (!reservations[dateStr]) {
      reservations[dateStr] = [];
    }

    reservations[dateStr].push({ name, time });
    closeModal();
    generateCalendar(new Date().getFullYear(), new Date().getMonth());
  };
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("nameInput").value = "";
  document.getElementById("timeInput").value = "";
}
