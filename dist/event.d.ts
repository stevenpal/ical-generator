import ICalAttendee, { ICalAttendeeData } from './attendee';
import ICalAlarm, { ICalAlarmData } from './alarm';
import ICalCategory, { ICalCategoryData } from './category';
import ICalCalendar from './calendar';
import { ICalDateTimeValue, ICalDescription, ICalEventRepeatingFreq, ICalLocation, ICalOrganizer, ICalRepeatingOptions, ICalRRuleStub, ICalWeekday } from './types';
export declare enum ICalEventStatus {
    CONFIRMED = "CONFIRMED",
    TENTATIVE = "TENTATIVE",
    CANCELLED = "CANCELLED"
}
export declare enum ICalEventBusyStatus {
    FREE = "FREE",
    TENTATIVE = "TENTATIVE",
    BUSY = "BUSY",
    OOF = "OOF"
}
export declare enum ICalEventTransparency {
    TRANSPARENT = "TRANSPARENT",
    OPAQUE = "OPAQUE"
}
export declare enum ICalEventClass {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    CONFIDENTIAL = "CONFIDENTIAL"
}
export interface ICalEventData {
    id?: string | number | null;
    sequence?: number;
    start?: ICalDateTimeValue | null;
    end?: ICalDateTimeValue | null;
    recurrenceId?: ICalDateTimeValue | null;
    timezone?: string | null;
    stamp?: ICalDateTimeValue;
    allDay?: boolean;
    floating?: boolean;
    repeating?: ICalRepeatingOptions | ICalRRuleStub | string | null;
    summary?: string;
    location?: ICalLocation | string | null;
    description?: ICalDescription | string | null;
    organizer?: ICalOrganizer | string | null;
    attendees?: ICalAttendee[] | ICalAttendeeData[];
    alarms?: ICalAlarm[] | ICalAlarmData[];
    categories?: ICalCategory[] | ICalCategoryData[];
    status?: ICalEventStatus | null;
    busystatus?: ICalEventBusyStatus | null;
    priority?: number | null;
    url?: string | null;
    attachments?: string[];
    transparency?: ICalEventTransparency | null;
    created?: ICalDateTimeValue | null;
    lastModified?: ICalDateTimeValue | null;
    class?: ICalEventClass | null;
    x?: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>;
}
export interface ICalEventJSONData {
    id: string;
    sequence: number;
    start: string | null;
    end: string | null;
    recurrenceId: string | null;
    timezone: string | null;
    stamp: string;
    allDay: boolean;
    floating: boolean;
    repeating: ICalEventInternalRepeatingData | string | null;
    summary: string;
    location: ICalLocation | null;
    description: ICalDescription | null;
    organizer: ICalOrganizer | null;
    attendees: ICalAttendee[];
    alarms: ICalAlarm[];
    categories: ICalCategory[];
    status: ICalEventStatus | null;
    busystatus: ICalEventBusyStatus | null;
    priority?: number | null;
    url: string | null;
    attachments: string[];
    transparency: ICalEventTransparency | null;
    created: string | null;
    lastModified: string | null;
    x: {
        key: string;
        value: string;
    }[];
}
interface ICalEventInternalRepeatingData {
    freq: ICalEventRepeatingFreq;
    count?: number;
    interval?: number;
    until?: ICalDateTimeValue;
    byDay?: ICalWeekday[];
    byMonth?: number[];
    byMonthDay?: number[];
    bySetPos?: number[];
    exclude?: ICalDateTimeValue[];
    startOfWeek?: ICalWeekday;
}
/**
 * Usually you get an `ICalCalendar` object like this:
 * ```javascript
 * import ical from 'ical-generator';
 * const calendar = ical();
 * const event = calendar.createEvent();
 * ```
 */
export default class ICalEvent {
    private readonly data;
    private readonly calendar;
    /**
     * Constructor of [[`ICalEvent`]. The calendar reference is
     * required to query the calendar's timezone when required.
     *
     * @param data Calendar Event Data
     * @param calendar Reference to ICalCalendar object
     */
    constructor(data: ICalEventData, calendar: ICalCalendar);
    /**
     * Get the event's ID
     * @since 0.2.0
     */
    id(): string;
    /**
     * Use this method to set the event's ID.
     * If not set, a UUID will be generated randomly.
     *
     * @param id Event ID you want to set
     */
    id(id: string | number): this;
    /**
     * Get the event's ID
     * @since 0.2.0
     * @alias id
     */
    uid(): string;
    /**
     * Use this method to set the event's ID.
     * If not set, a UUID will be generated randomly.
     *
     * @param id Event ID you want to set
     * @alias id
     */
    uid(id: string | number): this;
    /**
     * Get the event's SEQUENCE number. Use this method to get the event's
     * revision sequence number of the calendar component within a sequence of revisions.
     *
     * @since 0.2.6
     */
    sequence(): number;
    /**
     * Set the event's SEQUENCE number. For a new event, this should be zero.
     * Each time the organizer  makes a significant revision, the sequence
     * number should be incremented.
     *
     * @param sequence Sequence number or null to unset it
     */
    sequence(sequence: number): this;
    /**
     * Get the event start time which is currently
     * set. Can be any supported date object.
     *
     * @since 0.2.0
     */
    start(): ICalDateTimeValue | null;
    /**
     * Set the appointment date of beginning, which is required for all events.
     * You can use any supported date object, see
     * [Readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     */
    start(start: ICalDateTimeValue): this;
    /**
     * Get the event end time which is currently
     * set. Can be any supported date object.
     *
     * @since 0.2.0
     */
    end(): ICalDateTimeValue | null;
    /**
     * Set the appointment date of end. You can use any supported date object, see
     * [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     */
    end(end: ICalDateTimeValue | null): this;
    /**
     * Get the event's recurrence id
     * @since 0.2.0
     */
    recurrenceId(): ICalDateTimeValue | null;
    /**
     * Set the event's recurrence id. You can use any supported date object, see
     * [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     */
    recurrenceId(recurrenceId: ICalDateTimeValue | null): this;
    /**
     * Get the event's timezone.
     * @since 0.2.6
     */
    timezone(): string | null;
    /**
     * Sets the time zone to be used for this event. If a time zone has been
     * defined in both the event and the calendar, the time zone of the event
     * is used.
     *
     * Please note that if the time zone is set, ical-generator assumes
     * that all times are already in the correct time zone. Alternatively,
     * a `moment-timezone` or a Luxon object can be passed with `setZone`,
     * ical-generator will then set the time zone itself.
     *
     * This and the 'floating' flag (see below) are mutually exclusive, and setting a timezone will unset the
     * 'floating' flag.  If neither 'timezone' nor 'floating' are set, the date will be output with in UTC format
     * (see [date-time form #2 in section 3.3.5 of RFC 554](https://tools.ietf.org/html/rfc5545#section-3.3.5)).
     *
     * See [Readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones) for details about
     * supported values and timezone handling.
     *
     * ```javascript
     * event.timezone('America/New_York');
     * ```
     *
     * @see https://github.com/sebbo2002/ical-generator#-date-time--timezones
     * @since 0.2.6
     */
    timezone(timezone: string | null): this;
    /**
     * Get the event's timestamp
     * @since 0.2.0
     */
    stamp(): ICalDateTimeValue;
    /**
     * Set the appointment date of creation. Defaults to the current time and date (`new Date()`). You can use
     * any supported date object, see [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     */
    stamp(stamp: ICalDateTimeValue): this;
    /**
     * Get the event's timestamp
     * @since 0.2.0
     * @alias stamp
     */
    timestamp(): ICalDateTimeValue;
    /**
     * Set the appointment date of creation. Defaults to the current time and date (`new Date()`). You can use
     * any supported date object, see [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     * @alias stamp
     */
    timestamp(stamp: ICalDateTimeValue): this;
    /**
     * Get the event's allDay flag
     * @since 0.2.0
     */
    allDay(): boolean;
    /**
     * Set the event's allDay flag.
     *
     * ```javascript
     * event.allDay(true); // → appointment is for the whole day
     * ```
     *
     * @since 0.2.0
     */
    allDay(allDay: boolean): this;
    /**
     * Get the event's floating flag.
     * @since 0.2.0
     */
    floating(): boolean;
    floating(floating: boolean): this;
    /**
     * Get the event's repeating options
     * @since 0.2.0
     */
    repeating(): ICalEventInternalRepeatingData | ICalRRuleStub | string | null;
    /**
     * Set the event's repeating options by passing an [[`ICalRepeatingOptions`]] object.
     *
     * ```javascript
     * event.repeating({
     *    freq: 'MONTHLY', // required
     *    count: 5,
     *    interval: 2,
     *    until: new Date('Jan 01 2014 00:00:00 UTC'),
     *    byDay: ['su', 'mo'], // repeat only sunday and monday
     *    byMonth: [1, 2], // repeat only in january and february,
     *    byMonthDay: [1, 15], // repeat only on the 1st and 15th
     *    bySetPos: 3, // repeat every 3rd sunday (will take the first element of the byDay array)
     *    exclude: [new Date('Dec 25 2013 00:00:00 UTC')], // exclude these dates
     *    excludeTimezone: 'Europe/Berlin', // timezone of exclude
     *    wkst: 'SU' // Start the week on Sunday, default is Monday
     * });
     * ```
     *
     * @since 0.2.0
     */
    repeating(repeating: ICalRepeatingOptions | null): this;
    /**
     * Set the event's repeating options by passing an [RRule object](https://github.com/jakubroztocil/rrule).
     * @since 2.0.0-develop.5
     */
    repeating(repeating: ICalRRuleStub | null): this;
    /**
     * Set the events repeating options by passing a string which is inserted in the ical file.
     * @since 2.0.0-develop.5
     */
    repeating(repeating: string | null): this;
    /**
     * @internal
     */
    repeating(repeating: ICalRepeatingOptions | ICalRRuleStub | string | null): this;
    /**
     * Get the event's summary
     * @since 0.2.0
     */
    summary(): string;
    /**
     * Set the event's summary.
     * Defaults to an empty string if nothing is set.
     *
     * @since 0.2.0
     */
    summary(summary: string): this;
    /**
     * Get the event's location
     * @since 0.2.0
     */
    location(): ICalLocation | null;
    /**
     * Set the event's location by passing a string (minimum) or
     * an [[`ICalLocation`]] object which will also fill the iCal
     * `GEO` attribute and Apple's `X-APPLE-STRUCTURED-LOCATION`.
     *
     * ```javascript
     * event.location({
     *    title: 'Apple Store Kurfürstendamm',
     *    address: 'Kurfürstendamm 26, 10719 Berlin, Deutschland',
     *    radius: 141.1751386318387,
     *    geo: {
     *        lat: 52.503630,
     *        lon: 13.328650
     *    }
     * });
     * ```
     *
     * @since 0.2.0
     */
    location(location: ICalLocation | string | null): this;
    /**
     * Get the event's description as an [[`ICalDescription`]] object.
     * @since 0.2.0
     */
    description(): ICalDescription | null;
    /**
     * Set the events description by passing a plaintext string or
     * an object containing both a plaintext and a html description.
     * Only a few calendar apps support html descriptions and like in
     * emails, supported HTML tags and styling is limited.
     *
     * ```javascript
     * event.description({
     *     plain: 'Hello World!';
     *     html: '<p>Hello World!</p>';
     * });
     * ```
     *
     * @since 0.2.0
     */
    description(description: ICalDescription | string | null): this;
    /**
     * Get the event's organizer
     * @since 0.2.0
     */
    organizer(): ICalOrganizer | null;
    /**
     * Set the event's organizer
     *
     * ```javascript
     * event.organizer({
     *    name: 'Organizer\'s Name',
     *    email: 'organizer@example.com'
     * });
     *
     * // OR
     *
     * event.organizer('Organizer\'s Name <organizer@example.com>');
     * ```
     *
     * You can also add an explicit `mailto` email address or or the sentBy address.
     *
     * ```javascript
     *     event.organizer({
     *    name: 'Organizer\'s Name',
     *    email: 'organizer@example.com',
     *    mailto: 'explicit@mailto.com',
     *    sentBy: 'substitute@example.com'
     * })
     * ```
     *
     * @since 0.2.0
     */
    organizer(organizer: ICalOrganizer | string | null): this;
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
    createAttendee(data?: ICalAttendee | ICalAttendeeData | string): ICalAttendee;
    /**
     * Get all attendees
     * @since 0.2.0
     */
    attendees(): ICalAttendee[];
    /**
     * Add multiple attendees to your event
     *
     * ```javascript
     * const event = ical().createEvent();
     *
     * cal.attendees([
     *     {email: 'a@example.com', name: 'Person A'},
     *     {email: 'b@example.com', name: 'Person B'}
     * ]);
     *
     * cal.attendees(); // --> [ICalAttendee, ICalAttendee]
     * ```
     *
     * @since 0.2.0
     */
    attendees(attendees: (ICalAttendee | ICalAttendeeData | string)[]): this;
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
    createAlarm(data?: ICalAlarm | ICalAlarmData): ICalAlarm;
    /**
     * Get all alarms
     * @since 0.2.0
     */
    alarms(): ICalAlarm[];
    /**
     * Add one or multiple alarms
     *
     * ```javascript
     * const event = ical().createEvent();
     *
     * cal.alarms([
     *     {type: ICalAlarmType.display, trigger: 600},
     *     {type: ICalAlarmType.audio, trigger: 300}
     * ]);
     *
     * cal.alarms(); // --> [ICalAlarm, ICalAlarm]
     ```
     *
     * @since 0.2.0
     */
    alarms(alarms: ICalAlarm[] | ICalAlarmData[]): this;
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
    createCategory(data?: ICalCategory | ICalCategoryData): ICalCategory;
    /**
     * Get all categories
     * @since 0.3.0
     */
    categories(): ICalCategory[];
    /**
     * Add categories to the event or return all selected categories.
     *
     * ```javascript
     * const event = ical().createEvent();
     *
     * cal.categories([
     *     {name: 'APPOINTMENT'},
     *     {name: 'MEETING'}
     * ]);
     *
     * cal.categories(); // --> [ICalCategory, ICalCategory]
     * ```
     *
     * @since 0.3.0
     */
    categories(categories: (ICalCategory | ICalCategoryData)[]): this;
    /**
     * Get the event's status
     * @since 0.2.0
     */
    status(): ICalEventStatus | null;
    /**
     * Set the event's status
     *
     * ```javascript
     * import ical, {ICalEventStatus} from 'ical-generator';
     * event.status(ICalEventStatus.CONFIRMED);
     * ```
     *
     * @since 0.2.0
     */
    status(status: ICalEventStatus | null): this;
    /**
     * Get the event's busy status
     * @since 1.0.2
     */
    busystatus(): ICalEventBusyStatus | null;
    /**
     * Set the event's busy status. Will add the
     * [`X-MICROSOFT-CDO-BUSYSTATUS`](https://docs.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxcical/cd68eae7-ed65-4dd3-8ea7-ad585c76c736)
     * attribute to your event.
     *
     * ```javascript
     * import ical, {ICalEventBusyStatus} from 'ical-generator';
     * event.busystatus(ICalEventStatus.BUSY);
     * ```
     *
     * @since 1.0.2
     */
    busystatus(busystatus: ICalEventBusyStatus | null): this;
    /**
     * Get the event's priority. A value of 1 represents
     * the highest priority, 9 the lowest. 0 specifies an undefined
     * priority.
     *
     * @since v2.0.0-develop.7
     */
    priority(): number | null;
    /**
     * Set the event's priority. A value of 1 represents
     * the highest priority, 9 the lowest. 0 specifies an undefined
     * priority.
     *
     * @since v2.0.0-develop.7
     */
    priority(priority: number | null): this;
    /**
     * Get the event's URL
     * @since 0.2.0
     */
    url(): string | null;
    /**
     * Set the event's URL
     * @since 0.2.0
     */
    url(url: string | null): this;
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
    createAttachment(url: string): this;
    /**
     * Get all attachment urls
     * @since 3.2.0-develop.1
     */
    attachments(): string[];
    /**
     * Add one or multiple alarms
     *
     * ```javascript
     * const event = ical().createEvent();
     *
     * cal.attachments([
     *     'https://files.sebbo.net/calendar/attachments/foo',
     *     'https://files.sebbo.net/calendar/attachments/bar'
     * ]);
     *
     * cal.attachments(); // --> [string, string]
     ```
     *
     * 3.2.0-develop.1
     */
    attachments(attachments: string[]): this;
    /**
     * Get the event's transparency
     * @since 1.7.3
     */
    transparency(): ICalEventTransparency | null;
    /**
     * Set the event's transparency
     *
     * Set the field to `OPAQUE` if the person or resource is no longer
     * available due to this event. If the calendar entry has no influence
     * on availability, you can set the field to `TRANSPARENT`. This value
     * is mostly used to find out if a person has time on a certain date or
     * not (see `TRANSP` in iCal specification).
     *
     * ```javascript
     * import ical, {ICalEventTransparency} from 'ical-generator';
     * event.transparency(ICalEventTransparency.OPAQUE);
     * ```
     *
     * @since 1.7.3
     */
    transparency(transparency: ICalEventTransparency | null): this;
    /**
     * Get the event's creation date
     * @since 0.3.0
     */
    created(): ICalDateTimeValue | null;
    /**
     * Set the event's creation date
     * @since 0.3.0
     */
    created(created: ICalDateTimeValue | null): this;
    /**
     * Get the event's last modification date
     * @since 0.3.0
     */
    lastModified(): ICalDateTimeValue | null;
    /**
     * Set the event's last modification date
     * @since 0.3.0
     */
    lastModified(lastModified: ICalDateTimeValue | null): this;
    /**
     * Get the event's class
     * @since 2.0.0
     */
    class(): ICalEventClass | null;
    /**
     * Set the event's class
     *
     * ```javascript
     * import ical, { ICalEventClass } from 'ical-generator';
     * event.class(ICalEventClass.PRIVATE);
     * ```
     *
     * @since 2.0.0
     */
    class(class_: ICalEventClass | null): this;
    /**
     * Set X-* attributes. Woun't filter double attributes,
     * which are also added by another method (e.g. summary),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * event.x([
     *     {
     *         key: "X-MY-CUSTOM-ATTR",
     *         value: "1337!"
     *     }
     * ]);
     *
     * event.x([
     *     ["X-MY-CUSTOM-ATTR", "1337!"]
     * ]);
     *
     * event.x({
     *     "X-MY-CUSTOM-ATTR": "1337!"
     * });
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>): this;
    /**
     * Set a X-* attribute. Woun't filter double attributes,
     * which are also added by another method (e.g. summary),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * event.x("X-MY-CUSTOM-ATTR", "1337!");
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: string, value: string): this;
    /**
     * Get all custom X-* attributes.
     * @since 1.9.0
     */
    x(): {
        key: string;
        value: string;
    }[];
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
    toJSON(): ICalEventJSONData;
    /**
     * Return generated event as a string.
     *
     * ```javascript
     * const event = ical().createEvent();
     * console.log(event.toString()); // → BEGIN:VEVENT…
     * ```
     */
    toString(): string;
}
export {};
