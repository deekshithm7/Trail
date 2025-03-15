import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import axios from 'axios';

const router = express.Router();

// Email sending function
async function sendEmail(recipient, subject, content) {
    const apiKey = process.env.BREVO_API_KEY.trim(); // Remove any potential whitespace
    
    try {
      // Log what we're about to send (for debugging)
      console.log(`Attempting to send email to: ${recipient}`);
      console.log(`Using API key: ${apiKey.substring(0, 10)}...`);
      
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: { email: process.env.BREVO_EMAIL.trim(), name: 'Blood Bank System' },
          to: [{ email: recipient }],
          subject,
          htmlContent: content
        },
        {
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`[EMAIL] Email sent to: ${recipient}`);
      return response.data;
    } catch (error) {
      console.error('[EMAIL ERROR]', error.response?.data || error.message);
      // Log safer error information
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request was made but no response received');
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw new Error('Failed to send email');
    }
}

// SMS sending function
async function sendSMS(phoneNumber, message) {
  try {
    console.log(`Attempting to send SMS to: ${phoneNumber}`);
    
    const response = await axios.post(
      'https://api.brevo.com/v3/transactionalSMS/sms',
      {
        sender: "BloodBank",  // Replace with your registered sender name
        recipient: phoneNumber,
        content: message,
        type: "transactional"
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`[SMS] Message sent to: ${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error('[SMS ERROR]', error.response?.data || error.message);
    // Add more structured error logging
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Request was made but no response received');
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw new Error('Failed to send SMS');
  }
}

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ 
            name, 
            email, 
            password: hashPassword,
            phoneNumber: phoneNumber || ''  // Make phone optional
        });

        // Save user to database
        await newUser.save();

        // Send registration confirmation email
        const loginUrl = "https://bloodbank-system.com/login";
        try {
            await sendEmail(
                email,
                "Registration successful",
                `<!DOCTYPE html>
<html>
<head><title>Registration Successful</title></head>
<body>
  <div style="text-align:center; padding:20px; font-family:Arial,sans-serif;">
    <h2 style="color:#28a745;">✔ Registration Successful!</h2>
    <p>Thank you for signing up. Your account has been successfully created.</p>
    <p>You can now log in and start using our services.</p>
    <a href="${loginUrl}" style="background-color:#2D89FF; color:white; padding:10px 20px; border-radius:5px; text-decoration:none;">Login Now</a>
    <p style="color:#777; font-size:12px; margin-top:20px;">© 2025 Blood Bank System. All rights reserved.</p>
  </div>
</body>
</html>`
            );
        } catch (emailError) {
            console.error("Failed to send registration email:", emailError);
            // Continue with the response even if email fails
        }

        // Send SMS notification if phone number provided
        if (phoneNumber) {
            try {
                await sendSMS(
                    phoneNumber,
                    "Thank you for registering with the Blood Bank System. Your account has been created successfully."
                );
            } catch (smsError) {
                console.error("Failed to send registration SMS:", smsError);
                // Continue with the response even if SMS fails
            }
        }

        return res.status(201).json({ success: true, message: "Account created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // Send login notification email
        try {
            await sendEmail(
                email,
                "Login Notification",
                `<!DOCTYPE html>
<html>
<head><title>Login Notification</title></head>
<body>
  <div style="text-align:center; padding:20px; font-family:Arial,sans-serif;">
    <h2 style="color:#2D89FF;">👋 Welcome Back!</h2>
    <p>You have successfully logged in to your Blood Bank account.</p>
    <p>If this wasn't you, please contact our support team immediately.</p>
    <p style="color:#777; font-size:12px; margin-top:20px;">© 2025 Blood Bank System. All rights reserved.</p>
  </div>
</body>
</html>`
            );
        } catch (emailError) {
            console.error("Failed to send login notification email:", emailError);
            // Continue with the response even if email fails
        }

        // Send SMS notification if user has phone number
        if (user.phoneNumber) {
            try {
                await sendSMS(
                    user.phoneNumber,
                    "You have successfully logged into your Blood Bank account. If this wasn't you, please contact support immediately."
                );
            } catch (smsError) {
                console.error("Failed to send login SMS notification:", smsError);
                // Continue with the response even if SMS fails
            }
        }

        return res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Password reset request
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        // Generate a reset token (in a real app, store this with an expiry)
        const resetToken = Math.random().toString(36).substring(2, 15);
        
        // In a real application, save this token to the user record with an expiration
        // user.resetToken = resetToken;
        // user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        // await user.save();
        
        const resetUrl = `https://bloodbank-system.com/reset-password?token=${resetToken}`;
        
        // Send password reset email
        try {
            await sendEmail(
                email,
                "Password Reset Request",
                `<!DOCTYPE html>
<html>
<head><title>Password Reset</title></head>
<body>
  <div style="text-align:center; padding:20px; font-family:Arial,sans-serif;">
    <h2 style="color:#ff6b6b;">Password Reset Request</h2>
    <p>We received a request to reset your password. Click the button below to create a new password:</p>
    <a href="${resetUrl}" style="background-color:#2D89FF; color:white; padding:10px 20px; border-radius:5px; text-decoration:none; display:inline-block; margin:15px 0;">Reset Password</a>
    <p>If you didn't request this, please ignore this email or contact our support team if you have concerns.</p>
    <p>This link will expire in 1 hour.</p>
    <p style="color:#777; font-size:12px; margin-top:20px;">© 2025 Blood Bank System. All rights reserved.</p>
  </div>
</body>
</html>`
            );
            
            return res.status(200).json({ success: true, message: "Password reset instructions sent to your email" });
        } catch (emailError) {
            console.error("Failed to send password reset email:", emailError);
            return res.status(500).json({ success: false, message: "Failed to send password reset email" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Test route for SMS
router.post('/test-sms', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }
    
    await sendSMS(
      phoneNumber,
      "This is a test message from the Blood Bank System. If you received this, SMS functionality is working correctly."
    );
    
    return res.status(200).json({ success: true, message: "SMS sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to send SMS" });
  }
});

export default router;