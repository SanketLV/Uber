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

## Endpoint: `/users/profile`

- **Method**: `GET`

### Description

This endpoint retrieves the user's profile information. It requires authentication.

### Response Example

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Status Codes

- `200`: User profile retrieved successfully.
- `401`: Unauthorized (authentication required).

## Endpoint: `/users/logout`

- **Method**: `GET`

### Description

This endpoint logs the user out by clearing the authentication token and adding it to a blacklist.

### Response Example

```json
{
  "message": "User logged out successfully"
}
```

### Status Codes

- `200`: User logged out successfully.
- `401`: Unauthorized (authentication required).

## Authentication Process

Authentication is handled using JSON Web Tokens (JWT). The process is as follows:

1. **Token Generation**: Upon successful login, a JWT is generated and sent to the client.
2. **Token Storage**: The token is stored in a cookie on the client side.
3. **Token Retrieval**: For protected routes, the token is retrieved from the cookies or the `Authorization` header.
4. **Token Validation**: The middleware checks if the token exists and verifies it against the secret key.
5. **Blacklist Check**: The middleware checks if the token is blacklisted.
6. **User Retrieval**: If the token is valid, the user is retrieved from the database and attached to the request object.
7. **Access Control**: If the token is invalid or blacklisted, a 401 Unauthorized response is returned.

This process ensures that only authenticated users can access protected routes.

## Endpoint: `/captains/register`

- **Method**: `POST`

### Description

This endpoint allows captains to register by providing their email, fullname, password, and vehicle details. Upon successful registration, a captain object and an authentication token are returned.

### Required Data

- `fullname` (object)
  - `firstname` (string, required): Must be at least 3 characters long.
  - `lastname` (string, optional): Must be at least 3 characters long.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Must be at least 6 characters long.
- `vehicle` (object)
  - `color` (string, required): Must be at least 3 characters long.
  - `plate` (string, required): Must be at least 3 characters long.
  - `capacity` (number, required): Must be a positive integer.
  - `vehicleType` (string, required): Must be one of the following values: `car`, `motorcycle`, `auto`.

### Response Example

```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "generated_auth_token",
  "message": "Captain created successfully"
}
```

### Status Codes

- `201`: Captain created successfully.
- `400`: Bad request (validation errors or captain already exists).
