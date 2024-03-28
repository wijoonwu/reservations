document.addEventListener("DOMContentLoaded", function () {
  generateCalendar(new Date());
});

let reservations = {};

function generateCalendar(date) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // 달력 초기화

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 달의 첫 번째 날이 시작하는 요일을 찾아서 공백으로 채웁니다.
  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    const spacer = document.createElement("div");
    spacer.classList.add("day");
    calendar.appendChild(spacer);
  }

  // 실제 날짜를 달력에 추가합니다.
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    dayElement.addEventListener("click", () => openModal(fullDate));
    calendar.appendChild(dayElement);

    // 예약된 정보가 있으면 표시
    if (reservations[fullDate]) {
      const reservationInfo = document.createElement("div");
      reservationInfo.textContent = `${reservations[fullDate].name} (${reservations[fullDate].time})`;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        deleteReservation(fullDate);
      };
      reservationInfo.appendChild(deleteButton);
      dayElement.appendChild(reservationInfo);
    }
  }
}

function openModal(date) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  // 예약 저장 버튼에 날짜 바인딩
  const saveButton = modal.querySelector("button");
  saveButton.onclick = function () {
    saveReservation(date);
  };
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("nameInput").value = ""; // 입력 필드 초기화
  document.getElementById("timeInput").value = ""; // 입력 필드 초기화
}

function saveReservation(date) {
  const name = document.getElementById("nameInput").value;
  const time = document.getElementById("timeInput").value;
  if (!name || !time) {
    alert("Please fill in both name and time.");
    return;
  }

  reservations[date] = { name, time };
  closeModal();
  generateCalendar(new Date(date));
}

function deleteReservation(date) {
  delete reservations[date];
  generateCalendar(new Date(date));
}
