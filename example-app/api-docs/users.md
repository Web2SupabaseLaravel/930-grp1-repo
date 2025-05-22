# Users API Documentation

> Endpoints for managing users: register, login, password, and viewing users.

---

## Done By: Abdallah Khatib

## Headers (For All Requests)

```http
Content-Type: application/json
Authorization: Bearer {{token}} (when required)
```

---

## Get All Users

**GET** `/api/users`

### Success Response (200)

```json
{
  "users": [
    {
      "id": "0524c29d-8233-4189-82a0-3cfb46042eb1",
      "email": "user_3@example.com"
    }
  ]
}
```

---

## Register New User

**POST** `/api/register`

### Request Body

```json
{
  "name": "user_11",
  "email": "user_11@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Success Response (201)

```json
{
  "message": "User registered successfully"
}
```

---

## Login User

**POST** `/api/login`

### Request Body

```json
{
  "email": "user_3@example.com",
  "password": "password123"
}
```

### Success Response (200)

```json
{
  "message": "Logged in"
}
```

### Error Response (401)

```json
{
  "message": "Invalid credentials"
}
```

---

## Forgot Password

**POST** `/api/forgot-password`

### Request Body

```json
{
  "email": "user_3@example.com"
}
```

### Success Response (200)

```json
{
  "status": "passwords.sent"
}
```

---

## Reset Password

**POST** `/api/reset-password`

### Request Body

```json
{
  "email": "user_3@example.com",
  "password": "newpassword123",
  "password_confirmation": "newpassword123",
  "token": "{{reset_token_here}}"
}
```

### Success Response (200)

```json
{
  "status": "passwords.reset"
}
```

---

## Common Status Codes

| Code | Meaning          |
| ---- | ---------------- |
| 200  | Success          |
| 201  | Created          |
| 204  | No Content       |
| 400  | Validation Error |
| 401  | Unauthorized     |
| 404  | Not Found        |
| 500  | Server Error     |

---

## Thunder Client / Postman Guide

**Thunder Client:**

1. Click "+ New Request"
2. Choose method and paste URL (e.g., `{{baseUrl}}/api/users`)
3. Set required headers (especially Authorization)
4. Add body for POST/PUT requests
5. Click "Send" and save to collection

**Postman:**

1. Click "+ New Request"
2. Choose method and paste URL
3. Set headers and request body
4. Click "Send" and save to workspace


# Admins API Documentation

Endpoints related to admin management, user control, and reporting.

---

## Done By: Mohammad Ammous

### Headers (for all requests)

```http
Content-Type: application/json
Authorization: Bearer {{token}}
```

---

## Get All Users (Admin Panel)

**GET** `/admin/users`

### Success Response (200)

```json
[
  {
    "id": "8faf2226-c270-4be8-89c7-ffc60a4bf1eb",
    "email": "user_7@example.com"
  },
  {
    "id": "9c82e723-9fff-4b1d-930a-a89b4efd1d9f",
    "email": "user_9@example.com"
  }
]
```

---

## Create New User

**POST** `/admin/users`

### Request Body

```json
{
  "email": "new_admin@example.com",
  "password": "strongPass123"
}
```

### Success Response (201)

```json
{
  "message": "User created successfully"
}
```

---

## Update User Email

**PUT** `/admin/users/{user_id}`

### Request Body

```json
{
  "email": "updated_admin@example.com"
}
```

### Success Response (200)

```json
{
  "message": "User updated successfully"
}
```

---

## Delete User

**DELETE** `/admin/users/{user_id}`

### Success Response (204)

```json
{
  "message": "User deleted successfully"
}
```

---

## Enrollments Report

**GET** `/admin/reports/enrollments`

### Success Response (200)

```json
[
  {
    "course_id": 1,
    "student_count": 25,
    "course": {
      "name": "Web Development"
    }
  }
]
```

---

## Most Popular Courses

**GET** `/admin/reports/popular-courses`

### Success Response (200)

```json
[
  {
    "course_id": 2,
    "total": 53,
    "course": {
      "name": "Data Science"
    }
  }
]
```

---

## Login (For Admin Access)

**POST** `/api/login`

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "yourPassword"
}
```

### Success Response (200)

```json
{
  "access_token": "xxxxxxxxxxxx",
  "token_type": "Bearer"
}
```

---

## Status Codes

| Status Code | Description          |
| ----------- | -------------------- |
| 200         | Success              |
| 201         | Created              |
| 204         | No Content (Deleted) |
| 400         | Validation Error     |
| 401         | Unauthorized         |
| 404         | Not Found            |
| 500         | Server Error         |
