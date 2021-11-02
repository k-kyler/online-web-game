using Microsoft.AspNetCore.Mvc;

namespace OnlineWebGame.Controllers
{
    public class PlayNowController : Controller
    {
         // GET
        public IActionResult Index()
        {
            return View();
        }
    }
}