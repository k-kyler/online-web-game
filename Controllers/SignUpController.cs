using Microsoft.AspNetCore.Mvc;
using OnlineWebGame.Models;
using OnlineWebGame.DAO;
using System;
using OnlineWebGame.ViewModels;
using OnlineWebGame.Data;

namespace OnlineWebGame.Controllers
{
  public class SignUpController : Controller
    {
        private GameOnlineContext _context;
        public SignUpController(GameOnlineContext context)
        {
            _context = context;
        }

        // GET
        public IActionResult Index()
        {
            return View();
        }


        [Route("signup")]
        [HttpPost]
        public IActionResult SignUp(SignUpViewModel signUpViewModel)
        {
            var dao = new UserDAO(_context);
            if (!ModelState.IsValid)
            {
                return View("Index");
            }
            if (dao.getByUsername(signUpViewModel.Username) != null)
            {
                ViewBag.Error = "Username has been used.";
                return View("Index");
            }
            if (signUpViewModel.Password != signUpViewModel.ConfirmPassword)
            {
                return View("Index");
            }
            User user = new User()
            {
                UserId = Guid.NewGuid(),
                Username = signUpViewModel.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(signUpViewModel.Password),
            };
            UserInfo userInfo = new UserInfo()
            {
                UserInfoId = Guid.NewGuid(),
                Exp = 0,
                Level = 1,
                Stamina = 100,
                Coin = 0,
                User = user,
            };
            
            dao.createUser(user);
            var infoDAO = new UserInfoDAO(_context);
            infoDAO.createUserInfo(userInfo);
            return Redirect("/signin");
        }
    }
}