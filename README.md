# Slack Clone with Next.js & Convex

![Project Image](#) <!-- ss -->

This is a fully-functional Slack clone built with Next.js and Convex as the backend database and authentication provider. It allows you to create workspaces, manage channels, direct messages (DMs), react to messages, and much more, just like Slack! You can fork it, contribute to it, or just run it locally and customize it to your needs.

## Features

- *Workspaces*: Create multiple workspaces for different teams or projects.
- *Channels*: Add public or private channels inside your workspaces.
- *1:1 Direct Messaging (DMs)*: Send direct messages within the workspace.
- *Threaded Conversations*: Start a thread from any message in a channel or DM.
- *Message Reactions*: React to messages with emojis.
- *Edit & Delete Messages*: Update or remove any message within a channel or DM.
- *Search Functionality*: Search across channels and DMs.
- *User Invitations*: Invite users via a unique code or link.
- *Google & GitHub Authentication*: Seamless signup and login using OAuth from Google or GitHub.
- *Real-time Updates*: Messages and reactions update in real-time without refreshing the page.

## Screenshots

<!-- Attach relevant screenshots of your UI -->

## Getting Started

To run this project locally, follow the steps below.

### Prerequisites

- [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/) installed on your system.
- A [Convex](https://convex.dev/) account to set up a project.
- Google Cloud Console credentials and GitHub OAuth credentials for authentication.

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Diivvuu/slack-clone-nextjs.git
   cd slack-clone

2. Install dependencies:
   - With bun : bun install / With npm : npm install
   - Create a project in Convex.


3. Add your Google and GitHub OAuth credentials to the the environment variables:
    -AUTH_GITHUB_ID
    -AUTH_GITHUB_SECRET
    -AUTH_GOOGLE_ID
    -AUTH_GOOGLE_SECRET
    -JWKS (convex will take care of this)
    -JWT_PRIVATE_KEY (convex will take care of this)
    -SITE_URL (convex will take care of this)

4. Start the development server:

   Using Bun:

    bash   
      - bun run dev
      - bunx convex dev


    Using npm:

   bash 
      - npm run dev
      - npx convex dev


5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
    !Happy Coding then!


## Contributing

This project is still under active development, with new features constantly being added! Feel free to fork the repository, submit a pull request, or open an issue if you'd like to contribute or report a bug.
