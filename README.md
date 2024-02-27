# Ababa Movie List Server

The server-side code for the Movie List application. This server provides the necessary backend functionality to support the client-side application, allowing users to browse and manage their favorite movies. You can download client-side code [here](https://github.com/darkeris345/Ababa-Movies-List-FE)

## Getting Started

To get started, first, you need git and Node.js installed, and to create the MongoDB database.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/darkeris345/Ababa-Movies-List-server.git
   ```

2. Navigate to the repository directory:

   ```bash
   cd Ababa-Movies-List-server
   ```

3. Install dependencies:

   ```bash
   npm i
   ```

4. Run the server:

   ```bash
   npm start
   ```

## MongoDB Database Setup

1. Create a MongoDB account if you don't have one:[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) for more details.

2. Create a MongoDB database and give it the name you want.

3. Create a .env file in this project and add your database details. Here is an example:

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb+srv://<USERNAME>:<PASSWORD>@tours.fpc6858.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority
JWT_SECRET=YOUR_JWT_SECRET_KEY
```

4. There is an import.js file in the root folder, use it to upload moviesDB.movies.json file to your database. You can upload JSON files to the database manually or use import.js.

```bash
node import.js --import
```

if you want to delete all data from the database: 

```bash
node import.js --delete
```

# Giving the user the admin type

There are two types of users: Admin and User. Admin users can additionally add, edit, and remove movies from the movie list. Users have only read-only access to the movie list, they can only view the list, add those movies to their favorite list, and remove them.

## Adding Admin Type using Postman

To add an admin type, you can use Postman to make a POST request to your authentication endpoint when registering a new user. Provide the following JSON payload in the request body:

```json
{
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD",
  "type": "admin"
}
```
