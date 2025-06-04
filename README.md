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
      max-width: 900px;
      margin: 2rem auto;
      padding: 0 1rem;
      background-color: #f9f9f9;
      color: #222;
    }
    h1, h2, h3, h4 {
      color: #2c3e50;
    }
    pre {
      background-color: #272822;
      color: #f8f8f2;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
    }
    code {
      font-family: 'Source Code Pro', monospace;
      background-color: #f1f1f1;
      padding: 2px 6px;
      border-radius: 4px;
    }
    hr {
      margin: 2rem 0;
      border: none;
      border-top: 2px solid #ddd;
    }
    ul, ol {
      margin-left: 1.5rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
    strong {
      color: #34495e;
    }
  </style>
</head>
<body>

  <h1>🔒 Secure File Upload &amp; Metadata Processing Microservice</h1>

  <h2>🚀 How to Run Locally</h2>

  <ol>
    <li><strong>Clone the repository</strong>
      <pre><code>git clone https://github.com/nileshbohra/billeasy-assignment
cd billeasy-assignment</code></pre>
    </li>
    <li><strong>Install dependencies</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Create a <code>.env</code> file in the root with the following variables:</strong>
      <pre><code>DB_NAME=billeasy
DB_USER=postgres
DB_PASS=root@123
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
JWT_SECRET=billeasy
UPLOAD_DIR=uploads
REDIS_HOST=localhost
REDIS_PORT=6379
</code></pre>
    </li>
    <li><strong>Start Redis server</strong> (if using locally)<br />
      Ensure Redis is running on your machine (default port 6379).
    </li>
    <li><strong>Run the application</strong>
      <p>Start the backend server:</p>
      <pre><code>npm run dev</code></pre>
    </li>
  </ol>

  <hr />

  <h2>📚 API Documentation &amp; Authentication Flow</h2>

  <h3>🔐 Authentication</h3>

  <h4>🆕 Signup</h4>
  <p><strong>POST <code>/api/auth/signup</code></strong></p>
  <p>Request body:</p>
  <pre><code>{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user"  <!-- Optional, defaults to "user". Allowed values: "admin", "user" -->
}</code></pre>
  <p>Response:</p>
  <pre><code>{
  "message": "User created successfully"
}</code></pre>
  <p>Use this endpoint to create a new user account. If no role is specified, it defaults to <code>"user"</code>.</p>

  <h4>🔑 Login</h4>
  <p><strong>POST <code>/api/auth/login</code></strong></p>
  <p>Request body:</p>
  <pre><code>{
  "email": "user@example.com",
  "password": "password123"
}</code></pre>
  <p>Response:</p>
  <pre><code>{
  "token": "jwt-token-string"
}</code></pre>
  <p>Use this JWT token in the <code>Authorization</code> header as <code>Bearer &lt;token&gt;</code> for all protected endpoints.</p>

  <hr />

  <h3>📤 File Upload</h3>
  <p><strong>POST <code>/api/upload</code></strong></p>
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

  <h3>📂 Get File Status</h3>
  <p><strong>GET <code>/api/files/:id</code></strong></p>
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

  <h2>💡 Design Choices</h2>
  <ul>
    <li><strong>Express.js framework</strong> for modularity, scalability, and maintainability.</li>
    <li><strong>JWT authentication</strong> for stateless, secure access control.</li>
    <li><strong>PostgreSQL</strong> with Sequelize ORM for easy database management and migrations.</li>
    <li><strong>BullMQ + Redis</strong> for robust, reliable background job queueing and asynchronous processing.</li>
    <li><strong>multer</strong> for efficient multipart file uploads and handling.</li>
    <li><strong>Structured API paths</strong> with <code>/api</code> prefix for clarity and versioning readiness.</li>
  </ul>

  <hr />

  <h2>⚠️ Known Limitations &amp; Assumptions</h2>
  <ul>
    <li>No frontend/UI included — backend-only microservice.</li>
    <li>Background job retries and failure handling are basic and can be improved.</li>
    <li>Minimal metadata validation is implemented.</li>
    <li>User management is simple — assumes a static or small user base.</li>
    <li>Passwords stored securely (hashed) recommended; plaintext only for demo/testing.</li>
  </ul>

</body>
</html>
