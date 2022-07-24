# Part 3: Written Evaluation (Answer)

## Benefits around saving the onboarding steps data in the front-end:

- This is what we normally do when dealing with forms. We define the needed form structure in the front-end.
- This method prevents unnecessary HTTP requests to the server.
- The form structure will be easy to understand and modify by our front-end engineers as it is simple jsx or React components.

## Drawbacks around saving the onboarding steps data in the front-end:

- There is no consistency between the front-end and the back-end.
- We can add additional form inputs and submit post requests to the server and we might receive an error from the server.

## Benefits around saving the onboarding steps data in the back-end:

- The form inputs will be predefined and expected by the server.
- Easy server-side request body validation.
- By changing the steps on the server, the front-end UI will change automatically (if it is done right).

## Drawbacks around saving the onboarding steps data in the back-end:

- Hardcoded data is always a bad thing.
- If the website is in production and if we want to change the steps we must restart the server.

## Benefits around saving the onboarding steps data in the database:

- By saving the onboarding steps in the database we can create a endpoint that performs CRUD operations on the steps.

## Drawbacks around saving the onboarding steps data in the database:

- Unnecessary database access.

## Personal perspective

- In my opinion saving the onboarding steps data in the database must be the best technique.
