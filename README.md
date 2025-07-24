# Car & Bike Rentals Web Application

## Overview
This project is a modern web application for renting cars and bikes. It allows users to register, log in, and manage their rentals through a user-friendly interface. The app is built with React and uses Firebase for authentication and backend services.

## Features
- **User Registration & Login:** Secure sign-up and login using Firebase Authentication.
- **Material UI Design:** Clean, responsive UI built with Material UI components.
- **Form Validation:** Real-time validation for user input during registration.
- **Navigation:** Smooth page transitions using React Router.
- **Feedback Alerts:** Instant feedback for registration success or errors.
- **PayPal Payment Integration:** Users can securely pay for their rentals using PayPal.
- **Extensible Structure:** Easily add features like vehicle listings, booking management, and payments.

## Tech Stack
- React.js
- Firebase Authentication
- Material UI
- React Router
- PayPal JavaScript SDK

## Getting Started

### Prerequisites
- Node.js (v14 or above)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd car_bike_Rentals
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Email/Password authentication.
   - Copy your Firebase config and replace it in `src/firebase/config.js`.
4. Set up PayPal:
   - Create a PayPal developer account at [PayPal Developer](https://developer.paypal.com/).
   - Obtain your PayPal Client ID and configure it in your application where required.

### Running the App
```bash
npm start
# or
yarn start
```
The app will run at [http://localhost:3000](http://localhost:3000).

## Usage
- Register a new account with your name, birthday, email, and password.
- Log in to access rental features.
- Browse available vehicles, select your rental, and proceed to payment.
- Pay securely using the integrated PayPal payment method.
- Manage your bookings and rental history.

## Sample Login
For testing purposes, you can use the following credentials:

- **Email:** user1@gmail.com
- **Password:** 123456

## Folder Structure
- `src/components/` – React components (Signup, Login, Home, Admin, etc.)
- `src/firebase/` – Firebase configuration
- `src/redux/` – Redux store setup (if used)
- `src/assets/` – Images and static assets

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## References
Screenshots and photos of the Firebase and PayPal setup will be added soon for reference and guidance.

