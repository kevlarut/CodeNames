using SignalRChat.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace SignalRChat.Repositories
{
    public class GameRepository : IGameRepository {
        private Game _game;

        public Game GetGame() {
            return _game;
        }

        public void StartNewGame() {
            _game = new Game();

            var availableWords = new List<string> { "pan", "china", "whip", "buck", "antarctica", "wind", "nurse", "laser", "ball", "stream", "fighter", "stone", "crane", "pole", "life", "space", "washington", "revolution", "ray", "spring", "tokyo", "mass", "belt", "change", "screen", "bridge", "seal", "moon", "degree", "wake", "star", "whale", "block", "roulette", "needle", "fire", "spring", "drill", "doctor", "tablet", "ring", "table", "fish", "iron", "pie", "heart", "horn", "tube", "grace", "green" };

            var rnd = new Random();
            _game.Tiles = availableWords.OrderBy(x => rnd.Next()).Take(25).Select(x => new Tile { Word = x }).ToList();
            
            //TODO: Red or Blue should, at random, get an extra card.  The team with only 7 goes first.
            var redTiles = _game.Tiles.Where(x => x.Allegiance == Allegiance.Bystander).Take(7);
            foreach (var tile in redTiles) {
                tile.Allegiance = Allegiance.Red;
            }
            var blueTiles = _game.Tiles.Where(x => x.Allegiance == Allegiance.Bystander).Take(8);
            foreach (var tile in blueTiles) {
                tile.Allegiance = Allegiance.Blue;
            }
            _game.Tiles.Where(x => x.Allegiance == Allegiance.Bystander).Take(1).Single().Allegiance = Allegiance.Assassin;

            _game.Tiles = _game.Tiles.OrderBy(x => rnd.Next()).ToList();
        }
    }

    public interface IGameRepository {
        Game GetGame();
        void StartNewGame();
    }
}