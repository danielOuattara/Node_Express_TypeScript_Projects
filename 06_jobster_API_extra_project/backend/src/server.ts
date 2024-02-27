import "dotenv/config";
import http from "http";
import app from "./app";
import { connectToDB } from "./database/connect";

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
const normalizePort = (val: string | number) => {
  /*
   * Renvoie un port valide, qu'il soit fourni
   * sous la forme d'un numéro ou d'une chaîne ;
   */
  const port = parseInt(val as string, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || 5000);
app.set("port", port);

const errorHandler = (error: ErrnoException) => {
  /*
   *  Recherche les différentes erreurs et les gère de manière appropriée.
   *  Elle est ensuite enregistrée dans le serveur ;
   */
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port" + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + "is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  /*
   * écouteur d'évènements, également enregistré, consignant le port
   * ou le canal nommé sur lequel le serveur s'exécute dans la console.
   */
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : port;
  console.log("Listening on port " + bind);
  console.log(`Server is running on http://localhost:${port}/`);
});

connectToDB(process.env.MONGO_URI as string)
  .then(() => {
    console.log(
      `Connection to database "${process.env.MONGO_DATABASE}" : Success !`,
    );
    server.listen(port);
  })
  .catch((err: Error) => console.log(err.message));
