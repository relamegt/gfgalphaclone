# Services

This directory contains business logic services that orchestrate operations between controllers and repositories.

Services should:

- Contain business logic and validation
- Coordinate between multiple repositories
- Handle complex operations
- Not directly interact with HTTP requests/responses

Example structure:

```typescript
export class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    // Business logic here
  }
}
```
