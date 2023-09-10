#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Comment = require('./models/comment');
const Post = require('./models/post');

const comments = [];
const posts = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createPosts();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}


async function postCreate(idx, title, content, isPublished) {
    const postDetail = { title, content, isPublished }
    
    const post = new Post(postDetail);
    post.save();
    posts[idx] = post;
}

async function commentCreate(idx, post, content) {
    const commentDetail = {
        post,
        content
    }

    const comment = new Comment(commentDetail);
    await comment.save();
    comments[idx] = comment;
}


async function createPosts() {
    await Promise.all([
        postCreate(0, "Introduction to JavaScript", `
          JavaScript is a versatile programming language that plays a crucial role in web development. It was created by Brendan Eich in just ten days and has since become one of the most popular and widely-used programming languages in the world.
      
          JavaScript is primarily known for its role in enhancing the interactivity of web pages. With JavaScript, developers can create dynamic and responsive web applications that can react to user input, fetch data from servers, and update the DOM (Document Object Model) without requiring a full page reload.
      
          Over the years, JavaScript has evolved significantly, with new features and standards being introduced to make it more powerful and efficient. ES6 (ECMAScript 2015) brought major enhancements to the language, including the introduction of let and const for variable declarations, arrow functions, classes, and modules.
      
          Today, JavaScript is not limited to web browsers; it can also be used on the server side with platforms like Node.js. This allows developers to build full-stack applications using a single language.
      
          Whether you're a beginner or an experienced developer, JavaScript is a language worth mastering due to its widespread use and versatility.
        `, true),
        postCreate(1, "Getting Started with React", `
          React is a popular JavaScript library for building user interfaces. Developed by Facebook, it has gained widespread adoption in the web development community due to its component-based architecture and efficient rendering.
      
          With React, you can create interactive and reusable UI components that update efficiently when data changes. This is achieved through the use of a virtual DOM, which minimizes the need for direct manipulation of the actual DOM and boosts performance.
      
          React is often used in conjunction with other tools and libraries, such as Redux for state management and React Router for routing. It also has a vibrant ecosystem of third-party packages and extensions.
      
          Learning React involves understanding its core concepts, including components, props, state, and lifecycle methods. Once you grasp these fundamentals, you can start building web applications with React and benefit from its developer-friendly features.
      
          Whether you're building a small personal project or a large-scale application, React can help you create engaging and interactive user interfaces with ease.
        `, true),
        postCreate(2, "Node.js Fundamentals", `
          Node.js is a powerful runtime environment that allows you to run JavaScript on the server side. Developed by Ryan Dahl, Node.js has revolutionized server-side development by enabling developers to use a single language (JavaScript) for both client and server.
      
          One of Node.js' key features is its non-blocking, event-driven architecture, which makes it highly scalable and efficient for handling I/O operations. This makes Node.js an excellent choice for building real-time applications, APIs, and microservices.
      
          Node.js also boasts a large package ecosystem through npm (Node Package Manager), which simplifies the process of adding third-party libraries and modules to your projects. This ecosystem includes libraries for web frameworks (Express.js), database connectivity (Mongoose, Sequelize), and much more.
      
          To get started with Node.js, you'll need to learn about its core modules, asynchronous programming patterns (callbacks, promises, async/await), and how to create HTTP servers and routes.
      
          Whether you're building a web server, a chat application, or a RESTful API, Node.js offers the tools and flexibility needed to bring your ideas to life on the server side.
        `, true),
        postCreate(3, "Web Security Best Practices", `
          Ensuring the security of your web applications is crucial in today's digital landscape. Web security encompasses a wide range of practices and techniques aimed at protecting your web assets, user data, and infrastructure from various threats.
      
          Common web security threats include cross-site scripting (XSS), SQL injection, cross-site request forgery (CSRF), and security misconfigurations. To mitigate these threats, developers must follow best practices and employ security measures throughout the development lifecycle.
      
          Some fundamental web security practices include input validation, output encoding, and parameterized queries to prevent SQL injection attacks. You should also implement authentication and authorization mechanisms to control user access to sensitive resources.
      
          Keeping your software and libraries up to date is essential, as vulnerabilities can emerge over time. Regularly scan your codebase for security flaws using static analysis tools, and perform security testing and code reviews.
      
          Additionally, consider employing security headers, content security policies (CSPs), and HTTPS to protect against various attack vectors.
      
          Web security is an ongoing process, and staying informed about the latest security threats and mitigation techniques is crucial for safeguarding your web applications and user data.
        `, true),
        postCreate(4, "GraphQL vs. REST API", `
          GraphQL is a query language for APIs that offers flexibility and efficiency when it comes to fetching and updating data from a server. Unlike traditional REST APIs, where the server defines the structure of the responses, GraphQL allows clients to request exactly the data they need.
      
          With GraphQL, clients send queries specifying the data they want, and the server responds with a JSON object matching the query structure. This eliminates over-fetching or under-fetching of data, resulting in more efficient data retrieval.
      
          REST, on the other hand, follows a fixed structure for endpoints, and clients must make multiple requests to different endpoints to assemble the required data. This can lead to over-fetching, where clients receive more data than needed, or under-fetching, requiring additional requests.
      
          GraphQL has gained popularity due to its flexibility, introspection capabilities, and strong typing system. It's commonly used in modern web and mobile app development to optimize data fetching and reduce network latency.
      
          When choosing between GraphQL and REST, consider factors like your project's data requirements, client needs, and existing infrastructure. Both approaches have their strengths, and the choice depends on your specific use case.
        `, true),
        postCreate(5, "Machine Learning in Python", `
          Python is widely used for machine learning and data science due to its rich ecosystem of libraries and frameworks. Whether you're interested in predictive modeling, natural language processing, or computer vision, Python has the tools to support your machine learning endeavors.
      
          Some of the most popular libraries for machine learning in Python include scikit-learn, TensorFlow, and PyTorch. These libraries provide powerful tools for tasks like classification, regression, clustering, and deep learning.
      
          Python's simplicity and readability make it accessible to both beginners and experienced data scientists. You can easily experiment with different algorithms and models, visualize data, and perform feature engineering using Python.
      
          To get started with machine learning in Python, you'll need to learn the basics of Python programming, data manipulation with libraries like NumPy and pandas, and the specific machine learning libraries that align with your projects.
      
          Whether you're analyzing large datasets, building recommendation systems, or training neural networks, Python is a versatile language that empowers data scientists to tackle complex problems and make data-driven decisions.
        `, false),
      ]);
}

async function createComments() {
    await Promise.all([
        commentCreate(0, posts[0], "Great introduction to JavaScript!"),
        commentCreate(1, posts[0], "JavaScript is the future of web development."),
        commentCreate(2, posts[1], "I love working with React. It's so powerful!"),
        commentCreate(3, posts[1], "React components make UI development a breeze."),
        commentCreate(4, posts[2], "Node.js is a game-changer for server-side development."),
        commentCreate(5, posts[2], "I'm impressed by the speed of Node.js applications."),
        commentCreate(6, posts[3], "Web security is essential in every project."),
        commentCreate(7, posts[3], "Stay updated on security threats to protect your apps."),
        commentCreate(8, posts[4], "GraphQL offers a fresh approach to API design."),
        commentCreate(9, posts[4], "REST has its place, but GraphQL is the future."),
        commentCreate(10, posts[5], "Python's machine learning libraries are fantastic."),
        commentCreate(11, posts[5], "Python's simplicity makes it great for data science."),
        commentCreate(12, posts[0], "Looking forward to more JavaScript tutorials!"),
        commentCreate(13, posts[1], "React has transformed how we build web apps."),
        commentCreate(14, posts[4], "Choosing between GraphQL and REST depends on the project."),
    ]);
}