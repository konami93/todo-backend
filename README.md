# Todo List Backend API

Backend API for task management application built with NestJS, Prisma, and MySQL.

## 🚀 Technologies

- **Node.js** - JavaScript runtime
- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **MySQL** - Relational database
- **JWT** - Token-based authentication
- **TypeScript** - JavaScript with static typing
- **Bcrypt** - Password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd todo-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root:
```env
DATABASE_URL="mysql://root:password@localhost:3306/todo_db"
JWT_SECRET="your-secure-jwt-secret"
JWT_EXPIRES_IN=604800
PORT=3000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
```

4. **Create the database**
```sql
CREATE DATABASE todo_db;
```

5. **Run migrations**
```bash
npx prisma migrate dev
npx prisma generate
```

## 🚀 Running the Application
```bash
npm run start:dev
```

API will be available at `http://localhost:3000/api`

## 📚 API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Tasks (authentication required)

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>

{
  "title": "My task",
  "description": "Task description",
  "dueDate": "2024-12-31T23:59:59Z"
}
```

#### List Tasks
```http
GET /api/tasks
GET /api/tasks?status=PENDING
GET /api/tasks?status=COMPLETED
Authorization: Bearer <token>
```

#### Get Task
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Update Task
```http
PATCH /api/tasks/:id
Authorization: Bearer <token>

{
  "title": "New title",
  "status": "COMPLETED"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

#### Get Statistics
```http
GET /api/tasks/statistics
Authorization: Bearer <token>
```

## 🗄️ Data Models

### User
- id (UUID)
- email (String, unique)
- password (String, hashed)
- name (String, optional)
- createdAt (DateTime)
- updatedAt (DateTime)

### Task
- id (UUID)
- title (String)
- description (String, optional)
- dueDate (DateTime, optional)
- status (PENDING | COMPLETED)
- userId (UUID)
- createdAt (DateTime)
- updatedAt (DateTime)

## 🏗️ Architecture
```
src/
├── auth/              # Authentication module
│   ├── decorators/    # Custom decorators
│   ├── dto/           # Data Transfer Objects
│   ├── guards/        # Authorization guards
│   └── strategies/    # Passport strategies
├── tasks/             # Tasks module
│   ├── dto/           # Task DTOs
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── prisma/            # Prisma service
└── main.ts            # Entry point
```

## 📦 Scripts
```bash
npm run start:dev      # Development mode
npm run build          # Build for production
npm run start:prod     # Production mode
npx prisma studio      # Database UI
```