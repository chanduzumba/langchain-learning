import { ingest } from "./injest.js";
import { query } from "./query.js";

async function main() {
  const command = process.argv[2];

  switch (command) {
    case "ingest":
      await ingest();
      break;

    case "query":
      const question = process.argv.slice(3).join(" ");
      await query(question);
      break;

    default:
      console.log("Usage:");
      console.log("npm run dev ingest");
      console.log("npm run dev query");
  }
}

await main();