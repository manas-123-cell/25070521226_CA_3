import { useState } from "react";
import {
  Activity, Trophy, Users, Search, Home, UserRound,
  LogOut, Menu, X, Target, TrendingUp, Star,
  CalendarDays, ArrowRight, Shield, ChartNoAxesCombined
} from "lucide-react";
import "./App.css";

const players = [
  { id: 1, name: "Erling Haaland", team: "Manchester City", position: "Forward", goals: 22, assists: 5, matches: 25, rating: 8.4, country: "Norway" },
  { id: 2, name: "Mohamed Salah", team: "Liverpool", position: "Forward", goals: 19, assists: 12, matches: 24, rating: 8.8, country: "Egypt" },
  { id: 3, name: "Bukayo Saka", team: "Arsenal", position: "Winger", goals: 16, assists: 9, matches: 23, rating: 8.2, country: "England" },
  { id: 4, name: "Kevin De Bruyne", team: "Manchester City", position: "Midfielder", goals: 7, assists: 13, matches: 20, rating: 8.5, country: "Belgium" },
  { id: 5, name: "Virgil van Dijk", team: "Liverpool", position: "Defender", goals: 2, assists: 1, matches: 24, rating: 7.8, country: "Netherlands" },
  { id: 6, name: "Son Heung-min", team: "Tottenham", position: "Forward", goals: 15, assists: 6, matches: 22, rating: 8.1, country: "South Korea" },
];

const leagues = [
  { name: "Premier League", country: "England", icon: "🏴", teams: 20 },
  { name: "La Liga", country: "Spain", icon: "🇪🇸", teams: 20 },
  { name: "Serie A", country: "Italy", icon: "🇮🇹", teams: 20 },
  { name: "Bundesliga", country: "Germany", icon: "🇩🇪", teams: 18 },
];

const matches = [
  { home: "Arsenal", away: "Chelsea", score: "2 - 1", status: "Finished" },
  { home: "Liverpool", away: "Tottenham", score: "3 - 2", status: "Finished" },
  { home: "Man City", away: "Newcastle", score: "18:30", status: "Upcoming" },
];

function App() {
  const [page, setPage] = useState("login");
  const [mode, setMode] = useState("login");
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [message, setMessage] = useState("");

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      `${player.name} ${player.team} ${player.country}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesPosition =
      position === "All" || player.position === position;

    return matchesSearch && matchesPosition;
  });

  function handleAuth(event) {
    event.preventDefault();

    if (mode === "register" && !name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    // Frontend demo only: connect a real backend before using accounts.
    const displayName = mode === "register"
      ? name.trim()
      : email.split("@")[0];

    setUser(displayName);
    setMessage("");
    setPage("home");
    setPassword("");
  }

  function logout() {
    setUser("");
    setPage("login");
    setMode("login");
    setEmail("");
    setPassword("");
    setSelectedPlayer(null);
    setMobileMenu(false);
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function navigate(nextPage) {
    setPage(nextPage);
    setSelectedPlayer(null);
    setMobileMenu(false);
  }

  if (page === "login") {
    return (
      <div className="auth-page">
        <div className="auth-visual">
          <div className="brand">
            <div className="brand-icon"><Activity size={24} /></div>
            <span>Foot<span className="accent">Stats</span></span>
          </div>

          <div className="auth-hero">
            <span className="eyebrow"><span className="live-dot" /> THE GAME, IN NUMBERS</span>
            <h1>Football is more than <span>just a game.</span></h1>
            <p>Explore players, discover statistics and understand the beautiful game like never before.</p>
            <div className="hero-stats">
              <div><strong>01</strong><span>Player insights</span></div>
              <div><strong>02</strong><span>Match analysis</span></div>
              <div><strong>03</strong><span>League standings</span></div>
            </div>
          </div>

          <div className="auth-footer">BUILT FOR THE LOVE OF FOOTBALL.</div>
        </div>

        <div className="auth-form-side">
          <div className="auth-card">
            <div className="mobile-brand brand">
              <div className="brand-icon"><Activity size={22} /></div>
              <span>Foot<span className="accent">Stats</span></span>
            </div>

            <div className="auth-heading">
              <span className="eyebrow">WELCOME TO FOOTSTATS</span>
              <h2>{mode === "login" ? "Welcome back." : "Join the community."}</h2>
              <p>{mode === "login"
                ? "Sign in to explore the world of football."
                : "Create an account to get started."}</p>
            </div>

            <div className="auth-tabs">
              <button
                className={mode === "login" ? "active" : ""}
                onClick={() => { setMode("login"); setMessage(""); }}
              >Login</button>
              <button
                className={mode === "register" ? "active" : ""}
                onClick={() => { setMode("register"); setMessage(""); }}
              >Sign Up</button>
            </div>

            <form onSubmit={handleAuth} className="auth-form">
              {mode === "register" && (
                <label>
                  Full name
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              )}

              <label>
                Email address
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>
                Password
                <div className="password-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >{showPassword ? "Hide" : "Show"}</button>
                </div>
              </label>

              {message && <p className="form-message">{message}</p>}

              <button className="primary-button full-button" type="submit">
                {mode === "login" ? "Sign in" : "Create account"}
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="auth-note">
              <Shield size={14} /> Frontend demonstration — accounts are not saved yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand sidebar-brand">
          <div className="brand-icon"><Activity size={23} /></div>
          <span>Foot<span className="accent">Stats</span></span>
          <button className="close-menu" onClick={() => setMobileMenu(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="side-label">WORKSPACE</div>

        <button
          className={`nav-link ${page === "home" ? "selected" : ""}`}
          onClick={() => navigate("home")}
        ><Home size={19} /> Dashboard</button>

        <button
          className={`nav-link ${page === "players" ? "selected" : ""}`}
          onClick={() => navigate("players")}
        ><Users size={19} /> Players</button>

        <div className="side-label">YOUR COLLECTION</div>

        <button className="nav-link" onClick={() => {
          navigate("players");
          setSearch("");
          setPosition("All");
        }}>
          <Star size={19} /> Explore players
        </button>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <Trophy size={23} color="#b6f36b" />
            <strong>Every stat tells a story.</strong>
            <p>Discover the details behind the game.</p>
          </div>
          <button className="nav-link logout-link" onClick={logout}>
            <LogOut size={19} /> Log out
          </button>
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="mobile-overlay"
          aria-label="Close menu"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileMenu(true)}>
            <Menu size={22} />
          </button>
          <div className="breadcrumb">FootStats <span>/</span> {page === "home" ? "Dashboard" : "Players"}</div>
          <div className="topbar-user">
            <div className="online-dot" />
            <span>{user}</span>
            <div className="avatar">{user.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        {page === "home" ? (
          <div className="page-content">
            <section className="welcome-row">
              <div>
                <div className="eyebrow">YOUR FOOTBALL OVERVIEW</div>
                <h1>Let's talk <span className="accent">football.</span></h1>
                <p>All the numbers behind the beautiful game, in one place.</p>
              </div>
              <button className="primary-button" onClick={() => navigate("players")}>
                Explore players <ArrowRight size={17} />
              </button>
            </section>

            <section className="feature-banner">
              <div className="banner-copy">
                <span className="banner-tag"><Activity size={14} /> FOOTBALL ANALYTICS</span>
                <h2>The game.<br />Beyond the <span>score.</span></h2>
                <p>Discover player performances, explore leagues and compare the numbers that matter.</p>
                <button className="banner-button" onClick={() => navigate("players")}>
                  Explore statistics <ArrowRight size={17} />
                </button>
              </div>
              <div className="banner-art">
                <div className="banner-circle circle-one" />
                <div className="banner-circle circle-two" />
                <div className="football">⚽</div>
                <div className="banner-stat">
                  <TrendingUp size={17} color="#b6f36b" />
                  <div><strong>Performance</strong><span>Starts with the details</span></div>
                </div>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div><h2>Your dashboard</h2><p>A quick look at the numbers.</p></div>
                <span className="demo-badge">SAMPLE DATA</span>
              </div>

              <div className="stats-grid">
                <StatCard icon={<Users />} label="Players tracked" value={players.length} note="Demo player database" />
                <StatCard icon={<Trophy />} label="Leagues" value={leagues.length} note="Popular competitions" />
                <StatCard icon={<Target />} label="Top scorer" value="22 goals" note="Haaland · sample data" />
                <StatCard icon={<Star />} label="Your favourites" value={favorites.length} note="Players you've saved" />
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div><h2>Popular leagues</h2><p>Explore football across Europe.</p></div>
              </div>
              <div className="league-grid">
                {leagues.map((league) => (
                  <button className="league-card" key={league.name} onClick={() => navigate("players")}>
                    <span className="league-flag">{league.icon}</span>
                    <div><strong>{league.name}</strong><p>{league.country} · {league.teams} teams</p></div>
                    <ArrowRight size={17} />
                  </button>
                ))}
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div><h2>Top players</h2><p>Standout performers in our sample dataset.</p></div>
                <button className="text-button" onClick={() => navigate("players")}>View all <ArrowRight size={15} /></button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>PLAYER</th><th>TEAM</th><th>GOALS</th><th>ASSISTS</th><th>RATING</th><th></th></tr></thead>
                  <tbody>
                    {players.slice(0, 4).map((player) => (
                      <tr key={player.id}>
                        <td><div className="player-name"><div className="player-avatar">{player.name.charAt(0)}</div><strong>{player.name}</strong></div></td>
                        <td className="muted-cell">{player.team}</td>
                        <td className="number-cell">{player.goals}</td>
                        <td className="number-cell">{player.assists}</td>
                        <td><span className="rating"><Star size={13} fill="currentColor" /> {player.rating}</span></td>
                        <td><button className="icon-button" aria-label="View player" onClick={() => { setSelectedPlayer(player); navigate("players"); }}><ArrowRight size={17} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div><h2>Matches</h2><p>Example results and fixtures.</p></div>
                <span className="demo-badge">ILLUSTRATIVE</span>
              </div>
              <div className="match-grid">
                {matches.map((match, index) => (
                  <div className="match-card" key={index}>
                    <div className="match-status"><CalendarDays size={14} /> {match.status}</div>
                    <div className="match-teams"><strong>{match.home}</strong><span>{match.score}</span><strong>{match.away}</strong></div>
                    <div className="match-footer">Football fixtures <Activity size={15} /></div>
                  </div>
                ))}
              </div>
            </section>

            <footer className="page-footer">FOOTSTATS © 2026 · MADE FOR THE LOVE OF FOOTBALL</footer>
          </div>
        ) : (
          <div className="page-content">
            <section className="welcome-row">
              <div>
                <div className="eyebrow">PLAYER DATABASE</div>
                <h1>Explore <span className="accent">players.</span></h1>
                <p>Find players, explore their numbers and compare performances.</p>
              </div>
              <div className="player-count"><Users size={18} /> {filteredPlayers.length} players</div>
            </section>

            <section className="player-search-panel">
              <div className="search-input-wrap">
                <Search size={19} />
                <input
                  placeholder="Search by player, team or country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select value={position} onChange={(e) => setPosition(e.target.value)}>
                <option value="All">All positions</option>
                <option value="Forward">Forward</option>
                <option value="Winger">Winger</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Defender">Defender</option>
              </select>
            </section>

            {selectedPlayer && (
              <section className="selected-player-panel">
                <div className="section-heading">
                  <div><h2>{selectedPlayer.name}</h2><p>{selectedPlayer.team} · {selectedPlayer.country}</p></div>
                  <button className="icon-button" onClick={() => setSelectedPlayer(null)}><X size={20} /></button>
                </div>
                <div className="detail-stats">
                  <DetailStat label="Goals" value={selectedPlayer.goals} />
                  <DetailStat label="Assists" value={selectedPlayer.assists} />
                  <DetailStat label="Appearances" value={selectedPlayer.matches} />
                  <DetailStat label="Rating" value={selectedPlayer.rating} />
                </div>
                <p className="muted-cell">These are illustrative statistics for the project demo, not verified live-season figures.</p>
              </section>
            )}

            <div className="section-heading player-list-heading">
              <div><h2>Player directory</h2><p>Search, filter and save your favourite players.</p></div>
              <span className="demo-badge">SAMPLE DATA</span>
            </div>

            {filteredPlayers.length === 0 ? (
              <div className="empty-state">
                <Search size={32} />
                <h3>No players found</h3>
                <p>Try another name, team or position.</p>
                <button className="secondary-button" onClick={() => { setSearch(""); setPosition("All"); }}>Clear filters</button>
              </div>
            ) : (
              <div className="player-grid">
                {filteredPlayers.map((player) => (
                  <article className="player-card" key={player.id}>
                    <div className="player-card-top">
                      <div className="large-player-avatar">{player.name.charAt(0)}</div>
                      <button
                        className={`favorite-button ${favorites.includes(player.id) ? "favorited" : ""}`}
                        onClick={() => toggleFavorite(player.id)}
                        aria-label="Toggle favourite"
                      ><Star size={19} fill={favorites.includes(player.id) ? "currentColor" : "none"} /></button>
                    </div>
                    <span className="position-tag">{player.position}</span>
                    <h3>{player.name}</h3>
                    <p className="player-team">{player.team} · {player.country}</p>
                    <div className="player-metrics">
                      <div><strong>{player.goals}</strong><span>Goals</span></div>
                      <div><strong>{player.assists}</strong><span>Assists</span></div>
                      <div><strong>{player.matches}</strong><span>Matches</span></div>
                    </div>
                    <div className="player-card-bottom">
                      <span className="rating"><Star size={14} fill="currentColor" /> {player.rating}</span>
                      <button className="text-button" onClick={() => setSelectedPlayer(player)}>View stats <ArrowRight size={15} /></button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <section className="section-block comparison-section">
              <div className="section-heading">
                <div><h2>Player comparison</h2><p>Compare two players using our sample statistics.</p></div>
                <ChartNoAxesCombined size={24} className="accent-icon" />
              </div>
              <ComparisonChart />
            </section>

            <footer className="page-footer">FOOTSTATS © 2026 · MADE FOR THE LOVE OF FOOTBALL</footer>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, note }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top"><span className="stat-icon">{icon}</span><TrendingUp size={16} className="accent-icon" /></div>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-note">{note}</span>
    </div>
  );
}

function DetailStat({ label, value }) {
  return <div className="detail-stat"><span>{label}</span><strong>{value}</strong></div>;
}

function ComparisonChart() {
  const [firstId, setFirstId] = useState("1");
  const [secondId, setSecondId] = useState("2");

  const first = players.find((p) => p.id === Number(firstId));
  const second = players.find((p) => p.id === Number(secondId));

  return (
    <div className="comparison-card">
      <div className="comparison-selects">
        <label>Player one
          <select value={firstId} onChange={(e) => setFirstId(e.target.value)}>
            {players.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
        <span className="versus">VS</span>
        <label>Player two
          <select value={secondId} onChange={(e) => setSecondId(e.target.value)}>
            {players.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
      </div>

      {first.id === second.id ? (
        <p className="form-message">Choose two different players to compare.</p>
      ) : (
        <div className="comparison-metrics">
          {[
            { label: "Goals", a: first.goals, b: second.goals },
            { label: "Assists", a: first.assists, b: second.assists },
            { label: "Appearances", a: first.matches, b: second.matches },
            { label: "Rating (out of 10)", a: first.rating, b: second.rating },
          ].map((metric) => {
            const max = Math.max(metric.a, metric.b, 1);
            return (
              <div className="compare-row" key={metric.label}>
                <div className="compare-values"><strong>{metric.a}</strong><span>{metric.label}</span><strong>{metric.b}</strong></div>
                <div className="compare-bars">
                  <div className="bar-track"><div className="bar-fill left-fill" style={{ width: `${metric.a / max * 100}%` }} /></div>
                  <div className="bar-track"><div className="bar-fill right-fill" style={{ width: `${metric.b / max * 100}%` }} /></div>
                </div>
              </div>
            );
          })}
          <div className="compare-legend"><span>● {first.name}</span><span>● {second.name}</span></div>
        </div>
      )}
      <p className="chart-disclaimer">Illustrative demo data. Connect a football data API for verified statistics.</p>
    </div>
  );
}

export default App;