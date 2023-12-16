document.addEventListener("DOMContentLoaded", () => {
  const notificationsTable = document.getElementById("notifications-table");

  fetch("https://garb-prawn.cyclic.app/api/notification/all")
    .then((response) => response.json())
    .then((notifications) => {
      if (notifications.length === 0) {
        const noNotificationsMessage = document.createElement("p");
        noNotificationsMessage.textContent =
          "There are no notifications available. Please add one.";

        notificationsTable.appendChild(noNotificationsMessage);
        return;
      }

      const table = document.createElement("table");

      const tableHeader = `
              <tr>
                <th>Srl No.</th>
                <th>News</th>
                <th>Actions</th>
              </tr>
            `;
      table.innerHTML = tableHeader;

      let serialNumber = 1;

      notifications.forEach((notification) => {
        const row = document.createElement("tr");

        const serialNoCell = document.createElement("td");
        serialNoCell.textContent = serialNumber++;
        row.appendChild(serialNoCell);

        const newsCell = document.createElement("td");
        newsCell.textContent = notification.news;
        row.appendChild(newsCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          alertify.confirm(
            "Confirmation",
            "Are you sure you want to delete this notification?",
            () => {
              const token = localStorage.getItem("token");

              if (!token) {
                alertify.set("notifier", "position", "top-right");
                alertify.error("Please log in to create a course.");
                return;
              }

              fetch(
                `https://garb-prawn.cyclic.app/api/notification/delete/${notification._id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: token,
                  },
                }
              )
                .then((response) => {
                  if (response.ok) {
                    row.remove();

                    alertify.set("notifier", "position", "top-right");
                    alertify.success("Notification deleted successfully.");
                  } else {
                    console.error(
                      `Failed to delete notification: ${notification._id}`
                    );

                    alertify.set("notifier", "position", "top-right");
                    alertify.error(
                      "Failed to delete notification. Please try again."
                    );
                  }
                })
                .catch((error) => {
                  console.error(
                    `Error deleting notification: ${notification._id}`,
                    error
                  );

                  alertify.set("notifier", "position", "top-right");
                  alertify.error(
                    "An error occurred while deleting the notification."
                  );
                });
            },
            () => {}
          );
        });
        row.appendChild(deleteCell);
        deleteCell.appendChild(deleteButton);

        table.appendChild(row);
      });

      notificationsTable.appendChild(table);
    })
    .catch((error) => {
      console.error("Error fetching notifications:", error);
    });
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
