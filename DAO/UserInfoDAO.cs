using OnlineWebGame.Data;
using OnlineWebGame.Models;
using System;
using System.Linq;

namespace OnlineWebGame.DAO
{
    public class UserInfoDAO
    {
        private GameOnlineContext _db;
        public UserInfoDAO(GameOnlineContext db)
        {
            _db = db;
        }

        public void createUserInfo(UserInfo user)
        {
            _db.UserInfos.Add(user);
            _db.SaveChanges();
        }

        public UserInfo getById(Guid id)
        {
            return _db.UserInfos.FirstOrDefault(u => u.User.UserId == id);
        }
    }
}
