# Backend API Documentation

## Endpoint: `/users/register`

- **Method**: `POST`

### Description

This endpoint allows users to register by providing their email, first name, and password. Upon successful registration, a user object and an authentication token are returned.

### Required Data

- `fullname` (object)
  - `firstname` (string, required) : Must be at least 3 characters long.
  - `lastname` (string, optional) : Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

### Response Example

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password"
  },
  "token": "generated_auth_token",
  "message": "User created successfully"
}
```

### Status Codes

- `201`: User created successfully.
- `400`: Bad request (validation errors).

## Endpoint: `/users/login`

- **Method**: `POST`

### Description

This endpoint allows users to log in by providing their email and password. Upon successful login, a user object and an authentication token are returned.

### Required Data

- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

### Response Example

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password"
  },
  "token": "generated_auth_token",
  "message": "User logged in successfully"
}
```

### Status Codes

- `200`: User logged in successfully.
- `401`: Invalid email or password (authentication errors).
