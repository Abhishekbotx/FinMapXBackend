const newResetPasswordTemplate = (url) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Reset Password</title>
        <style>
            body {
                background-color: #f0f3f6;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #333333;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header img {
                max-width: 150px;
            }
            .header {
                margin-bottom: 20px;
            }
            .content h2 {
                color: #0073aa;
                font-size: 22px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
                margin: 0 0 20px;
                text-align: left;
            }
            a{
                color: #0073aa;
            }
    
           .center{
             text-align: center;
           }
            .support-info {
                font-size: 14px;
                color: #666666;
                margin-top: 20px;
            }
            .support-info a {
                color: #0073aa;
            }
    
            .reset {
                background-color: rgb(39, 221, 39);
                padding:10px 15px;
                border-radius:5px ;
                border-style:none;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                cursor: pointer; /* Change cursor to pointer to indicate button behavior */
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://res.cloudinary.com/dvtjm1ahg/image/upload/v1715054098/Untitled_design06_xpbkjj.png" alt="FinMap Logo">
            </div>
            
            <div class="content">
                <h2>Password Reset Request</h2>
                <p>Hi there,</p>
                <p>You requested to reset your FinMap account password. Click the button below to reset it:</p>
                <a href=''>${url}<a/>
                <p>  </p>
                 <p>Copy and paste this link in your broweser for password reset. This link will expire in 30 minutes. If you didn't request this, please ignore this email or contact our support.</p>
            </div>
            <div class="support-info">
                <p>Please dont share this link with anyone.If you need further assistance, please reach out to us at <a href="mailto:finmap@gmail.com">finmap@gmail.com</a>.</p>
            </div>
        </div>
    </body>
    </html>`;
};

module.exports = newResetPasswordTemplate;
