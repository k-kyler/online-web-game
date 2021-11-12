using Microsoft.EntityFrameworkCore;
using OnlineWebGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineWebGame.Data
{
    public class GameOnlineContext : DbContext
    {
        public GameOnlineContext(DbContextOptions<GameOnlineContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserInfo> UserInfos { get; set; }

        
    }
}
