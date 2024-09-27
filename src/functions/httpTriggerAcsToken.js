"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpTriggerAcsToken = void 0;
const functions_1 = require("@azure/functions");
const communication_identity_1 = require("@azure/communication-identity");
function httpTriggerAcsToken(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get ACS connection string from local.settings.json (or App Settings when in Azure)
        const connectionString = process.env.ACS_CONNECTION_STRING;
        let tokenClient = new communication_identity_1.CommunicationIdentityClient(connectionString);
        const user = yield tokenClient.createUser();
        const userToken = yield tokenClient.getToken(user, ["voip"]);
        return {
            jsonBody: Object.assign({ userId: user.communicationUserId }, userToken)
        };
    });
}
exports.httpTriggerAcsToken = httpTriggerAcsToken;
functions_1.app.http('httpTriggerAcsToken', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpTriggerAcsToken
});
exports.default = httpTriggerAcsToken;
//# sourceMappingURL=httpTriggerAcsToken.js.map