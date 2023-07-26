import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = 'people';

export const handler = async (event) => {
  let body;
  let statusCode = 200;
  let headers = {
    'Content-Type': 'application/json',
  };

  try {
    const newItem = JSON.parse(event.body);
    const putParams = {
      TableName: tableName,
      Item: newItem,
    };

    await dynamo.send(new PutCommand(putParams));

    body = JSON.stringify(newItem);
  } catch (error) {
    statusCode = 500;
    body = JSON.stringify({ error: 'Internal Server Error' });
  }

  return {
    statusCode,
    body,
    headers,
  };
};
