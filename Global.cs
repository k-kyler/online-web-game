using System.Collections.Generic;
using OnlineWebGame.ViewModels;

namespace OnlineWebGame
{
  public static class Global
  {
    // Global list to store all active players
    public static List<JoinGameViewModel> players = new List<JoinGameViewModel>();
  }    
}