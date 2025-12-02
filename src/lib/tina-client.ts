import { createClient } from "tinacms/dist/client";
import { queries } from "../../tina/__generated__/types";

export const client = createClient({
  url: "http://localhost:4001/graphql",
  token: process.env.TINA_TOKEN,
  queries,
});
