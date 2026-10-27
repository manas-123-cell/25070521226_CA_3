
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

app.use(
  cors({
    origin: "http://localhost:5177",
  })
);

app.use(express.json());

// ==================== MONGODB USER MODEL ====================

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// ==================== DEMO PLAYER DATA ====================

const players = [
  {
    id: 1,
    name: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    nationality: "Norway",
    age: 26,
    matches: 25,
    goals: 22,
    assists: 5,
    rating: 8.4,
  },
  {
    id: 2,
    name: "Mohamed Salah",
    team: "Liverpool",
    position: "Forward",
    nationality: "Egypt",
    age: 34,
    matches: 24,
    goals: 19,
    assists: 12,
    rating: 8.8,
  },
  {
    id: 3,
    name: "Bukayo Saka",
    team: "Arsenal",
    position: "Winger",
    nationality: "England",
    age: 25,
    matches: 23,
    goals: 16,
    assists: 9,
    rating: 8.2,
  },
  {
    id: 4,
    name: "Kevin De Bruyne",
    team: "Manchester City",
    position: "Midfielder",
    nationality: "Belgium",
    age: 35,
    matches: 20,
    goals: 7,
    assists: 13,
    rating: 8.5,
  },
  {
    id: 5,
    name: "Virgil van Dijk",
    team: "Liverpool",
    position: "Defender",
    nationality: "Netherlands",
    age: 35,
    matches: 24,
    goals: 2,
    assists: 1,
    rating: 7.8,
  },
  {
    id: 6,
    name: "Son Heung-min",
    team: "Tottenham",
    position: "Forward",
    nationality: "South Korea",
    age: 34,
    matches: 22,
    goals: 15,
    assists: 6,
    rating: 8.1,
  },
];

// ==================== DEMO LEAGUE DATA ====================

const leagues = [
  { id: 1, name: "Premier League", country: "England" },
  { id: 2, name: "La Liga", country: "Spain" },
  { id: 3, name: "Serie A", country: "Italy" },
  { id: 4, name: "Bundesliga", country: "Germany" },
];

// ==================== DEMO STANDINGS ====================

const standings = [
  {
    position: 1,
    name: "Arsenal",
    played: 10,
    won: 8,
    drawn: 1,
    lost: 1,
    points: 25,
  },
  {
    position: 2,
    name: "Manchester City",
    played: 10,
    won: 7,
    drawn: 2,
    lost: 1,
    points: 23,
  },
  {
    position: 3,
    name: "Liverpool",
    played: 10,
    won: 7,
    drawn: 1,
    lost: 2,
    points: 22,
  },
  {
    position: 4,
    name: "Aston Villa",
    played: 10,
    won: 6,
    drawn: 1,
    lost: 3,
    points: 19,
  },
  {
    position: 5,
    name: "Tottenham",
    played: 10,
    won: 5,
    drawn: 2,
    lost: 3,
    points: 17,
  },
];

// ==================== DEMO MATCH DATA ====================

const matches = [
  {
    id: 1,
    homeTeam: "Arsenal",
    awayTeam: "Liverpool",
    homeScore: 2,
    awayScore: 1,
    status: "Finished",
  },
  {
    id: 2,
    homeTeam: "Manchester City",
    awayTeam: "Tottenham",
    homeScore: 3,
    awayScore: 1,
    status: "Finished",
  },
  {
    id: 3,
    homeTeam: "Chelsea",
    awayTeam: "Manchester United",
    homeScore: 1,
    awayScore: 1,
    status: "Finished",
  },
];

// ==================== ROOT ROUTE ====================

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the FootStats API!",
    status: "Server is running",
    database: mongoose.connection.readyState === 1
      ? "Connected"
      : "Disconnected",
  });
});

// ==================== PLAYER ROUTES ====================

app.get("/api/players", (req, res) => {
  const search = (req.query.search || "").toLowerCase();
  const position = (req.query.position || "").toLowerCase();

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      `${player.name} ${player.team} ${player.position} ${player.nationality}`
        .toLowerCase()
        .includes(search);

    const matchesPosition =
      !position || player.position.toLowerCase() === position;

    return matchesSearch && matchesPosition;
  });

  res.json(filteredPlayers);
});

app.get("/api/players/:id", (req, res) => {
  const player = players.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!player) {
    return res.status(404).json({
      message: "Player not found",
    });
  }

  res.json(player);
});

// ==================== LEAGUE ROUTES ====================

app.get("/api/leagues", (req, res) => {
  res.json(leagues);
});

app.get("/api/standings", (req, res) => {
  res.json(standings);
});

app.get("/api/matches", (req, res) => {
  res.json(matches);
});

// ==================== SIGNUP ROUTE ====================

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    console.error("Signup error:", error.message);

    return res.status(500).json({
      message: "Could not create account",
    });
  }
});

// ==================== LOGIN ROUTE ====================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Could not log in",
    });
  }
});

// ==================== START SERVER ====================

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(
        `FootStats API running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
