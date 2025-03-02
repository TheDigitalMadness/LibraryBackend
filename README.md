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
These can only be done by admins!

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
    ```
    HttpCode: 204
    ```



### /authors

- **GET /**
  - **output format**
    ```json
    [
      {
        "id":           "integer",
        "name":         "string",
        "surname":      "string",
        "description":  "string"
      }
    ]
    ```
- **GET /:id  |  id: number**
  - **output format**
    ```json
    {
      "id":           "integer",
      "name":         "string",
      "surname":      "string",
      "description":  "string"
    }
    ```

- **POST /** (This can only be done by admins!)
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
        "name":         "string",
        "surname":      "string",
        "description":  "string, optional"
      }
      ```
  - **output format**
    ```json
    {
      "id":           "integer",
      "name":         "string",
      "surname":      "string",
      "description":  "string | null",
      "books": [
        {
          "id":           "integer",
          "genreId":      "integer",
          "title":        "string",
          "description":  "string"
        }
      ]
    }
    ```
  
- **PUT /:id  |  id: number** (This can only be done by admins!)
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
        "name":         "string, optional, not empty",
        "surname":      "string, optional, not empty",
        "description":  "string, optional"
      }
      ```
  - **output format**
    ```json
    {
      "id":           "integer",
      "name":         "string",
      "surname":      "string",
      "description":  "string | null",
      "books": [
        {
          "id":           "integer",
          "genreId":      "integer",
          "title":        "string",
          "description":  "string"
        }
      ]
    }
    ```

- **DELETE /:id  |  id: number** (This can only be done by admins!)
  - **input format**
    - **Headers:**
      ```json
      {
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN"
      }
      ```
  - **output format**
    ```
    HttpCode 204
    ```



### /genres

- **GET /**
  - **output format**
    ```json
    [
      {
        "id":           "integer",
        "description":  "string"
      }
    ]
    ```
- **GET /:id  |  id: number**
  - **output format**
    ```json
    {
      "id":           "integer",
      "description":  "string"
    }
    ```

- **POST /** (This can only be done by admins!)
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
        "description":  "string"
      }
      ```
  - **output format**
    ```json
    {
      "id":           "integer",
      "description":  "string",
    }
    ```
  
- **PUT /:id  |  id: number** (This can only be done by admins!)
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
        "description":  "string, optional"
      }
      ```
  - **output format**
    ```json
    {
      "id":           "integer",
      "description":  "string",
    }
    ```

- **DELETE /:id  |  id: number** (This can only be done by admins!)
  - **input format**
    - **Headers:**
      ```json
      {
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN"
      }
      ```
  - **output format**
    ```
    HttpCode 204
    ```



### /books

- **GET /?authorId&genreId  |  authorId: number, optional; genreId: number, optional**
  - **output format**
    ```json
    [
      {
        "id":           "integer",
        "authorId":     "integer",
        "genreId":      "integer",
        "title":        "string",
        "description":  "string"
      }
    ]
    ```
- **GET /:id  |  id: number**
  - **output format**
    ```json
    {
      "id":           "integer",
      "authorId":     "integer",
      "genreId":      "integer",
      "title":        "string",
      "description":  "string"
    }
    ```
- **POST /** (This can only be done by admins!)
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
        "authorId":     "integer",
        "genreId":      "integer",
        "title":        "string",
        "description":  "string"
      }
      ```
  - **output format**
    ```json
    {
      "id":           "integer",
      "authorId":     "integer",
      "genreId":      "integer",
      "title":        "string",
      "description":  "string"
    }
    ```
- **PUT /:id  |  id: number** (This can only be done by admins!)
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
        "authorId":     "integer, optional, not empty",
        "genreId":      "integer, optional, not empty",
        "title":        "string, optional, not empty",
        "description":  "string, optional, not empty"
      }
      ```
  - **output format**
    ```json
    {
      "id":           "integer",
      "authorId":     "integer",
      "genreId":      "integer",
      "title":        "string",
      "description":  "string"
    }
    ```
- **DELETE /:id  |  id: number** (This can only be done by admins!)
  - **input format**
    - **Headers:**
      ```json
      {
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN"
      }
      ```
  - **output format**
    ```
    HttpCode 204
    ```