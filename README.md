# Serverless REST API Documentation

## Overview

This document provides documentation for a serverless REST API built using AWS Cloud Services. The API allows CRUD (Create, Read, Update, Delete) operations on a single resource, "people", stored in a DynamoDB table.

## Architecture

The API is constructed using the following AWS services:

- **API Gateway:** Serves as the entry point for incoming HTTP requests and routes them to the appropriate Lambda function based on the routes and methods.

- **Lambda Function:** Responsible for handling different CRUD operations on the "people" resource in the DynamoDB table.

- **DynamoDB:** Stores the data for the "people" resource in a single table.

## Lambda Function: handler

The main Lambda function for the serverless REST API is named `handler`. It receives incoming HTTP requests from the API Gateway and processes them based on the routeKey.

## Routes and Functions

The API supports the following routes:

1. **DELETE /people/{id}**
   - Function: `handler`
   - Description: Deletes a person record from the DynamoDB table by the specified ID.
   - Input: Path parameter "id" representing the ID of the person record to delete.
   - Output: No content (204 status code) if successful.

2. **GET /people**
   - Function: `handler`
   - Description: Retrieves all person records from the DynamoDB table.
   - Input: None
   - Output: JSON array containing objects representing all records in the "people" table.

3. **GET /people/{id}**
   - Function: `handler`
   - Description: Retrieves a person record from the DynamoDB table by the specified ID.
   - Input: Path parameter "id" representing the ID of the person record to retrieve.
   - Output: JSON object representing the record with the specified ID.

4. **PUT /people**
   - Function: `handler`
   - Description: Inserts or updates a person record in the DynamoDB table.
   - Input: JSON body representing the person record to be inserted or updated (e.g., `{ "id": "123", "name": "John Doe", "age": 30 }`).
   - Output: A success message indicating that the record was inserted or updated.

## Data and Program Flow

1. Clients send HTTP requests to the API Gateway, specifying the desired CRUD operation and the required data (if any).
2. The API Gateway routes the requests to the `handler` Lambda function based on the routes and methods.
3. The `handler` Lambda function interacts with DynamoDB using the `DynamoDBDocumentClient` to perform CRUD operations on the "people" table.
4. DynamoDB processes the database operations and returns the results to the `handler` Lambda function.
5. The `handler` Lambda function returns the appropriate response to the API Gateway.
6. The API Gateway sends the response back to the client.

## Deployment

To deploy the serverless REST API, you need to set up the AWS SDK and IAM permissions for the Lambda function to interact with DynamoDB and API Gateway. The API can be deployed using the AWS CLI or other deployment tools.

## Root URL

The root URL to the API depends on the API Gateway's configuration and the deployment stage. For example: `https://wtfw2twm07.execute-api.us-east-1.amazonaws.com/people`

---