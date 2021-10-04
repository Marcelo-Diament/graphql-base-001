# GraphQL

## Summary

* GraphQL Query Language and Schema Definition Language

* Building a GraphQL API with Apollo Server

## GraphQL Query Language and Schema Definition Language

### Intro

GraphQL is a query language to use with API

Docs: [graphql.org](graphql.org)

It was created by Facebook but actually it is a foundation.

GraphQL allow us to get data from different data sources (API, DB, Cloud services) with an unique standard way.

We send queries from different devices to a GraphQL server, that acts like a middleware (it gets data from wherever we define and then returns a response to client side).

It also uses a Domain Specific Language (DSL), which allow us to define schemas and schema definition language to determine types of data that we expect to receive and that is human readable.

### REST x GraphQL

#### Get Data

**REST**

When we make a query to a REST API, we receive all of the data sent from a specific endpoint.

And in case we need to get data from different endpoints, we'll get all data of each one of them.

This behavior impacts on the project performance due to each request latency.

**GraphQL**

With GraphQL we are able to determine which data we do want to receive from a single endpoint:

 `POST`

```gql
query {
  lift(name:"Panorama") {
    status
    trails {
      name
      status
    }
  }
}
```

And we receive the exactly data that we requested for:

```json
{
  "data": {
    "lift": {
      "status": "hold",
      "trails": [
        {
          "name": "Hot Potato",
          "status": "open"
        },
        {
          "name": "West Elm",
          "status": "closed"
        }
      ]
    }
  }
}
```

Another advantage is that we can define how data will be formatted and to use device just to render data.

Even if it is a `"GETty"` request, we normally use `POST` method, because we do not send a simple operation, but we do send the query operation itself within the body so it can be executed. 

#### Change Data

**REST**

We normally use the PUT method sending the properties (and its new values) that must be updated.

**GraphQL**

In GraphQL we use Mutations to do that:

 `POST`

```gql
mutation {
  setLiftStatus (
    name: "Panorama",
    newStatus: "hold"
  ) {
    name
    newStatus
    oldStatus
  }
}
```

```json
{
  "data": {
    "setLiftStatus": {
      "name": "Panorama",
      "newStatus": "hold",
      "oldStatus": "open"
    }
  }
}
```

#### Query x Response Flow

We can think about this flow like if we sent the query, GraphQL server distributes resolver functions to each necessary endpoint and then returns a response for us.

### GraphQL Playground

Let's see those concepts in real examples.

#### Simple Queries

Access [Pet Library from Moonhighway](https://pet-library.moonhighway.com) to try some queries.

We can keep the default endpoint ( `https://pet-library.moonhighway.com` ).

On the left tab, just type:

```gql
query {
  totalPets
}
```

And on the right tab you'll receive:

```json
{
  "data": {
    "totalPets": 25
  }
}
```

Let's go further and ask for all pets id, name and weight:

```gql
query {
  allPets {
    id
    name
    weight
  }
  totalPets
}
```

Results:

```json
{
  "data": {
    "allPets": [
      {
        "id": "D-2",
        "name": "Archy",
        "weight": 19.9
      },
      {
        "id": "R-1",
        "name": "Pip",
        "weight": 3.7
      },
      {
        "id": "D-4",
        "name": "Luna",
        "weight": 75.4
      },
      {
        "id": "C-5",
        "name": "Pillow",
        "weight": 8.3
      },
      {
        "id": "C-4",
        "name": "Beebee",
        "weight": 13.3
      },
      {
        "id": "D-1",
        "name": "Danton",
        "weight": 50.4
      },
      {
        "id": "R-3",
        "name": "Jerry",
        "weight": 5.5
      },
      {
        "id": "C-3",
        "name": "Benji",
        "weight": 10.9
      },
      {
        "id": "D-8",
        "name": "Pax",
        "weight": 52.7
      },
      {
        "id": "D-6",
        "name": "Mehla",
        "weight": 90.3
      },
      {
        "id": "D-7",
        "name": "Rainier McCheddarton",
        "weight": 70.4
      },
      {
        "id": "C-6",
        "name": "Buddy",
        "weight": 9.2
      },
      {
        "id": "S-1",
        "name": "Lazer",
        "weight": 15.7
      },
      {
        "id": "S-2",
        "name": "Switchblade",
        "weight": 20.7
      },
      {
        "id": "S-4",
        "name": "Pluto",
        "weight": 66.1
      },
      {
        "id": "R-2",
        "name": "Sweetums",
        "weight": 4.6
      },
      {
        "id": "R-4",
        "name": "Jason",
        "weight": 2.7
      },
      {
        "id": "S-3",
        "name": "Steve",
        "weight": 20.4
      },
      {
        "id": "C-7",
        "name": "Mini",
        "weight": 5.2
      },
      {
        "id": "C-2",
        "name": "Jungle",
        "weight": 9.7
      },
      {
        "id": "D-3",
        "name": "Otis",
        "weight": 50.4
      },
      {
        "id": "D-5",
        "name": "Canela",
        "weight": 100.4
      },
      {
        "id": "D-9",
        "name": "Lucie",
        "weight": 44.7
      },
      {
        "id": "R-5",
        "name": "Peep",
        "weight": 6.5
      },
      {
        "id": "C-1",
        "name": "Biscuit",
        "weight": 10.2
      }
    ],
    "totalPets": 25
  }
}
```

##### DOCS

But how can we know all the possible queries? You can click on DOCS tab (on the right site) to see each possible querie and its details.

We can use this information so we know exactly what to expect from each possible query.

```gql
totalPets(
status: PetStatus
): Int!

allPets(
category: PetCategory
status: PetStatus
): [Pet!]!
```

The totalPets query documentation tell us that this query will return a Integer.

The allPets query returns a array (shown by the array brackets) and it is non-nullable (required) - indicated by the exclamation mark.

We can have ENUM types too (like PetCategory in this case, that just allow specific values such as CAT, DOG, RABBIT and STINGRAY).

> Commas are not required on GraphQL queries, they are just ignored.

#### Filter

We can also use arguments to filter our response. So, we did get the `totalPets` response. But we could also send the `status` argument on this query. On the example below, we're asking for totalPets that have `available` status:

```gql
query {
  totalPets(status: AVAILABLE)
}
```

Response:

```json
{
  "data": {
    "totalPets": 2
  }
}
```

We can also create alias, so we can check the same parameter with different arguments:

```gql
query {
  available: totalPets(status: AVAILABLE)
  checkedOut: totalPets(status: CHECKEDOUT)
}
```

Response:

```json
{
  "data": {
    "available": 2,
    "checkedOut": 23
  }
}
```

By using alias, the alias value is used as response key.

If we didn't use a alias, we would get an error.

#### Queries, Mutations and Subscriptions

Access [Vote from Moonhighway](http://vote.moonhighway.com/) to try some more queries and also mutations.

Endpoint: `http://vote.moonhighway.com/graphql`

Tip: we can check results by accessing [this link](http://vote.moonhighway.com/results/#/).

**Query**

```gql
query {
  totalVotes
}
```

```json
{
  "data": {
    "totalVotes": 0
  }
}
```

**Mutation**

We use mutations to update, change data. In this case, we can use `vote` , that requires a host (which values can be Alex or Eve).

Now we'll make Alex to vote once:

```gql
mutation {
  vote(host: ALEX)
}
```

```json
{
  "data": {
    "vote": "Thank you for voting!"
  }
}
```

Now if we make that query again we'll get:

```json
{
  "data": {
    "totalVotes": 1
  }
}
```

**Subscription**

Subscriptions allows us to make real time operations, to listen to changes.

So each time the data is updated, the subscription listens to this update.

It works both from client side and server side.

```gql
subscription {
  results {
    alex
    eve
  }
}
```

```json
// 6 secs ago
{
  "data": {
    "result": {
      "alex": 2,
      "eve": 0
    }
  }
}
// 5 secs ago
{
  "data": {
    "result": {
      "alex": 3,
      "eve": 0
    }
  }
}
// 4 secs ago
{
  "data": {
    "result": {
      "alex": 4,
      "eve": 0
    }
  }
}
// 3 secs ago
{
  "data": {
    "result": {
      "alex": 5,
      "eve": 0
    }
  }
}
// 2 secs ago
{
  "data": {
    "result": {
      "alex": 6,
      "eve": 0
    }
  }
}
```

##### Data Types

The default data types in GraphQL are: ID, String, Int, Float and Boolean. But we can deal with custom data types by using Scalars.

> **Scalars** allows us to use custom data type, such as formatted Date. We can define them by ourselves or we can use packages to help us with that, such as the [npm graphql-scalars package](https://www.npmjs.com/package/graphql-scalars) - that is a library of custom GraphQL scalar types for creating precise type-safe GraphQL schemas.

Common use of scalar are emails, zipcodes, URLs, dates...

#### More complex queries

Back to the [Pet Library](https://pet-library.moonhighway.com), let's get all customers and their current pets:

```gql
query {
  allCustomers {
    name
    currentPets {
      name
    }
  }
}
```

Response:

```json
{
  "data": {
    "allCustomers": [
      {
        "name": "Paul Benson",
        "currentPets": []
      },
      {
        "name": "Gran Janson",
        "currentPets": []
      },
      {
        "name": "John Bronson",
        "currentPets": []
      },
      {
        "name": "Shana Nelson",
        "currentPets": [
          {
            "name": "Lazer"
          }
        ]
      }
      // ...
    ]
  }
}
```

Even currentPets being not-nullable, it is returned - that occurs because an empty array it is not null.

See that a customer can have any quantity of pets (1: N).

On the other hand, a pet can be ony in care of a single customer (1:1):

```gql
query {
  petById (id:"C-1") {
    name
    inCareOf {
      name
    }
  }
}
```

Response:

```json
{
  "data": {
    "petById": {
      "name": "Biscuit",
      "inCareOf": {
        "name": "Eve Porcello"
      }
    }
  }
}
```

### Challenges

Now we'll use a third playground - [Snowtooth](https://snowtooth.moonhighway.com/).

Our goal is to:

1. Get all lifts name, elevation gain, and status.

2. Extend the query to find the trails off of each of those lifts

3. Change the status of one lift.

#### Challenge 01

```gql
query {
  allLifts {
    name
    elevationGain
    status
  }
}
```

#### Challenge 02

```gql
query {
  allLifts {
    name
    elevationGain
    status
    trailAccess {
      name
      status
    }
  }
}
```

#### Challenge 03

```gql
mutation {
  setLiftStatus(
    id: "astra-express"
    status: HOLD
  ) {
    name
    status
  }
}
```

We define the lift ID and the new status by using the setLiftStatus mutation. And then we ask for lift name and status as response.

```json
{
  "data": {
    "setLiftStatus": {
      "name": "Astra Express",
      "status": "HOLD"
    }
  }
}
```

Important to note that single quotes are not allowed, just double quotes.

Also, on this mutation we had to defined the return because the response gives us an object (different from pet library that returns a string).

### Dynamic Mutations

A better way to do this mutation would be by using variables (so we could have dynamic queries on client side):

On the Query/Mutation/Subscription panel:

```gql
mutation($id: ID!, $status: LiftStatus!) {
  setLiftStatus(id: $id, status: $status) {
    name
    status
  }
}
```

And on the Query Variables Panel:

```json
{
  "id": "astra-express",
  "status": "OPEN"
}
```

Response:

```json
{
  "data": {
    "setLiftStatus": {
      "name": "Astra Express",
      "status": "OPEN"
    }
  }
}
```

### Schema

If we want to have custom queries and mutations, we need to define those types on the Schema.

An example would be to define that allLift status can receive an array instead of a string.

Then we could have a query like:

```gql
query {
  allLifts(status: [OPEN, HOLD]) {
    name
  }
}
```

We could also add new mutations like `setAllLiftStatus` :

```gql
type Mutation {
  # Sets a `Lift` status by sending `id` and `status`
  setLiftStatus(id: ID!, status: LiftStatus!): Lift!

  # NEW MUTATION
  # Sets a `Lift` status by sending `id` and `status`
  setLiftStatus(status: LiftStatus!): [Lift!]!

  # Sets a `Trail` status by sending `id` and `status`
  setTrailStatus(id: ID!, status: TrailStatus!): Trail!
}
```

### More Practice

Let's use a different GraphQL API. The [GitHub's GraphQL API](docs.github.com/en/graphql/overview/explorer).

You'll have to authenticate your account in order to use this GraphQL IDE.

Now let's get our login, bio, company and acatarUrl:

```gql
query ($login: String!) {
  viewer {
    login
    bio
    organization(login: $login) {
      name
      description
    }
    avatarUrl
  }
}
```

```json
{
  "login": "Djament"
}
```

Response:

```json
{
  "data": {
    "viewer": {
      "login": "Marcelo-Diament",
      "bio": "Dev/XP Chapter Leader/Instrutor | HTML5, CSS3, PHP, JS, MySQL, VTEX, Laravel, WP, Bootstrap, SCSS, MD. Foco atual: Reactjs, Nodejs, TypeScriprt, GraphQL",
      "organization": {
        "name": "Djament",
        "description": "Agência de Comunicação, Desenvolvimento Web e Marketing Digital"
      },
      "avatarUrl": "https://avatars.githubusercontent.com/u/39604367?u=fbd37a87ba00c4d44a2daf8d56d5410f745497a4&v=4"
    }
  }
}
```

## Building a GraphQL API with Apollo Server

GraphQL documentation: [Code using GraphQL](graphql.org/code/) | [Using JS Section](https://graphql.org/code/#javascript)

Apollo Server documentation: [apollo-server repository](https://github.com/apollographql/apollo-server)

In this practice we'll use Apollo Server with Express. But it is possible to use other frameworks/packages. Take a look at the main documentation.

### Step By Step

#### 01. Create a Express server and install its dependencies

```sh
# Create a server with express-generator and EJS as template view
express server --view=ejs
# Access server folder
cd server
# Install Apollo Server Express as dependency
npm install apollo-server-express --save
# Install Nodemon as dev-dependency
npm install nodemon --save-dev
# Install all dependencies
npm install
```

#### 02. Users Setup

We need to make a few adjusts:

**Update `routes/users.js`**

```js
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/users')

router.get('/', controller.index)

module.exports = router
```

**Create `controllers/users.js`**

```js
const controller = {
    index: async (req, res, next) => {
        res.render('users', {
            title: 'Users'
        });
    }
}

module.exports = controller
```

**Create `views/users.ejs`**

```ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>You're at <%= title %> page</p>
  </body>
</html>
```

To test it, just access `localhost:3000` (3000 is the default port, but it can be changed).

We won't create partials template for now. We'll keep it simple.

#### 03. Users Placeholder Data

Now we'll create a `data` folder to include our users within a JSON file (`users.json`).

___

[//]: # (LINKS)
