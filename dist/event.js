'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICalEventClass = exports.ICalEventTransparency = exports.ICalEventBusyStatus = exports.ICalEventStatus = void 0;
const uuid_random_1 = __importDefault(require("uuid-random"));
const tools_1 = require("./tools");
const attendee_1 = __importDefault(require("./attendee"));
const alarm_1 = __importDefault(require("./alarm"));
const category_1 = __importDefault(require("./category"));
const types_1 = require("./types");
var ICalEventStatus;
(function (ICalEventStatus) {
    ICalEventStatus["CONFIRMED"] = "CONFIRMED";
    ICalEventStatus["TENTATIVE"] = "TENTATIVE";
    ICalEventStatus["CANCELLED"] = "CANCELLED";
})(ICalEventStatus = exports.ICalEventStatus || (exports.ICalEventStatus = {}));
var ICalEventBusyStatus;
(function (ICalEventBusyStatus) {
    ICalEventBusyStatus["FREE"] = "FREE";
    ICalEventBusyStatus["TENTATIVE"] = "TENTATIVE";
    ICalEventBusyStatus["BUSY"] = "BUSY";
    ICalEventBusyStatus["OOF"] = "OOF";
})(ICalEventBusyStatus = exports.ICalEventBusyStatus || (exports.ICalEventBusyStatus = {}));
var ICalEventTransparency;
(function (ICalEventTransparency) {
    ICalEventTransparency["TRANSPARENT"] = "TRANSPARENT";
    ICalEventTransparency["OPAQUE"] = "OPAQUE";
})(ICalEventTransparency = exports.ICalEventTransparency || (exports.ICalEventTransparency = {}));
var ICalEventClass;
(function (ICalEventClass) {
    ICalEventClass["PUBLIC"] = "PUBLIC";
    ICalEventClass["PRIVATE"] = "PRIVATE";
    ICalEventClass["CONFIDENTIAL"] = "CONFIDENTIAL";
})(ICalEventClass = exports.ICalEventClass || (exports.ICalEventClass = {}));
/**
 * Usually you get an `ICalCalendar` object like this:
 * ```javascript
 * import ical from 'ical-generator';
 * const calendar = ical();
 * const event = calendar.createEvent();
 * ```
 */
class ICalEvent {
    /**
     * Constructor of [[`ICalEvent`]. The calendar reference is
     * required to query the calendar's timezone when required.
     *
     * @param data Calendar Event Data
     * @param calendar Reference to ICalCalendar object
     */
    constructor(data, calendar) {
        this.data = {
            id: (0, uuid_random_1.default)(),
            sequence: 0,
            start: null,
            end: null,
            recurrenceId: null,
            timezone: null,
            stamp: new Date(),
            allDay: false,
            floating: false,
            repeating: null,
            summary: '',
            location: null,
            description: null,
            organizer: null,
            attendees: [],
            alarms: [],
            categories: [],
            status: null,
            busystatus: null,
            priority: null,
            url: null,
            attachments: [],
            transparency: null,
            created: null,
            lastModified: null,
            class: null,
            x: []
        };
        this.calendar = calendar;
        if (!calendar) {
            throw new Error('`calendar` option required!');
        }
        data.id && this.id(data.id);
        data.sequence !== undefined && this.sequence(data.sequence);
        data.start && this.start(data.start);
        data.end !== undefined && this.end(data.end);
        data.recurrenceId !== undefined && this.recurrenceId(data.recurrenceId);
        data.timezone !== undefined && this.timezone(data.timezone);
        data.stamp !== undefined && this.stamp(data.stamp);
        data.allDay !== undefined && this.allDay(data.allDay);
        data.floating !== undefined && this.floating(data.floating);
        data.repeating !== undefined && this.repeating(data.repeating);
        data.summary !== undefined && this.summary(data.summary);
        data.location !== undefined && this.location(data.location);
        data.description !== undefined && this.description(data.description);
        data.organizer !== undefined && this.organizer(data.organizer);
        data.attendees !== undefined && this.attendees(data.attendees);
        data.alarms !== undefined && this.alarms(data.alarms);
        data.categories !== undefined && this.categories(data.categories);
        data.status !== undefined && this.status(data.status);
        data.busystatus !== undefined && this.busystatus(data.busystatus);
        data.priority !== undefined && this.priority(data.priority);
        data.url !== undefined && this.url(data.url);
        data.attachments !== undefined && this.attachments(data.attachments);
        data.transparency !== undefined && this.transparency(data.transparency);
        data.created !== undefined && this.created(data.created);
        data.lastModified !== undefined && this.lastModified(data.lastModified);
        data.class !== undefined && this.class(data.class);
        data.x !== undefined && this.x(data.x);
    }
    id(id) {
        if (id === undefined) {
            return this.data.id;
        }
        this.data.id = String(id);
        return this;
    }
    uid(id) {
        return id === undefined ? this.id() : this.id(id);
    }
    sequence(sequence) {
        if (sequence === undefined) {
            return this.data.sequence;
        }
        const s = parseInt(String(sequence), 10);
        if (isNaN(s)) {
            throw new Error('`sequence` must be a number!');
        }
        this.data.sequence = sequence;
        return this;
    }
    start(start) {
        if (start === undefined) {
            return this.data.start;
        }
        this.data.start = (0, tools_1.checkDate)(start, 'start');
        if (this.data.start && this.data.end && (0, tools_1.toDate)(this.data.start).getTime() > (0, tools_1.toDate)(this.data.end).getTime()) {
            const t = this.data.start;
            this.data.start = this.data.end;
            this.data.end = t;
        }
        return this;
    }
    end(end) {
        if (end === undefined) {
            return this.data.end;
        }
        if (end === null) {
            this.data.end = null;
            return this;
        }
        this.data.end = (0, tools_1.checkDate)(end, 'end');
        if (this.data.start && this.data.end && (0, tools_1.toDate)(this.data.start).getTime() > (0, tools_1.toDate)(this.data.end).getTime()) {
            const t = this.data.start;
            this.data.start = this.data.end;
            this.data.end = t;
        }
        return this;
    }
    recurrenceId(recurrenceId) {
        if (recurrenceId === undefined) {
            return this.data.recurrenceId;
        }
        if (recurrenceId === null) {
            this.data.recurrenceId = null;
            return this;
        }
        this.data.recurrenceId = (0, tools_1.checkDate)(recurrenceId, 'recurrenceId');
        return this;
    }
    timezone(timezone) {
        if (timezone === undefined && this.data.timezone !== null) {
            return this.data.timezone;
        }
        if (timezone === undefined) {
            return this.calendar.timezone();
        }
        this.data.timezone = timezone && timezone !== 'UTC' ? timezone.toString() : null;
        if (this.data.timezone) {
            this.data.floating = false;
        }
        return this;
    }
    stamp(stamp) {
        if (stamp === undefined) {
            return this.data.stamp;
        }
        this.data.stamp = (0, tools_1.checkDate)(stamp, 'stamp');
        return this;
    }
    timestamp(stamp) {
        if (stamp === undefined) {
            return this.stamp();
        }
        return this.stamp(stamp);
    }
    allDay(allDay) {
        if (allDay === undefined) {
            return this.data.allDay;
        }
        this.data.allDay = Boolean(allDay);
        return this;
    }
    /**
     * Set the event's floating flag. This unsets the event's timezone.
     * Events whose floating flag is set to true always take place at the
     * same time, regardless of the time zone.
     *
     * @since 0.2.0
     */
    floating(floating) {
        if (floating === undefined) {
            return this.data.floating;
        }
        this.data.floating = Boolean(floating);
        if (this.data.floating) {
            this.data.timezone = null;
        }
        return this;
    }
    repeating(repeating) {
        if (repeating === undefined) {
            return this.data.repeating;
        }
        if (!repeating) {
            this.data.repeating = null;
            return this;
        }
        if ((0, tools_1.isRRule)(repeating) || typeof repeating === 'string') {
            this.data.repeating = repeating;
            return this;
        }
        this.data.repeating = {
            freq: (0, tools_1.checkEnum)(types_1.ICalEventRepeatingFreq, repeating.freq)
        };
        if (repeating.count) {
            if (!isFinite(repeating.count)) {
                throw new Error('`repeating.count` must be a finite number!');
            }
            this.data.repeating.count = repeating.count;
        }
        if (repeating.interval) {
            if (!isFinite(repeating.interval)) {
                throw new Error('`repeating.interval` must be a finite number!');
            }
            this.data.repeating.interval = repeating.interval;
        }
        if (repeating.until !== undefined) {
            this.data.repeating.until = (0, tools_1.checkDate)(repeating.until, 'repeating.until');
        }
        if (repeating.byDay) {
            const byDayArray = Array.isArray(repeating.byDay) ? repeating.byDay : [repeating.byDay];
            this.data.repeating.byDay = byDayArray.map(day => (0, tools_1.checkEnum)(types_1.ICalWeekday, day));
        }
        if (repeating.byMonth) {
            const byMonthArray = Array.isArray(repeating.byMonth) ? repeating.byMonth : [repeating.byMonth];
            this.data.repeating.byMonth = byMonthArray.map(month => {
                if (typeof month !== 'number' || month < 1 || month > 12) {
                    throw new Error('`repeating.byMonth` contains invalid value `' + month + '`!');
                }
                return month;
            });
        }
        if (repeating.byMonthDay) {
            const byMonthDayArray = Array.isArray(repeating.byMonthDay) ? repeating.byMonthDay : [repeating.byMonthDay];
            this.data.repeating.byMonthDay = byMonthDayArray.map(monthDay => {
                if (typeof monthDay !== 'number' || monthDay < -31 || monthDay > 31 || monthDay === 0) {
                    throw new Error('`repeating.byMonthDay` contains invalid value `' + monthDay + '`!');
                }
                return monthDay;
            });
        }
        if (repeating.bySetPos) {
            if (!this.data.repeating.byDay) {
                throw '`repeating.bySetPos` must be used along with `repeating.byDay`!';
            }
            const bySetPosArray = Array.isArray(repeating.bySetPos) ? repeating.bySetPos : [repeating.bySetPos];
            this.data.repeating.bySetPos = bySetPosArray.map(bySetPos => {
                if (typeof bySetPos !== 'number' || bySetPos < -366 || bySetPos > 366 || bySetPos === 0) {
                    throw '`repeating.bySetPos` contains invalid value `' + bySetPos + '`!';
                }
                return bySetPos;
            });
        }
        if (repeating.exclude) {
            const excludeArray = Array.isArray(repeating.exclude) ? repeating.exclude : [repeating.exclude];
            this.data.repeating.exclude = excludeArray.map((exclude, i) => {
                return (0, tools_1.checkDate)(exclude, `repeating.exclude[${i}]`);
            });
        }
        if (repeating.startOfWeek) {
            this.data.repeating.startOfWeek = (0, tools_1.checkEnum)(types_1.ICalWeekday, repeating.startOfWeek);
        }
        return this;
    }
    summary(summary) {
        if (summary === undefined) {
            return this.data.summary;
        }
        this.data.summary = summary ? String(summary) : '';
        return this;
    }
    location(location) {
        if (location === undefined) {
            return this.data.location;
        }
        if (typeof location === 'string') {
            this.data.location = {
                title: location
            };
            return this;
        }
        if ((location && !location.title) ||
            ((location === null || location === void 0 ? void 0 : location.geo) && (!isFinite(location.geo.lat) || !isFinite(location.geo.lon)))) {
            throw new Error('`location` isn\'t formatted correctly. See https://sebbo2002.github.io/ical-generator/' +
                'develop/reference/classes/ICalEvent.html#location');
        }
        this.data.location = location || null;
        return this;
    }
    description(description) {
        if (description === undefined) {
            return this.data.description;
        }
        if (description === null) {
            this.data.description = null;
            return this;
        }
        if (typeof description === 'string') {
            this.data.description = { plain: description };
        }
        else {
            this.data.description = description;
        }
        return this;
    }
    organizer(organizer) {
        if (organizer === undefined) {
            return this.data.organizer;
        }
        if (organizer === null) {
            this.data.organizer = null;
            return this;
        }
        this.data.organizer = (0, tools_1.checkNameAndMail)('organizer', organizer);
        return this;
    }
    /**
     * Creates a new [[`ICalAttendee`]] and returns it. Use options to prefill
     * the attendee's attributes. Calling this method without options will create
     * an empty attendee.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const attendee = event.createAttendee({email: 'hui@example.com', name: 'Hui'});
     *
     * // add another attendee
     * event.createAttendee('Buh <buh@example.net>');
     * ```
     *
     * As with the organizer, you can also add an explicit `mailto` address.
     *
     * ```javascript
     * event.createAttendee({email: 'hui@example.com', name: 'Hui', mailto: 'another@mailto.com'});
     *
     * // overwrite an attendee's mailto address
     * attendee.mailto('another@mailto.net');
     * ```
     *
     * @since 0.2.0
     */
    createAttendee(data = {}) {
        if (data instanceof attendee_1.default) {
            this.data.attendees.push(data);
            return data;
        }
        if (typeof data === 'string') {
            data = (0, tools_1.checkNameAndMail)('data', data);
        }
        const attendee = new attendee_1.default(data, this);
        this.data.attendees.push(attendee);
        return attendee;
    }
    attendees(attendees) {
        if (!attendees) {
            return this.data.attendees;
        }
        attendees.forEach(attendee => this.createAttendee(attendee));
        return this;
    }
    /**
     * Creates a new [[`ICalAlarm`]] and returns it. Use options to prefill
     * the alarm's attributes. Calling this method without options will create
     * an empty alarm.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const alarm = event.createAlarm({type: ICalAlarmType.display, trigger: 300});
     *
     * // add another alarm
     * event.createAlarm({
     *     type: ICalAlarmType.audio,
     *     trigger: 300, // 5min before event
     * });
     * ```
     *
     * @since 0.2.1
     */
    createAlarm(data = {}) {
        const alarm = data instanceof alarm_1.default ? data : new alarm_1.default(data, this);
        this.data.alarms.push(alarm);
        return alarm;
    }
    alarms(alarms) {
        if (!alarms) {
            return this.data.alarms;
        }
        alarms.forEach((alarm) => this.createAlarm(alarm));
        return this;
    }
    /**
     * Creates a new [[`ICalCategory`]] and returns it. Use options to prefill the categories' attributes.
     * Calling this method without options will create an empty category.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const category = event.createCategory({name: 'APPOINTMENT'});
     *
     * // add another alarm
     * event.createCategory({
     *     name: 'MEETING'
     * });
     * ```
     *
     * @since 0.3.0
     */
    createCategory(data = {}) {
        const category = data instanceof category_1.default ? data : new category_1.default(data);
        this.data.categories.push(category);
        return category;
    }
    categories(categories) {
        if (!categories) {
            return this.data.categories;
        }
        categories.forEach(category => this.createCategory(category));
        return this;
    }
    status(status) {
        if (status === undefined) {
            return this.data.status;
        }
        if (status === null) {
            this.data.status = null;
            return this;
        }
        this.data.status = (0, tools_1.checkEnum)(ICalEventStatus, status);
        return this;
    }
    busystatus(busystatus) {
        if (busystatus === undefined) {
            return this.data.busystatus;
        }
        if (busystatus === null) {
            this.data.busystatus = null;
            return this;
        }
        this.data.busystatus = (0, tools_1.checkEnum)(ICalEventBusyStatus, busystatus);
        return this;
    }
    priority(priority) {
        if (priority === undefined) {
            return this.data.priority;
        }
        if (priority === null) {
            this.data.priority = null;
            return this;
        }
        if (priority < 0 || priority > 9) {
            throw new Error('`priority` is invalid, musst be 0 ≤ priority ≤ 9.');
        }
        this.data.priority = Math.round(priority);
        return this;
    }
    url(url) {
        if (url === undefined) {
            return this.data.url;
        }
        this.data.url = url ? String(url) : null;
        return this;
    }
    /**
     * Adds an attachment to the event by adding the file URL to the calendar.
     *
     * `ical-generator` only supports external attachments. File attachments that
     * are directly included in the file are not supported, because otherwise the
     * calendar file could easily become unfavourably large.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * event.createAttachment('https://files.sebbo.net/calendar/attachments/foo');
     * ```
     *
     * @since 3.2.0-develop.1
     */
    createAttachment(url) {
        this.data.attachments.push(url);
        return this;
    }
    attachments(attachments) {
        if (!attachments) {
            return this.data.attachments;
        }
        attachments.forEach((attachment) => this.createAttachment(attachment));
        return this;
    }
    transparency(transparency) {
        if (transparency === undefined) {
            return this.data.transparency;
        }
        if (!transparency) {
            this.data.transparency = null;
            return this;
        }
        this.data.transparency = (0, tools_1.checkEnum)(ICalEventTransparency, transparency);
        return this;
    }
    created(created) {
        if (created === undefined) {
            return this.data.created;
        }
        if (created === null) {
            this.data.created = null;
            return this;
        }
        this.data.created = (0, tools_1.checkDate)(created, 'created');
        return this;
    }
    lastModified(lastModified) {
        if (lastModified === undefined) {
            return this.data.lastModified;
        }
        if (lastModified === null) {
            this.data.lastModified = null;
            return this;
        }
        this.data.lastModified = (0, tools_1.checkDate)(lastModified, 'lastModified');
        return this;
    }
    class(class_) {
        if (class_ === undefined) {
            return this.data.class;
        }
        if (class_ === null) {
            this.data.class = null;
            return this;
        }
        this.data.class = (0, tools_1.checkEnum)(ICalEventClass, class_);
        return this;
    }
    x(keyOrArray, value) {
        if (keyOrArray === undefined) {
            return (0, tools_1.addOrGetCustomAttributes)(this.data);
        }
        if (typeof keyOrArray === 'string' && typeof value === 'string') {
            (0, tools_1.addOrGetCustomAttributes)(this.data, keyOrArray, value);
        }
        if (typeof keyOrArray === 'object') {
            (0, tools_1.addOrGetCustomAttributes)(this.data, keyOrArray);
        }
        return this;
    }
    /**
     * Return a shallow copy of the events's options for JSON stringification.
     * Third party objects like moment.js values or RRule objects are stringified
     * as well. Can be used for persistence.
     *
     * ```javascript
     * const event = ical().createEvent();
     * const json = JSON.stringify(event);
     *
     * // later: restore event data
     * const calendar = ical().createEvent(JSON.parse(json));
     * ```
     *
     * @since 0.2.4
     */
    toJSON() {
        var _a;
        let repeating = null;
        if ((0, tools_1.isRRule)(this.data.repeating) || typeof this.data.repeating === 'string') {
            repeating = this.data.repeating.toString();
        }
        else if (this.data.repeating) {
            repeating = Object.assign({}, this.data.repeating, {
                until: (0, tools_1.toJSON)(this.data.repeating.until),
                exclude: (_a = this.data.repeating.exclude) === null || _a === void 0 ? void 0 : _a.map(d => (0, tools_1.toJSON)(d)),
            });
        }
        return Object.assign({}, this.data, {
            start: (0, tools_1.toJSON)(this.data.start) || null,
            end: (0, tools_1.toJSON)(this.data.end) || null,
            recurrenceId: (0, tools_1.toJSON)(this.data.recurrenceId) || null,
            stamp: (0, tools_1.toJSON)(this.data.stamp) || null,
            created: (0, tools_1.toJSON)(this.data.created) || null,
            lastModified: (0, tools_1.toJSON)(this.data.lastModified) || null,
            repeating,
            x: this.x()
        });
    }
    /**
     * Return generated event as a string.
     *
     * ```javascript
     * const event = ical().createEvent();
     * console.log(event.toString()); // → BEGIN:VEVENT…
     * ```
     */
    toString() {
        var _a, _b, _c, _d, _e;
        let g = '';
        if (!this.data.start) {
            throw new Error('No value for `start` in ICalEvent #' + this.data.id + ' given!');
        }
        // DATE & TIME
        g += 'BEGIN:VEVENT\r\n';
        g += 'UID:' + this.data.id + '\r\n';
        // SEQUENCE
        g += 'SEQUENCE:' + this.data.sequence + '\r\n';
        g += 'DTSTAMP:' + (0, tools_1.formatDate)(this.calendar.timezone(), this.data.stamp) + '\r\n';
        if (this.data.allDay) {
            g += 'DTSTART;VALUE=DATE:' + (0, tools_1.formatDate)(this.calendar.timezone(), this.data.start, true) + '\r\n';
            if (this.data.end) {
                g += 'DTEND;VALUE=DATE:' + (0, tools_1.formatDate)(this.calendar.timezone(), this.data.end, true) + '\r\n';
            }
            g += 'X-MICROSOFT-CDO-ALLDAYEVENT:TRUE\r\n';
            g += 'X-MICROSOFT-MSNCALENDAR-ALLDAYEVENT:TRUE\r\n';
        }
        else {
            g += (0, tools_1.formatDateTZ)(this.timezone(), 'DTSTART', this.data.start, this.data) + '\r\n';
            if (this.data.end) {
                g += (0, tools_1.formatDateTZ)(this.timezone(), 'DTEND', this.data.end, this.data) + '\r\n';
            }
        }
        // REPEATING
        if ((0, tools_1.isRRule)(this.data.repeating) || typeof this.data.repeating === 'string') {
            g += this.data.repeating
                .toString()
                .replace(/\r\n/g, '\n')
                .split('\n')
                .filter(l => l && !l.startsWith('DTSTART:'))
                .join('\r\n') + '\r\n';
        }
        else if (this.data.repeating) {
            g += 'RRULE:FREQ=' + this.data.repeating.freq;
            if (this.data.repeating.count) {
                g += ';COUNT=' + this.data.repeating.count;
            }
            if (this.data.repeating.interval) {
                g += ';INTERVAL=' + this.data.repeating.interval;
            }
            if (this.data.repeating.until) {
                g += ';UNTIL=' + (0, tools_1.formatDate)(this.calendar.timezone(), this.data.repeating.until);
            }
            if (this.data.repeating.byDay) {
                g += ';BYDAY=' + this.data.repeating.byDay.join(',');
            }
            if (this.data.repeating.byMonth) {
                g += ';BYMONTH=' + this.data.repeating.byMonth.join(',');
            }
            if (this.data.repeating.byMonthDay) {
                g += ';BYMONTHDAY=' + this.data.repeating.byMonthDay.join(',');
            }
            if (this.data.repeating.bySetPos) {
                g += ';BYSETPOS=' + this.data.repeating.bySetPos.join(',');
            }
            if (this.data.repeating.startOfWeek) {
                g += ';WKST=' + this.data.repeating.startOfWeek;
            }
            g += '\r\n';
            // REPEATING EXCLUSION
            if (this.data.repeating.exclude) {
                if (this.data.allDay) {
                    g += 'EXDATE;VALUE=DATE:' + this.data.repeating.exclude.map(excludedDate => {
                        return (0, tools_1.formatDate)(this.calendar.timezone(), excludedDate, true);
                    }).join(',') + '\r\n';
                }
                else {
                    g += 'EXDATE';
                    if (this.timezone()) {
                        g += ';TZID=' + this.timezone() + ':' + this.data.repeating.exclude.map(excludedDate => {
                            // This isn't a 'floating' event because it has a timezone;
                            // but we use it to omit the 'Z' UTC specifier in formatDate()
                            return (0, tools_1.formatDate)(this.timezone(), excludedDate, false, true);
                        }).join(',') + '\r\n';
                    }
                    else {
                        g += ':' + this.data.repeating.exclude.map(excludedDate => {
                            return (0, tools_1.formatDate)(this.timezone(), excludedDate);
                        }).join(',') + '\r\n';
                    }
                }
            }
        }
        // RECURRENCE
        if (this.data.recurrenceId) {
            g += (0, tools_1.formatDateTZ)(this.timezone(), 'RECURRENCE-ID', this.data.recurrenceId, this.data) + '\r\n';
        }
        // SUMMARY
        g += 'SUMMARY:' + (0, tools_1.escape)(this.data.summary, false) + '\r\n';
        // TRANSPARENCY
        if (this.data.transparency) {
            g += 'TRANSP:' + (0, tools_1.escape)(this.data.transparency, false) + '\r\n';
        }
        // LOCATION
        if ((_a = this.data.location) === null || _a === void 0 ? void 0 : _a.title) {
            g += 'LOCATION:' + (0, tools_1.escape)(this.data.location.title +
                (this.data.location.address ? '\n' + this.data.location.address : ''), false) + '\r\n';
            if (this.data.location.radius && this.data.location.geo) {
                g += 'X-APPLE-STRUCTURED-LOCATION;VALUE=URI;' +
                    (this.data.location.address ? 'X-ADDRESS=' + (0, tools_1.escape)(this.data.location.address, false) + ';' : '') +
                    'X-APPLE-RADIUS=' + (0, tools_1.escape)(this.data.location.radius, false) + ';' +
                    'X-TITLE=' + (0, tools_1.escape)(this.data.location.title, false) +
                    ':geo:' + (0, tools_1.escape)((_b = this.data.location.geo) === null || _b === void 0 ? void 0 : _b.lat, false) + ',' +
                    (0, tools_1.escape)((_c = this.data.location.geo) === null || _c === void 0 ? void 0 : _c.lon, false) + '\r\n';
            }
            if (this.data.location.geo) {
                g += 'GEO:' + (0, tools_1.escape)((_d = this.data.location.geo) === null || _d === void 0 ? void 0 : _d.lat, false) + ';' +
                    (0, tools_1.escape)((_e = this.data.location.geo) === null || _e === void 0 ? void 0 : _e.lon, false) + '\r\n';
            }
        }
        // DESCRIPTION
        if (this.data.description) {
            g += 'DESCRIPTION:' + (0, tools_1.escape)(this.data.description.plain, false) + '\r\n';
            // HTML DESCRIPTION
            if (this.data.description.html) {
                g += 'X-ALT-DESC;FMTTYPE=text/html:' + (0, tools_1.escape)(this.data.description.html, false) + '\r\n';
            }
        }
        // ORGANIZER
        if (this.data.organizer) {
            g += 'ORGANIZER;CN="' + (0, tools_1.escape)(this.data.organizer.name, true) + '"';
            if (this.data.organizer.sentBy) {
                g += ';SENT-BY="mailto:' + (0, tools_1.escape)(this.data.organizer.sentBy, true) + '"';
            }
            if (this.data.organizer.email && this.data.organizer.mailto) {
                g += ';EMAIL=' + (0, tools_1.escape)(this.data.organizer.email, false);
            }
            if (this.data.organizer.email) {
                g += ':mailto:' + (0, tools_1.escape)(this.data.organizer.mailto || this.data.organizer.email, false);
            }
            g += '\r\n';
        }
        // ATTENDEES
        this.data.attendees.forEach(function (attendee) {
            g += attendee.toString();
        });
        // ALARMS
        this.data.alarms.forEach(function (alarm) {
            g += alarm.toString();
        });
        // CATEGORIES
        if (this.data.categories.length > 0) {
            g += 'CATEGORIES:' + this.data.categories.map(function (category) {
                return category.toString();
            }).join() + '\r\n';
        }
        // URL
        if (this.data.url) {
            g += 'URL;VALUE=URI:' + (0, tools_1.escape)(this.data.url, false) + '\r\n';
        }
        // ATTACHMENT
        if (this.data.attachments.length > 0) {
            this.data.attachments.forEach(url => {
                g += 'ATTACH:' + (0, tools_1.escape)(url, false) + '\r\n';
            });
        }
        // STATUS
        if (this.data.status) {
            g += 'STATUS:' + this.data.status.toUpperCase() + '\r\n';
        }
        // BUSYSTATUS
        if (this.data.busystatus) {
            g += 'X-MICROSOFT-CDO-BUSYSTATUS:' + this.data.busystatus.toUpperCase() + '\r\n';
        }
        // PRIORITY
        if (this.data.priority !== null) {
            g += 'PRIORITY:' + this.data.priority + '\r\n';
        }
        // CUSTOM X ATTRIBUTES
        g += (0, tools_1.generateCustomAttributes)(this.data);
        // CREATED
        if (this.data.created) {
            g += 'CREATED:' + (0, tools_1.formatDate)(this.calendar.timezone(), this.data.created) + '\r\n';
        }
        // LAST-MODIFIED
        if (this.data.lastModified) {
            g += 'LAST-MODIFIED:' + (0, tools_1.formatDate)(this.calendar.timezone(), this.data.lastModified) + '\r\n';
        }
        if (this.data.class) {
            g += 'CLASS:' + this.data.class.toUpperCase() + '\r\n';
        }
        g += 'END:VEVENT\r\n';
        return g;
    }
}
exports.default = ICalEvent;
//# sourceMappingURL=event.js.map