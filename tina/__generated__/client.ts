import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({
  cacheDir:
    "/Users/andreasnahrgang/digitaloriginal.store_NEW/app-7uja2c23lczl/tina/__generated__/.cache/1764705610596",
  url: "http://localhost:4001/graphql",
  token: "dummy-token",
  queries,
});
export default client;
