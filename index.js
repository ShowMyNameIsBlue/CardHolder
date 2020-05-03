const app = require("./app");
const initData = require("./init");
const config = require("./server/config/dev");
const db = require("./server/database");
(async () => {
  await db.connection.connect();
  await initData();
  console.log(`Http server is up and running at port ${config.common.port}`);
  const server = app.listen(config.common.port);
  process.on("SIGINT", () => {
    console.info("SIGINT signal received.");

    // Stops the server from accepting new connections and finishes existing connections.
    server.close(function (err) {
      db.connection.end();
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
})();
