Develop simple web admin application using NestJS
1) Various Role – Admin, Distributor, Dealer, Support Desk
2) Admin can create other Users
a) Once an Admin creates a user ID for a Distributor, Dealer, Support Desk=> they should receive an
email with a one-time password link. This link should expire once the user is prompted to
change their password
b) Use Session-based Authentication
c) Use appropriate email services libraries/API(used Nodemailer)
3) Distributors can see all Users data (assume any data for access to all these roles)
4) Distributors can’t create its own transaction but can approve orders
5) Dealers can create/delete/view their own transaction
6) Support Desk can only see all transaction but can’t create/update/delete any transaction
7) Develop simple but intuitive front end (to demo above features) for above application
using ReactJS or simple html/JavaScript (Optional if you are only Back End Developer)
