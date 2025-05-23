# enrollments API

Endpoints related to retrieving the courses the student is enrolled in and the ability to enrol in a new course, and see the details of each course he is enrolled in.

------------
  
## Done By :Walaa Turkman(12323751)


### Headers For All
| Name          | Required | Description                       |
|---------------|----------|-----------------------------------|
| Content-Type  | Yes      | Must be `application/json`        |
| Accept        | Yes      | Must be `application/json`        |

------------

## Get All Enrollments
**GET** `/api/enrollments`

> Retrieves a list of all courses the student is enrolled in.

### Success Response (200)
```json
[
  {
    "student_id": "0524c29d-8233-4189-82a0-3cfb46042eb4",
    "course_id": "02f9a3e4-24aa-4670-a53a-8888cfd6618a",
    "progress_percent": 70,
    "course": {
      "id": "02f9a3e4-24aa-4670-a53a-8888cfd6618a",
      "title": "Course_4",
      "catagory": "Category_4",
      "description": "Description for Course 4",
      "price": "301.75",
      "instructor_id": "b1b088cb-723e-40d6-ab3a-a81d72e99545",
      "learning_objectives": "Objective 1, Objective 2",
      "managed_by": "8faf2226-c270-4be8-89c7-ffc60a4bf1eb"
    }
  }
]
```

---

## Enroll in a Course
**POST** `/api/enrollments`

### Request Body

| Name      | Type | Required | Description        |
|-----------|------|----------|--------------------|
| user_id   | uuid | Yes      | ID of the user     |
| course_id | uuid | Yes      | ID of the course   |
<!--
Body request example: 
{
  "user_id": "0524c29d-8233-4189-82a0-3cfb46042eb4",
  "course_id": "ed2a9535-bfaa-44c0-b574-5adb62275dda"
}
-->
## Error Response (409 Conflict)
```json
{
  "message": "Already enrolled in this course."
}

<!--
Body request example:
With different course id 
{
  "user_id": "0524c29d-8233-4189-82a0-3cfb46042eb4",
  "course_id": "be203a34-34d2-4692-b207-d6a2f39faeda"
}
-->

## Success Response (201 Created)
```json
{
  "course_id": "be203a34-34d2-4692-b207-d6a2f39faeda",
  "student_id": "0524c29d-8233-4189-82a0-3cfb46042eb4",
  "progress_percent": 0
}


## Get Specific Enrollment

**GET** `/api/enrollments/{course_id}`

> Retrieve details of a specific enrolled course by course ID.

<!--
Example
/api/enrollments/be203a34-34d2-4692-b207-d6a2f39faeda 
-->

### Path Parameters

| Name      | Type | Required | Description                |
|-----------|------|----------|----------------------------|
| course_id | uuid | Yes      | ID of the course           |

###  Success Response (200)
```json
{
  "student_id": "0524c29d-8233-4189-82a0-3cfb46042eb4",
  "course_id": "be203a34-34d2-4692-b207-d6a2f39faeda",
  "progress_percent": 0,
  "course": {
    "id": "be203a34-34d2-4692-b207-d6a2f39faeda",
    "title": "Course_1",
    "catagory": "Category_1",
    "description": "Description for Course 1",
    "price": "315.85",
    "instructor_id": "7175a847-938e-4ebf-a2d8-1bc948e5b2e9",
    "learning_objectives": "Objective 1, Objective 2",
    "managed_by": "f31b3592-1bd7-4d11-9774-e572ef6e6e77"
  }
}
```


---

## Unenroll from a Course
**DELETE** `/api/enrollments/{student_id}/{course_id}`
<!--
Example
/api/enrollments/0524c29d-8233-4189-82a0-3cfb46042eb4/be203a34-34d2-4692-b207-d6a2f39faeda
-->
### Path Parameters

| Name       | Type | Required | Description         |
|------------|------|----------|---------------------|
| student_id | uuid | Yes      | ID of the student   |
| course_id  | uuid | Yes      | ID of the course    |
 
###  Success Response (200)
```json
{
  "message": "Enrollment deleted"
}

```

---

