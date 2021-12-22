using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineWebGame.Models
{
    public record User
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
