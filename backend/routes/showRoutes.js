const express = require("express");
const router = express.Router();
const db = require("../db/db");
const verifyToken = require("../middleware/verifytoken"); // Import the verifyToken middleware

// Protected route
router.get(
  "/shows/movies/:moviename/theatre/:theatre_id",
  verifyToken,
  (req, res) => {
    const moviename = decodeURIComponent(req.params.moviename);
    const theatre_id = decodeURIComponent(req.params.theatre_id);

    db.query(
      "SELECT * FROM Shows JOIN Movies ON Shows.MovieID = Movies.movieId WHERE Shows.TheatreID = ? AND Movies.title = ?;",
      [theatre_id, moviename],
      (err, result) => {
        if (err) {
          console.error("Error fetching Show details:", err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching show details." });
          return;
        }

        // Check if any shows are found
        if (result.length === 0) {
          res.status(200).json([]);
          return;
        }

        // Send the entire result array as the response
        res.status(200).json(result);
        console.log(result);
      }
    );

    router.post("/addShow", verifyToken, (req, res) => {
      const {
        MovieID,
        StartingTime,
        EndTime,
        Price,
        TheatreID,
        ScreenID,
        isActive,
        DateOfMovie,
      } = req.body;

     // Generate a random number for the Theatre ID
    const ShowID = Math.floor(Math.random() * 1000000) + 1;

    const insertShowQuery =
    "INSERT INTO shows (ShowID,MovieID,StartingTime,EndTime,Price,TheatreID,ScreenID,isActive,DateOfMovie) VALUES (?, ?, ?, ?, ?,?,?,?,?)";
  db.query(
    insertShowQuery,
    [
      ShowID,
      MovieID,
      StartingTime,
      EndTime,
      Price,
      TheatreID,
      ScreenID,
      isActive,
      DateOfMovie,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding Theatre:", err);
        res
          .status(500)
          .json({ error: "An error occurred while adding the Theatre." });
        return;
      }
      res.status(201).json({ message: "Theatre added successfully." });
    }
  );
  }
);

router.post("/deleteshow", verifyToken, (req, res) => {
  const { showID } = req.body;

  // Ensure movieID is provided
  if (!showID) {
    return res.status(400).json({ error: "Movie ID is required." });
  }

  const deleteshowQuery = "DELETE FROM show WHERE showID = ?";
  db.query(deleteshowQuery, [showID], (err, result) => {
    if (err) {
      console.error("Error deleting movie:", err);
      return res.status(500).json({ error: "An error occurred while deleting the movie." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.json({ message: "show deleted successfully." });
  });
});


})
  module.exports = router;
