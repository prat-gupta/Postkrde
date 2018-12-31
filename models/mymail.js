var nodemailer = require('nodemailer');
function sendmail(unm, pass, cb) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pratikshagupta789@gmail.com',
            pass: 'spanishtoll'
        }
    });
    
    var mailOptions = {
        from: 'pratikshagupta789@gmail.com',
        to: unm,
        subject: 'Confirmation mail for registeration on Flipcard.com',
        html: '<h2>your username: ' + unm + "<br/>your password: " + pass+"<br/><h2><a href='https://localhost:3000/userauthentication/"+unm+"'> click here to verify</a></h2><br/>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            cb(false)
        } else {
            cb(true)
        }
    });
}
module.exports = {sendmail:sendmail}
