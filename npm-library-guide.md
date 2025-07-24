NPM Library (GitHub Actions + Semmantic Versions)
Juan Carlos Jirón
Juan Carlos Jirón
4 min read
·
Mar 25, 2025

Zoom image will be displayed

Photo by Andrew Roberts on Unsplash
During the entire day, I was running tests on how to publish my library to NPM and automate the deployment process. I didn’t want to spend time on manual deployments, so I decided — along with ChatGPT — to find a solution to this. After experimenting with different configurations, I finally asked ChatGPT to write a technical report of the approach we found. Now, I’m sharing it here on Medium. If you’re building a library and want to save time on deployments, you’ll find this guide valuable. Cheers! 🚀

📦 Library Link
You can find the published library here: Hostaway-TS on NPM

🏗️ Step 1: Setting Up Your TypeScript Library
1.1 Initialize Your Project
Create a new directory and initialize a package.json file:

mkdir library-ts && cd library-ts
npm init -y
Then, install TypeScript and some essential dependencies:

npm install --save-dev typescript @types/node rimraf ts-node nodemon
npm install --save-dev semantic-release @semantic-release/changelog @semantic-release/commit-analyzer @semantic-release/git @semantic-release/npm @semantic-release/release-notes-generator
1.2 Configure TypeScript
Create a tsconfig.json file:

{
"compilerOptions": {
"target": "es2020",
"module": "commonjs",
"baseUrl": ".",
"rootDir": "src",
"outDir": "dist/",
"esModuleInterop": true,
"forceConsistentCasingInFileNames": true,
"strict": true,
"skipLibCheck": true,
"declaration": true,
"declarationMap": true,
"emitDeclarationOnly": false,
"sourceMap": true,
"paths": {
"@src/_": ["src/_"]
},
"resolveJsonModule": true
},
"include": ["src"],
"exclude": ["node_modules", "test", "dist"]
}
1.3 Add scripts in package.json
Create a tsconfig.json file:

{
"name": "library-ts",
"version": "1.0.0",
"main": "dist/src/index.js",
"types": "dist/src/index.d.ts",
"scripts": {
"test": "npm run build && jest",
"test:watch": "npm run build && jest --watch",
"test:coverage": "jest --coverage",
"build": "rimraf ./dist && tsc --project tsconfig.json",
"start": "npm run build && node dist/src/index.js",
"dev": "nodemon src/index.ts"
},
"author": "",
"license": "ISC",
"description": "",
"devDependencies": {
"@semantic-release/changelog": "^6.0.3",
"@semantic-release/commit-analyzer": "^13.0.1",
"@semantic-release/git": "^10.0.1",
"@semantic-release/npm": "^12.0.1",
"@semantic-release/release-notes-generator": "^14.0.3",
"@types/node": "^22.14.1",
"nodemon": "^3.1.9",
"rimraf": "^6.0.1",
"semantic-release": "^24.2.3",
"ts-node": "^10.9.2",
"typescript": "^5.8.3"
}
}
Now, create a src/index.ts file:

export const helloWorld = (): string => {
return "Hello, world!";
};
Build your library and run it:

npm run build
npm run dev

"Hello world!"
Your compiled files will be in the dist folder with definition types.

🛠 Step 2: Setting Up GitHub Actions for Continuous Deployment
2.1 Create a GitHub Workflow
Generate an NPM Authentication Token
Log in to NPM.
Go to Access Tokens under your profile settings.
Click Generate New Token.
Choose Automation Token.
Copy the token and store it securely.
Add the NPM Token to GitHub Secrets
Go to GitHub → Your Repository → Settings → Secrets and Variables → Actions.
Click New Repository Secret.
Name it NPM_TOKEN and paste the token value.
Inside your project, create the GitHub Actions workflow:

mkdir -p .github/workflows
nano .github/workflows/npm-publish.yml
Paste the following content:

name: Release to NPM
on:
push:
branches: - main
jobs:
release:
runs-on: ubuntu-latest
env:
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} //it's generated automatically
NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
steps: - name: Checkout repository
uses: actions/checkout@v4
with:
fetch-depth: 0 - name: Setup Node.js
uses: actions/setup-node@v4
with:
node-version: 20
registry-url: "https://registry.npmjs.org/" - name: Install dependencies
run: npm install - name: Run tests
run: npm test - name: Build the package
run: npm run build - name: Semantic Release
run: npx semantic-release
2.2 Making a Release
To trigger a release, update your package.json

{
"name": "hostaway-ts",
"version": "1.0.0",
"description": "A TypeScript client for Hostaway API.",
"main": "dist/index.js",
"types": "dist/index.d.ts",
"files": [
"dist"
],
"scripts": {
"build": "tsc",
"test": "jest"
},
"dependencies": {},
"devDependencies": {
"typescript": "^4.7.4",
"jest": "^29.0.0"
},
"release": {
"branches": ["main"],
"plugins": [
["@semantic-release/commit-analyzer"],
["@semantic-release/release-notes-generator"],
["@semantic-release/changelog"],
["@semantic-release/npm"],
["@semantic-release/git", {
"assets": ["package.json", "CHANGELOG.md"],
"message": "chore(release): 🚀 ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
}]
]
}
}
and make a commit following Conventional Commits format:

git commit -m "feat: add new function"
git push origin main
Semantic Release will: ✅ Analyze the commit message.
✅ Bump the package version automatically.
✅ Publish the package to NPM.

Manual Release (Optional)
If needed, force a release manually:

git commit --allow-empty -m "chore: trigger release"
git push origin main
📂 Step 3: Configure the .npmignore File
To prevent unnecessary files from being published to NPM, create a .npmignore file:

node_modules
src
.github
.test
.jest.config.js
.prettierrc.js
tsconfig.json
package-lock.json
README.md
CHANGELOG.md
This ensures that only the compiled files in dist/ are published.

📥 Step 4: Importing the Library in Another Project
Once your library is published, install it in any project:

npm install hostaway-ts
Then, import it into your code:

import { helloWorld } from "hostaway-ts";
console.log(helloWorld());
This will output:

Hello, world!
🎯 Conclusion
By following this guide, you now have: ✅ A structured TypeScript library (Hostaway-TS).
✅ An automated GitHub Actions workflow.
✅ A secure NPM authentication system.
✅ Automated versioning with Semantic Release.
✅ A clean project structure with proper configurations.

With this setup, you can focus on building features while your library is automatically published with every push to main. 🚀

💬 Share your experience in the comments and follow me here!
