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
                            <a href="https://norprojects.com/" target="_blank">
                                <img src="https://media.licdn.com/dms/image/v2/D4D22AQE0pvhE330JFw/feedshare-shrink_800/B4DZyFsAHyHcAg-/0/1771769431226?e=2147483647&v=beta&t=sanp4CSbBmBWh5B-PyzRGHnKYmu5vFEs4c_rkcQzi3k" alt="Nor Projects Ad">
                            </a>
                            <p>
                                Nor Projects LLC is an Armenian furniture manufacturing and retail solutions company
                                with a strong presence both locally and internationally. Founded in 2018, the company
                                has grown into a reputable producer of custom furniture and retail shop-fitting solutions,
                                working with well-known global brands and exporting its products across Europe and the CIS.
                            </p>
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