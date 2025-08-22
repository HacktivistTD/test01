import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, contactNumber, country, message, packageDetails, customTripDetails } = body;

    // Validate required fields
    if (!type || !name || !email || !contactNumber || !country) {
      console.log('Missing required fields:', { type, name, email, contactNumber, country });
      return NextResponse.json({ 
        success: false,
        message: 'Missing required fields' 
      }, { status: 400 });
    }

    // Validate environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Gmail credentials not configured');
      return NextResponse.json({ 
        success: false,
        message: 'Email service not configured' 
      }, { status: 500 });
    }

    // Create transporter with better configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use service instead of manual host/port
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // This should be an App Password, not your regular password
      },
      // Add these for better reliability
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified');
    } catch (error) {
      console.error('SMTP verification failed:', error);
      return NextResponse.json({ 
        success: false,
        message: 'Email service configuration error' 
      }, { status: 500 });
    }

    let subject = '';
    let htmlContent = '';

    switch (type) {
      case 'contact':
        subject = `Contact Form Message from ${name}`;
        htmlContent = `
          <h2>Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${contactNumber}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `;
        break;

      case 'package':
        subject = `Package Booking Request from ${name}`;
        htmlContent = `
          <h2>Package Booking Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${contactNumber}</p>
          <p><strong>Country:</strong> ${country}</p>
          <h3>Package Details:</h3>
          <pre>${JSON.stringify(packageDetails, null, 2)}</pre>
        `;
        break;

      case 'customTrip':
        subject = `Custom Trip Request from ${name}`;
        htmlContent = `
          <h2>Custom Trip Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${contactNumber}</p>
          <p><strong>Country:</strong> ${country}</p>
          <h3>Custom Trip Details:</h3>
          <pre>${JSON.stringify(customTripDetails, null, 2)}</pre>
        `;
        break;

      default:
        subject = `Form Submission from ${name}`;
        htmlContent = `
          <h2>Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${contactNumber}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Message:</strong> ${message || 'N/A'}</p>
        `;
    }

    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`, // Use your Gmail as sender
      to: 'thusharadilrukshatd@gmail.com',
      replyTo: email, // Set reply-to as the customer's email
      subject,
      html: htmlContent,
      text: htmlContent.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email authentication failed. Please check Gmail credentials.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Email sending timeout. Please try again.';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json({ 
      success: false,
      message: errorMessage 
    }, { status: 500 });
  }
}