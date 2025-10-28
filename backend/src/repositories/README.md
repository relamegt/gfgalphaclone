# Repositories

This directory contains data access layer implementations that interact with Astra DB.

Repositories should:

- Handle database queries and mutations
- Abstract database implementation details
- Return typed data models
- Handle database-specific errors

Example structure:

```typescript
export class UserRepository {
  async findById(id: string): Promise<User | null> {
    // Database query here
  }

  async create(user: CreateUserData): Promise<User> {
    // Database insert here
  }
}
```

## Astra DB Integration

Use the `astraDb` instance from `@utils/database` to get the Cassandra client:

```typescript
import { astraDb } from '@utils/database';

const client = astraDb.getClient();
if (client) {
  const result = await client.execute(query, params);
}
```
