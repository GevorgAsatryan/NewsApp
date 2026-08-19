using Microsoft.Extensions.Options;
using NewsApp.Configuration;

namespace NewsApp
{
    using Microsoft.AspNetCore.Mvc;
    using System.Text.Json;

    public class NewsService
    {
        private readonly HttpClient _httpClient;
        private readonly ApiKeys _apiKeys;
        public NewsService(HttpClient httpClient, IOptions<ApiKeys> apiKeys)
        {
            _httpClient = httpClient;
            _apiKeys = apiKeys.Value;
        }

        [HttpGet("search")]
        public async Task<List<Article>> SearchNews(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                throw new ArgumentException("Query cannot be empty");

            var apiKey = _apiKeys.News;
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
