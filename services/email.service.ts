"use strict";

// Moleculer Imports
import {Service, ServiceBroker, Context} from "moleculer";


//Local Imports

export default class EmailService extends Service {

	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "email",
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
