# Welcome to the back-end part of the social network web application! 💻💾🗂️

### This server side application serves as a general introduction to utilizing NoSQL database (MongoDB) in Node.js environment by implementing Mongoose - an Object-Document-Mapper (ODM), a library that lets users transfer data between MongoDB and Node.js using a familiar Javascript syntax. <br>
#### _Please refer to the navigation below for an easier access._
### Navigation

- [**Overview**](#application-overview📝)
- [**Walk-through and functionality**](#walk-through-and-functionality🖍️)
- [**Video demonstration**](#video-demonstration📋)
- [**Reach out**](#reach-out🗨️)
<br></br>

> ### **Application Overview**📝
This server-side RESTful API application is created as a base for a simple social network app, where users can be created, befriend each other, share their thoughts and react to each other's postings. <br> 
This application demonstrates the benefits of utilizing a NoSQL database - MongoDB and Mongoose - the library that connect the database and Node.js environment and lets the user perform queries in Javascript syntax. <br>
The fundamental CRUD operations can be performed on a user and thought schemas. The application also demonstrates different approaches when it comes to referencing one Schema from the other. <br>
This application was also designed according to MVC pattern, taking into consideration that the View portion (client side) can be easily added in the future stages of development. 
<br></br>

> ### **Walk-through and functionality**🖍️
In order to test the application, please run **`npm install`** to install all the dependencies, and then run **`node server`** to start the application. Insomnia or Postman - both can be used to test the API requests.<br> **User** controller holds: <br>
- `.find()` method to return all users through `GET` request at /api/users endpoint 
- `.findOne()` method to return user by its ID on `GET` request at /api/users/:userID endpoint 
- `.create()` method to add a new user on `POST` request at /api/users endpoint
- `.findOneAndUpdate()` method to edit existing user's data on `PUT` request at /api/users/:userID endpoint
- `.findOneAndDelete()` method to delete existing user by its ID on `DELETE` request at /api/users/:userID endpoint. Additionally, `Thought.deleteMany()` method is called to delete all associated to deleted user thoughts.
<br></br> 
Also, **USER** model has **two references**: <br> 
- UserSchema references itself to populate *friends* array consisting of existing users. <br>
**Adding a friend** can be done through **PUT** request to `/api/users/:userId/:friendId` endpoint, which will update users's data by adding friend-user to *friends* array. <br>
- UserSchema references Thought model to populate the *thoughts* array, so that existing users can add their thoughts.  <br>
**Adding a thought** can be done through **POST** request to `/api/thoughts/:userId` endpoint, where `Thought.create()` method takes **'userId'** and **'thought body'** as parameters. 
<br></br>

Similarly, **ThoughtSchema** has a model, it has its own routes and endpoints, whereas **ReactionSchema** only exist as a Schema alone, because there is no logical purpose for its independent functionality and it can be accessed through its parent - ThoughtSchema. <br>
**Thoughts** controller holds: <br>
- `.find()` method to retrieve all existing thoughts through `GET` request at /api/thoughts endpoint
- `.findOne()` method to retrieve a single thought by its ID on `GET` request at /api/thoughts/:thoughtId endpoint
- `.create()` method to create a new thought on `POST` request at /api/thoughts/:userId endpoint. With that, `User.findOneAndUpdate()` method is called to add a newly created thought to *thoughts array* of a selected user.
- `.findOneAndUpdate()` method to update the body of an existing thought by its ID and ID of a user it belongs to on `PUT` request at /api/thoughts/:userId/:thoughtId endpoint
-  `.findOneAndDelete()` method to delete an existing thought on `DELETE` request at /api/thoughts/:userId/:thoughtId endpoint
- `.findOneAndUpdate()` method to add a reaction to an existing thought on `POST` request at /api/thoughts/:thoughtId/reactions endpoint
- `.findOneAndUpdate()` method to delete an existing reaction on `DELETE` request at /api/thoughts/:thoughtId/reactions/:reactionId endpoint
<br></br>

> ### **Video demonstration**📋
Here is a brief video walk-through for the CRUD operations explained earlier. [CLICK HERE](https://drive.google.com/file/d/1OBXhVs9wdww56C4Zg7q52xJS6oYw_zJK/view)
<br></br>

> ### **Reach Out**🗨️
If you have any ideas/suggestions to take this application to further improvements, please feel free to reach out [here](https://www.linkedin.com/in/valeriya-kim/) <br>
**Thank you for visiting!**
