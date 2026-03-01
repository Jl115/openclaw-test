# Build Plan: Personal Biography Site

## Architecture Overview

```
openclaw-test/
├── docker-compose.yml          # PostgreSQL + volume
├── backend/
│   ├── package.json
│   ├── server.js               # Express entry
│   ├── config/
│   │   └── database.js         # Sequelize config
│   ├── models/
│   │   ├── index.js            # Sequelize init
│   │   ├── User.js             # User model (bcrypt)
│   │   └── Biography.js        # Biography content model
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── routes/
│   │   ├── auth.js             # /register, /login
│   │   └── biography.js        # Protected GET /biography
│   └── .env.example
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   ├── router/
│   │   │   └── index.js        # Vue Router + guards
│   │   ├── stores/
│   │   │   └── auth.js         # Pinia auth store
│   │   ├── views/
│   │   │   ├── LoginView.vue
│   │   │   ├── RegisterView.vue
│   │   │   └── BiographyView.vue
│   │   ├── components/
│   │   │   ├── SkeletonScreen.vue
│   │   │   └── BiographyContent.vue
│   │   └── api/
│   │       └── client.js       # Axios + interceptors
```

## Execution Phases

### Phase 1: Foundation
1. Create `docker-compose.yml` with PostgreSQL
2. Initialize backend with package.json, basic Express server
3. Initialize frontend with `npm create vue@latest`
4. First commit

### Phase 2: Backend Core
1. Sequelize setup + models (User, Biography)
2. Auth middleware (JWT)
3. Auth routes (register/login)
4. Protected biography route
5. Seed initial biography data
6. Commit

### Phase 3: Frontend Core
1. Pinia auth store
2. API client with auth headers
3. Router with navigation guards
4. Login/Register views
5. Commit

### Phase 4: Biography UI
1. Skeleton screen component
2. Biography content component
3. BiographyView with conditional rendering
4. Styling/polish
5. Commit

### Phase 5: Integration & Polish
1. Full end-to-end test
2. Bug fixes
3. Final commit + README

## Key Decisions
- Pinia for state management (Vue 3 standard)
- Axios for HTTP with interceptors for JWT
- Skeleton UI using conditional rendering + v-if/v-else
- Docker volume for DB persistence
