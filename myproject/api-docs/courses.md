# Courses API Documentation

> Endpoints for managing courses: list, create, update, show, and delete courses.

---

## Done By: Manar Khader

## Headers (For All Requests)

```http
### Headers For All
| Name          | Required | Description                        |
|---------------|----------|------------------------------------|
| Content-Type  | Yes      | Must be `application/json`         |
| Accept        | Yes      | Must be `application/json`         |

Authorization: Bearer {{token}} (when required)
```

---

## Get All Courses

**GET** `/api/courses`

### Success Response (200)

```json
{
  "courses": [
    {
      "course_id": "de3b1d54-38dc-4e38-a88c-9dc9614a124f",
      "title": "Full Stack Web Development",
      "catagory": "Programming",
      "description": "A full stack web development course using Laravel and Vue.js.",
      "price": 150,
      "learning_objectives": "Laravel, Vue.js, MySQL, REST APIs",
      "instructor": {
        "id": "8faf2226-c270-4be8-89c7-ffc60a4bf1eb",
        "name": "Osama Mohammad",
        "email": "elzero@example.com"
      }
    }
  ]
}
```

---

## Create New Course

**POST** `/api/courses`

### Request Body

```json
{
  "title": "Full Stack Web Development",
  "catagory": "Programming",
  "description": "A full stack web development course using Laravel and Vue.js.",
  "price": 150,
  "instructor_id": "8faf2226-c270-4be8-89c7-ffc60a4bf1eb",
  "learning_objectives": "Laravel, Vue.js, MySQL, REST APIs"
}
```

### Success Response (201)

```json
{
  "message": "Course created successfully",
  "course_id": "de3b1d54-38dc-4e38-a88c-9dc9614a124f"
}
```

### Error Response (422 - Validation)

```json
{
  "errors": {
    "title": ["The title field is required."],
    "price": ["The price must be a number."]
  }
}
```

---

## Show Single Course

**GET** `/api/courses/{course_id}`

### Success Response (200)

```json
{
  "course": {
    "course_id": "de3b1d54-38dc-4e38-a88c-9dc9614a124f",
    "title": "Full Stack Web Development",
    "catagory": "Programming",
    "description": "A full stack web development course using Laravel and Vue.js.",
    "price": 150,
    "learning_objectives": "Laravel, Vue.js, MySQL, REST APIs",
    "instructor": {
      "id": "8faf2226-c270-4be8-89c7-ffc60a4bf1eb",
      "name": "Osama Mohammad",
      "email": "elzero@example.com"
    }
  }
}
```

### Error Response (404)

```json
{
  "message": "Course not found"
}
```

---

## Update Course

**PUT** `/api/courses/{course_id}`

### Request Body

```json
{
  "title": "Updated Course Title",
  "catagory": "Advanced Programming",
  "description": "Updated description.",
  "price": 200,
  "instructor_id": "8faf2226-c270-4be8-89c7-ffc60a4bf1eb",
  "learning_objectives": "Advanced Laravel, Vue 3"
}
```

### Success Response (200)

```json
{
  "message": "Course updated successfully"
}
```

---

## Delete Course

**DELETE** `/api/courses/{course_id}`

### Success Response (200)

```json
{
  "message": "Course deleted successfully"
}
```

### Error Response (404)

```json
{
  "message": "Course not found"
}
```

---

## Common Status Codes

| Code | Meaning             |
|------|---------------------|
| 200  | Success             |
| 201  | Created             |
| 204  | No Content (optional) |
| 400  | Validation Error    |
| 401  | Unauthorized        |
| 404  | Not Found           |
| 500  | Server Error        |

---

## Thunder Client / Postman Guide

### Thunder Client:

1. Click "+ New Request"
2. Choose the method (GET, POST, etc.)
3. Paste the full URL (e.g., http://127.0.0.1:8000/api/courses)
4. Set Headers:
   - Content-Type: application/json
   - Authorization: Bearer {{token}}
5. Add request body for POST/PUT
6. Click Send

### Postman:

1. Click "+ New Request"
2. Choose HTTP method and enter endpoint URL
3. Add headers:
   - Accept: application/json
   - Authorization: Bearer {{token}}
4. In Body, choose "raw" and "JSON" for POST/PUT
5. Click "Send"
