using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineWebGame.DAO;
using OnlineWebGame.Data;
using OnlineWebGame.Models;
using OnlineWebGame.ViewModels;
using System;
using System.Diagnostics;

namespace OnlineWebGame.Controllers
{
  public class GameController : Controller
    {
        private GameOnlineContext _context;
        public GameController(GameOnlineContext context)
        {
            _context = context;
        }
        public IActionResult Index([FromQuery(Name = "gd")]String gd)
        {
            // This is Hall map
            if(HttpContext.Session.GetString("username") != null)
            {
                SendUserInfo();

                return View();
            }

            return Redirect("/signin");
        }
        public IActionResult GreenRoom()
        {
            // This is GreenRoom map
            if (HttpContext.Session.GetString("username") != null)
            {
                SendUserInfo();

                return View();
            }

            return Redirect("/signin");
        }
        public IActionResult RedRoom()
        {
            // This is RedRoom map
            if (HttpContext.Session.GetString("username") != null)
            {
                SendUserInfo();

                return View();
            }

            return Redirect("/signin");
        }
        public IActionResult BlueRoom()
        {
            // This is BlueRoom map
            if (HttpContext.Session.GetString("username") != null)
            {
                SendUserInfo();

                return View();
            }

            return Redirect("/signin");
        }
        public IActionResult PurpleRoom()
        {
            // This is PurpleRoom map
            if (HttpContext.Session.GetString("username") != null)
            {
                SendUserInfo();

                return View();
            }

            return Redirect("/signin");
        }

        [Route("userinfo")]
        [HttpGet]
        public IActionResult GetUserInfo()
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                var userDAO = new UserDAO(_context);
                var userInfoDAO = new UserInfoDAO(_context);

                var username = HttpContext.Session.GetString("username");

                var user = userDAO.getByUsername(username);
                var userInfo = userInfoDAO.getById(user.UserId);
                
                return Ok(new { code = "success", userId = user.UserId, infoId = userInfo.UserInfoId, level = userInfo.Level, stamina = userInfo.Stamina, coin = userInfo.Coin, exp = userInfo.Exp});
            }

            return Redirect("/signin");
        }

        [Route("userinfo/update")]
        [HttpPost]
        public IActionResult SetUserInfo([FromBody] UserInfoViewModel userInfo)
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                var userInfoDAO = new UserInfoDAO(_context);

                var infoId = Guid.Parse(userInfo.UserInfoId);

                var newInfo = new UpdateUserInfoViewModel()
                {
                    Stamina = userInfo.Stamina,
                    Coin = userInfo.Coin,
                    Level = userInfo.Level,
                    Exp = userInfo.Exp,
                };

                userInfoDAO.updateUserInfo(newInfo, infoId);

                return Ok(new {code = "success"});
            }
            return BadRequest(new { code = "failed"});
        }


        private void SendUserInfo()
        {
            var userDAO = new UserDAO(_context);
            var userInfoDAO = new UserInfoDAO(_context);

            var username = HttpContext.Session.GetString("username");

            var user = userDAO.getByUsername(username);
            var userInfo = userInfoDAO.getById(user.UserId);

            var exp = userInfo.Exp % 1000;
            var expPercent = (int)Math.Round((double)(100 * exp) / 1000);

            ViewBag.username = user.Username;
            ViewBag.exp = expPercent;
            ViewBag.coin = userInfo.Coin;
            ViewBag.stamina = userInfo.Stamina;
            ViewBag.level = userInfo.Level;
        }
    }
}
