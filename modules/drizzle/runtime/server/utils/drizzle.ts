import type { Hyperdrive } from "@cloudflare/workers-types";
import { createError } from "h3";
import { drizzle } from "drizzle-orm/postgres-js";
export { sql, eq, and, or } from "drizzle-orm";

import * as schema from "../../../../../server/database/schema";
import postgres from "postgres";

export const tables = schema;

export function useDrizzle() {
  const hyperdrive = process.env.POSTGRES as Hyperdrive | undefined;
  const dbUrl = hyperdrive?.connectionString || process.env.NUXT_POSTGRES_URL;

  if (!dbUrl) {
    throw createError(
      "Missing `POSTGRES` hyperdrive binding or `NUXT_POSTGRES_URL` env variable",
    );
  }
  console.log("dbUrl", { dbUrl, hyperdrive });

  const client = postgres(dbUrl, {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    prepare: false,
    ssl: hyperdrive ? undefined : "require",
  });

  return drizzle(client);
}