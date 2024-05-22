# Auth Workflow

The goals here are:

- validate email
- refresh token
- setup reset password functionality

IMPORTANT: For this project, we re-use all the backend code from
             e-commerce App, and we will refactor it to fit our needs

## Front End App

[Auth Workflow](https://react-node-user-workflow-front-end.netlify.app/)

## Update User Model

- [x] add following three properties
- [x] verificationToken - String
- [x] isVerified - {type:Boolean, default:false}
- [x] verified - Date

## Update Register Controller

- [x] setup fake verificationToken - 'fake token'
- [x] remove everything after User.create()
- [x] send back success message and token

## Update Login Controller

- [x] right after isPasswordCorrect
- [x] check if user.isVerified, if not 401

## Verify Email Controller

- [x] create verifyEmail in authController
- [x] get verificationToken and email from req.body
- [x] setup a '/verify-email' route in authRoutes
- [x] test in a Postman
- [x] check for user using email
- [x] if no user 401
- [x] if token does not match user token 401
- [x] if correct set
- [x] user.isVerified = true
- [x] user.verified = Date.now()
- [x] user.verificationToken = ''
- [x] save use with instance method
- [x] return msg:'email verified'

## Email Setup

- [x] re-watch project 08
- [x] ethereal credentials (create account/login)
- [x] install nodemailer
- [x] create (nodemailerConfig, sendEmail,
  sendResetPasswordEmail, sendVerficationEmail) files in utils

## Send Verification Link

- [x] refactor sendEmail
- [x] setup sendVerificationEmail.js
- [x] pass arguments

## Token Model

- [x] create Token.js in models
- [x] refreshToken,ip,userAgent - all String and required
- [x] isValid - Boolean, default:true
- [x] ref user
- [x] timestamps true

## Setup Token in Login Controller [x]

## Send Multiple Cookies [x]

## Check for Existing Token [x]

## Refactor Auth Middleware - Access , Refresh Token [x]

## Logout [x]

## Forgot/Reset Password Functionality

- [x] User Model
- [x] passwordToken {type:String}
- [x] passwordTokenExpirationDate {type:Date}
- [x] authController
- [x] forgotPassword and resetPassword
- [x] authRoutes
- [x] post '/forgot-password' '/reset-password'

## Forgot Password Controller

## Send Reset Password Email

## Reset Password Controller

## Hash Password Token
