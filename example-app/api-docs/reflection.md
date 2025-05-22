## Reflection on API Documentation and Supabase Integration
Documenting our Laravel API was a valuable step in making our system understandable, testable, and maintainable — not only for ourselves, but also for other developers and potential future contributors. Throughout the project, we focused on clearly describing the available endpoints for managing lessons, lesson completions, users, and admins. Our goal was to create documentation that accurately reflects the purpose and behavior of each API route, along with structured request/response examples.

## The Importance of API Documentation
API documentation is essential for any backend system that will be used or extended by others. It acts as a roadmap, providing developers with the exact structure of the endpoints, what input is expected, and what responses will be returned. Without documentation, teams can’t collaborate efficiently, and maintaining or debugging endpoints becomes a guessing game. For this reason, we ensured our markdown files followed a consistent format with clear examples, proper headers, and validation error handling.

## Challenges We Faced
One of the major challenges we encountered was the CSRF token mismatch error (HTTP 419). We initially used Thunder Client and Postman to test the API, and while they worked once, the CSRF issue kept recurring. We discovered that some Laravel files were missing, such as api.php and the middleware directory, which likely contributed to the inconsistency in test behavior. Even after attempting to disable CSRF checks manually, it never fully stabilized. Because of this, we decided to shift testing manually via web.php routes and mimic Thunder Client’s output.

Another unexpected issue was working with UUIDs as primary keys. It was difficult to match sample data manually, and debugging relations between lessons, courses, and completions required careful data referencing.

## Collaboration Process
We worked as a team to design a unified template for documenting endpoints. Each team member was responsible for different parts — for example, one handled users.md, another admins.md, and I documented lessons.md and lessoncompletions.md. We met regularly to review our progress and made sure the style remained consistent. We included key elements like headers, status codes, query and path parameters, and real JSON output based on our test data.

## How This Helps Future Developers
This documentation will be extremely useful to future developers. It provides not just descriptions of endpoints, but also actual use-case examples, which help visualize what kind of data the API consumes and produces. With all request/response examples, status codes, and error handling scenarios included, a new developer won’t need to dig into the controller files to understand what’s going on.

## Structuring Laravel API with Supabase
Even though we didn’t rely heavily on Supabase features in this project, we designed the database and endpoints to be compatible with it. Our schema used UUIDs to align with Supabase’s default setup, and we ensured foreign keys and table structures were easy to query and update. Supabase’s real-time features and dashboard would have made API testing easier if integrated more deeply.