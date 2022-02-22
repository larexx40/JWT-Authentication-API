# JWT Authentication API

Authentication API with JWT Token in Node.js
JSON Web Tokens (JWT) are an RFC 7519 open industry standard for representing claims between two parties
JWTs can be signed using a secret (using the HMAC algorithm) or an RSA or ECDSA public/private key combination
Signed information can be trusted and unchecked.

Dependencies used mongoose, jsonwebtoken, express, dotenv and bcryptjs.

This API is to validate user credentials against what we have in our database(mongoDB).
User will register to the app and login

For /register route functionalty:
Get user input.
Validate user input.
Validate if the user already exists.
Encrypt the user password using bcrypt.
Create a user in our database.
And finally, create a signed JWT token.

For /login route functionalty:
Get user input.
Validate user input.
Validate if the user exists.
Verify user password against the encrypted password saved into database.
And finally, create a signed JWT token.

