using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineWebGame.DAO;
using OnlineWebGame.Data;
using OnlineWebGame.ViewModels;

namespace OnlineWebGame.Controllers
{
  public class SignInController : Controller
    {
        private GameOnlineContext _context;
        public SignInController(GameOnlineContext context)
        {
            _context = context;
        }

        // GET
        public IActionResult Index()
        {
            return View();
        }

        [Route("signin")]
        [HttpPost]
        public IActionResult SignIn(SignInViewModel signInViewModel)
        {
            
            var dao = new UserDAO(_context);
            var user = dao.getByUsername(signInViewModel.Username);
            if (!ModelState.IsValid)
            {
                return View("Index");
            }
            if (user == null)
            {
                ViewBag.Error = "Wrong username.";
                return View("Index");
            }
            if (!BCrypt.Net.BCrypt.Verify(signInViewModel.Password, user.Password))
            {
                ViewBag.Error = "Wrong password.";
                return View("Index");
            }
            HttpContext.Session.SetString("username", user.Username);
            
            return Redirect("/menu");
        }
    }
}