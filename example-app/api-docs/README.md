# Online Course Platform – API Documentation

## Overview 
This API is a requirment to pass web2 course in ANNU, it is used to document our project 'Online Course Platform', this platform allows:
1-Instructors to create and manage courses
2-Students to enroll into courses, take lessons in these courses, and complete courses
3-Admins to manage users accounts and have control over the platform
4-Please notice that not everyone did their task, and we can't do it for them because we need their code to do it,
we included the names of the student who did the task above the task.

## Base URL 
http://localhost:8000

## Authentication
for abdallah

## Rate Limiting

## Error Handling
This section will show how errors are returned and what status codes mean
 Code  Meaning              
----------------------------
 200   OK                   
 201   Created
 400   Bad Request             
 401   Unauthorized         
 404   Not Found            
 422   Validation Error
 419   Request Failed
 429   Too Many Requests
 500   Server Error

 These are mosly included in Laravel by default

## Avaliable Resources
- [Authentication](./auth.md) 
- [Courses](./courses.md)
- [Enrollments](./enrollments.md)
- [LessonCompletions](./lessoncompletions.md)
- [Lessons](./lessons.md)
- [notifications](./notifications.md)
- [Users](./users.md)

## For Thunder_Collection
-Please check [thunder_collection](./thunder_collection.json) file for the thnderclient collection.

## For Reflection
-Please check [reflection](./reflection.md) for the final reflection of the project.