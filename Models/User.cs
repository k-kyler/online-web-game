using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineWebGame.Models
{
    public class User
    {
        public Guid UserId { get; init; }

        [Required]
        [MinLength(5),MaxLength(50)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public UserInfo UserInfo { get; set; }
    }
}
