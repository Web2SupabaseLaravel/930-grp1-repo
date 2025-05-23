# Lastestcourse API

Endpoints related to retrieving the most recently added courses and we can see the courses based on a specific category.

------------
  
## Done By :Walaa Turkman(12323751)


### Headers For All
| Name          | Required | Description                       |
|---------------|----------|-----------------------------------|
| Content-Type  | Yes      | Must be `application/json`        |
| Accept        | Yes      | Must be `application/json`        |

------------
## Get All Lastest course

**GET** `/api/lastestcourses`

### Success Response (200)
```json
[
  {
    "id": "f2849c27-30f5-40b4-9cdd-87521090bdbb",
    "title": "Course_5",
    "catagory": "Category_5",
    "description": "Description for Course 5",
    "price": "116.8",
    "instructor_id": "818774de-8ce6-4d33-a000-0cd4d344e536",
    "learning_objectives": "Objective 1, Objective 2",
    "managed_by": "9c82e723-9fff-4b1d-930a-a89b4ef1d19f"
  },
  {
    "id": "ed2a9535-bfaa-44c0-b574-5adb62275dda",
    "title": "Course_2",
    "catagory": "Category_2",
    "description": "Description for Course 2",
    "price": "435.95",
    "instructor_id": "818774de-8ce6-4d33-a000-0cd4d344e536",
    "learning_objectives": "Objective 1, Objective 2",
    "managed_by": "8faf2226-c270-4be8-89c7-ffc60a4bf1eb"
  },
  {
    "id": "be203a34-34d2-4692-b207-d6a2f39faeda",
    "title": "Course_1",
    "catagory": "Category_1",
    "description": "Description for Course 1",
    "price": "315.85",
    "instructor_id": "7175a847-938e-4ebf-a2d8-1bc948e5b2e9",
    "learning_objectives": "Objective 1, Objective 2",
    "managed_by": "f31b3592-1bd7-4d11-9774-e572ef6e6e77"
  },
  {
    "id": "2751ebab-33b9-4953-9cc6-678bf31fc15a",
    "title": "Course_3",
    "catagory": "Category_3",
    "description": "Description for Course 3",
    "price": "269.71",
    "instructor_id": "818774de-8ce6-4d33-a000-0cd4d344e536",
    "learning_objectives": "Objective 1, Objective 2",
    "managed_by": "8faf2226-c270-4be8-89c7-ffc60a4bf1eb"
  },
  {
    "id": "02f9a3e4-24aa-4670-a53a-8888cfd6618a",
    "title": "Course_4",
    "catagory": "Category_4",
    "description": "Description for Course 4",
    "price": "301.75",
    "instructor_id": "b1b088cb-723e-40d6-ab3a-a81d72e99545",
    "learning_objectives": "Objective 1, Objective 2",
    "managed_by": "8faf2226-c270-4be8-89c7-ffc60a4bf1eb"
  }
]
```

---

## Get all courses in a specific category
**GET** `/api/lastestcoursescatagory=Category_5`



## Success Response (200)
```json
[
  {
    "id": "f2849c27-30f5-40b4-9cdd-87521090bdbb",
    "title": "Course_5",
    "catagory": "Category_5",
    "description": "Description for Course 5",
    "price": "116.8",
    "instructor_id": "818774de-8ce6-4d33-a000-0cd4d344e536",
    "learning_objectives": "Objective 1, Objective 2",
    "managed_by": "9c82e723-9fff-4b1d-930a-a89b4ef1d19f"
  }
]
```