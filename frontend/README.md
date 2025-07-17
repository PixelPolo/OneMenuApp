# OneMenu Angular Client

**OneMenu** is a collaborative meal planning app designed to help users create a shared menu  
by allowing invited guests to vote on various starters, main courses, desserts, and more.  
An optimization algorithm processes all the votes and selects the menu that  
**maximizes overall satisfaction** across the group — ideal for events, dinners, and parties.

## Features

- Create voting sessions for menus
- Invite guests to participate
- Choose from multiple dishes (starters, mains, desserts, etc.)
- Intelligent algorithm picks the best global combination
- User authentication & session management
- Mobile-first frontend experience

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Environments

<https://angular.dev/tools/cli/environments>

```bash
# TODO after cloning !
ng generate environments
```

```Typescript
export const environment = {
  production: true,
  AUTH0_DOMAIN: '...',
  AUTH0_CLIENT_ID: '...',
  AUTH0_API_AUDIENCE: '...',
  API_URL: '...',
};
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.  
The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default.  
You can choose one that suits your needs.  
Not implemented here.

## Additional Resources

For more information on using the Angular CLI, including detailed command references,  
visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Docker

### Build the image and run the container

```bash
# Build the Docker image
docker build -t onemenu-front .

# Run the container (no need to pass env vars)
docker run --rm --name onemenu-front-container -p 4200:80 onemenu-front
```

### Dockerfile

```Dockerfile
# ---------- STAGE 1: Build the Angular app ----------
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy full source code
COPY . .

# Build Angular app in production mode
RUN npm run build --prod

# ---------- STAGE 2: Serve the built app with NGINX ----------
FROM nginx:alpine

# Copy Angular build to NGINX HTML folder
COPY --from=builder /app/dist/onemenu-front/browser /usr/share/nginx/html

# Optional: custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
```
