#  Lesson Completions API Documentation

## Done By :Jaber Allawnah


##  Headers (for all requests)
```
Content-Type: application/json
```

---

## Mark Lesson as Completed
**POST** `/storelessons`

###  Request Body:
```json
{
  "lesson_id": "2161a4f8-cb1d-4182-b8b4-9a634a15105e",
  "course_id": "f2849c27-30f5-40b4-9cdd-87521090bdbb"
}
```

### Success Response (200)
```json
{
  "message": "Lesson marked as completed"
}
```

---

## Get All Lesson Completions
**GET** `/lessoncompletions`

### Success Response (200)
```json
{
  "all_completions": [
    {
      "id": "0f286a79-9668-439b-a61b-6a7986065353",
      "student_id": "b38ad75c-cd01-410c-b5a6-d692a7d1bdfa",
      "lesson_id": "5d5ce40f-e004-4ad1-b8df-303226b47b00",
      "course_id": "be203a34-34d2-4692-b207-d6a2f39faeda"
    }
  ]
}
```

---

## Get Specific Lesson Completion
**GET** `/lessoncompletions/0f286a79-9668-439b-a61b-6a7986065353`

### Success Response (200)
```json
{
  "completion": {
    "id": "0f286a79-9668-439b-a61b-6a7986065353",
    "student_id": "b38ad75c-cd01-410c-b5a6-d692a7d1bdfa",
    "lesson_id": "5d5ce40f-e004-4ad1-b8df-30322bd79b00",
    "course_id": "be203a34-34d2-4692-b207-d6a2f39faeda"
  }
}
```

---

## Update Lesson Completion
**PUT** `/lessoncompletions/0f286a79-9668-439b-a61b-6a7986065353`

### Request Body:
```json
{
  "student_id": "0524c29d-8233-4189-82a0-3cfb46042eb4",
  "lesson_id": "02f9a3e4-24aa-4670-a53a-8888cfd6618a",
  "course_id": "02f9a3e4-24aa-4670-a53a-8888cfd6618a"
}
```

### Success Response (200)
```json
{
  "message": "Updated successfully"
}
```

---

## Delete Lesson Completion
**DELETE** `/lessoncompletions/0f286a79-9668-439b-a61b-6a7986065353`

### Success Response (200)
```json
{
  "message": "Deleted successfully"
}
```

---

## Validation Error Example (400)
```json
{
  "message": "The lesson_id field is required.",
  "errors": {
    "lesson_id": [
      "The lesson_id field is required."
    ]
  }
}
```
