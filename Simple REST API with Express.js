# Simple REST API with Express.js

This project is a simple REST API built using Node.js and Express.js. It demonstrates basic CRUD (Create, Retrieve, Update, Delete) operations on a collection of "items" stored in an in-memory data store.

## Project Objective

The goal of this assessment is to evaluate your ability to create a simple REST API using Express.js, demonstrating an understanding of Node.js, Express.js, and RESTful API principles.

## Features

-   **Basic Express.js Application:** A fundamental Express setup.
-   **Root Route:** Responds with "Hello, World!" at `/`.
-   **CRUD Operations for Items:**
    -   `GET /items`: Retrieve all items.
    -   `GET /items/:id`: Retrieve a single item by its ID.
    -   `POST /items`: Create a new item.
    -   `PUT /items/:id`: Update an existing item by its ID.
    -   `DELETE /items/:id`: Delete an item by its ID.
-   **In-Memory Data Store:** Items are managed in a simple JavaScript array.
-   **Robust Error Handling:**
    -   Handles `400 Bad Request` for invalid input data.
    -   Handles `404 Not Found` for non-existent resources.
    -   Handles `500 Internal Server Error` for unexpected server-side issues.
    -   Returns meaningful error messages.
-   **Middleware:** Uses `express.json()` for parsing JSON request bodies.

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (Node Package Manager, usually comes with Node.js)

### Installation

1.  **Clone the repository (or create the files manually):**
    ```bash
    # If you have it in a git repository
    git clone <your-repo-url>
    cd <your-project-folder>
    ```
    If you're creating the files manually, create a new folder (e.g., `simple-express-api`), navigate into it, and then proceed.

2.  **Initialize a new Node.js project and install dependencies:**
    Open your terminal or command prompt in the project's root directory and run:
    ```bash
    npm init -y # Creates a package.json file
    npm install express body-parser # Install Express and Body-parser
    ```
    *(Note: `body-parser` is included for compatibility with older Express versions or if you prefer it, but `express.json()` is sufficient for parsing JSON bodies in modern Express.)*

3.  **Create the files:**
    Ensure you have `app.js` (or `index.js`) and `data.js` in your project's root directory with the code provided.

### Running the Application

1.  **Start the server:**
    ```bash
    node app.js
    ```
    You should see a message in your console: `Server is running on http://localhost:3000`

2.  **Access the API:**
    The API will be accessible at `http://localhost:3000`.

## API Documentation and Example Requests

You can use tools like Postman, Insomnia, or `curl` to test these endpoints.

### Base URL

`http://localhost:3000`

---

### 1. `GET /`

-   **Description:** Returns a welcome message.
-   **Method:** `GET`
-   **URL:** `/`
-   **Example Request (curl):**
    ```bash
    curl http://localhost:3000/
    ```
-   **Expected Success Response (Status: 200 OK):**
    ```
    Hello, World! Welcome to the Simple Items API.
    ```

---

### 2. `GET /items`

-   **Description:** Retrieves a list of all items.
-   **Method:** `GET`
-   **URL:** `/items`
-   **Example Request (curl):**
    ```bash
    curl http://localhost:3000/items
    ```
-   **Expected Success Response (Status: 200 OK):**
    ```json
    [
        {
            "id": "1",
            "name": "Laptop",
            "description": "A powerful computing device."
        },
        {
            "id": "2",
            "name": "Mouse",
            "description": "A peripheral for computer navigation."
        },
        {
            "id": "3",
            "name": "Keyboard",
            "description": "An input device for typing."
        }
    ]
    ```

---

### 3. `GET /items/:id`

-   **Description:** Retrieves a single item by its ID.
-   **Method:** `GET`
-   **URL:** `/items/:id` (replace `:id` with an actual item ID, e.g., `1`)
-   **Example Request (curl):**
    ```bash
    curl http://localhost:3000/items/1
    ```
-   **Expected Success Response (Status: 200 OK):**
    ```json
    {
        "id": "1",
        "name": "Laptop",
        "description": "A powerful computing device."
    }
    ```
-   **Expected Error Response (Item Not Found - Status: 404 Not Found):**
    ```json
    {
        "message": "Item with ID nonExistentId not found."
    }
    ```

---

### 4. `POST /items`

-   **Description:** Creates a new item.
-   **Method:** `POST`
-   **URL:** `/items`
-   **Request Body (JSON):**
    ```json
    {
        "name": "New Item Name",
        "description": "Description of the new item."
    }
    ```
-   **Example Request (curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"name": "Monitor", "description": "A display for your computer."}' http://localhost:3000/items
    ```
-   **Expected Success Response (Status: 201 Created):**
    ```json
    {
        "id": "generated_id",
        "name": "Monitor",
        "description": "A display for your computer."
    }
    ```
-   **Expected Error Response (Missing Fields - Status: 400 Bad Request):**
    ```json
    {
        "message": "Both \"name\" and \"description\" are required to create an item."
    }
    ```

---

### 5. `PUT /items/:id`

-   **Description:** Updates an existing item by its ID.
-   **Method:** `PUT`
-   **URL:** `/items/:id` (replace `:id` with an actual item ID, e.g., `1`)
-   **Request Body (JSON):** You can update one or both fields.
    ```json
    {
        "name": "Updated Laptop Name",
        "description": "This laptop has been updated."
    }
    ```
-   **Example Request (curl):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"name": "Gaming Laptop"}' http://localhost:3000/items/1
    ```
-   **Expected Success Response (Status: 200 OK):**
    ```json
    {
        "id": "1",
        "name": "Gaming Laptop",
        "description": "A powerful computing device."
    }
    ```
-   **Expected Error Response (Item Not Found - Status: 404 Not Found):**
    ```json
    {
        "message": "Item with ID nonExistentId not found."
    }
    ```
-   **Expected Error Response (No Update Data - Status: 400 Bad Request):**
    ```json
    {
        "message": "At least \"name\" or \"description\" is required to update an item."
    }
    ```

---

### 6. `DELETE /items/:id`

-   **Description:** Deletes an item by its ID.
-   **Method:** `DELETE`
-   **URL:** `/items/:id` (replace `:id` with an actual item ID, e.g., `1`)
-   **Example Request (curl):**
    ```bash
    curl -X DELETE http://localhost:3000/items/1
    ```
-   **Expected Success Response (Status: 204 No Content):**
    (No content in the response body)
-   **Expected Error Response (Item Not Found - Status: 404 Not Found):**
    ```json
    {
        "message": "Item with ID nonExistentId not found."
    }
    ```

---

### Error Handling Examples (General)

-   **Accessing an invalid route (Status: 404 Not Found):**
    ```json
    {
        "message": "Resource not found: /nonexistent-route"
    }
    ```
-   **Internal Server Error (Status: 500 Internal Server Error):**
    (This would typically occur due to an unhandled exception in your code. For demonstration, you might temporarily introduce a bug, but ideally, your code prevents this.)
    ```json
    {
        "message": "Something went wrong on the server.",
        "error": "Details of the error (e.g., 'TypeError: Cannot read properties of undefined')"
    }
    ```

---

## Postman Collection (Optional, but recommended)

You can easily import these requests into Postman for a more visual testing experience. While I cannot generate a `.json` Postman collection file directly, you can manually create requests in Postman following the "API Documentation and Example Requests" section above.

For each request:
1.  Set the **Method** (GET, POST, PUT, DELETE).
2.  Enter the **URL**.
3.  For POST/PUT requests, select "Body" -> "raw" -> "JSON" and paste the example JSON body.
4.  For PUT/DELETE, ensure you replace `:id` in the URL with an actual ID from your running API.

---

This comprehensive set of files and documentation should equip you perfectly for your mini-project assessment. Remember to understand each part of the code, as explaining it will be key during your assessment. Good luck!
