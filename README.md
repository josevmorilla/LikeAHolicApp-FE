# LikeAholic Social App

LikeAholic is a social media application that allows users to view and interact with posts. This project is built using React for the frontend and a Spring Boot backend.

## ⚠️ Prerequisites

### Backend Requirement
Before running this frontend application, you **MUST** have the backend server running:

1. Clone the backend repository: [LikeAholic Backend](https://github.com/beasterX/LikeAHolicSocialApp-)
2. Follow the backend setup instructions
3. Ensure the backend is running on `http://localhost:8080`

Without the backend server running, this application will not function properly.

### Frontend Requirements
Make sure you have the following installed:

1. Node.js and npm
2. React Scripts - Install globally using:
   ```bash
   npm install react-scripts
   ```
   If you encounter any issues, try:
   ```bash
   npm install react-scripts --save
   ```

## Features

- View a list of posts
- Navigate between Home, Posts, and Users pages
- Responsive design with styled components

## Technologies Used

- **Frontend**: React, React Router, Axios
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

## Project Structure

- **frontend/**: Contains the React application
  - **src/components/**: React components
  - **src/styles/**: CSS files
  - **src/services/**: API service configuration
- **backend/**: Contains the Spring Boot application
