# Family Tree App

This app stores your family tree data, allowing you to add new members, make changes to existing members and delete members. I am meeting the Code Louisville project requirements through my get, post, put and delete routes as well as 5 units tests for the get, post and delete routes. I used node and npm packages like sequelize, sequelize-cli, sqlite3, mocha, pug and more to create this project.

I am using v14.16.0 of node for this project.

## Installation

Download project files and run npm to install dependencies.

```bash
npm install
```

Start up app with the following command.

```bash
nodemon
```

## Usage

1. Use [DB Browser for SQLite](https://sqlitebrowser.org/dl/) to view database structure.
2. View project on localhost:3000 where you can add, update and delete members easily.
3. Run the following command to test routes.
```bash
npm run test
```

# Endpoints



| Endpoint                        | Description                                     | Method |
| ------------------------------- | ----------------------------------------------- | ------ |
| '/' or '/members'               | list of all family members                      | GET    |
| '/members/new'                  | Display new family member form                  | GET   |
| '/members/:id'                  | Display individual family member                | GET    |
| '/members/:id/edit'             | Edit family member form                         | GET    |
| '/members/:id/edit'             | Update a family member                          | POST   |
| "/members/:id/delete"           | Display delete confirmation                     | GET    |
| '/members/:id/delete'           | Delete a family member                          | POST   |