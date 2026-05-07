
namespace NewsApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Register HttpClient for NewsService with User-Agent
            builder.Services.AddHttpClient<NewsService>(client =>
            {
                client.DefaultRequestHeaders.UserAgent.ParseAdd("NewsApp/1.0 (https://example.com)");
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Serve static files from wwwroot
            app.UseStaticFiles();

            app.UseHttpsRedirection();
            app.UseAuthorization();

            // Map API controllers
            app.MapControllers();

            app.Run();
        }
    }
}
