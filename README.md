
# Backend Setup Instructions

To run the backend project locally, follow these steps:

1. Clone the repository and navigate to the backend directory.

2. Install dependencies: npm install


3. Update the following files:

In `src/controllers/authControllers.js`:
```javascript
const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

4. In src/app.js:
javascriptCopyapp.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"]
}));

5. Create a .env file in the root directory with the following content:
CopyPORT=5000
FRONTEND_URL='http://localhost:3000'
MONGO_URI='your_mongo_url'
JWT_SECRET=your_jwt_secret
EMAIL_HOST=''
EMAIL_PORT=
EMAIL_USER='your_email'
EMAIL_PASS='your_email_pass_without_space'

6. Replace the placeholder values with your actual configuration:

your_mongo_url: Your MongoDB connection string
your_jwt_secret: A secret key for JWT token generation
EMAIL_HOST: Your email service provider's SMTP host
EMAIL_PORT: The SMTP port for your email service
your_email: Your email address
your_email_pass_without_space: app-specific password

7. Start the server:
npm start
