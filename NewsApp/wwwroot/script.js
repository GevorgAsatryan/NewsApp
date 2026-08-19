const apiBase = "/api/news";

// Search news
async function searchNews(defaultQuery = null) {
    const query = defaultQuery || document.getElementById("query").value.trim();

    if (!query) {
        return alert("Please enter a search term");
    }

    try {
        const response = await fetch(
            `${apiBase}/search?q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        displayNews(data);
    } catch (err) {
        console.error(err);
        document.getElementById("newsContainer").innerHTML =
            "<p>Error loading search results.</p>";
    }
}

// Display news grid
function displayNews(articles) {
    const container = document.getElementById("newsContainer");
    container.innerHTML = "";

    if (!articles || articles.length === 0) {
        container.innerHTML = "<p>No news found.</p>";
        return;
    }

    articles.forEach((article, index) => {
        const card = document.createElement("div");

        // Inline ad every 10 articles
        if (index > 0 && index % 10 === 0) {
            const adCard = document.createElement("div");
            adCard.classList.add("news-card", "ad-card");
            adCard.innerHTML = `
                            <a href="https://www.coca-colacompany.com/" target="_blank">
                                <img src="https://i.pinimg.com/736x/01/03/63/0103631793d8792ece35481b46802605.jpg" alt="Coca Cola Ad">
                            </a>
                            <p>
                                We Refresh the World and Make a Difference
                               
                            </p>
                            <br>
                            <br>
                            <h1>Coca Cola</h1>
                            <br>
                            <h3>Ad</h3>
                        `;
            container.appendChild(adCard);
        }

        card.classList.add("news-card");
        card.innerHTML = `
                        ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News Image">` : ""}
                        <div class="news-content">
                            <h2>${article.title}</h2>
                            <p>${article.description || ""}</p>
                            <a href="${article.url}" target="_blank">Read More →</a>
                        </div>
                    `;

        container.appendChild(card);
    });
}

// Search when Enter key is pressed
document.getElementById("query").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchNews();
    }
});

// Automatically load World news when page opens
window.addEventListener("load", () => {
    document.getElementById("query").value = "";
    searchNews("World");
});