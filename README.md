# Personal Dashboard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

It is a personal dashboard with useful widgets to manage tasks, read news or weather investigation. It was implemented using some pre-built components from previous projects where I was involved.

Dashboard contains basically 3 widgets: 

- **Live Weather Widget:** Allows you to check the real time weather conditions from OpenWeatherMap API on your actual location (you need to allow access to your location) or just simply search for weather conditions in specific locations around the world.
- **News Widget:** Allows you to check top-headlines from news divided by certain categories (general category is selected by default), you can change the category in the dropdown to check any other news. If you like you can also choose any new for more information.
- **Tasks Widget:** Allows you to create To Do Tasks and simply mark them as completed whenever you finished the selected task. You can also delete any task in your list.
- **Calendar Widget:** An additional widget (created with a brief and general implementation of react big calendar) that allows you to manage your personal calendar adding some events at specific dates and times, and also see them through the personalized calendar.

## How to Set Up and Run Locally ?

When you download the repository only need to run

### `npm install`

Then you just start the development server with

### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

If you want to launch the test runner just need to execute

### `npm test`

It launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Libraries

There are few libraries used in the project:

- **Material UI:** It was used to simplify the dashboard visual design, using some useful features that allows developers to focus on the functionalities rather than design of simple elements like inputs, buttons, checkbox, tables and more.
- **React Icons:** Used to add pretty icons to sidebar, menu and buttons.
- **Sweet Alert 2:** Used to manage alerts through the dashboard like success messages, warnings and error handling.
- **Date fns and DayJS:** used to format date values from the APIs to show them in pretty format and also to manage date inputs.
- **React Big Calendar:** used to implement the calendar feature with a set of pre-built items to manage the calendar view easily.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).