exports.accountCreatedPendingApproval = (userName, userEmail) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Account Creation Pending Approval</title>
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
                    src="https://res.cloudinary.com/dvtjm1ahg/image/upload/v1715054098/Untitled_design06_xpbkjj.png" alt="StudyNotion Logo"></a>
            <div class="message">Account Creation Pending Approval</div>
            <div class="body">
                <p>Hello ${userName},</p>
                <p>Your account has been successfully created with the email address <span class="highlight">${userEmail}</span>.</p>
                <p>Your account is currently pending approval from the admin. Once approved, you will be able to log in.</p>
                <p>We will notify you once your account has been approved.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:finmap@gmail.com">finmap@gmail.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};
