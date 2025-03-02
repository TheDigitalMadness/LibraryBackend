# Here is the documentation for my API

All routes start with `website/route`.

## Table of Contents
- [Authentication](#authentication)
  - [POST /register](#post-register)
  - [POST /login](#post-login)
  - [GET /me](#get-me)
- [Users](#users)
  - [GET /](#get-users)
  - [GET /:id](#get-usersid)
  - [GET /:id/books](#get-usersidbooks)
  - [PUT /:id](#put-usersid)
  - [DELETE /:id](#delete-usersid)
- [Authors](#authors)
  - [GET /](#get-authors)
  - [GET /:id](#get-authorsid)
  - [POST /](#post-authors)
  - [PUT /:id](#put-authorsid)
  - [DELETE /:id](#delete-authorsid)
- [Genres](#genres)
  - [GET /](#get-genres)
  - [GET /:id](#get-genresid)
  - [POST /](#post-genres)
  - [PUT /:id](#put-genresid)
  - [DELETE /:id](#delete-genresid)
- [Books](#books)
  - [GET /](#get-books)
  - [GET /:id](#get-booksid)
  - [POST /](#post-books)
  - [PUT /:id](#put-booksid)
  - [DELETE /:id](#delete-booksid)

---

## Routes

<h3 id="authentication"> /auth </h3>

- **POST /register**<p id="post-register"></p>
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
- **POST /login**<p id="post-login"></p>
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
- **GET /me**<p id="get-me"></p>
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

---

<h3 id="users"> /users </h3>
These can only be done by admins!

- **GET /**<p id="get-users"></p>
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
- **GET /:id  |  id: number**<p id="get-usersid"></p>
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
- **GET /:id/books  |  id: number**<p id="get-usersidbooks"></p>
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
- **PUT /:id  |  id: number**<p id="put-usersid"></p>
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
- **DELETE /:id  |  id: number**<p id="delete-usersid"></p>
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

---

<h3 id="authors"> /authors</h3>

- **GET /**<p id="get-authors"></p>
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
- **GET /:id  |  id: number**<p id="get-authorsid"></p>
  - **output format**
    ```json
    {
      "id":           "integer",
      "name":         "string",
      "surname":      "string",
      "description":  "string"
    }
    ```

- **POST /** (This can only be done by admins!)<p id="post-authors"></p>
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
  
- **PUT /:id  |  id: number** (This can only be done by admins!)<p id="put-authorsid"></p>
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

- **DELETE /:id  |  id: number** (This can only be done by admins!)<p id="delete-authorsid"></p>
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

---

<h3 id="genres"> /genres</h3>

- **GET /**<p id="get-genres"></p>
  - **output format**
    ```json
    [
      {
        "id":           "integer",
        "description":  "string"
      }
    ]
    ```
- **GET /:id  |  id: number**<p id="get-genresid"></p>
  - **output format**
    ```json
    {
      "id":           "integer",
      "description":  "string"
    }
    ```

- **POST /** (This can only be done by admins!)<p id="post-genres"></p>
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
  
- **PUT /:id  |  id: number** (This can only be done by admins!)<p id="put-genresid"></p>
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

- **DELETE /:id  |  id: number** (This can only be done by admins!)<p id="delete-genresid"></p>
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

---

<h3 id="books"> /books</h3>

- **GET /?authorId&genreId  |  authorId: number, optional; genreId: number, optional**<p id="get-books"></p>
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
- **GET /:id  |  id: number**<p id="get-booksid"></p>
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
- **POST /** (This can only be done by admins!)<p id="post-books"></p>
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
- **PUT /:id  |  id: number** (This can only be done by admins!)<p id="put-booksid"></p>
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
- **DELETE /:id  |  id: number** (This can only be done by admins!)<p id="delete-booksid"></p>
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