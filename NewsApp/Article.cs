using System.Text.Json.Serialization;

namespace NewsApp
{
    public class Article
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }

        [JsonPropertyName("urlToImage")]
        public string UrlToImage { get; set; }
    }
}
