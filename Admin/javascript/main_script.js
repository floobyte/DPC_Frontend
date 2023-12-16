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
      courseDiv.classList.add("course-col", "position-relative");

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

      const deleteIconContainer = document.createElement("div");
      deleteIconContainer.classList.add("position-absolute", "top-0", "end-0");

      const deleteIcon = document.createElement("span");
      deleteIcon.classList.add("delete-icon");
      deleteIcon.innerHTML = "&#x2716;";

      deleteIcon.addEventListener("click", (event) => {
        event.stopPropagation();

        alertify.confirm(
          "Confirmation",
          "Are you sure you want to delete this course?",
          () => {
            deleteCourse(course._id);
            courseDiv.remove();
          },
          () => {}
        );
      });

      deleteIconContainer.appendChild(deleteIcon);
      courseDiv.appendChild(deleteIconContainer);

      row.appendChild(courseDiv);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function deleteCourse(courseId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("Please log in to delete a course.");
    return;
  }

  const deleteUrl = `https://garb-prawn.cyclic.app/api/course/delete/${courseId}`;

  fetch(deleteUrl, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Course ${courseId} deleted successfully.`);
      } else {
        console.error(`Failed to delete course ${courseId}.`);
      }
    })
    .catch((error) =>
      console.error(`Error deleting course ${courseId}:`, error)
    );
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://garb-prawn.cyclic.app/api/notification/all"
    );
    const notifications = await response.json();

    const newsContainer = document.getElementById("newsContainer");
    const marqueeElement = newsContainer.querySelector("marquee");
    const uls = document.createElement("ul");

    notifications.forEach((notification) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      const datenews = document.createElement("div");
      datenews.setAttribute("class", datenews);

      anchor.href = notification.newsUrl;
      anchor.textContent = notification.news;
      datenews.className = "datenews";
      anchor.appendChild(datenews);
      listItem.appendChild(anchor);
      uls.appendChild(listItem);
      marqueeElement.appendChild(uls);
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
});
