using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineWebGame.Models
{
    public class UserInfo
    {
        public Guid UserInfoId { get; init; }

        [Required]
        public int Exp { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        public int Stamina { get; set; }

        [Required]
        public int Coin { get; set; }

        public bool Gender { get; set; }

        [Required]
        [ForeignKey(name: "userId")]
        public User User { get; set; }
    }
}
