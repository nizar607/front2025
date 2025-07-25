import { EventInput } from '@fullcalendar/core';


let eventGuid = 0;
export function createEventId() {
    return String(eventGuid++);
}


var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();


const events: EventInput[] =
  [
    {
        id: createEventId(),
        title: "All Day Event",
        date: new Date(y, m, 1),
        start:"12:00",
        end:"12:00",
        className: "bg-primary-subtle",
        location: "San Francisco, US",
        allDay: false,
        extendedProps: {
            department: "All Day Event",
        },
        description:
            "An all-day event is an event that lasts an entire day or longer",
    },
    {
        id: createEventId(),
        title: "Visit Online Course",
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2),
        allDay: true,
        className: "bg-warning-subtle",
        location: "San Francisco, US",
        extendedProps: {
            department: "Long Event",
        },
        description:
            "Long Term Event means an incident that last longer than 12 hours.",
    },
    {
        id: createEventId(),
        title: "Client Meeting with Alexis",
        start: new Date(y, m, d + 22, 20, 0),
        end: new Date(y, m, d + 23, 16, 0),
        allDay: false,
        className: "bg-danger-subtle",
        location: "California, US",
        extendedProps: {
            department: "Meeting with Alexis",
        },
        description:
            "A meeting is a gathering of two or more people that has been convened for the purpose of achieving a common goal through verbal interaction, such as sharing information or reaching agreement.",
    },
    {
        id: createEventId(),
        title: "Repeating Event",
        start: new Date(y, m, d + 4, 16, 0),
        end: new Date(y, m, d + 8, 16, 0),
        allDay: false,
        className: "bg-primary-subtle",
        location: "Las Vegas, US",
        extendedProps: {
            department: "Repeating Event",
        },
        description:
            "A recurring or repeating event is simply any event that you will occur more than once on your calendar. ",
    },
    {
        id: createEventId(),
        title: "Weekly Strategy Planning",
        start: new Date(y, m, d + 9),
        end: new Date(y, m, d + 11),
        allDay: false,
        className: "bg-danger-subtle",
        location: "Head Office, US",
        extendedProps: {
            department: "Lunch",
        },
        description: "Strategies for Creating Your Weekly Schedule",
    },
    {
        id: createEventId(),
        title: "Birthday Party",
        start: new Date(y, m, d + 1, 19, 0),
        allDay: false,
        className: "bg-success-subtle",
        location: "Los Angeles, US",
        extendedProps: {
            department: "Birthday Party",
        },
        description:
            "Family slumber party – Bring out the blankets and pillows and have a family slumber party! Play silly party games, share special snacks and wind down the fun with a special movie.",
    },
    {
        id: createEventId(),
        title: "Click for Google",
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: "http://google.com/",
        className: "bg-dark-subtle",
    },
    {
        id: createEventId(),
        title: "Steex Project",
        start: new Date(y, m, d + 23, 20, 0),
        end: new Date(y, m, d + 23, 16, 0),
        allDay: false,
        className: "bg-info-subtle",
        location: "Head Office, US",
        extendedProps: {
            department: "Discussion",
        },
        description: "Tell how to boost website traffic",
    },
];


export { events };
