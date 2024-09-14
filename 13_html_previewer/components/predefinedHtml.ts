export const predefinedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Previewer Test</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      color: #333;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #007BFF;
    }
    p {
      line-height: 1.6;
    }
    ul {
      list-style-type: disc;
      margin-left: 20px;
    }
    ol {
      list-style-type: decimal;
      margin-left: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    table, th, td {
      border: 1px solid #ccc;
    }
    th, td {
      padding: 10px;
      text-align: left;
    }
    .image {
      width: 100%;
      max-width: 300px;
      margin: 20px 0;
    }
    .link {
      color: #007BFF;
      text-decoration: none;
    }
    .link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to HTML Previewer</h1> <br>
    <p>This is a sample HTML document to test the HTML Previewer application. Below are examples of various HTML elements:</p><br>
    
    <h2>Headings</h2>
    <h3>Sub-heading 1</h3>
    <h4>Sub-heading 2</h4>
    <h5>Sub-heading 3</h5>
<br>
    <h2>Paragraphs</h2> 
    <p>This is a simple paragraph. It contains some <strong>bold text</strong>, <em>italic text</em>, and <u>underlined text</u>.</p>
<br>
    <h2>Lists</h2>
    <h3>Unordered List</h3>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <br>
    <h3>Ordered List</h3>
    <ol>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </ol>
<br>
    <h2>Table</h2>
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1, Cell 1</td>
          <td>Row 1, Cell 2</td>
          <td>Row 1, Cell 3</td>
        </tr>
        <tr>
          <td>Row 2, Cell 1</td>
          <td>Row 2, Cell 2</td>
          <td>Row 2, Cell 3</td>
        </tr>
        <tr>
          <td>Row 3, Cell 1</td>
          <td>Row 3, Cell 2</td>
          <td>Row 3, Cell 3</td>
        </tr>
      </tbody>
    </table>
<br>
    <h2>Image</h2>
    <img src="https://via.placeholder.com/300" alt="Sample Image" class="image">
<br>
    <h2>Link</h2>
    <a href="https://www.example.com" class="link" target="_blank">Visit Example.com</a>
  </div>
</body>
</html>
`;
