# [Smartitude](https://demos.creative-tim.com/material-dashboard-react/#/dashboard)

Components for reference:
https://github.com/nadbm/react-datasheet

![version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/Kuttipishaash/smartitude-app-main.svg?maxAge=2592000)]() [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/Kuttipishaash/smartitude-app-main.svg?maxAge=2592000)]()

The Smartitude System assess a person’s core capability of common skills, such as numerical, verbal and diagrammatic reasoning. It offers a very effective mechanism for training candidates to become increasingly involved in the recruitment process. Smartitude is built over the popular Material-UI framework.

## Used:
+ [React-chartist](https://github.com/fraserxu/react-chartist) for the wonderful charts.


## Table of Contents

* [Versions](#versions)
* [Problem Statement](#problem-statement)
* [Solution](#solution)
* [Documentation](#documentation)
* [File Structure](#file-structure)
* [Browser Support](#browser-support)
* [Resources](#resources)
* [Reporting Issues](#reporting-issues)
* [Technical Support or Questions](#technical-support-or-questions)
* [Licensing](#licensing)
* [Useful Links](#useful-links)


## Problem Statement

College students lack a central and organized system where they can take aptitude tests to practice for their placement drives. The applications that already exist don’t offer many features other than the ability to attend tests and viewing the result along with the right answers.

## Solution

Smartitude application takes up the challenge of solving the above mentioned problem faced by numerous students. Smartitude will offer the following functionalities for its users:
+ Primarily, a Smartitude user can take aptitude tests and view its results as well as the right answers as soon as the test is over.
+ User’s performance in various types of tests taken is analyzed after each test set.
+ Questions selected for tests will be based on the performance of users which will be analysed in various types of tests.
+ Generate weekly leaderboards for the institution.
+ Groups of faculties are allocated to monitor and manage each category of questions based on their area of expertise.
+ Faculties can upload new questions to the question bank of the app. These questions will be added to the question bank only when another faculty in charge of monitoring that category of questions approve the uploaded question and its solution.
+ The admin users of a particular institution can add, remove or edit the other users which includes teachers who are allotted to monitor questions and answers uploaded to the application by students and other teachers who are not in the monitoring teachers list.
+ Separate downloadable report generation for students, teachers and placement cell officers.
+ Colleges can conduct tests for a group of students as a competition.

This application will be made for both web and mobile platforms. The solution for the problem of conducting aptitude training in colleges was inferred from a detailed study conducted among the placement officer. teachers and students of the college.


## Documentation
The documentation for the Material StudentDashboard React is hosted at our [website](https://demos.creative-tim.com/material-dashboard-react/#/documentation/tutorial).


## File Structure

Within the download you'll find the following directories and files:

```
material-dashboard-react
.
├── CHANGELOG.md
├── LICENSE.md
├── README.md
├── documentation
│   ├── assets
│   │   ├── css
│   │   ├── img
│   │   │   └── faces
│   │   └── js
│   └── tutorial-components.html
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── assets
    │   ├── css
    │   │   └── material-dashboard-react.css
    │   ├── github
    │   ├── img
    │   │   └── faces
    │   └── jss
    │       ├── material-dashboard-react
    │       │   ├── cardImagesStyles.jsx
    │       │   ├── checkboxAdnRadioStyle.jsx
    │       │   ├── components
    │       │   │   ├── buttonStyle.jsx
    │       │   │   ├── cardAvatarStyle.jsx
    │       │   │   ├── cardBodyStyle.jsx
    │       │   │   ├── cardFooterStyle.jsx
    │       │   │   ├── cardHeaderStyle.jsx
    │       │   │   ├── cardIconStyle.jsx
    │       │   │   ├── cardStyle.jsx
    │       │   │   ├── customInputStyle.jsx
    │       │   │   ├── customTabsStyle.jsx
    │       │   │   ├── footerStyle.jsx
    │       │   │   ├── headerLinksStyle.jsx
    │       │   │   ├── headerStyle.jsx
    │       │   │   ├── sidebarStyle.jsx
    │       │   │   ├── snackbarContentStyle.jsx
    │       │   │   ├── tableStyle.jsx
    │       │   │   ├── tasksStyle.jsx
    │       │   │   └── typographyStyle.jsx
    │       │   ├── dropdownStyle.jsx
    │       │   ├── layouts
    │       │   │   └── dashboardStyle.jsx
    │       │   ├── tooltipStyle.jsx
    │       │   └── views
    │       │       ├── dashboardStyle.jsx
    │       │       └── iconsStyle.jsx
    │       └── material-dashboard-react.jsx
    ├── components
    │   ├── Card
    │   │   ├── Card.jsx
    │   │   ├── CardAvatar.jsx
    │   │   ├── CardBody.jsx
    │   │   ├── CardFooter.jsx
    │   │   ├── CardHeader.jsx
    │   │   └── CardIcon.jsx
    │   ├── CustomButtons
    │   │   └── Button.jsx
    │   ├── CustomInput
    │   │   └── CustomInput.jsx
    │   ├── CustomTabs
    │   │   └── CustomTabs.jsx
    │   ├── Footer
    │   │   └── Footer.jsx
    │   ├── Grid
    │   │   └── GridItem.jsx
    │   ├── Header
    │   │   ├── Header.jsx
    │   │   └── HeaderLinks.jsx
    │   ├── Sidebar
    │   │   └── Sidebar.jsx
    │   ├── Snackbar
    │   │   ├── Snackbar.jsx
    │   │   └── SnackbarContent.jsx
    │   ├── Table
    │   │   └── Table.jsx
    │   ├── Tasks
    │   │   └── Tasks.jsx
    │   └── Typography
    │       ├── Danger.jsx
    │       ├── Info.jsx
    │       ├── Muted.jsx
    │       ├── Primary.jsx
    │       ├── Quote.jsx
    │       ├── Success.jsx
    │       └── Warning.jsx
    ├── index.js
    ├── layouts
    │   └── StudentDashboard
    │       └── StudentDashboardshboard.jsx
    ├── logo.svg
    ├── routes
    │   ├── dashboard.jsx
    │   └── index.jsx
    ├── variables
    │   ├── charts.jsx
    │   └── general.jsx
    └── views
        ├── StudentDashboard
        │   └── StudentDashboard.jsxard.jsx
        ├── Icons
        │   └── Icons.jsx
        ├── Maps
        │   └── Maps.jsx
        ├── Notifications
        │   └── Notifications.jsx
        ├── TableList
        │   └── TableList.jsx
        ├── Typography
        │   └── Typography.jsx
        ├── UpgradeToPro
        │   └── UpgradeToPro.jsx
        └── UserProfile
            └── UserProfile.jsx
```

## Licensing

- Copyright 2018 Creative Tim (https://www.creative-tim.com)
- Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)
