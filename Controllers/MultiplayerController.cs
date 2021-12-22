using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using OnlineWebGame.Hubs;
using OnlineWebGame.ViewModels;

namespace OnlineWebGame.Controllers
{
  public class MultiplayerController : Controller
    {
        private readonly IHubContext<MultiplayerHub, IMultiplayerClient> _hubContext;

        public MultiplayerController(IHubContext<MultiplayerHub, IMultiplayerClient> hubContext) 
        {
            _hubContext = hubContext;
        }

        // Endpoint to get active players of the game
        [Route("multiplayer")]
        [HttpGet]
        public IActionResult GetActivePlayers()
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                return Ok(new { code = "success", activePlayers = Global.players });
            }

            return Redirect("/signin");
        }

        // Endpoint to add player to the game 
        [Route("multiplayer/active")]
        [HttpPost]
        public async Task<IActionResult> JoinGame([FromBody] JoinGameViewModel player)
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                var username = HttpContext.Session.GetString("username");

                Global.players.Add(new JoinGameViewModel()
                {
                    Username = username,
                    Player = player.Player,
                    PlayerSpriteURL = player.PlayerSpriteURL,
                    MapIndex = player.MapIndex
                });

                await _hubContext.Clients.All.AddPlayer(new JoinGameViewModel()
                {
                    Username = username,
                    Player = player.Player,
                    PlayerSpriteURL = player.PlayerSpriteURL,
                    MapIndex = player.MapIndex
                });

                return Ok(new { code = "success", message = username + " has joined" });
            }

            return Redirect("/signin");
        }

        // Endpoint to remove player out of the game when player is disconnected
        [Route("multiplayer/inactive")]
        [HttpGet]
        public async Task<IActionResult> LeaveGame()
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                var username = HttpContext.Session.GetString("username");
                var playerToRemove = Global.players.Where(player => player.Username == username).FirstOrDefault();

                Global.players.Remove(playerToRemove);

                await _hubContext.Clients.All.RemovePlayer(username);

                return Ok(new { code = "success", message = username + " has left" });
            }

            return Redirect("/signin");
        }
    
        // Endpoint to update positions of all players in the game
        [Route("multiplayer/update")]
        [HttpPost]
        public async Task<IActionResult> UpdatePositions([FromBody] UpdatePositionsViewModel updatePositionsViewModel)
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                foreach (var p in Global.players)
                {
                    if (p.Username == updatePositionsViewModel.Username)
                    {
                        p.Player = updatePositionsViewModel.Player;
                    }
                }

                await _hubContext.Clients.All.UpdatePositions(Global.players);

                return Ok(new { code = "success", message = "All positions of players are updated" });
            }

            return Redirect("/signin");
        }
    }
}