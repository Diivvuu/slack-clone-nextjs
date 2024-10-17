![image](https://github.com/user-attachments/assets/26f12129-2fbb-46c9-b9c8-3c42975347f1)# Slack Clone with Next.js & Convex  
 [deployed link here](https://slack-clone-nextjs.vercel.app/)

![image](https://github.com/user-attachments/assets/15c981cc-3649-4e77-ba19-1c9dc9bdf082)


This is a fully-functional Slack clone built with Next.js and Convex as the backend database and authentication provider. It allows you to create workspaces, manage channels, direct messages (DMs), react to messages, and much more, just like Slack! You can fork it, contribute to it, or just run it locally and customize it to your needs.

feel free to login with these credentials and explore the functionality
 - johnmail@gmail.com Password123! 
 - alicemail@gmail.com Password213!
(these 2 credentials are already in sample workspace and you can create more workspaces, channel, invite more people via joincode, feel free to explore)

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
![image](https://github.com/user-attachments/assets/b7c0d636-2fef-448e-ac4f-4e9c06052f52)
![image](https://github.com/user-attachments/assets/fcce8263-eae2-4e2f-928f-55da6c5b1d99)
![image](https://github.com/user-attachments/assets/8b755731-38fa-467c-97a1-59f5882fe2be)
![image](https://github.com/user-attachments/assets/3c5f6c51-062e-40de-be16-6a7446f7533b)
![image](https://github.com/user-attachments/assets/0dbd04f9-3fcb-4e9f-b2e3-0998c32ae69c)
![image](https://github.com/user-attachments/assets/25d656c1-888e-4635-98e1-f37bc235ef27)
![image](https://github.com/user-attachments/assets/b2582d70-e4ea-45f3-b88a-4e6094494323)


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
