# Lessons API

Endpoints related to retrieving lessons for a course and viewing individual lesson content.

------------
  
## Done By :Jaber Allawnah & Ibrahim Bileh


### Headers For All
```
Content-Type: application/json
```
------------

## Get All Lessons in a Course
**GET** `/course/{course_id}/lessons`


### Path Parameters
| Name       | Type  | Required | Description                |
|------------|-------|----------|----------------------------|
| course_id  | uuid  | Yes      | ID of the course to fetch lessons for |

### Success Response (200)
```json
{
  "course_id": "02f9a3e4-24aa-4670-a53a-8888cfd6618a",
  "completedLessons": [
    "5bd6c6cc-1121-4175-84b8-5ae412c93844"
  ],
  "progress": 50,
  "lessons": [
    {
      "lesson_id": "68282a44-7106-4efe-be7f-2ccef2b47b00",
      "title": "Lesson 1 for Course_4",
      "order_number": 1,
      "content_type": "article",
      "content_url": "http://example.com/lesson_1_02f9"
    },
    {
      "lesson_id": "5bd6c6cc-1121-4175-84b8-5ae412c93844",
      "title": "Lesson 2 for Course_4",
      "order_number": 2,
      "content_type": "video",
      "content_url": "http://example.com/lesson_2_02f9"
    }
  ]
}
```

---

## Get One Lesson in a Course
**GET** `/lesson/{lesson_id}/{course_id}`

| Name       | Type  | Required | Description                |
|------------|-------|----------|----------------------------|
| lesson_id  | uuid  | Yes      | ID of the lesson           |
| course_id  | uuid  | Yes      | ID of the course it belongs to |

## Success Response (200)
```json
{
  "lesson": {
    "lesson_id": "5bd6c6cc-1121-4175-84b8-5ae412c93844",
    "title": "Lesson 2 for Course_4",
    "content_type": "video",
    "content_url": "http://example.com/lesson_2_02f9",
    "order_number": 2
  },
  "next": null,
  "prev": {
    "lesson_id": "68282a44-7106-4efe-be7f-2ccef2b47b00",
    "title": "Lesson 1 for Course_4"
  }
}



## Error Response (404)
If either the course or lesson ID is invalid:
```json
{
  "message": "Lesson not found."
}

## Create Lesson
**POST** `/lessons`

### Request Body:
```json
{
  "title": "Lesson 3 for Course_4",
  "course_id": "02f9a3e4-24aa-4670-a53a-8888cfd6618a",
  "content_type": "video",
  "content_url": "http://example.com/lesson_3_02f9",
  "order_number": 3
}
```

###  Success Response (201)
```json
{
  "message": "تم إنشاء الدرس بنجاح",
  "lesson": {
    "lesson_id": "generated-uuid",
    "course_id": "02f9a3e4-24aa-4670-a53a-8888cfd6618a",
    "title": "Lesson 3 for Course_4",
    "content_type": "video",
    "content_url": "http://example.com/lesson_3_02f9",
    "order_number": 3,
    "created_at": "2025-05-20T12:00:00.000000Z",
    "updated_at": "2025-05-20T12:00:00.000000Z"
  }
}
```

---

## Update Lesson
**PUT** `/lessons/5bd6c6cc-1121-4175-84b8-5ae412c93844`

### Request Body:
```json
{
  "title": "Lesson 2 Updated for Course_4",
  "content_type": "video",
  "content_url": "http://example.com/lesson_2_updated_02f9",
  "order_number": 2
}
```

### Success Response (200)
```json
{
  "message": "تم تحديث الدرس بنجاح",
  "lesson": {
    "lesson_id": "5b6dc6cc-1121-4175-84ab-5ae41250c384",
    "title": "Lesson 2 Updated for Course_4",
    "content_type": "video",
    "content_url": "http://example.com/lesson_2_updated_02f9",
    "order_number": 2,
    "updated_at": "2025-05-20T12:30:00.000000Z"
  }
}
```

---

## Delete Lesson
**DELETE** `/lessons/d066e085-d86f-4a8f-843a-6f81c79a6e7f`

###  Success Response (200)
```json
{
  "message": "تم حذف الدرس بنجاح"
}
```

---

##  Validation Error Example (400)
```json
{
  "message": "The title field is required.",
  "errors": {
    "title": [
      "The title field is required."
    ]
  }
}
```