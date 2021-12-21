using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OnlineWebGame.Data;
using OnlineWebGame.Hubs;

namespace OnlineWebGame
{
  public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Development
            services.AddDbContext<GameOnlineContext>(options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
            
            // Production
            // var host = Configuration["Host"] ?? "localhost";
            // var user = Configuration["User"] ?? "postgres";
            // var password = Configuration["Password"] ?? "postgres";
            // var port = Configuration["Port"] ?? "5433";
            // var database = Configuration["Database"] ?? "OnlineWebGame";

            // services.AddDbContext<GameOnlineContext>(options => options.UseNpgsql($"Host={host};Port={port};Database={database};User ID={user};Password={password}"));

            services.AddSignalR();

            services.AddSession();

            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapHub<ChatHub>("/hubs/chat");
                endpoints.MapHub<MultiplayerHub>("/hubs/multiplayer");
            });
        }
    }
}