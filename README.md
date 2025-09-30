# About the Project
Score_field is a simple and straightforward application designed to help you track and manage scores and statistics for any kind of match. Whether you're a coach, a referee, or just an enthusiastic fan, this tool makes it easy to log match data in a clear and organized way.


## Features
- Usage without login: You can freely use the app, but to save the result you need to login.
- Match History: View the final results and summary in a single, clear view.
- Universal Use: Adaptable for various sports, from casual games to organized tournaments.

# Getting Started
## Installation
### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js: Download and install Node.js
- npm: Comes bundled with Node.js
- MongoDB: Install MongoDB Community Edition or use a cloud service like MongoDB Atlas.

### Steps
1. Clone the repository:
```
  git clone https://github.com/anoerman/score_field.git
  cd score_field
```
2. Install dependencies:
```
npm install
```
> This command reads the package.json file and installs all required packages, including express, mongoose, and dotenv.

3. Configure environment variables:

4. Create a file named .env in the root of the project with the following content. Replace the placeholder with your MongoDB connection string.
```
    MONGO_URI="your_mongodb_connection_string"
    PORT=3000
```
- For local MongoDB: If you installed MongoDB locally, your connection string might look like mongodb://localhost:27017/score_field.
- For MongoDB Atlas: Copy the connection string from your Atlas cluster. Make sure you have created a database user and whitelisted your IP address.

## Usage

1. Start your MongoDB server:
  Ensure your local MongoDB instance is running. If you are using a cloud service like MongoDB Atlas, you can skip this step.

2. Run the application:
```
    npm start
```
> This command will start the Express server. You will see a confirmation message in your terminal, indicating that the server is running and connected to the database.

3. Access the application:
  The application is now running and accessible. Depending on how your application is structured, you can interact with its API endpoints through a tool like Postman or by accessing the frontend if one exists.

## Contributing
We welcome contributions to score_field! Please see our CONTRIBUTING.md file for details on how you can get involved.
## License
This project is licensed under the MIT License - see the LICENSE file for details.
