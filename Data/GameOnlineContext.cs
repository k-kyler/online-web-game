using Microsoft.EntityFrameworkCore;
using OnlineWebGame.Models;

namespace OnlineWebGame.Data
{
    public class GameOnlineContext : DbContext
    {
        public GameOnlineContext(DbContextOptions<GameOnlineContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserInfo> UserInfos { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
