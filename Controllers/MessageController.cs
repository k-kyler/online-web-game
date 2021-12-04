using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using OnlineWebGame.DAO;
using OnlineWebGame.Data;
using OnlineWebGame.Hubs;
using OnlineWebGame.Models;
using OnlineWebGame.ViewModels;

namespace OnlineWebGame.Controllers
{
    public class MessageController : Controller
    {
        private readonly GameOnlineContext _context;
        private readonly IHubContext<ChatHub, IChatClient> _hubContext;

        public MessageController(GameOnlineContext context, IHubContext<ChatHub, IChatClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [Route("message")]
        [HttpGet]
        public IActionResult GetAllMessages()
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                var messageDAO = new MessageDAO(_context);

                var messages = messageDAO.GetAllMessages();

                return Ok(new { code = "success", messages });    
            }

            return Redirect("/signin");
        }

        [Route("message/create")]
        [HttpPost]
        public async Task<IActionResult> CreateMessage([FromBody] MessageViewModel message)
        {
            if (HttpContext.Session.GetString("username") != null)
            {
                var messageDAO = new MessageDAO(_context);
                var userDAO = new UserDAO(_context);

                var username = HttpContext.Session.GetString("username");
                var user = userDAO.getByUsername(username);

                var messageToCreate = new Message()
                {
                    MessageId = Guid.NewGuid(),
                    Uid = user.UserId,
                    Username = user.Username,
                    Content = message.Content,
                    CreatedAt = DateTime.Now
                };
            
                messageDAO.CreateMessage(messageToCreate);
                await _hubContext.Clients.All.ReceiveMessage(messageToCreate);

                return Ok(new { code = "success", message = messageToCreate });     
            }

            return Redirect("/signin");
        }
    }
}