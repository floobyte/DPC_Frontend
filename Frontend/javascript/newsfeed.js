// newsfeed.js

// Define the API endpoint to fetch news
const apiEndpoint = "https://garb-prawn.cyclic.app/api/notification/all/";

// Fetch news from the API
fetch(apiEndpoint)
  .then((response) => response.json())
  .then((data) => {
    const newsList = document.querySelector(".news-list");

    // Loop through the fetched news data
    data.forEach((newsItem) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const divDateNews = document.createElement("div");
      divDateNews.className = "datenews";
      divDateNews.textContent = newsItem.type;

      a.href = newsItem.newsUrl;
      a.appendChild(divDateNews);

      li.appendChild(a);
      newsList.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Error fetching news:", error);
  });
