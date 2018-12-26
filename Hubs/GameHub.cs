using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using SignalRChat.Models;
using SignalRChat.Repositories;

namespace SignalRChat.Hubs
{
    public class GameHub : Hub
    {
        private readonly IGameRepository _gameRepository;

        public GameHub(IGameRepository gameRepository) { 
            this._gameRepository = gameRepository;
        }
        
        public async Task StartNewGame()
        {
            this._gameRepository.StartNewGame();
            var game = this._gameRepository.GetGame();

            await Clients.All.SendAsync("ReceiveNewGame", game);
        }
    }
}