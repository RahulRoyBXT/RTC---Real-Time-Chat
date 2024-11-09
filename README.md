
```markdown
# RTC---Real-Time-Chat

## Introduction
RTC (Real-Time Chat) is a real-time communication platform designed for users to chat and video conference in real-time. The app uses Firebase for authentication, Firestore for storing user and room data, and ZEGOCLOUD for video chat functionality.

## Features
- User Authentication: Secure sign-in using Google with Firebase Authentication.
- Real-Time Messaging: Instant messaging support with live updates.
-Video Chat: High-quality group video calls powered by ZEGOCLOUD.
- Interactive Whiteboard: A real-time whiteboard for collaboration during video calls.
- Auto-Delete Previous Rooms: Rooms are automatically deleted after 5 hours using a     
  hook, preventing clutter.

## Features
## Installation
To set up and run the project locally, follow these steps:
- Frontend: React, Tailwind CSS
- Backend: Firebase (Authentication and Firestore)
- Real-Time Communication: ZEGOCLOUD (GeoGo)
- Build Tool: Vite
- Password Hashing: bcrypt for securely hashing room passwords
- Auto-Delete: Hook-based auto-deletion of room data after 5 hours

```bash
# Clone the repository
git clone https://github.com/RahulRoyBXT/RTC---Real-Time-Chat.git

# Navigate to the project directory
cd RTC---Real-Time-Chat

# Install dependencies
npm install
```

## Usage
After starting the application, open your browser and navigate to `http://localhost:5173`. Register or log in with your credentials to start chatting.

Set up Firebase:

## Create a Firebase project via the Firebase Console.
- Set up Firebase Authentication and enable Google sign-in.
- Create a Firestore database to store user and room data.
- Add Firebase credentials (apiKey, authDomain, projectId, storageBucket, etc.) to your 
  project configuration.

## Set up ZEGOCLOUD:
- Register for an account at ZEGOCLOUD.
- Obtain your App ID and App Key from the ZEGOCLOUD dashboard.
- Integrate these credentials into your project for video calling functionality.
```bash
# Install bcrypt for hashing room passwords:
npm install bcrypt
# Start the development server:
npm run dev
```

## Usage
- Sign-In: Users can sign in using their Google account via Firebase Authentication.
- Room Creation/Joining: Users can create a new room or join an existing room using a 
  password.
- Chat: Users can send messages in real-time with instant delivery.
- Video Calling: Users can initiate or join group video calls.
- Whiteboard: A real-time collaborative whiteboard can be used during the video call.
- Reactions: Users can react to messages or video content with emojis.

## Security
# Authentication and Authorization
- Firebase Authentication is used to authenticate users via Google login. This ensures that users can securely log in without exposing passwords or other sensitive information.

- Firebase Security Rules are implemented to restrict access to Firestore collections based on authentication status. Only authenticated users can read/write to the database.

Example Firestore rules:
```bash
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId} {
      allow read, write: if request.auth != null;
    }
  }
}
```
This allows only authenticated users to read and write to Firestore, preventing unauthorized access to sensitive data like room passwords.


## Future Enhancements
- User Roles: Implement roles like admin, moderator, and participant for more control 
  over who can perform specific actions in a room.
- Message Encryption: Implement end-to-end encryption for chat messages to prevent 
  unauthorized reading.
- UI/UX Improvements: Work on the visual interface to improve the user experience and 
  make it more intuitive.
- Room Settings: Allow room creators to manage room settings, such as 
  enabling/disabling features like whiteboard or reactions.

  
## Contributing
We welcome contributions from the community. To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a pull request


## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For any questions or inquiries, please contact Rahul Roy at [rahulroy.it2021@nsec.ac.in](mailto:rahulroy.it2021@nsec.ac.in).
