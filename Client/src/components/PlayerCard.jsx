
import { Star, ArrowUpRight } from "lucide-react";

function PlayerCard({ player, isFavorite, onToggleFavorite, onViewStats }) {
  return (
    <article className="player-card">
      <div className="player-card-top">
        <div className="large-player-avatar">
          {player.name.charAt(0)}
        </div>

        <button
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={() => onToggleFavorite(player.id)}
          aria-label={isFavorite ? "Remove favourite" : "Add favourite"}
        >
          <Star size={19} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <span className="position-tag">{player.position}</span>

      <h3>{player.name}</h3>
      <p className="player-team">{player.team}</p>

      <div className="player-metrics">
        <div>
          <strong>{player.goals}</strong>
          <span>Goals</span>
        </div>
        <div>
          <strong>{player.assists}</strong>
          <span>Assists</span>
        </div>
        <div>
          <strong>{player.matches}</strong>
          <span>Matches</span>
        </div>
      </div>

      <div className="player-card-bottom">
        <span className="rating">
          <Star size={14} fill="currentColor" />
          {player.rating}
        </span>

        <button
          className="text-button"
          onClick={() => onViewStats(player)}
        >
          View stats <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}

export default PlayerCard;
