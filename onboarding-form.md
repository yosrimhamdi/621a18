# Part 3: Written Evaluation (Answer)

## Benefits around saving the onboarding steps data in the front-end:

- This is what we normally do when dealing with forms. We define the needed form structure in the front-end.
- This method prevents unnecessary HTTP requests to the server.
- The form structure will be easy to understand and modify by our front-end engineers as it is simple jsx or HTML tags.

## Drawbacks around saving the onboarding steps data in the front-end:

- There is no consistency between the front and the back-end.
- We can add additional form inputs and submit post requests to the server and we might receive an error from the server.

## Benefits around saving the onboarding steps data in the back-end:

- The form inputs will be predefined and expected by the server.
- Easy server-side request body validation.
- By changing the steps on the server, the front-end UI will change automatically (if it is done the right way).

## Drawbacks around saving the onboarding steps data in the back-end:

- Hardcoded data is always a bad thing.
- If the website is in production and if we want to change the steps we must restart the server.
