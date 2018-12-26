using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Hubs;
using Microsoft.AspNetCore.SignalR.Client;
using System.Web.Http.Cors;

[EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
[Route("api/[controller]")]
[ApiController]
public class GameController : ControllerBase
{
    [HttpPost]
    public async Task Post() {
        var connection = new HubConnectionBuilder().WithUrl("http://localhost:5000/chatHub").Build();

        await connection.StartAsync();
        await connection.InvokeAsync("SendMessage", "hello", "world");
    }
}