# Mise-En

_By Jim Nguy - [Check out Mise-En](https://mise-en.herokuapp.com/)_

## Quick look

Mise-En is a full stack application that's designed to facilitate the gathering of friends at events centered around preparing a meal together. The app was built using React/Redux in the frontend and Flask/SQLAlchemy/PostgreSQL in the backend.

Anyone on the site can create an event, which provides a unique URL generated using a SHA256 hash. Events hosts can invite attendees by giving them access with another URL unique to the attendee OR sending a URL which allows attendees to create their own instances.

There is an option to register an account, though the application is usable without it. Logged in users have access to carousels which displays their upcoming or previous events. Registered users also have an additional layer of authentication when they access their event instance, prohibiting anyone but the user from accessing it.

Accessing an event using the unique URL allows the user to view event details, other attendees, change going or not status, and view that event's planned menu and required items.

## Application Architecture

### Frontend

I used [React](https://reactjs.org/) to create components that could be combined to create the interactive UI. The application state was managed using [Redux](https://redux.js.org/) and [react-redux](https://react-redux.js.org/) library, which made requests to the backend API and updated the store as neccessary. This allowed me to forgo prop threading data throughout all my components and update components only as needed.

### Backend

I used an SQL database with [PostgreSQL](https://www.postgresql.org/) as the RDBMS, [Flask](https://flask.palletsprojects.com/en/2.0.x/) as the backend server framework, [SQLAlchemy](https://www.sqlalchemy.org/) as the Python SQL toolkit and ORM.

## Next steps

It was really fun developing Mise-En, the majority of which was built in 2 weeks. This was the first non-clone solo project I've worked on, and I've grown a lot with each iteration and architecture/design changes. My next steps are in the [To Do section](https://github.com/guny12/Capstone-Mise-En/projects/1) of my repo. I'm sure it will keep growing on as more feature ideas and technologies get added.
