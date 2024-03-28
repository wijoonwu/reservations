document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  generateCalendar(currentYear, currentMonth);

  document.querySelector(".close-button").addEventListener("click", closeModal);
});

const reservations = {
  // 예시 예약 데이터
  // "2024-4-20": [{ name: "Alice", time: "10:00" }, { name: "Bob", time: "14:00" }]
};

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
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill in the blanks for days of previous month
  for (let i = 0; i < firstDay; i++) {
    const blankDay = document.createElement("div");
    calendar.appendChild(blankDay);
  }

  // Fill in the days and reservations
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.innerHTML = `<strong>${day}</strong>`;

    const dateStr = `${year}-${month + 1}-${day}`;
    if (reservations[dateStr]) {
      const reservationsList = document.createElement("ul");
      reservations[dateStr].forEach((res) => {
        const li = document.createElement("li");
        li.textContent = `${res.name}, ${res.time}`;
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
    const name = document.getElementById("nameInput").value;
    const time = document.getElementById("timeInput").value;
    if (!name || !time) {
      alert("Both name and time are required.");
      return;
    }

    if (!reservations[dateStr]) {
      reservations[dateStr] = [];
    }
    reservations[dateStr].push({ name, time });
    document.getElementById("nameInput").value = ""; // Clear input after saving
    document.getElementById("timeInput").value = ""; // Clear input after saving
    closeModal();
    generateCalendar(new Date().getFullYear(), new Date().getMonth()); // Refresh calendar
  };
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
