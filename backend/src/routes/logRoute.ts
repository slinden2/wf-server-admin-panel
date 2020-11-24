import express from "express";
import config from "../config";
import { Server } from "../entity/Server";

const router = express.Router();

router.get("/:serverId", async (req, res) => {
  const serverId = req.params.serverId;
  const server = await Server.findOne({ id: serverId });
  if (!server) {
    return res.status(404).json({ message: "File not found" });
  }
  const file = `${config.servers.pidPath}/${server.name}.log`;
  try {
    return await res.download(file);
  } catch (err) {
    return res.status(404).json({ message: "File not found" });
  }
});

export default router;
