"use strict";

// Moleculer Imports
import {Service, ServiceBroker, Context} from "moleculer";


//Local Imports
import nodemailer from "nodemailer";

export default class EmailService extends Service {

	public constructor(public broker: ServiceBroker) {
        super(broker);

        let transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth:{
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                }
            }
        );

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
						return this.testEmail();
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
	public testEmail(): string {
		return "Hello Moleculer";
	}
}
