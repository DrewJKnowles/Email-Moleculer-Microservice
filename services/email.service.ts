"use strict";

// Moleculer Imports
import {Service, ServiceBroker, Context} from "moleculer";


//Local Imports
import nodemailer from "nodemailer";

export default class EmailService extends Service {

	public constructor(public broker: ServiceBroker) {
        super(broker);

        const message = {
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
				testEmail: {
					rest: {
						method: "GET",
						path: "/testEmail",
					},
					async handler(): Promise<string> {
						return this.testEmail(transporter, message);
					},
				},

                // The action for the email sending
				send: {
                    rest: 
                    {
                        method: "POST",
                        path: "/send",
                    },
					params: {
						name: "string",
					},
					async handler(ctx: Context<{name: string}>): Promise<string> {
						return 'Ayo this is the test send email';
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
