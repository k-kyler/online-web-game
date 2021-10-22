using Microsoft.AspNetCore.Mvc;

namespace OnlineWebGame.Controllers
{
    public class SignUpController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return View();
        }
    }
}