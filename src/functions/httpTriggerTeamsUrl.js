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
exports.httpTriggerTeamsUrl = void 0;
const functions_1 = require("@azure/functions");
const graph_1 = require("../../Shared/graph");
let teamsMeetingLink;
function httpTriggerTeamsUrl(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = process.env.USER_ID;
        // const userId = '6e49b814-217a-49eb-b6cb-1298cb7fe981';
        context.log('UserId', userId);
        teamsMeetingLink = yield (0, graph_1.default)(userId);
        const body = JSON.stringify(teamsMeetingLink);
        const meeting = JSON.parse(body);
        context.log("meeting:", meeting);
        return {
            // status: 200, /* Defaults to 200 */
            body: meeting.onlineMeeting.joinUrl
        };
    });
}
exports.httpTriggerTeamsUrl = httpTriggerTeamsUrl;
;
functions_1.app.http('httpTriggerTeamsUrl', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpTriggerTeamsUrl
});
exports.default = httpTriggerTeamsUrl;
//# sourceMappingURL=httpTriggerTeamsUrl.js.map