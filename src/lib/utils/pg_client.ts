import { ClientBase, Pool, type PoolClient, type PoolConfig, type QueryConfig, type QueryResult, type QueryResultRow } from "pg";


// const defaultClientConfig = (): ClientConfig => {
//   return {
//     host: 'postgres',
//     port: 5432,
//     user: 'postgres',
//     password: 'password',
//     database: 'db_name'
//   }
// }

const defaultPoolConfig = (): PoolConfig => {
  return {
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }
}

// let client = new Client(defaultClientConfig())

let pool: Pool | undefined = undefined

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
function log(pool: Pool) {
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });
}

/* export function getClient(config?: string | ClientConfig | undefined) {
  if (config) {
    client = new Client(config)
  } else {
    if (!client) {
      client = new Client(defaultClientConfig())
    }
  }
  return client
} */

export function getPool(config?: PoolConfig | undefined): Pool {
  if (config) {
    pool = initPool(config);
  } else {
    if (!pool) {
      pool = initPool(defaultPoolConfig())
    }
  }
  return pool
}



function initPool(config: PoolConfig) {
  const pool = new Pool(config);
  log(pool);
  return pool
}

export function testConnection(pool: Pool) {
  pool
    .connect()
    .then(() => console.log('connected!!!!!!!!!!!!!!!'))
    .catch((err) => console.error('connection error', err.stack))
}

export async function query(query: QueryConfig) {
  const client = await getPool().connect();
  try {
    const res = await client.query(query);
    console.log(res);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.stack);
    }
  } finally {
    client.release();
  }
}

export interface MyPoolClient extends PoolClient {
  lastQuery: [queryText: string, values: unknown[], callback: (err: Error, result: QueryResult<QueryResultRow>) => void]
}

/* export const getClient = async () => {
  const client: PoolClient = await getPool().connect()
  const query = client.query
  const release = client.release

  // monkey patch the query method to keep track of the last query executed
  query = (args: [unknown]) => {
    return query.apply({...client, lastQuery: args}, args)
  }

  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!')
    console.error(`The last executed query on this client was: ${client.lastQuery}`)
  }, 5000)
  
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout)
    // set the methods back to their old un-monkey-patched version
    client.query = query
    client.release = release
    return release.apply(client)
  }
  return client

} */

