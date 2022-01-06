using Microsoft.AspNetCore.Http;
using OnlineWebGame.DAO;
using OnlineWebGame.Data;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Timers;

namespace OnlineWebGame
{
    public class UpdatePlayersSta
    {
        private readonly RequestDelegate _next;

        private GameOnlineContext _context;
        public UpdatePlayersSta(GameOnlineContext context)
        {
            _context = context;
           
        }
        private Timer aTimer;

        public void TimeCount()
        {
            // Create a timer and set a two second interval.
            aTimer = new Timer();
            aTimer.Interval = 2000;

            // Hook up the Elapsed event for the timer. 
            aTimer.Elapsed += OnTimedEvent;

            // Have the timer fire repeated events (true is the default)
            aTimer.AutoReset = true;

            // Start the timer
            aTimer.Enabled = true;
        }
        public int timecount = 0;
        private void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            timecount += 1;
            Debug.WriteLine(timecount);
        }
    }
}
