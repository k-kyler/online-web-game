using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineWebGame.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index()
        {
            // This is Hall map
            return View();
        }
        public IActionResult GreenRoom()
        {
            // This is GreenRoom map
            return View();
        }
        public IActionResult RedRoom()
        {
            // This is RedRoom map
            return View();
        }
        public IActionResult BlueRoom()
        {
            // This is BlueRoom map
            return View();
        }
        public IActionResult PurpleRoom()
        {
            // This is PurpleRoom map
            return View();
        }

        public IActionResult Loading()
        {
            // This is Loading Page
            return View();
        }

        //--------------------
        // NOTE:
        // At each Room include:
        // + Guide
        // + Task 1
        // + Task 2
        //--------------------
    }
}
