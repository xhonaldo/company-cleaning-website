export class BookingEmailTemplate {
  generateHtml(bookingDetails: { name: string; email: string; service: string; message: string; phone: string }): string {
    const { name, email, service, message, phone } = bookingDetails;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>New Service Request</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 5px;
            overflow: hidden;
          }
          .header h2 {
            color: #007bff;
            margin: 0;
          }
          .header {
            background-color: #f2f2f2;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #dddddd;
          }
          .content {
            padding: 20px;
          }
          .content p {
            margin-bottom: 15px;
          }
          .detail {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eeeeee;
          }
          .detail strong {
            display: inline-block;
            width: 120px;
            color: #555555;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Booking Confirmation</h2>
            <h2>New Service Request</h2>
          </div>
          <div class="content">
            <p>A new service request has been submitted with the following details:</p>
            <div class="detail">
              <strong>Name:</strong> ${name}
            </div>
            <div class="detail">
              <strong>Phone:</strong> ${phone}
            </div>
            <div class="detail">
              <strong>Email:</strong> ${email}
            </div>
            <div class="detail">
              <strong>Service:</strong> ${service}
            </div>
            <div class="detail">
              <strong>Message:</strong> ${message || 'N/A'}
            </div>
            <p>Please review the request and contact the customer to finalize the booking.</p>
            <p>Best regards,<br>Your Company Name</p>
          </div>
        </div>
      </body>
      </html>

    `;
  }
}