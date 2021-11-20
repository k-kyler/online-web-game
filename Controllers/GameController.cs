using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineWebGame.DAO;
using OnlineWebGame.Data;
using OnlineWebGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        private void SendUserInfo()
        {
            var userDAO = new UserDAO(_context);
            var userInfoDAO = new UserInfoDAO(_context);

            var username = HttpContext.Session.GetString("username");

            var user = userDAO.getByUsername(username);
            var userInfo = userInfoDAO.getById(user.UserId);

            var exp = userInfo.Exp % 1000;
            var expPercent = exp / 1000 * 100;

            ViewBag.username = user.Username;
            ViewBag.exp = expPercent;
            ViewBag.coin = userInfo.Coin;
            ViewBag.stamina = userInfo.Stamina;
            ViewBag.level = userInfo.Level;
        }
    }
}
