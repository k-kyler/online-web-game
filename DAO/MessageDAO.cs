using System.Collections.Generic;
using System.Linq;
using OnlineWebGame.Data;
using OnlineWebGame.Models;

namespace OnlineWebGame.DAO
{
    public class MessageDAO
    {
        private GameOnlineContext _db;

        public MessageDAO(GameOnlineContext db)
        {
            _db = db;
        }

        public void CreateMessage(Message message)
        {
            _db.Messages.Add(message);
            _db.SaveChanges();
        }

        public List<Message> GetAllMessages()
        {
            return _db.Messages.ToList();
        }
    }
}