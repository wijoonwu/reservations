document.addEventListener("DOMContentLoaded", function () {
  generateCalendar();
});

let reservations = {};

function generateCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // 달력 초기화

  // 예시로 2024년 3월의 달력을 생성합니다. 실제 구현에서는 동적으로 현재 월을 계산해야 합니다.
  const daysInMonth = new Date(2024, 3, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;
    dayElement.addEventListener("click", () => openModal(day));
    calendar.appendChild(dayElement);

    // 예약된 정보가 있으면 표시
    if (reservations[day]) {
      const reservationInfo = document.createElement("span");
      reservationInfo.textContent = `${reservations[day].name} (${reservations[day].time})`;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        deleteReservation(day);
      };
      dayElement.appendChild(reservationInfo);
      dayElement.appendChild(deleteButton);
    }
  }
}

function openModal(day) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  // 예약 저장 버튼에 날짜 바인딩
  const saveButton = modal.querySelector("button");
  saveButton.onclick = function () {
    saveReservation(day);
  };
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("nameInput").value = ""; // 입력 필드 초기화
  document.getElementById("timeInput").value = ""; // 입력 필드 초기화
}

function saveReservation(day) {
  const name = document.getElementById("nameInput").value;
  const time = document.getElementById("timeInput").value;
  if (!name || !time) {
    alert("Please fill in both name and time.");
    return;
  }

  reservations[day] = { name, time };
  closeModal();
  generateCalendar(); // 달력 업데이트
}

function deleteReservation(day) {
  delete reservations[day];
  generateCalendar(); // 달력 업데이트
}
