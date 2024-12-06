# LikeAholic Social App

LikeAholic is a social media application that allows users to create, view, update, and delete posts and users. It includes functionality to display a list of posts and users, interact with resources, and navigate between different pages. This project is built using React for the frontend and a Spring Boot backend.

## ⚠️ Prerequisites

### Backend Requirement
Before running this frontend application, ensure the backend server is running:

1. Clone the backend repository: [LikeAholic Backend](https://github.com/beasterX/LikeAHolicSocialApp-)
2. Follow the backend setup instructions provided in the backend repository.
3. Ensure the backend is running on `http://localhost:8080`.

Without the backend server running, this application will not function properly.

### Frontend Requirements
Make sure you have the following installed:
1. **Node.js and npm**: Download from [Node.js Official Website](https://nodejs.org/).
2. **React Scripts**: If you encounter issues, install it globally using:
   ```bash
   npm install react-scripts -g
   ```
   Alternatively, add it locally to the project:
   ```bash
   npm install react-scripts --save
   ```

## Features

### Core Functionality
- **Posts**: 
  - View a list of posts.
  - Create, update, and delete posts.
  - Automatically update the post list after any modification.
- **Users**: 
  - View a list of users.
  - Create, update, and delete users.
  - Automatically update the user list after any modification.

### Navigation
- Navigate seamlessly between Home, Posts, and Users pages using React Router.
  
### Error Handling
- Prevents deletion of resources with one-to-many relationships (e.g., trying to delete a user linked to posts).
- Displays errors for failed actions (e.g., invalid input or server-side restrictions).

### Reusable Design
- Modular and reusable components (`PostCard`, `UserCard`) for consistent UI/UX.
- Fully responsive and adaptive design using custom CSS.

## Technologies Used

- **Frontend**: React, React Router, Axios, Bootstrap
- **Backend**: Spring Boot
- **Styling**: CSS

## Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/likeaholic-social-app.git
   cd likeaholic-social-app
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

### Possible Errors and Fixes
#### React-Scripts Issues
- **Error**: `react-scripts not found.`
  **Fix**:
  ```bash
  npm install react-scripts
  ```

#### Bootstrap Issues
- **Error**: Missing Bootstrap styles or components.
  **Fix**:
  ```bash
  npm install bootstrap
  ```

#### Backend Connection Issues
- **Error**: `Failed to fetch data.`
  **Fix**:
  1. Verify the backend is running at `http://localhost:8080`.
  2. Check for any CORS issues in the browser console.

## Project Structure

### Overview
The project is divided into the following main sections:
- **Frontend**: The React application (`src/` directory).
- **Backend**: The Spring Boot application (refer to the backend repository).

### Frontend Structure
- **src/components/**
  - **app/**:
    - `Header.js`: Header component for navigation and theme toggle.
  - **posts/**:
    - `PostCard.js`: Displays individual posts.
    - `PostForm.js`: Form for creating and editing posts.
    - `PostList.js`: Displays a list of all posts.
  - **users/**:
    - `UserCard.js`: Displays individual users.
    - `UserForm.js`: Form for creating and editing users.
    - `UserList.js`: Displays a list of all users.

- **src/pages/**
  - `HomePage.js`: Landing page for the application.
  - `PostPage.js`: Detailed page for managing posts.
  - `UserPage.js`: Detailed page for managing users.

- **src/services/**
  - `api.js`: Handles all API calls (fetching, creating, updating, deleting resources).

- **src/styles/**
  - Contains all CSS files for the application.

## Credits
This project was designed and developed as part of **420-N34-LA sect.00002 in Java Web Programming**.
