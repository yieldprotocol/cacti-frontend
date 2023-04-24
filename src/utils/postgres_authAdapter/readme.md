TODO: Change out for official package when it is available. 

Add to your `pages/api/[...nextauth].js` next-auth configuration object.

```js
import NextAuth from "next-auth"
import { PostgresAdapter } from "@next-auth/pg-adapter"
import { Pool } from "pg";
const connectionString = "postgresql://localhost/adapter-postgres-test"
const client = new Pool({
  connectionString,
});

export default NextAuth({
  providers: [],
  adapter: PostgresAdapter(client)
  ...
})
```