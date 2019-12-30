using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Practical.AspNetCore.SignalR.Hubs
{
    public class MessageHub : Hub
    {
        public Task SendMessageToAll(string message) 
        {
            return Clients.All.SendAsync("REceiveMessage", message);
        }
    }
}