# Take Home Assessment - Front-End

This boiler plate project should help you get going on your take home assessment. It includes a basic install for vue and vite. 

It comes packaged with pinia for state management.

Read all instructions carefully before proceeding, and ensure your dev environment is up and running.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup 
### Install packages

```sh
yarn
```

### Compile and Hot-Reload for Development
```sh
yarn dev
```

### Compile and Minify for Production (Not required by assessment)
```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)
```sh
yarn lint
```

# Assessment Instructions

Create a simple front-end application based on the provided figma mock ups. 

- Your submission should be in the form of a Pull-Request.
- Deployment is optional.
- Data is provided via a pre-compiled REST API, provided to you in your email from HR.
- Commit messages should use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Endpoint Documentation
| Method | Endpoint |
| ----- | -----|
| GET | /users |
| GET (filter) | /users?First Name=value |
| GET (by id) | /users/1 |
| GET (paginate) | /users?_page=2&_limit=10
| POST | /users |
| PUT | /users/1 |
| PATCH | /users/1 |
| DELETE | /users/1 |

### The Application should:
- Show a filterable list of all users in the system. (Filter the list by the type of plan the user has).
- Show a detail display for a user when one is selected, where user info can be modified and saved.
- Show a modal for creating a new user
- Validate inputs before submitting forms

### Additional Notes:
- Use pinia for app state management.
- 3rd party UI libraries are allowed. Feel free to use one of your choice. UI does not need to match the mockup exactly.
- Add additional libraries as you wish.
- For Avatars, we recommend using [dicebear](https://www.dicebear.com/styles/pixel-art/). Placeholder images are also acceptable.
- Your time is valuable, please time-box your work. We don't expect you to work on this for more than a few hours.
- If you can't complete the entire project in a reasonable amount of time, send us what you have. We can still assess your skills without 100% completion.
- Unit tests are not required as part of this assessment.

# Mockups
## Outline
Your application should render a very basic list of users, and a detail pane showing user information. A user should be able to modify existing users, and create new users.

![User Details Page](https://github.com/user-attachments/assets/e2cbe7fe-e248-4a17-b3bb-7eae24c271fa)

## User List
The user list should show a filterable collection of user list objects.

![image](https://github.com/user-attachments/assets/17ecc77a-0309-4090-a827-ae11b8a4488c)

### Users should be able to:
- Click an item in the list and see user details in the detail pane
- Click the filter and be presented with a few options for filtering the list. (Plan type is a mandatory filter option, first and last name are optional)
- Click the create new user button and be presented with a modal for creating a new user

## Details Pane
The details pane shows the detail of an individual user.

![image](https://github.com/user-attachments/assets/eccd5366-396d-4856-9c78-659e9eff7177)

### Users should be able to:
- View basic details about the current user
- Edit details for a user
- Validate inputs before saving
- Save the user

## Filter Panel
The filter panel is used for filtering the user list.

![image](https://github.com/user-attachments/assets/e8fef909-ff17-4b8d-bf7f-a2ad241fa322)

### Users should be able to:
- Select from a list of Plan Types
- (Optional) Type in a user first name
- (Optional) Type in a user's last name
- Click filter to apply the filter (or) have the list filtered automatically

## Create User Modal
The create user modal is used for creating a new user and should include form validation.
![image](https://github.com/user-attachments/assets/6cf698ac-581a-4920-8515-02e627c5ccbb)

### Users should be able to:
- See a modal dialog containing fields for creating a new user (Profile picture is optional)
- See a selector containing a list of Plans to choose from:
  - Free Plan
  - Pro Plan
  - Trial
- See a selector containing a list of Companies to choose from:
  - Axiomworx
  - Equinox Engineering
  - Apple
- Validate inputs before saving
- Click a save button to create the new user
- See the list updated immediately with the new user

Test

