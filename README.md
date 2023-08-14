# User Authenication

The user must also hit verification guidelines to make sure that the password and username are appropriate lengths. The code is done in REACT with frontend  backend capabilities. The front end will be using SHA256 to hash the password for security authentication. Once the password is hashed, it moves to the backend using axios. The backend will now add a randomly generated “salt” of 5 letters to add to the security of the users password. Once that procedures done, it will save the information, username, hashed and salted password to the database. Once the account is created, it’s time to login. Logging in will take the username and password from the front end, using axios to go and fetch the information from the backend, rehashing the password and grabbing the salt to verify if the passwords match. If the passwords do indeed match, the user will login. 
---
## The purpose of this program is to 
- Create a username and password
-	Make sure they reach the requirements for length
-	Salt and hash the password for security 
-	Saving the username and hashed/salted password to the database
-	Verifying password and username when the user wants to login. 

