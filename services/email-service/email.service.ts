import {IncomingMessage} from "http";
import {Service, ServiceBroker, Context} from "moleculer";
import ApiGateway from "moleculer-web";

export default class EmailService extends Service {

    public constructor(broker: ServiceBroker){
        super(broker);
    }
}