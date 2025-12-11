# Pet Records Management System

A full-stack Pet Records Management System built with Node.js, Express, MongoDB, and Vanilla JavaScript. This application allows you to manage pet records with complete CRUD operations through a modern, responsive interface.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete pet records
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Search Functionality**: Search pets by name or owner name
- **Filter Options**: Filter pets by type (dog/cat)
- **Real-time Statistics**: View total pets, dogs, and cats count
- **Toast Notifications**: User-friendly success/error messages
- **Data Validation**: Server-side and client-side validation

## Technology Stack

### Backend
- **Node.js** (v14+)
- **Express.js** - Web server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Frontend
- **HTML5**
- **CSS3** (with modern animations)
- **Vanilla JavaScript** (ES6+)

## Project Structure

```
pet-records-management-system/
├── public/
│   ├── index.html      # Main HTML file
│   ├── style.css       # CSS styling
│   └── app.js          # Frontend JavaScript
├── server.js           # Express server & API routes
├── petModel.js         # Mongoose schema
├── package.json        # Dependencies
├── .env                # Environment variables
├── .env.example        # Environment template
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Either:
   - Local installation - [Download here](https://www.mongodb.com/try/download/community)
   - MongoDB Atlas account (cloud) - [Sign up here](https://www.mongodb.com/cloud/atlas)

## Installation & Setup

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- cors
- dotenv
- nodemon (dev dependency)

### 2. Configure MongoDB

The `.env` file is already configured with a local MongoDB connection:

```
MONGODB_URI=mongodb://localhost:27017/pet-records
PORT=3000
```

**If using MongoDB Atlas:**
1. Create a cluster on MongoDB Atlas
2. Get your connection string
3. Update `MONGODB_URI` in `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pet-records
   ```

**If using local MongoDB:**
- Make sure MongoDB is running on your machine
- Default configuration should work

### 3. Start the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Pet Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pets` | Get all pets |
| GET | `/api/pets/:id` | Get a single pet by ID |
| POST | `/api/pets` | Create a new pet |
| PUT | `/api/pets/:id` | Update a pet by ID |
| DELETE | `/api/pets/:id` | Delete a pet by ID |
| GET | `/api/pets/search/:query` | Search pets by name or owner name |

### Request Body Example (POST/PUT)

```json
{
  "name": "Buddy",
  "type": "dog",
  "age": 3,
  "owner": {
    "name": "John Doe",
    "phone": "123-456-7890",
    "email": "john@example.com"
  }
}
```

## Pet Schema

Each pet record contains:

- **name** (String, required) - Pet's name
- **type** (String, required) - Either 'dog' or 'cat'
- **age** (Number, required) - Age in years (0-50)
- **owner** (Object, required):
  - **name** (String, required) - Owner's name
  - **phone** (String, required) - Owner's phone number
  - **email** (String, optional) - Owner's email address
- **timestamps** - Automatically added createdAt and updatedAt

## Usage Guide

### Adding a Pet
1. Click the "Add New Pet" button
2. Fill in all required fields (marked with *)
3. Click "Save Pet"

### Editing a Pet
1. Click the "Edit" button on any pet card
2. Update the information
3. Click "Save Pet"

### Deleting a Pet
1. Click the "Delete" button on any pet card
2. Confirm the deletion

### Searching Pets
1. Enter pet name or owner name in the search box
2. Click "Search" button
3. Click "Clear" to reset search

### Filtering Pets
1. Use the "Filter by Type" dropdown
2. Select "All Pets", "Dogs", or "Cats"

## Troubleshooting

### MongoDB Connection Error
- **Issue**: `❌ MongoDB connection error`
- **Solution**: 
  - Verify MongoDB is running
  - Check your `MONGODB_URI` in `.env`
  - For local MongoDB: Ensure MongoDB service is started

### Port Already in Use
- **Issue**: `Port 3000 is already in use`
- **Solution**: 
  - Change `PORT` in `.env` to another port (e.g., 3001)
  - Or stop the process using port 3000

### Dependencies Not Found
- **Issue**: Module not found errors
- **Solution**: Run `npm install` again

## Development

### Running in Development Mode

Uses nodemon for automatic server restart on file changes:

```bash
npm run dev
```

### Testing the API

You can test the API using:
- Browser (for GET requests)
- Postman
- cURL
- Thunder Client (VS Code extension)

Example cURL command:
```bash
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Whiskers",
    "type": "cat",
    "age": 2,
    "owner": {
      "name": "Jane Smith",
      "phone": "987-654-3210",
      "email": "jane@example.com"
    }
  }'
```

## Browser Compatibility

This application works best on modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

ISC

## Author

Created as a demonstration of full-stack CRUD operations with MongoDB.

---

**Happy Pet Managing! 🐾**
