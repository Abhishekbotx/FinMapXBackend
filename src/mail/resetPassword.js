const resetPasswordTemplate = (resetLink) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Reset Password Email</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #28a745;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <a href=""><img class="logo"
                    src="https://res.cloudinary.com/dvtjm1ahg/image/upload/v1715054098/Untitled_design06_xpbkjj.png" alt="FinMap Logo"></a>
            <div class="message">Reset Your Password</div>
            <div class="body">
                <p>Dear User,</p>
                <p>We received a request to reset your password for your FinMap account. You can reset your password by clicking the button below:</p>
                <a href="${resetLink}" class="cta">Reset Password</a>
                <p>If the button above does not work, please copy and paste the following link into your web browser:</p>
                <p><a href="${resetLink}">${resetLink}</a></p>
                <p>This link is valid for 30 minutes. If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                    href="mailto:finmap@gmail.com">finmap@gmail.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
  };
  
  module.exports = resetPasswordTemplate;
  