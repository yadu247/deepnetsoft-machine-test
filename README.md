<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Deepnetsoft Machine Test</h1>

  <p>A full-stack web application developed using <strong>React</strong>, <strong>TailwindCSS</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>. This application allows to manage bakery menus efficiently with features to add, edit, and display food categories and items.</p>

  <h2>Features</h2>
  <h3>Frontend</h3>
  <ul>
    <li>Built with <strong>React</strong> and styled with <strong>TailwindCSS</strong>.</li>
    <li>Responsive design for seamless use on all screen sizes.</li>
    <li>User-friendly interface to display and manage menus dynamically.</li>
    <li>Hamburger menu for mobile users.</li>
    <li>Categories and item descriptions are displayed attractively with prices.</li>
  </ul>

  <h3>Backend</h3>
  <ul>
    <li>Developed with <strong>Express.js</strong>.</li>
    <li>MongoDB is used to store menu categories and items.</li>
    <li>RESTful APIs to handle CRUD operations for menus and items.</li>
  </ul>

  <h2>Technologies Used</h2>
  <table border="1">
    <thead>
      <tr>
        <th><strong>Frontend</strong></th>
        <th><strong>Backend</strong></th>
        <th><strong>Database</strong></th>
        <th><strong>Deployment</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>React</td>
        <td>Express.js</td>
        <td>MongoDB</td>
        <td>Render</td>
      </tr>
      <tr>
        <td>TailwindCSS</td>
        <td>Node.js</td>
        <td>MongoDB Atlas</td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <h2>Installation</h2>
  <h3>1. Clone the Repository</h3>
  <pre>
    git clone https://github.com/yadu247/deepnetsoft-machine-test.git
    cd deepnetsoft-machine-test
  </pre>

  <h3>2. Install Dependencies</h3>
  <h4>Frontend</h4>
  <pre>
    cd client
    npm install
  </pre>

  <h4>Backend</h4>
  <pre>
    cd server
    npm install
  </pre>

  <h2>Configuration</h2>
  <h3>1. Set Up MongoDB Atlas</h3>
  <p>Create a MongoDB cluster and database following the instructions <a href="https://www.mongodb.com/docs/atlas/">here</a>.</p>
  <p>Create a <code>.env</code> file in the <code>server</code> directory:</p>
  <pre>
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
    PORT=5000
  </pre>

  <h2>Usage</h2>
  <h3>Run Frontend</h3>
  <pre>
    cd client
    npm run dev
  </pre>

  <h3>Run Backend</h3>
  <pre>
    cd server
    node server.js
  </pre>
  <p>Access the application in your browser at <a href="http://localhost:5173">http://localhost:5173</a>.</p>
  
  <h2>License</h2>
  <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
