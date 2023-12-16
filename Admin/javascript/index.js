function createCourseElement(course) {
  const courseCol = document.createElement("div");
  courseCol.className = "course-col";

  const nameElement = document.createElement("h1");
  nameElement.textContent = course.name;
  courseCol.appendChild(nameElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = course.description;
  courseCol.appendChild(descriptionElement);

  const durationElement = document.createElement("p");
  durationElement.textContent = `Duration: ${course.duration}`;
  courseCol.appendChild(durationElement);

  const enrollmentDatesElement = document.createElement("p");
  enrollmentDatesElement.textContent = `Enrollment Dates: ${course.enrollmentDateFrom} to ${course.enrollmentDateTill}`;
  courseCol.appendChild(enrollmentDatesElement);

  const feeElement = document.createElement("h2");
  feeElement.textContent = `Fee: ${course.fee}`;
  courseCol.appendChild(feeElement);

  return courseCol;
}

// Function to fetch and display all courses
async function displayCourses() {
  try {
    const response = await fetch(
      "https://garb-prawn.cyclic.app/api/course/all"
    );
    if (!response.ok) {
      throw new Error("Failed to retrieve course data.");
    }

    const courses = await response.json();
    const courseList = document.getElementById("courseList");

    courses.forEach((course) => {
      const courseElement = createCourseElement(course);
      courseList.appendChild(courseElement);
    });
  } catch (error) {
    console.error(error);
  }
}

// Call the function to display courses
displayCourses();
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
