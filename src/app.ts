// src/app.ts
import express, { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import { sendEmail } from './sendEmail';


dotenv.config();

const app = express();
app.use(
    cors({
    origin: '*',
      methods: ['POST'],
    })
  );
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/pixxi/send-email', async (req: Request, res: Response) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      res.status(400).json({ error: 'Missing required fields' });
    }

    const info = await sendEmail(to, subject, message);

    res.status(200).json({ success: true, message: 'Email sent', info });
  } 
  catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Global unhandled promise rejection handler
process.on('unhandledRejection', async (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Gracefully shutting down the server
    if (server) {
      try {
        server.close(() => {
          console.log(
            'Server and MongoDB connection closed due to unhandled rejection.',
          );
          process.exit(1); // Exit the process with an error code
        });
      } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1); // Exit with error code if shutting down fails
      }
    } else {
      process.exit(1);
    }
  });
  
  // Global uncaught exception handler
  process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    // Gracefully shutting down the server
    if (server) {
      try {
        server.close(() => {
          console.log(
            'Server and MongoDB connection closed due to uncaught exception.',
          );
          process.exit(1); // Exit the process with an error code
        });
      } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1); // Exit with error code if shutting down fails
      }
    } else {
      process.exit(1);
    }
  });
