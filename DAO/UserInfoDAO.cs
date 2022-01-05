using OnlineWebGame.Data;
using OnlineWebGame.Models;
using OnlineWebGame.ViewModels;
using System;
using System.Collections.Generic;
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

        public void updateUserInfo(UpdateUserInfoViewModel user, Guid userInfoId)
        {
            var existingUser = _db.UserInfos.FirstOrDefault(u => u.UserInfoId == userInfoId);

            if (existingUser is null)
            {
                throw new NullReferenceException();
            }

            existingUser.Coin = user.Coin;
            existingUser.Stamina = user.Stamina;
            existingUser.Exp = user.Exp;
            existingUser.Level = user.Level;
            _db.SaveChanges();
        }

        public List<UserInfo> getLowStaPlayers()
        {
            return _db.UserInfos.Where(u => u.Stamina < 100).ToList();
        }
    }
}
