using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineWebGame.ViewModels;

namespace OnlineWebGame.Hubs
{
    public interface IMultiplayerClient
    {
      Task AddPlayer(JoinGameViewModel player);
      Task RemovePlayer(string username);
      Task UpdatePositions(List<JoinGameViewModel> players);
    }
}