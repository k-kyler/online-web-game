using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using OnlineWebGame.Data;
using OnlineWebGame.Hubs;
using OnlineWebGame.ViewModels;

namespace OnlineWebGame.Controllers
{
  public class MultiplayerController : Controller
    {
        private readonly IHubContext<MultiplayerHub, IMultiplayerClient> _hubContext;

        public MultiplayerController(GameOnlineContext context, IHubContext<MultiplayerHub, IMultiplayerClient> hubContext) 
        {
            _hubContext = hubContext;
        }

        [Route("multiplayer/active")]
        [HttpPost]
        public async Task<IActionResult> JoinGame([FromBody] JoinGameViewModel joinGameViewModel)
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                var username = HttpContext.Session.GetString("username");

                await _hubContext.Clients.All.AddPlayer(new JoinGameViewModel()
                {
                    Username = username,
                    Player = joinGameViewModel.Player,
                    PlayerSpriteURL = joinGameViewModel.PlayerSpriteURL,
                    MapIndex = joinGameViewModel.MapIndex
                });

                return Ok(new { code = "success", message = username + " has joined" });
            }

            return Redirect("/signin");
        }

        [Route("multiplayer/inactive")]
        [HttpGet]
        public async Task<IActionResult> LeaveGame()
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                var username = HttpContext.Session.GetString("username");

                await _hubContext.Clients.All.RemovePlayer(username);

                return Ok(new { code = "success", message = username + " has left" });
            }

            return Redirect("/signin");
        }
    }
}