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
        "Authorization":  "Bearer YOUR_ACCESS_TOKEN" <br>
      }
      ```
  - **output format:**
    ```json
    {
      "user": "(Not configured yet)"
    }
    ```