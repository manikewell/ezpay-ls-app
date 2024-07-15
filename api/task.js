import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
import { fromIni } from "@aws-sdk/credential-providers";

//const client = new DynamoDBClient({ region: "ap-southeast-2" });
//const docClient = DynamoDBDocumentClient.from(client);

/*AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});*/

/*const client = new DynamoDBClient({
  region: process.env.AWS_DEFAULT_REGION,
  credentials:{
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken:process.env.AWS_SESSION_TOKEN
}
});
const docClient = DynamoDBDocumentClient.from(client);*/

//const docClient = new AWS.DynamoDB.DocumentClient()

// Use this code if you need named profiles
const client = new DynamoDBClient({
  credentials: fromIni({ profile: "AdministratorAccess-891376980636" }),
  region: "ap-southeast-2",
});

const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name, completed",
    TableName: "Tasks",
  });
  const response = await docClient.send(command);

  return response;
};

export const createTasks = async (name, completed) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Tasks",
    Item: {
      id: uuid,
      name,
      completed,
    },
  });
  const response = await docClient.send(command);
  console.log("malakian api taskjs createTasks 1 response:", response);

  return response;
};

export const updateTasks = async (id, name, completed) => {
  const command = new UpdateCommand({
    TableName: "Tasks",
    Key: {
      id,
    },
    ExpressionAttributeNames: {
      "#name": "name",
    },
    UpdateExpression: "set #name = :n, completed = :c ",
    ExpressionAttributeValues: {
      ":n": name,
      ":c": completed,
    },
    ReturnValues: "ALL_NEW",
  });
  const response = await docClient.send(command);

  return response;
};

export const deleteTasks = async (id) => {
  const command = new DeleteCommand({
    TableName: "Tasks",
    Key: {
      id,
    },
  });
  const response = await docClient.send(command);

  return response;
};
