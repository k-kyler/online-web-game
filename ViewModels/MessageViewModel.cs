using System.ComponentModel.DataAnnotations;

namespace OnlineWebGame.ViewModels
{
    public class MessageViewModel
    {
        [Required]
        public string Content { get; set; }
    }
}