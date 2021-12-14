using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineWebGame.Controllers
{
    public class MenuController : Controller
    {
        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("username") != null)
                return View();
            return Redirect("/signin");
        }

        public IActionResult PlayGame([FromQuery(Name = "gd")]string gd)
        {
            return Redirect("/Game?gd=" + gd);
        }

        [HttpPost]
        [Route("/signout")]
        public IActionResult Exit()
        {
            HttpContext.Session.Clear();

            return Ok(new { code = "success" });
        }
    }
}

