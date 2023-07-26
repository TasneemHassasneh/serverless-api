import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "people";

export const handler = async (event) => {
  let body;
  let statusCode = 200;
  let headers = {
    "Content-Type": "application/json",
  };

  console.log(event.routeKey);

  try {
    switch (event.routeKey) {
      case "DELETE /people/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted people: ${event.pathParameters.id}`;
        statusCode = 204;
        break;

      case "GET /people":
        body = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = body.Items;
        break;

      case "GET /people/{id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = body.Item;
        break;

      case "PUT /people":
        const obj = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              id: "1",
              name: "tasneem",
              age: "24",
            },
          })
        );
        body = `PutCommand ${obj.id}`;
        break;
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
