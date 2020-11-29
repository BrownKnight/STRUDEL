import AWS from "aws-sdk";
import { EntityApiResponse } from "../../apiResponse.js";

export class AWSHandler {
  constructor() {
    new AWS.Config({
      credentials: AWS.config.credentials,
      region: "eu-west-2",
    });
  }

  async createTemplate(template: AWS.SES.Template): Promise<EntityApiResponse> {
    const response = new EntityApiResponse();

    const ses = new AWS.SES();
    try {
      await ses.createTemplate({ Template: template }).promise();
    } catch (err) {
      console.log("Failed to create template", err);
      response.success = false;
      response.errorMessage = err;
    }

    return response;
  }
}
