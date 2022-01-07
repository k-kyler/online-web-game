using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OnlineWebGame.DAO;
using OnlineWebGame.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineWebGame
{
    public class AutoUpdateStamina : IHostedService, IDisposable
    {
        private int executionCount = 0;
        private readonly ILogger<AutoUpdateStamina> _logger;
        private Timer _timer = null!;
        private readonly IServiceScopeFactory _scopeFactory;
        private GameOnlineContext _context;

        public AutoUpdateStamina(IServiceScopeFactory scopeFactory, ILogger<AutoUpdateStamina> logger)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        // Timed Hosted Service running.
        public Task StartAsync(CancellationToken stoppingToken)
        {
            _context = _scopeFactory.CreateScope().ServiceProvider.GetRequiredService<GameOnlineContext>();
            _logger.LogInformation("Timed Hosted Service running.");
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(3600));
            return Task.CompletedTask;
        }

        // Timed Hosted Service is working.
        private void DoWork(object? state)
        {
            var count = Interlocked.Increment(ref executionCount);
            _logger.LogInformation("Timed Hosted Service is working. Count: {Count}", count);
            var userInfoDAO = new UserInfoDAO(_context);
            // Get list player with low stamina (stamina < 100)
            var user = userInfoDAO.getLowStaPlayers();
            // +10 stamina per hour
            user.ForEach(u => {
                u.Stamina += 10;
                userInfoDAO.updateUserSta(u);
            });
        }

        // Timed Hosted Service is stopping.
        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
