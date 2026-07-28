# EventNexus API - Project Todo

## Project Overview
- Build a RESTful API for managing events, venues, users, and registrations.
- Support authentication using OAuth/Google login.
- Use MongoDB with Mongoose for data storage.
- Follow an MVC structure for maintainability and scalability.
- Document APIs with Swagger and deploy the project.

## Team Roles
- Shania Esguerra: Node.js project setup, repository creation, MongoDB setup, registration collection
- Kasagga Frank: Users collection and related endpoints
- Jesse Tusiime: Events collection and Swagger documentation
- Kalungi Isaac: Venues collection and related endpoints
- All Team Members: Final presentation and project demo

## Weekly Plan

### Week 04
- [x] Select project topic
- [x] Complete project proposal
- [x] Design database structure
- [x] Create repository and share access with team members
- [x] Assign responsibilities
- [x] Plan API endpoints

### Week 05
- Connect the app to MongoDB
- Configure OAuth authentication
- Create models and implement CRUD routes
- Begin Swagger documentation

### Week 06
- [ ] Complete validation and error handling
- [ ] Write unit tests for GET routes
- [ ] Finish API documentation

### Week 07
- [ ] Deploy to Render
- [ ] Verify Swagger documentation at /api-docs
- [ ] Perform final testing
- [ ] Prepare and record video presentation

## API Endpoint Checklist

### Users
- [ ] POST /users
- [ ] PUT /users
- [ ] GET /users/login
- [ ] GET /users/logout
- [ ] GET /users/{username}
- [ ] POST /users/{username}
- [ ] DELETE /users/{username}

### Registrations
- [ ] POST /registration
- [ ] PUT /registration
- [ ] GET /registration
- [ ] GET /registration/{registrationId}
- [ ] POST /registration/{registrationId}
- [ ] DELETE /registration/{registrationId}

### Events
- [ ] POST /events
- [ ] POST /events/createWithArray
- [ ] POST /events/createWithList
- [ ] GET /events
- [ ] GET /events/{eventId}
- [ ] PUT /events/{eventId}
- [ ] DELETE /events/{eventId}

### Venues
- [ ] POST /venue
- [ ] POST /venue/createWithArray
- [ ] POST /venue/createWithList
- [ ] GET /venue
- [ ] GET /venue/{venueId}
- [ ] PUT /venue/{venueId}
- [ ] DELETE /venue/{venueId}

## Work Distribution
- HTTP GET: Everyone will complete their assigned collection
- HTTP POST: Everyone will complete their assigned collection
- HTTP PUT: Everyone will complete their assigned collection
- HTTP DELETE: Everyone will complete their assigned collection

## Stretch Goals
- [ ] Add event search and filtering by title, date, or venue
- [ ] Improve authentication and user experience
