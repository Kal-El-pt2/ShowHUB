const express = require("express");
const router = express.Router();
const db = require("../db/db");
const verifyToken = require("../middleware/verifytoken"); // Import the verifyToken middleware


router.post("/deletescreen", verifyToken, (req, res) => {
  const { screenID } = req.body;

  // Ensure movieID is provided
  if (!screenID) {
    return res.status(400).json({ error: "Movie ID is required." });
  }

  const deletescreenQuery = "DELETE FROM screen WHERE screenID = ?";
  db.query(deletescreenQuery, [screenID], (err, result) => {
    if (err) {
      console.error("Error deleting movie:", err);
      return res.status(500).json({ error: "An error occurred while deleting the movie." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.json({ message: "screen deleted successfully." });
  });
});


})
  module.exports = router;
