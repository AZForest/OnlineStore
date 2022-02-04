# OnlineStore

* An e-commerce app that simulates a real-world produce site that allows users to create an account, login, select/remove/update counts of items in their cart, and place/delete orders.

## Links

* [Live Link](https://azforest.github.io/OnlineStore)

## Install Instructions

To get the app running on your machine:
* Clone the repository "git clone [insert repo link here]"
* Install Node on machine if not already installed: [Node.js](https://nodejs.org/en/download/)
* Navigate into cloned folder and enter command "npm install"
* Enter the command "npm run start"

## Screenshots

### Home Page (/):

<img width="1440" alt="Title" src="https://user-images.githubusercontent.com/61096655/133939415-4eef2e60-5afc-4725-95cb-3a5bd9d4c901.png">
<img width="1440" alt="Title 2" src="https://user-images.githubusercontent.com/61096655/133939426-f44d5970-6010-49bc-95bf-01e3ab08abd7.png">

### Log In / Sign Up Page:

* /auth

<img width="1440" alt="Log In : Sign Up" src="https://user-images.githubusercontent.com/61096655/133939444-eab3405f-8151-4ae6-bcf1-464307e5aa12.png">

### Fruit Page:

* /fruit
* Users can only add items to cart if logged in

<img width="1440" alt="Fruit" src="https://user-images.githubusercontent.com/61096655/133939452-7ed7e17c-6a64-4a40-a70f-348c8283b55b.png">

### Vegetable Page:

* /vegetables
* Users can only add items to cart if logged in

<img width="1440" alt="Vegetables" src="https://user-images.githubusercontent.com/61096655/133939461-773fd852-80f5-4dfc-b40e-c9198c0cfb2d.png">

### Bakery Page:

* /bakery
* Users can only add items to cart if logged in

<img width="1440" alt="Bakery" src="https://user-images.githubusercontent.com/61096655/133939468-79b4ea68-0f4e-4f0d-90b5-7b33ce1ac7e0.png">

### Frozen Page:

* /frozen
* Users can only add items to cart if logged in

<img width="1439" alt="Frozen" src="https://user-images.githubusercontent.com/61096655/133939476-8ac6ff92-1ab1-48c7-a6da-fbdf4c34b082.png">

### Cart:

* /cart
* Can only be accessed if logged in

<img width="1440" alt="Cart" src="https://user-images.githubusercontent.com/61096655/133939574-18736f36-2627-4d4b-a995-d2f65e95184b.png">

### Orders:

* /orders
* Can only be accessed if logged in

<img width="1440" alt="Orders" src="https://user-images.githubusercontent.com/61096655/133939693-5a8e89e8-c902-4f72-ba0d-6e7daee5832b.png">

## Technology

### Built with:

* React, including Router
  * Created with [create-react-app](https://github.com/facebook/create-react-app)
* Redux, for state-management

### API Interface:

* Built to interface with the Online Store API: [OnlineStoreServer](https://github.com/azforest/onlinestoreserver)
* Express server hosted on Heroku, connects to project database

### Database:

* MongoDB
