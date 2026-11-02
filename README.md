# Northstar Login and Registration

A beginner-friendly React, Vite, Bootstrap, and Spring Boot authentication demo.

## Requirements

- Node.js and npm
- MySQL with the database configured by the Spring Boot backend
- The existing Spring Boot backend running at `http://localhost:8080`

The frontend calls `POST /api/auth/register` with `{ "name", "email", "password" }`
and `POST /api/auth/login` with `{ "email", "password" }`.

## Run the frontend

From this directory:

```sh
npm install
npm run dev
```

Open the URL Vite prints (normally `http://localhost:5173`). To check the
production bundle and lint rules, run `npm run build` and `npm run lint`.

## Run the backend and MySQL

Start MySQL and make sure its database, credentials, and port match your
Spring Boot configuration. Then start your existing backend using the command
appropriate for its project (for example, `.\mvnw.cmd spring-boot:run` from
the backend folder in Windows PowerShell if it uses Maven). Keep the backend available at port `8080`;
its CORS configuration should allow `http://localhost:5173`.

The backend source is not included in this frontend workspace, so its specific
MySQL setup and startup command depend on your backend project configuration.

## Test registration and login

1. Start MySQL, the backend, and the frontend.
2. Visit `/register`, enter a name, email, password (at least six characters),
   and matching confirmation, then submit.
3. After successful registration, sign in at `/login` with that email and
   password. Duplicate email and other backend validation errors appear on the
   form.
4. The dashboard shows the email returned by the login response. Use **Sign
   out** to return to the login page.

## Authentication limitation

The current login API returns a message and email, but no JWT or session token.
This demo keeps the email in React memory only; it is not stored in localStorage
or sessionStorage and is cleared by refreshing the page. The dashboard route is
only a frontend navigation guard. It does not authenticate requests or secure
protected resources on the backend. Do not treat this flow as production
authentication.
