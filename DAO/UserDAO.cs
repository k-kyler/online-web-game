using OnlineWebGame.Data;
using OnlineWebGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;

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
            var existingUser = _db.Users.FirstOrDefault(u => u.UserId == user.UserId);

            if (existingUser is not null)
            {
                throw new Exception("User has already existed");
            }
            
            _db.Users.Add(user);
            _db.SaveChanges();
        }

        public void updateUser(User user)
        {
            var existingUser = _db.Users.FirstOrDefault(u => u.UserId == user.UserId);
            
            if(existingUser is null)
            {
                throw new NullReferenceException();
            }
            
            _db.Users.Update(user);
            _db.SaveChanges();
        }
    }
}
