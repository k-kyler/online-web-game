using Microsoft.AspNetCore.Mvc;

namespace OnlineWebGame.Controllers
{
    public class SignInController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return View();
        }
    }
}