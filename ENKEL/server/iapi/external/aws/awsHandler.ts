import AWS from "aws-sdk";
import { UserLogin } from "../../../../STRUDAL/entity/UserLogin.js";
import { EntityApiResponse } from "../../apiResponse.js";

export class AWSHandler {
  constructor() {
    AWS.config = new AWS.Config({
      credentials: AWS.config.credentials,
      region: "eu-west-2",
    });
  }

  async createTemplate(template: AWS.SES.Template, update: boolean): Promise<EntityApiResponse> {
    const response = new EntityApiResponse();

    const ses = new AWS.SES({
      credentials: AWS.config.credentials,
      region: "eu-west-2",
    });
    try {
      if (update) {
        await ses.updateTemplate({ Template: template }).promise();
      } else {
        await ses.createTemplate({ Template: template }).promise();
      }
    } catch (err) {
      console.log("Failed to create template", err);
      response.success = false;
      response.errorMessage = err;
    }

    return response;
  }

  async sendEmail(
    templateName: string,
    recipient: UserLogin,
    emailData: { [key: string]: string }
  ): Promise<EntityApiResponse> {
    const response = new EntityApiResponse();

    const ses = new AWS.SES();
    try {
      const templateData = JSON.stringify({ name: recipient.fullName, ...emailData });
      await ses
        .sendTemplatedEmail({
          Template: templateName,
          TemplateData: templateData,
          Source: '"Beat The Bot" <notifications@beatthebot.co.uk>',
          Destination: { ToAddresses: [recipient.emailAddress] },
        })
        .promise();
    } catch (err) {
      console.log("Failed to send templated email", err);
      response.success = false;
      response.errorMessage = err;
    }

    return response;
  }
}
