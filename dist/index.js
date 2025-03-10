/**
 * ical-generator entrypoint
 */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foldLines = exports.escape = exports.formatDateTZ = exports.formatDate = exports.ICalWeekday = exports.ICalEventRepeatingFreq = exports.ICalEventClass = exports.ICalEventTransparency = exports.ICalEventBusyStatus = exports.ICalEventStatus = exports.ICalEvent = exports.ICalCategory = exports.ICalCalendarMethod = exports.ICalCalendar = exports.ICalAttendeeStatus = exports.ICalAttendeeRole = exports.ICalAttendeeType = exports.ICalAttendee = exports.ICalAlarmType = exports.ICalAlarm = void 0;
const calendar_1 = __importDefault(require("./calendar"));
/**
 * Create a new, empty calendar and returns it.
 *
 * ```javascript
 * import ical from 'ical-generator';
 *
 * // or use require:
 * // const ical = require('ical-generator');
 *
 * const cal = ical();
 * ```
 *
 * You can pass options to setup your calendar or use setters to do this.
 *
 * ```javascript
 * import ical from 'ical-generator';
 *
 * // or use require:
 * // const ical = require('ical-generator');
 * const cal = ical({domain: 'sebbo.net'});
 *
 * // is the same as
 *
 * const cal = ical().domain('sebbo.net');
 *
 * // is the same as
 *
 * const cal = ical();
 * cal.domain('sebbo.net');
 * ```
 *
 * @param data Calendar data
 */
function ical(data) {
    return new calendar_1.default(data);
}
exports.default = ical;
var alarm_1 = require("./alarm");
Object.defineProperty(exports, "ICalAlarm", { enumerable: true, get: function () { return __importDefault(alarm_1).default; } });
Object.defineProperty(exports, "ICalAlarmType", { enumerable: true, get: function () { return alarm_1.ICalAlarmType; } });
var attendee_1 = require("./attendee");
Object.defineProperty(exports, "ICalAttendee", { enumerable: true, get: function () { return __importDefault(attendee_1).default; } });
Object.defineProperty(exports, "ICalAttendeeType", { enumerable: true, get: function () { return attendee_1.ICalAttendeeType; } });
Object.defineProperty(exports, "ICalAttendeeRole", { enumerable: true, get: function () { return attendee_1.ICalAttendeeRole; } });
Object.defineProperty(exports, "ICalAttendeeStatus", { enumerable: true, get: function () { return attendee_1.ICalAttendeeStatus; } });
var calendar_2 = require("./calendar");
Object.defineProperty(exports, "ICalCalendar", { enumerable: true, get: function () { return __importDefault(calendar_2).default; } });
Object.defineProperty(exports, "ICalCalendarMethod", { enumerable: true, get: function () { return calendar_2.ICalCalendarMethod; } });
var category_1 = require("./category");
Object.defineProperty(exports, "ICalCategory", { enumerable: true, get: function () { return __importDefault(category_1).default; } });
var event_1 = require("./event");
Object.defineProperty(exports, "ICalEvent", { enumerable: true, get: function () { return __importDefault(event_1).default; } });
Object.defineProperty(exports, "ICalEventStatus", { enumerable: true, get: function () { return event_1.ICalEventStatus; } });
Object.defineProperty(exports, "ICalEventBusyStatus", { enumerable: true, get: function () { return event_1.ICalEventBusyStatus; } });
Object.defineProperty(exports, "ICalEventTransparency", { enumerable: true, get: function () { return event_1.ICalEventTransparency; } });
Object.defineProperty(exports, "ICalEventClass", { enumerable: true, get: function () { return event_1.ICalEventClass; } });
var types_1 = require("./types");
Object.defineProperty(exports, "ICalEventRepeatingFreq", { enumerable: true, get: function () { return types_1.ICalEventRepeatingFreq; } });
Object.defineProperty(exports, "ICalWeekday", { enumerable: true, get: function () { return types_1.ICalWeekday; } });
var tools_1 = require("./tools");
Object.defineProperty(exports, "formatDate", { enumerable: true, get: function () { return tools_1.formatDate; } });
Object.defineProperty(exports, "formatDateTZ", { enumerable: true, get: function () { return tools_1.formatDateTZ; } });
Object.defineProperty(exports, "escape", { enumerable: true, get: function () { return tools_1.escape; } });
Object.defineProperty(exports, "foldLines", { enumerable: true, get: function () { return tools_1.foldLines; } });
/* istanbul ignore else */
if (typeof module !== 'undefined') {
    module.exports = Object.assign(ical, module.exports);
}
//# sourceMappingURL=index.js.map