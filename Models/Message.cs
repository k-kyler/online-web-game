using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineWebGame.Models
{
    public class Message
    {
        public Guid MessageId { get; init; }
        
        public Guid Uid { get; init; }
        
        [Required]
        [MinLength(5),MaxLength(50)]
        public string Username { get; set; }
        
        [Required]
        public string Content { get; set; }
        
        [Required]
        public DateTime CreatedAt { get; init; }
    }
}