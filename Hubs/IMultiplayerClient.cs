using System.Threading.Tasks;
using OnlineWebGame.ViewModels;

namespace OnlineWebGame.Hubs
{
  public interface IMultiplayerClient
    {
      Task AddPlayer(JoinGameViewModel players);
      Task RemovePlayer(string username);
    }
}