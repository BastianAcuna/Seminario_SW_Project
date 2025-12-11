const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const productRoutes = require("./routes/products");
const branchRoutes = require("./routes/branches");
const stockRoutes = require("./routes/stocks");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const distPath = path.join(__dirname, "..", "front", "dist");
const staticFilesAvailable = fs.existsSync(distPath);

// Serve frontend static files if built
if (staticFilesAvailable) {
  app.use(express.static(distPath));
} else {
  console.warn(
    `Static assets not found at ${distPath}. Skipping static file serving.`
  );
}

// API routes
app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/stocks", stockRoutes);

// SPA fallback middleware (no path string, avoids path-to-regexp issues)
if (staticFilesAvailable) {
  app.use((req, res, next) => {
    // let API routes and non-GET requests pass through
    if (req.method !== "GET" || req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
