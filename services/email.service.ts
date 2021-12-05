"use strict";

// THIRD PARTY Imports
import {Service, ServiceBroker, Context} from "moleculer";
import nodemailer from "nodemailer";
const Handlebars = require("handlebars");


Handlebars.compile('../emailTemplates/email-order-success.html')

//Local Imports
import { EmailMessage } from "./email.type";

export default class EmailService extends Service {

	public constructor(public broker: ServiceBroker) {
        super(broker);

        const message: EmailMessage = {
            from: "testEmail@email.com",
            to: "testEmail@email.com",
            subject: "Subject",
            html: "<h1>Hello SMTP Email</h1>"
        }

        let transporter = nodemailer.createTransport(
            {
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                }
            });


		this.parseServiceSchema({
            name: "email",
            settings: {

            },
			actions:{
                // The action for the email sending
				send: {
                    rest: 
                    {
                        method: "POST",
                        path: "/send",
                    },
					params: {
						emailAddress: "string",
					},
					async handler(ctx: Context<{emailAddress: string, subject: string}>): Promise<string> {
                        console.log(ctx.params.emailAddress + ' ' + ctx.params.subject);
                        return this.testEmail(transporter, message);
					},
				},
			},
		});
	}

	// Actions
	public testEmail(transporter?: any, message?: any): void {
    transporter.sendMail(message);
    }
}
