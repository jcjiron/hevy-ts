# Hevy API Client

This is a Node.js client for interacting with the Hevy API. It is written in TypeScript and allows authentication and access to workouts, routine folders, exercise templates, and webhooks.

## 🚀 Installation

```sh
npm install hevy-ts
```

## 📌 Usage

```typescript
import dotenv from "dotenv";
import { HevyClient } from "./domain/usecases/HevyClient";
import { AxiosHttpClient } from "./datasource/AxiosHttpClient";

dotenv.config(); // load your env variables

const apiKey = process.env.API_KEY || "";
const httpClient = new AxiosHttpClient(apiKey);
const hevy = new HevyClient(httpClient);

(async () => {
  // List all workouts
  const workouts = await hevy.getWorkouts(1, 5);
  console.log(workouts);

  // Get workout by ID
  const workout = await hevy.getWorkoutById("workout_id");
  console.log(workout);

  // Create a new workout
  const newWorkout = await hevy.createWorkout({
    title: "Push Day",
    description: "Chest and triceps",
    start_time: "2025-07-23T00:00:00Z",
    end_time: "2025-07-23T01:00:00Z",
    is_private: false,
    exercises: [],
  });
  console.log(newWorkout);

  // Update a workout
  const updatedWorkout = await hevy.updateWorkout("workout_id", {
    ...newWorkout,
  });
  console.log(updatedWorkout);

  // Routine folders
  const folders = await hevy.getRoutineFolders(1, 5);
  console.log(folders);

  // Exercise templates
  const templates = await hevy.getExerciseTemplates(1, 5);
  console.log(templates);

  // Webhook subscription
  const webhook = await hevy.getWebhookSubscription();
  console.log(webhook);
})();
```

## 📦 Features

- Authentication with the Hevy API
- Workouts Management:
  - Get all workouts
  - Get workout by ID
  - Create workout
  - Update workout
- Routine Folders Management:
  - List folders
  - Get folder by ID
  - Create folder
- Exercise Templates Management:
  - List templates
  - Get template by ID
- Webhook Management:
  - Get subscription
  - Create subscription
  - Delete subscription
- Robust error handling and logging
- Axios integration for HTTP requests
- Full TypeScript support

## 🔧 Scripts

Run the following commands for development:

```sh
npm install       # Install dependencies
npm test          # Run unit tests
npm run build     # Compile TypeScript code
npm publish       # Publish to NPM
```

## 📜 Versioning with Semantic Release

This package uses Semantic Release to automatically manage versions based on commit messages.

Commit Examples:

- `fix: fixed a bug in workout creation` → `1.0.1`
- `feat: added support for routine folders` → `1.1.0`
- `BREAKING CHANGE: modified data structure` → `2.0.0`

## 🚀 CI/CD with GitHub Actions

Each push to main triggers a workflow that:

- Runs tests.
- Builds the code.
- Publishes the package to NPM if the commit follows Semantic Versioning.

## 📄 License

This project is licensed under the MIT License.
