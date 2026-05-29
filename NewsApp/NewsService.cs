namespace NewsApp
{
    using Microsoft.AspNetCore.Mvc;
    using System.Text.Json;

    public class NewsService
    {
        private readonly HttpClient _httpClient;

        public NewsService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        [HttpGet("search")]
        public async Task<List<Article>> SearchNews(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                throw new ArgumentException("Query cannot be empty");

            var apiKey = "963c936e27a0434e9a0ea1ac101c0e76";
            var baseUrl = "https://newsapi.org/v2/";

            // Encode query properly
            var encodedQuery = Uri.EscapeDataString(query);

            var url = $"{baseUrl}everything?q={encodedQuery}&sortBy=publishedAt&language=en&apiKey={apiKey}";

            var response = await _httpClient.GetAsync(url);

            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                // Log the full error message
                throw new Exception($"News API Error: {response.StatusCode}, {content}");
            }

            var news = JsonSerializer.Deserialize<NewsResponse>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return news?.Articles ?? new List<Article>();
        }
    }
}
