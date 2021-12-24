namespace OnlineWebGame.ViewModels
{
    public class JoinGameViewModel
    {
      public string? Username { get; set; }
      public PlayerViewModel Player { get; set; }
      public string PlayerSpriteURL { get; set; }
      public int MapIndex { get; set; }
      public int Level { get; set; }
    }
}