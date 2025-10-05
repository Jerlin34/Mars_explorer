import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve images from public/images directory
  const imagesPath = path.resolve(import.meta.dirname, "..", "public", "images");
  app.use("/images", express.static(imagesPath));

  // Serve Mars data
  app.get("/api/mars-data", async (req, res) => {
    try {
      const dataPath = path.resolve(import.meta.dirname, "..", "public", "mars_data.json");
      const data = await fs.promises.readFile(dataPath, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      console.error("Error loading Mars data:", error);
      res.status(500).json({ error: "Failed to load Mars data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
