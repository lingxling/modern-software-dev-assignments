# Week 2 Write-up
Tip: To preview this markdown file
- On Mac, press `Command (⌘) + Shift + V`
- On Windows/Linux, press `Ctrl + Shift + V`

## INSTRUCTIONS

Fill out all of the `TODO`s in this file.

## SUBMISSION DETAILS

Name: **TODO** \
SUNet ID: **TODO** \
Citations: **TODO**

This assignment took me about **TODO** hours to do. 


## YOUR RESPONSES
For each exercise, please include what prompts you used to generate the answer, in addition to the location of the generated response. Make sure to clearly add comments in your code documenting which parts are generated.

### Exercise 1: Scaffold a New Feature
Prompt: 
```
Implement an LLM-powered alternative to extract_action_items() function, called extract_action_items_llm(), that utilizes Ollama to perform action item extraction via a large language model. Include proper error handling and fallback to the heuristic method if LLM fails.
``` 

Generated Code Snippets:
```
week2/app/services/extract.py:92-174
```

### Exercise 2: Add Unit Tests
Prompt: 
```
Write unit tests for extract_action_items_llm() covering multiple inputs (e.g., bullet lists, keyword-prefixed lines, empty input) in week2/tests/test_extract.py.
``` 

Generated Code Snippets:
```
week2/tests/test_extract.py:4-64
```

### Exercise 3: Refactor Existing Code for Clarity
Prompt: 
```
Refactor the backend code for clarity, focusing on well-defined API contracts/schemas, database layer cleanup, app lifecycle/configuration, and error handling. Create Pydantic schemas for API requests and responses, and update routers to use these schemas.
``` 

Generated/Modified Code Snippets:
```
week2/app/schemas.py:1-60
week2/app/routers/action_items.py:1-58
week2/app/routers/notes.py:1-54
```


### Exercise 4: Use Agentic Mode to Automate a Small Task
Prompt: 
```
1. Integrate the LLM-powered extraction as a new endpoint. Update the frontend to include an "Extract LLM" button that, when clicked, triggers the extraction process via the new endpoint.
2. Expose one final endpoint to retrieve all notes. Update the frontend to include a "List Notes" button that, when clicked, fetches and displays them.
``` 

Generated Code Snippets:
```
week2/app/routers/action_items.py:38-52
week2/frontend/index.html:24-130
```


### Exercise 5: Generate a README from the Codebase
Prompt: 
```
Use Cursor to analyze the current codebase and generate a well-structured README.md file. The README should include, at a minimum:
- A brief overview of the project
- How to set up and run the project
- API endpoints and functionality
- Instructions for running the test suite
``` 

Generated Code Snippets:
```
week2/README.md:1-180
```


## SUBMISSION INSTRUCTIONS
1. Hit a `Command (⌘) + F` (or `Ctrl + F`) to find any remaining `TODO`s in this file. If no results are found, congratulations – you've completed all required fields. 
2. Make sure you have all changes pushed to your remote repository for grading.
3. Submit via Gradescope. 