# Backend API Documentation

## Endpoint: `/users/register`

- **Method**: `POST`

### Description

This endpoint allows users to register by providing their email, full name, and password. Upon successful registration, a user object and an authentication token are returned.

### Required Data

- `fullName` (object)
  - `firstName` (string, required) : Must be at least 3 characters long.
  - `lastName` (string, optional) : Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

### Response Example

```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
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
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
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
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
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

This endpoint allows captains to register by providing their email, full name, password, and vehicle details. Upon successful registration, a captain object and an authentication token are returned.

### Required Data

- `fullName` (object)
  - `firstName` (string, required): Must be at least 3 characters long.
  - `lastName` (string, optional): Must be at least 3 characters long.
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
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
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

## Endpoint: `/captains/login`

- **Method**: `POST`

### Description

Allows captains to log in by providing their email and password. Returns a captain object and an authentication token upon successful login.

### Required Data

- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

### Response Example

```json
{
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
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
  "message": "Login successful"
}
```

### Status Codes

- `200`: Login successful.
- `401`: Invalid email or password.

## Endpoint: `/captains/profile`

- **Method**: `GET`

### Description

Retrieves the authenticated captain's profile information. Requires authentication.

### Response Example

```json
{
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Status Codes

- `200`: Profile retrieved successfully.
- `401`: Unauthorized (authentication required).

## Endpoint: `/captains/logout`

- **Method**: `GET`

### Description

Logs the captain out by clearing the authentication token and adding it to a blacklist.

### Response Example

```json
{
  "message": "Captain logged out successfully"
}
```

### Status Codes

- `200`: Logout successful.
- `401`: Unauthorized (authentication required).

## Endpoint: `/rides/create`

- **Method**: `POST`

### Description

Creates a new ride by providing pickup location, drop-off location, and vehicle type. Requires authentication.

### Required Data

- `pickupLocation` (string, required): Must be at least 3 characters long.
- `dropOffLocation` (string, required): Must be at least 3 characters long.
- `vehicleType` (string, required): Must be one of the following values: `car`, `moto`, `auto`.

### Response Example

```json
{
  "ride": {
    "pickupLocation": "Location A",
    "dropOffLocation": "Location B",
    "vehicleType": "car",
    "fare": 50
  },
  "message": "Ride created successfully"
}
```

### Status Codes

- `201`: Ride created successfully.
- `400`: Bad request (validation errors).

## Endpoint: `/rides/get-fare`

- **Method**: `GET`

### Description

Retrieves the fare for a ride based on pickup location and drop-off location. Requires authentication.

### Required Data

- `pickupLocation` (string, required): Must be at least 3 characters long.
- `dropOffLocation` (string, required): Must be at least 3 characters long.

### Response Example

```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

### Status Codes

- `200`: Fare retrieved successfully.
- `400`: Bad request (validation errors).

## Endpoint: `/rides/confirm`

- **Method**: `POST`

### Description

Allows a captain to confirm and accept a ride request. Requires captain authentication.

### Required Data

- `rideId` (string, required): Must be a valid MongoDB ID.

### Response Example

```json
{
  "message": "Ride confirmed successfully",
  "ride": {
    "id": "ride_id",
    "status": "confirmed",
    "captainId": "captain_id"
  }
}
```

### Status Codes

- `200`: Ride confirmed successfully.
- `400`: Bad request (invalid ride ID).
- `401`: Unauthorized (captain authentication required).
- `404`: Ride not found.

## Endpoint: `/rides/start-ride`

- **Method**: `GET`

### Description

Allows a captain to start a confirmed ride by providing the ride ID and OTP. Requires captain authentication.

### Required Data

- `rideId` (string, required): Must be a valid MongoDB ID.
- `otp` (string, required): Must be a 6-digit string.

### Response Example

```json
{
  "message": "Ride started successfully",
  "ride": {
    "id": "ride_id",
    "status": "in_progress",
    "startTime": "timestamp"
  }
}
```

### Status Codes

- `200`: Ride started successfully.
- `400`: Bad request (invalid ride ID or OTP).
- `401`: Unauthorized (captain authentication required).
- `404`: Ride not found.

## Endpoint: `/rides/finish-ride`

- **Method**: `POST`

### Description

Allows a captain to finish an ongoing ride. Requires captain authentication.

### Required Data

- `rideId` (string, required): Must be a valid MongoDB ID.

### Response Example

```json
{
  "message": "Ride finished successfully",
  "ride": {
    "id": "ride_id",
    "status": "completed",
    "endTime": "timestamp"
  }
}
```

### Status Codes

- `200`: Ride finished successfully.
- `400`: Bad request (invalid ride ID).
- `401`: Unauthorized (captain authentication required).
- `404`: Ride not found.

## Endpoint: `/maps/get-coordinate`

- **Method**: `GET`

### Description

Retrieves coordinates for a given address. Requires authentication.

### Required Data

- `address` (string, required): Must be at least 3 characters long.

### Response Example

```json
{
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

### Status Codes

- `200`: Coordinates retrieved successfully.
- `400`: Bad request (validation errors).

## Endpoint: `/maps/get-distance-time`

- **Method**: `GET`

### Description

Retrieves distance and time between origin and destination. Requires authentication.

### Required Data

- `origin` (string, required): Must be at least 3 characters long.
- `destination` (string, required): Must be at least 3 characters long.

### Response Example

```json
{
  "distance": "10 km",
  "time": "15 mins"
}
```

### Status Codes

- `200`: Distance and time retrieved successfully.
- `400`: Bad request (validation errors).

## Endpoint: `/maps/get-suggestion`

- **Method**: `GET`

### Description

Provides location suggestions based on input. Requires authentication.

### Required Data

- `input` (string, required): Must be at least 3 characters long.

### Response Example

```json
[
  {
    "description": "Location A"
  },
  {
    "description": "Location B"
  }
]
```

### Status Codes

- `200`: Suggestions retrieved successfully.
- `400`: Bad request (validation errors).
