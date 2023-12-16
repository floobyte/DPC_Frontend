const newsFeed = document.getElementById("news-feed");

// Replace with your actual API URL
const apiUrl = "https://garb-prawn.cyclic.app/api/event/all";

// Fetch data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.sort(
      (a, b) => new Date(b.createDateTime) - new Date(a.createDateTime)
    );
    data.forEach((item) => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("xyz-item");

      if (item.imageUrl === "" || !item.imageUrl) {
        const newsContent = `
                <div>
                    <h2 class="xyz-title">${item.title}</h2>
                    <p class="xyz-text">${new Date(
                      item.createDateTime
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}</p>
                    <p class="xyz-description">${item.description}</p>
                </div>

            `;
        newsItem.innerHTML = newsContent;
        newsFeed.appendChild(newsItem);
      } else {
        const newsContent = `
        <div>
            <h2 class="xyz-title">${item.title}</h2>
            <p class="xyz-text">${new Date(
              item.createDateTime
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}</p>
            <img class="xyz-image" src="${item.imageUrl}" alt="${item.title}">
            <p class="xyz-description">${item.description}</p>
        </div>

    `;

        newsItem.innerHTML = newsContent;
        newsFeed.appendChild(newsItem);
      }
    });
  })
  .catch((error) => console.error(error));
