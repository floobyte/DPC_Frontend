const eventForm = document.getElementById("eventForm");

eventForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const token = localStorage.getItem("token");

  if (!token) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("Please log in to create a course.");
    return;
  }

  const formData = new FormData(eventForm);

  if (!formData.has("image")) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("Please provide an image for the event.");
    return;
  }

  try {
    const response = await fetch(
      "https://garb-prawn.cyclic.app/api/event/create",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.ok) {
      alertify.set("notifier", "position", "top-right");
      alertify.success("Event created successfully!");
      eventForm.reset();
    } else if (response.status === 400) {
      const errorData = await response.json();
      console.error("Validation error:", errorData);
    } else {
      alertify.set("notifier", "position", "top-right");
      alertify.error("Event creation failed. Please try again.");
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("An error occurred. Please try again.");
    console.error(error);
  }
});
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
