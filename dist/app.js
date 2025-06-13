"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const sendEmail_1 = require("./sendEmail");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.post('/pixxi/send-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, subject, message } = req.body;
        if (!to || !subject || !message) {
            res.status(400).json({ error: 'Missing required fields' });
        }
        const info = yield (0, sendEmail_1.sendEmail)(to, subject, message);
        res.status(200).json({ success: true, message: 'Email sent', info });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
}));
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// Global unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => __awaiter(void 0, void 0, void 0, function* () {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Gracefully shutting down the server
    if (server) {
        try {
            server.close(() => {
                console.log('Server and MongoDB connection closed due to unhandled rejection.');
                process.exit(1); // Exit the process with an error code
            });
        }
        catch (err) {
            console.error('Error during shutdown:', err);
            process.exit(1); // Exit with error code if shutting down fails
        }
    }
    else {
        process.exit(1);
    }
}));
// Global uncaught exception handler
process.on('uncaughtException', (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.error('Uncaught Exception:', err);
    // Gracefully shutting down the server
    if (server) {
        try {
            server.close(() => {
                console.log('Server and MongoDB connection closed due to uncaught exception.');
                process.exit(1); // Exit the process with an error code
            });
        }
        catch (err) {
            console.error('Error during shutdown:', err);
            process.exit(1); // Exit with error code if shutting down fails
        }
    }
    else {
        process.exit(1);
    }
}));
