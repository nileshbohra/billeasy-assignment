<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    <li><strong>Start Redis server</strong>
      <p>If you don’t have Redis installed locally, run Redis using Docker:</p>
      <pre><code>docker run -p 6379:6379 --name redis -d redis</code></pre>
      <p>This command runs Redis in a Docker container, exposing it on port 6379.</p>
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
  <p>Create a new user. If no role is provided, defaults to <code>"user"</code>.</p>

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
  <p>Use this JWT token in the <code>Authorization</code> header as <code>Bearer &lt;token&gt;</code> for protected routes.</p>

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
  <p>Only accessible by the uploader.</p>

  <hr />

  <h2>💡 Design Choices</h2>
  <ul>
    <li><strong>Express.js</strong> for modularity and scalability.</li>
    <li><strong>JWT</strong> for secure, stateless authentication.</li>
    <li><strong>PostgreSQL</strong> with Sequelize ORM for easy DB management.</li>
    <li><strong>BullMQ + Redis</strong> for reliable background job queueing.</li>
    <li><strong>multer</strong> for multipart file uploads.</li>
  </ul>

  <hr />

  <h2>⚠️ Known Limitations &amp; Assumptions</h2>
  <ul>
    <li>Backend only; no frontend/UI included.</li>
    <li>Basic job retry and failure handling.</li>
    <li>Minimal metadata validation.</li>
    <li>Simple user management, no advanced RBAC.</li>
  </ul>

  <hr />

  <h2>🔗 Postman Collection</h2>
  <p>Explore and test the APIs using the Postman collection here:</p>
  <p><a href="https://assignments-4443.postman.co/workspace/assignments-Workspace~d1f7d716-d889-4ce4-b2b9-de23c4e917d2/collection/13570335-34b03dba-7d3b-40f4-84c1-5451c360bfeb?action=share&creator=13570335" target="_blank" rel="noopener noreferrer">Postman Collection Link 🚀</a></p>

</body>
</html>
