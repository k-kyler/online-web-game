using System.Threading.Tasks;
using OnlineWebGame.Models;

namespace OnlineWebGame.Hubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(Message message);
    }
}