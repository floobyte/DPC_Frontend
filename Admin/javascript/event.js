const newsFeed = document.getElementById("news-feed");

const apiUrl = "https://garb-prawn.cyclic.app/api/event/all";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.sort(
      (a, b) => new Date(b.createDateTime) - new Date(a.createDateTime)
    );
    data.forEach((item) => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("xyz-item");

      const newsContent = `
        <div class="news-content">
          <h2 class="xyz-title">${item.title}</h2>
          <p class="xyz-text">${new Date(
            item.createDateTime
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}</p>
          ${
            item.imageUrl
              ? `<img class="xyz-image" src="${item.imageUrl}" alt="${item.title}">`
              : ""
          }
          <p class="xyz-description">${item.description}</p>
        </div>

      `;

      newsItem.innerHTML = newsContent;

      const deleteIcon = document.createElement("span");
      deleteIcon.classList.add("delete-icon");
      deleteIcon.innerHTML = "&#x2716;";

      deleteIcon.addEventListener("click", (event) => {
        event.stopPropagation();

        alertify.confirm(
          "Confirmation",
          "Are you sure you want to delete this event?",
          () => {
            const itemId = item._id;
            if (itemId) {
              deleteEvent(itemId);
              newsItem.remove();
            } else {
              console.error("Event ID is undefined.");
            }
          },
          () => {}
        );
      });

      newsItem.appendChild(deleteIcon);

      newsFeed.appendChild(newsItem);
    });
  })
  .catch((error) => console.error(error));

function deleteEvent(eventId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("Please log in to create a course.");
    return;
  }

  const deleteUrl = `https://garb-prawn.cyclic.app/api/event/delete/${eventId}`;

  fetch(deleteUrl, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Event ${eventId} deleted successfully.`);
      } else {
        console.error(`Failed to delete event ${eventId}.`);
      }
    })
    .catch((error) => console.error(`Error deleting event ${eventId}:`, error));
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
