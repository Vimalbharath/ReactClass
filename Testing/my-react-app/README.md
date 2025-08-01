# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Create a React Application for Leave request Module

Background: XYZ Company has decided to develop a Leave Application Management System using React to streamline the process.

User Journey:

Employee Submits Leave Request:

Employee logs into the system.
Dashboard should display Leave balances with history of taken leave
Navigates to the leave request section.
Fill out the leave request form with the required details.
Submits the request.

Manager Approves/Rejects Leave Request:

Manager receives a notification of the pending leave request.
Logs into the system.
Reviews the leave request and either approves or rejects it.
Employee receives an email notification about the decision.

Deliverable:

Implement Reactive Forms and validations.
Implement Routers.
Filter the detail using search.
Use rest API to store the User detail, Employee Info, Leave Balance and Leave Request.
Authenticate and authorize the user based on the role

Note: use JSON server for rest endpoints

Answer text Question 1
