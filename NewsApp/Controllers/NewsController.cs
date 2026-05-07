
namespace NewsApp.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly NewsService _newsService;
        public NewsController(NewsService newsService) => _newsService = newsService;

        [HttpGet("search")]
        public async Task<IActionResult> SearchNews([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q)) return BadRequest("Query required");
            return Ok(await _newsService.SearchNews(q));
        }
    }
}
