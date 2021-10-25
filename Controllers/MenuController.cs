using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineWebGame.Controllers
{
    public class MenuController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult PlayGame()
        {
            return Redirect("/Game");
        }

        public IActionResult Exit()
        {
            // Code here - Clear session
            return View();
        }
    }
}

