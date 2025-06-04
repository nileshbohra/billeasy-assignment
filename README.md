<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Secure File Upload & Metadata Processing Microservice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 2rem;
      max-width: 900px;
    }
    pre {
      background: #f4f4f4;
      padding: 1rem;
      overflow-x: auto;
      border-radius: 5px;
    }
    code {
      font-family: monospace;
    }
    h1, h2, h3 {
      color: #333;
    }
    hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 2rem 0;
    }
  </style>
</head>
<body>

  <h1>Secure File Upload &amp; Metadata Processing Microservice</h1>

  <h2>How to Run Locally</h2>

  <ol>
    <li><strong>Clone the repository</strong>
      <pre><code>git clone https://github.com/nileshbohra/billeasy-assignment
cd billeasy-assignment</code></pre>
    </li>
    <li><strong>Install dependencies</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Create a <code>.env</code> file in the root with the following variables:</strong>
      <pre><code>
      DB_NAME=billeasy
DB_USER=postgres 
DB_PASS=root@123
DB_HOST=localhost 
DB_PORT=5432
DB_DIALECT=postgres
JWT_SECRET=billeasy
UPLOAD_DIR=uploads
      </code></pre>
    </li>
    <li><strong>Start Redis server</strong> (if using locally)<br />
      Make sure Redis is running on your machine (default port 6379).
    </li>
    <li><strong>Run the application</strong>
      <p>Start the backend server:</p>
      <pre><code>npm run dev</code></pre>
    </li>
  </ol>

  <hr />

  <h2>API Documentation &amp; Authentication Flow</h2>

  <h3>Authentication</h3>
  <p><strong>POST <code>/auth/login</code></strong></p>
  <p>Request:</p>
  <pre><code>{
  "email": "user@example.com",
  "password": "password123"
}</code></pre>
  <p>Response:</p>
  <pre><code>{
  "token": "jwt-token-string"
}</code></pre>
  <p>Use this JWT token in the <code>Authorization</code> header (<code>Bearer &lt;token&gt;</code>) for all subsequent authenticated requests.</p>

  <hr />

  <h3>File Upload</h3>
  <p><strong>POST <code>/upload</code></strong></p>
  <ul>
    <li>Headers: <code>Authorization: Bearer &lt;token&gt;</code></li>
    <li>Form-data fields:
      <ul>
        <li><code>file</code> (required)</li>
        <li><code>title</code> (optional)</li>
        <li><code>description</code> (optional)</li>
      </ul>
    </li>
  </ul>
  <p>Response:</p>
  <pre><code>{
  "fileId": 1,
  "status": "uploaded"
}</code></pre>

  <hr />

  <h3>Get File Status</h3>
  <p><strong>GET <code>/files/:id</code></strong></p>
  <ul>
    <li>Headers: <code>Authorization: Bearer &lt;token&gt;</code></li>
  </ul>
  <p>Response:</p>
  <pre><code>{
  "id": 1,
  "original_filename": "example.pdf",
  "file_type": "application/pdf",
  "file_size": 12345,
  "title": "Sample File",
  "description": "Test upload",
  "status": "processed",
  "extracted_data": "checksum or mock data",
  "uploadedAt": "2025-06-04T12:00:00Z"
}</code></pre>
  <p>Access is restricted to the user who uploaded the file.</p>

  <hr />

  <h2>Design Choices</h2>
  <ul>
    <li><strong>ExpressJs framework</strong> for modularity, scalability, and maintainability.</li>
    <li><strong>JWT authentication</strong> for stateless, secure access control.</li>
    <li><strong>PostgreSQL </strong> with ORM Sequelize to simplify DB management.</li>
    <li><strong>BullMQ + Redis</strong> for reliable background job queueing and async processing.</li>
    <li><strong>multer</strong> for robust multipart file uploads.</li>
  </ul>

  <hr />

  <h2>Known Limitations &amp; Assumptions</h2>
  <ul>
    <li>No frontend/UI is provided — backend-only service.</li>
    <li>Background job retries and failure handling are basic.</li>
    <li>Metadata validation is minimal.</li>
    <li>User management is simple; assumes a static or small user set.</li>
  </ul>

</body>
</html>
