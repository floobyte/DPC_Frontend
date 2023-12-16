var navLinks = document.getElementById("navLinks");

function showmenu() {
  navLinks.style.right = "0";
}
function hidemenu() {
  navLinks.style.right = "-200px";
}

const row = document.querySelector(".row");

fetch("https://garb-prawn.cyclic.app/api/course/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((course) => {
      const courseDiv = document.createElement("div");
      courseDiv.classList.add("course-col");

      const courseName = document.createElement("h1");
      courseName.textContent = course.name;

      const courseDescription = document.createElement("p");
      courseDescription.textContent = course.description;

      const courseDuration = document.createElement("p");
      courseDuration.textContent = `Duration: ${course.duration}`;

      const startDate = new Date(course.enrollmentDateFrom).toDateString();
      const endDate = new Date(course.enrollmentDateTill).toDateString();

      const courseEnrollmentDate = document.createElement("p");
      courseEnrollmentDate.textContent = `Enrollment Date: ${startDate} to ${endDate}`;

      const courseFee = document.createElement("h3");
      courseFee.textContent = `Fee: Rs. ${course.fee}`;

      courseDiv.appendChild(courseName);
      courseDiv.appendChild(courseDescription);
      courseDiv.appendChild(courseDuration);
      courseDiv.appendChild(courseEnrollmentDate);
      courseDiv.appendChild(courseFee);

      row.appendChild(courseDiv);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
const notificationList = document.getElementById("notifications");

fetch("https://garb-prawn.cyclic.app/api/notification/all")
  .then((response) => response.json())
  .then((notifications) => {
    notifications.forEach((notification) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const noticeDiv = document.createElement("div");
      noticeDiv.className = "datenews";

      noticeDiv.textContent = notification.notice;

      a.appendChild(noticeDiv);
      li.appendChild(a);
      notificationList.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Error fetching notifications:", error);
  });
