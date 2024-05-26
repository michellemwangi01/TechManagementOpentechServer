# Task Management Backend

This repository contains the backend code for a Task Management application. It is built with Node.js, Express, and MSSQL, and uses Sequelize ORM for database interactions. The core features of this backend include client management, task management, and email notifications.

## Core Features

### Client Management

1. **Create a New Client**

   - Endpoint: `POST /clients`
   - Description: Adds a new client to the database.
   - Example Request Body:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "phone": "123-456-7890",
       "company_name": "Doe Inc.",
       "preferred_contact": "email",
       "client_location": "New York"
     }
     ```

2. **Get All Clients**
   - Endpoint: `GET /clients`
   - Description: Retrieves a list of all clients from the database.

### Task Management

1. **Create a New Task**

   - Endpoint: `POST /tasks`
   - Description: Adds a new task to the database and sends an email notification to the assigned user.
   - Example Request Body:
     ```json
     {
       "description": "Implement feature X",
       "completed": false,
       "category": "Feature Request",
       "platform": "Web",
       "severity": "High",
       "status": "Open",
       "assigned_to": "Jane Smith",
       "client_id": 1
     }
     ```

2. **Get All Tasks**

   - Endpoint: `GET /tasks`
   - Description: Retrieves a list of all tasks from the database, including client details.

3. **Delete a Task**
   - Endpoint: `DELETE /tasks/:id`
   - Description: Deletes a task by its ID from the database.

### Email Notifications

- **Send Email Notification on Task Creation**

  - Description: Sends an email notification to the assigned user when a new task is created.
  - Email Content:

    ```
    Dear [Client Name],

    We have created your task with the following information:

    Reference Number: [RefNo]
    Assigned to: [Assigned User]
    Category: [Category]
    Status: [Status]
    Description: [Description]

    Please let us know if you have any questions or concerns.

    Best regards,
    OpenTech Global Services Limited
    ```

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/task-management-backend.git
   cd task-management-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```env
     MAIL_ACCOUNT=your-email@gmail.com
     MAIL_PASSWORD=your-email-password
     ```

4. Run the application:
   ```bash
   npm start
   ```

## Dependencies

- Node.js
- Express
- MSSQL
- Sequelize
- Nodemailer
- dotenv

## License

This project is licensed to @Michelle Mwangi under the MIT License.
