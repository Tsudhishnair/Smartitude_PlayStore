# [Smartitude](https://demos.creative-tim.com/material-dashboard-react/#/dashboard)

<div align="left">
	<img src="https://raw.githubusercontent.com/Kuttipishaash/smartitude-app-main/master/src/assets/img/drawable/smart_logo.png" width="300">
</div>


![version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/Kuttipishaash/smartitude-app-main.svg?maxAge=2592000)]() [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/Kuttipishaash/smartitude-app-main.svg?maxAge=2592000)]()

The Smartitude System assess a person’s core capability of common skills, such as numerical, verbal and diagrammatic reasoning. It offers a very effective mechanism for training candidates to become increasingly involved in the recruitment process. Smartitude is built over the popular Material-UI framework.


## Table of Contents

* [Problem Statement](#problem-statement)
* [Solution](#solution)
* [Built With](#built-with)
* [File Structure](#file-structure)
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


## Built With

+ [material-dashboard-react](https://github.com/creativetimofficial/material-dashboard-react)
+ [Graphql](https://github.com/graphql/graphql-js)
+ [React-chartist](https://github.com/fraserxu/react-chartist) for the wonderful charts.
+ [material-ui-pickers](https://github.com/dmtrKovalenko/material-ui-pickers)
+ [react-datasheet](https://github.com/nadbm/react-datasheet)



## File Structure

Within the download you'll find the following directories and files:

```
smartitude-app-main 
.
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── LICENSE.md
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── apple-icon.png
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── Utils.js
    ├── assets
    │   ├── css
    │   │   └── material-dashboard-react.css
    │   ├── img
    │   │   ├── apple-icon.png
    │   │   ├── bg4.jpg
    │   │   ├── bg5.jpg
    │   │   ├── cover.jpeg
    │   │   ├── drawable
    │   │   │   ├── lock.jpg
    │   │   │   └── smart_logo.png
    │   │   ├── faces
    │   │   │   └── marc.jpg
    │   │   ├── favicon.png
    │   │   ├── mask.png
    │   │   ├── new_logo.png
    │   │   ├── reactlogo.png
    │   │   ├── sidebar-1.jpg
    │   │   ├── sidebar-2.jpg
    │   │   ├── sidebar-3.jpg
    │   │   ├── sidebar-4.jpg
    │   │   ├── smart_white.png
    │   │   └── tim_80x80.png
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
    │       │   │   ├── customDropdownStyle.jsx
    │       │   │   ├── customInputStyle.jsx
    │       │   │   ├── customTabsStyle.jsx
    │       │   │   ├── footerStyle.jsx
    │       │   │   ├── headerLinksStyle.jsx
    │       │   │   ├── headerStyle.jsx
    │       │   │   ├── infoStyle.jsx
    │       │   │   ├── parallaxStyle.jsx
    │       │   │   ├── productStyle.jsx
    │       │   │   ├── sidebarStyle.jsx
    │       │   │   ├── snackbarContentStyle.jsx
    │       │   │   ├── tableStyle.jsx
    │       │   │   ├── tasksStyle.jsx
    │       │   │   └── typographyStyle.jsx
    │       │   ├── dropdownStyle.jsx
    │       │   ├── layouts
    │       │   │   ├── dashboardStyle.jsx
    │       │   │   └── loginStyles.jsx
    │       │   ├── tooltipStyle.jsx
    │       │   ├── tooltipsStyle.jsx
    │       │   └── views
    │       │       ├── components.jsx
    │       │       ├── dashboardStyle.jsx
    │       │       ├── headerLinksStyle.jsx
    │       │       ├── headerStyle.jsx
    │       │       ├── iconsStyle.jsx
    │       │       ├── landingPage.jsx
    │       │       └── loginPage.jsx
    │       ├── material-dashboard-react.jsx
    │       └── material-kit-react.jsx
    ├── components
    │   ├── AutoChip
    │   │   └── ReactChipSelect.jsx
    │   ├── Card
    │   │   ├── Card.jsx
    │   │   ├── CardAvatar.jsx
    │   │   ├── CardBody.jsx
    │   │   ├── CardFooter.jsx
    │   │   ├── CardHeader.jsx
    │   │   └── CardIcon.jsx
    │   ├── CombineStyles
    │   │   └── CombineStyles.js
    │   ├── CustomButtons
    │   │   └── Button.jsx
    │   ├── CustomDropdown
    │   │   └── CustomDropdown.jsx
    │   ├── CustomInput
    │   │   └── CustomInput.jsx
    │   ├── CustomTabs
    │   │   └── CustomTabs.jsx
    │   ├── Dialog
    │   │   ├── DialogCategory.jsx
    │   │   ├── DialogDelete.jsx
    │   │   ├── DialogFacultyTable.jsx
    │   │   ├── DialogQuestion.jsx
    │   │   ├── DialogQuizTable.jsx
    │   │   ├── DialogStudentTable.jsx
    │   │   └── MessageDialog.jsx
    │   ├── ExpansionPanel
    │   │   └── Expansionpanel.jsx
    │   ├── Footer
    │   │   ├── AdminLoginFooter.jsx
    │   │   ├── FacultyLoginFooter.jsx
    │   │   ├── Footer.jsx
    │   │   └── StudentLoginFooter.jsx
    │   ├── Grid
    │   │   ├── GridContainer.jsx
    │   │   └── GridItem.jsx
    │   ├── Header
    │   │   ├── Header.jsx
    │   │   └── HeaderLinks.jsx
    │   ├── HomeHeader
    │   │   ├── HeaderLinks.jsx
    │   │   └── HomeHeader.jsx
    │   ├── InfoArea
    │   │   └── InfoArea.jsx
    │   ├── LinkButton.jsx
    │   ├── NotificationSnack
    │   │   ├── Error.jsx
    │   │   └── Success.jsx
    │   ├── Parallax
    │   │   └── Parallax.jsx
    │   ├── QuizAdmin
    │   │   └── QuizAdmin.jsx
    │   ├── Sidebar
    │   │   └── Sidebar.jsx
    │   ├── Snackbar
    │   │   ├── CustomSnackbar.jsx
    │   │   ├── Snackbar.jsx
    │   │   └── SnackbarContent.jsx
    │   ├── Spacing
    │   │   └── Spacing.jsx
    │   ├── SubList
    │   │   └── SubList.jsx
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
    │   ├── AdminPanel
    │   │   └── AdminPanel.jsx
    │   ├── FacultyPanel
    │   │   └── FacultyPanel.jsx
    │   ├── Landing
    │   │   ├── Landing.jsx
    │   │   └── ProductSection.jsx
    │   ├── Login
    │   │   ├── AdminLogin.jsx
    │   │   ├── FacultyLogin.jsx
    │   │   └── StudentLogin.jsx
    │   └── StudentPanel
    │       └── StudentPanel.jsx
    ├── logo.svg
    ├── routes
    │   ├── PrivateRoute.jsx
    │   ├── admin_dashboard.jsx
    │   ├── faculty_dashboard.jsx
    │   └── student_dashboard.jsx
    ├── variables
    │   ├── charts.jsx
    │   └── general.jsx
    └── views
        ├── Admin
        │   ├── AdminDashboard
        │   │   └── AdminDashboard.jsx
        │   ├── AdminNotification
        │   │   └── AdminNotification.jsx
        │   ├── CategoryManagement
        │   │   ├── CategoryManagement.jsx
        │   │   ├── FormAddCategory.jsx
        │   │   └── FormAddSubcategory.jsx
        │   ├── DeptManage
        │   │   ├── DeptDialog.jsx
        │   │   ├── DeptManage.jsx
        │   │   └── FormAddDepartment.jsx
        │   ├── FacultyManage
        │   │   ├── CreateNewFacultyForm.jsx
        │   │   ├── FacultyManage.jsx
        │   │   └── FormAddFacultyBatch.jsx
        │   ├── NotificationManager
        │   │   └── NotificationManager.jsx
        │   ├── QuestionManage
        │   │   └── QuestionManage.jsx
        │   ├── QuizManage
        │   │   ├── QuizForm.jsx
        │   │   └── QuizManage.jsx
        │   ├── ReportGen
        │   │   └── ReportGen.jsx
        │   └── StudentManage
        │       ├── FormAddStudent.jsx
        │       ├── FormAddStudentBatch.jsx
        │       └── StudentManage.jsx
        ├── Faculty
        │   ├── AddQuestion
        │   │   └── AddQuestion.jsx
        │   ├── ApproveQuestion
        │   │   └── ApproveQuestion.jsx
        │   ├── ApprovedQuestionsManage
        │   │   └── ApprovedQuestionsManage.jsx
        │   ├── Dashboard
        │   │   └── Dashboard.jsx
        │   ├── FacultyManage
        │   │   ├── CreateNewFacultyForm.jsx
        │   │   ├── FacultyManage.jsx
        │   │   └── FormAddFacultyBatch.jsx
        │   ├── MyQuestionsManage
        │   │   └── MyQuestionsManage.jsx
        │   ├── Notifications
        │   │   └── Notifications.jsx
        │   └── Results
        │       └── Results.jsx
        ├── General
        │   └── QuestionDetails.jsx
        ├── Icons
        │   └── Icons.jsx
        ├── Student
        │   ├── Dashboard
        │   │   └── StudentDashboard.jsx
        │   ├── Notifications
        │   │   └── Notifications.jsx
        │   ├── QuizPanel
        │   │   ├── AssignedQuizzes.jsx
        │   │   ├── CustomQuizSetup.jsx
        │   │   ├── PreQuizInfo.jsx
        │   │   └── QuizPanelViewiew.jsx
        │   └── Results
        │       └── Results.jsx
        └── Unwanted
            ├── Maps
            │   └── Maps.jsx
            ├── TableList
            │   └── TableList.jsx
            ├── Typography
            │   └── Typography.jsx
            └── UpgradeToPro
                ├── NotificationManager.jsx
                └── UpgradeToPro.jsx
```

## Licensing

- Copyright 2019 Smartiude (https://www.smartitude.com)
- Licensed under MIT (https://github.com/Kuttipishaash/smartitude-app-main/blob/master/LICENSE.md)
