# Nuxt Store
This project create simple store with user management feature

## Technologies Used

Nuxt.js - Web application framework
Firebase - Backend as a service
Tailwind CSS - Utility-first CSS framework
TypeScript - Typed superset of JavaScript
Pinia - Intuitive and type-safe store for Vue

## Project structure
The project is structured as follows:

``` markdown
├── assets/               # Images, fonts, and other static assets
├── components/           # Reusable Vue components
├── layouts/              # Standard layouts for your application
├── pages/                # Application pages and routes
│   ├── index.vue         # Home page
│   └── auth/             # Authentication-related pages
│   │   ├── login.vue     # Login page
│   │   └── register.vue  # Registration page
│   └── admin/            # admin routes
│       ├── products.vue  # Product management page
│       └── users.vue     # User management page
├── plugins/              # Vue plugins and other initialization code
├── static/               # Static files that are served as-is
├── store/                # Pinia stores for managing application state
│   ├── index.ts          # Root store
│   └── user.ts           # User store
├── types/                # Type definitions for TypeScript
├── .env                  # Environment variables
├── tsconfig.json         # Typscript configuration
├── nuxt.config.js        # Nuxt.js configuration
└── package.json          # NPM dependencies and scripts
```

Getting Started
Clone the repository:

```bash
  git clone https://devops.runsystem.info/virtualgroup/hcm_branch/training_web/tree/feature/training/vue3
  cd tinnt1/nuxtjs

```

Install dependencies:

```bash
  yarn install

```

Create a Firebase project and set up the necessary services (Authentication, Firestore, etc.). Add the Firebase configuration to your .env file:

```bash
FIREBASE_API_KEY=<your-api-key>
FIREBASE_AUTH_DOMAIN=<your-auth-domain>
FIREBASE_PROJECT_ID=<your-project-id>
FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
FIREBASE_APP_ID=<your-app-id>
```

| Test `user` account: `user1@gmail.com` - password `123123`
| Test `admin` account: `11a1eric3@gmail.com` - password `123123`

Start the development server:

```bash
yarn dev

```

Open http://localhost:3000 in your browser to see the application.

## Build and Deployment

To build the application for production, run:

```bash
yarn build
```

This will generate a production-ready version of the application in the dist directory.

To deploy the application, you can use any hosting provider that supports static sites (e.g. Netlify, Vercel, Firebase Hosting).

## Contributing

Fork the repository.
Create a new branch: git checkout -b feature/branch-name
Make your changes and commit them: git commit -m 'Add some feature'
Push the branch to your fork: git push origin feature/branch-name
Submit a pull request.
License
MIT

## Acknowledgments

Any acknowledgments or credits you want to give.
Any external resources used.
#

