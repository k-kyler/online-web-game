using OnlineWebGame.Data;
using OnlineWebGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineWebGame.DAO
{
    public class UserDAO
    {
        private GameOnlineContext _db;
        public UserDAO(GameOnlineContext db)
        {
            _db = db;
        }

        public User getById(Guid id)
        {
            return _db.Users.FirstOrDefault(u => u.UserId == id);
        }

        public User getByUsername(String username)
        {
            return _db.Users.FirstOrDefault(u => u.Username == username);
        }

        public List<User> getAll()
        {
            return _db.Users.ToList();
        }

        public void createUser(User user)
        {
            _db.Add(user);
            _db.SaveChanges();
        }

        public void updateUser(User user)
        {
            var isExistUser = _db.Users.FirstOrDefault(u => u.UserId == user.UserId);
            if(isExistUser is null)
            {
                throw new NullReferenceException();
            }
            _db.Users.Update(user);
            _db.SaveChanges();
        }
    }
}
