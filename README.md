# Here is the documentation for my api

All routes start with "website/route"

## Routes

### /auth

- **POST /register**
  - **input format:**
    - **Body:**
      ```json
      {
        "email":     "email, not empty",
        "password":  "string, not empty",
        "username":  "string"
      }
      ```
  - **output format:**
    ```json
    {
      "access_token":  "access_token, string"
    }
    ```
- **POST /login**
  - **input format:**
    - **Body:**
      ```json
      {
        "email":     "email, not empty",
        "password":  "string, not empty",
        "username":  "string"
      }
      ```
  - **output format:**
    ```json
    {
      "access_token":  "access_token, string"
    }
    ```
- **GET /me**
  - **input format:**
    - **Headers:**
      ```json
      {
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN"
      }
      ```
  - **output format:**
    ```json
    {
      "user": "(Not configured yet)"
    }
    ```



### /users
This can only be done by admins!

- **GET /**
  - **input format**
    - **Headers:**
      ```json
      {
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN"
      }
      ```
  - **output format**
    ```json
    [
      {
        "id": "integer",
        "username": "string"
      }
    ]
    ```
- **GET /:id  |  id: number**
  - **input format**
    - **Headers:**
      ```json
      {
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN"
      }
      ```
  - **output format**
    ```json
    {
      "id": "integer",
      "username": "string"
    }
    ```
- **GET /:id/books  |  id: number**
  - **input format**
    - **Headers:**
      ```json
      {
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN"
      }
      ```
  - **output format**
    ```json
    [
      {
        "id":           "integer",
        "title":        "string",
        "description":  "string",
        "genreId":      "integer",
        "authorId":     "integer",
        "borrowerId":   "integer"
      }
    ]
    ```
- **PUT /:id  |  id: number**
  - **input format**
    - **Headers:**
      ```json
      {
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN"
      }
      ```
    - **Body:**
      ```json
      {
        "email":     "email, optional, not empty",
        "username":  "string, optional, not empty",
        "admin":     "boolean, optional, not empty"
      }
      ```
  - **output format**
    ```json
    {
      "id":        "integer",
      "email":     "string",
      "username":  "string",
      "admin":     "boolean"
    }
    ```
- **DELETE /:id  |  id: number**
  - **input format**
    - **Headers:**
      ```json
      {
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN"
      }
      ```
  - **output format**
    HttpCode: 204