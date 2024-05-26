const Task = require("../models/task");
const mssql = require("mssql");
const config = require("../config/config").development;
const sendEmailNotification = require("../mailer");

data = {
  title: "Feature Request",
  description: "This is a desc",
  completed: "Completed",
  category: "Feature Request",
  platform_service_product: "Service",
  severity: "Major",
  issue_description: "This is a desc",
  status: "done",
  assigned_to: "Mamamaia",
};

// Creating a new task
async function createTask(req, res) {
  const pool = await mssql.connect(config);

  try {
    const {
      description,
      completed,
      category,
      platform,
      severity,
      status,
      assigned_to,
      client_id,
    } = req.body;

    const query = `
      INSERT INTO Tasks (description, completed, category, platform, severity,  status, assigned_to,client_id, createdAt, updatedAt)
      OUTPUT INSERTED.id
      VALUES ( @description, @completed, @category, @platform, @severity, @status, @assigned_to, @client_id, GETUTCDATE(), GETUTCDATE())
    `;

    const request = pool.request();
    request.input("description", description);
    request.input("completed", completed);
    request.input("category", category);
    request.input("platform", platform);
    request.input("severity", severity);
    request.input("status", status);
    request.input("assigned_to", assigned_to);
    request.input("client_id", client_id);

    const result = await request.query(query);
    const insertedId = result.recordset[0].id;

    if (result.rowsAffected[0] === 1) {
      const newTaskQuery = "SELECT * FROM Tasks WHERE id = @insertedId";
      const newRequest = pool.request(); // Create a new request object
      newRequest.input("insertedId", insertedId);

      const newTaskResult = await newRequest.query(newTaskQuery);
      const newTask = await newTaskResult.recordset[0];

      // Get client Email query
      const getClientEmailQuery =
        "SELECT email,name FROM Clients WHERE id  = @client_id";
      const emailResult = await request.query(getClientEmailQuery);
      const clientEmail = emailResult.recordset[0].email;
      const clientName = emailResult.recordset[0].name;

      const emailInfo = {
        clientEmail: clientEmail,
        clientName: clientName,
        description: description,
        assigned_to: newTask.assigned_to,
        status: newTask.status,
        refNumber: insertedId,
        category: newTask.category,
      };
      // Send email notification to the assigned user
      sendEmailNotification(emailInfo);

      res.status(201).json({ message: "SUCCESS!", data: newTask });
    } else {
      throw new Error("Error creating task");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating task" });
  } finally {
    await pool.close();
  }
}

// Getting all tasks
async function getTasks(req, res) {
  try {
    const pool = await mssql.connect(config);

    const query = `
      SELECT Tasks.*, 
             CASE WHEN Clients.id IS NOT NULL 
                  THEN '{"name": "' + Clients.name + '", "email": "' + Clients.email + '", "phone": "' + Clients.phone + '", "company_name": "' + Clients.company_name + '", "preferred_contact": "' + Clients.preferred_contact + '", "client_location": "' + Clients.client_location + '"}'
                  ELSE NULL 
             END AS client_details
      FROM Tasks
      LEFT JOIN Clients ON Tasks.client_id = Clients.id
    `;
    const tasks = await pool.request().query(query);

    res.status(200).json(tasks.recordsets[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a task by ID
async function deleteTask(req, res) {
  const { id } = req.params;

  const pool = await mssql.connect(config);

  try {
    const query = `
      DELETE FROM Tasks
      WHERE id = @taskId
    `;

    const request = pool.request();
    request.input("taskId", id);

    const result = await request.query(query);

    if (result.rowsAffected[0] === 1) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting task" });
  } finally {
    await pool.close();
  }
}
module.exports = { createTask, getTasks, deleteTask };
