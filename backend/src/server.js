const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const taskRoutes = require("./routes/taskRoute");

app.use(express.json());
app.use(cors()); // Enable CORS for all requests
app.use("/api/tasks", taskRoutes);

const PORT = 3000;
connectDB().then(async () => {
  await sequelize.sync({ force: false });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
