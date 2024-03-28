document.addEventListener("DOMContentLoaded", function () {
  generateCalendar();
});

let reservations = {};

function generateCalendar() {
  const calendar = document.getElementById("calendar");
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstDayOfWeek = firstDay.getDay();

  calendar.innerHTML = ""; // 이전에 생성된 달력이 있다면 초기화

  // 달력의 시작 요일 조정
  for (let i = 0; i < firstDayOfWeek; i++) {
    const spacer = document.createElement("div");
    spacer.classList.add("day");
    calendar.appendChild(spacer);
  }

  // 달력 날짜 채우기
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;
    dayElement.addEventListener("click", function () {
      const dateString = `${year}-${month + 1}-${day}`;
      openModal(dateString);
    });
    calendar.appendChild(dayElement);
  }
}

function openModal(date) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  const saveButton = document.querySelector("#modal .save-button");
  saveButton.onclick = function () {
    saveReservation(date);
  };
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function saveReservation(date) {
  const name = document.getElementById("nameInput").value;
  const time = document.getElementById("timeInput").value;
  if (!name || !time) {
    alert("Both name and time are required.");
    return;
  }

  if (!reservations[date]) {
    reservations[date] = [];
  }
  reservations[date].push({ name, time });

  closeModal();
  alert("Reservation saved!");
  // 여기서 달력을 다시 그리거나 예약된 정보를 표시하는 로직을 추가할 수 있습니다.
}

// 모달 닫기 버튼에 대한 이벤트 리스너 추가
document.querySelector(".close-button").addEventListener("click", function () {
  closeModal();
});
