using OnlineWebGame.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineWebGame.ViewModels
{
    public class SignUpViewModel
    {
        [Required(ErrorMessage = "Username required.")]
        [MinLength(6, ErrorMessage = "Username must have at least 6 characters."), MaxLength(50)]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password required.")]
        [MinLength(6, ErrorMessage ="Password must have at least 6 characters.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password required.")]
        [Compare("Password", ErrorMessage = "Password doesn't match.")]
        public string ConfirmPassword { get; set; }
    }
}
