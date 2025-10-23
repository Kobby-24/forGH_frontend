// ...existing code...

export const mockUsers = [
  {
    username: 'admin',
    password: 'password123',
    role: 'admin',
  },
  {
    username: 'peacefm',
    password: 'password123',
    role: 'station',
    stationId: 1, // This links the user to Peace FM
  },
  {
    username: 'citifm',
    password: 'password123',
    role: 'station',
    stationId: 2, // This links the user to Citi FM
  },
];

export const mockStations = [
  {
    id: 1,
    name: "Peace FM",
    streamUrl: "http://stream.example.com/peacefm",
    baseTax: 5000,
    contentLog: [
      { timestamp: "2025-10-23T10:00:00Z", title: "Africa", artist: "Shatta Wale", origin: "Local" },
      { timestamp: "2025-10-23T10:04:00Z", title: "God's Plan", artist: "Drake", origin: "Foreign" },
      { timestamp: "2025-10-23T10:08:00Z", title: "Sugarcane", artist: "KiDi", origin: "Local" },
    ],
    historicalRecords: [
      {
        period: "September 2025",
        periodId: "2025-09",
        status: "Paid",
        summary: {
          foreignPercentage: 34.0,
          surcharge: 425.0,
          totalTax: 5425.0,
          paidOn: "2025-10-02T09:00:00Z",
        },
        contentLog: [
          { timestamp: "2025-09-01T08:00:00Z", title: "Morning Mix", artist: "DJ A", origin: "Local" },
          { timestamp: "2025-09-01T08:04:00Z", title: "International Hit", artist: "Artist X", origin: "Foreign" },
          { timestamp: "2025-09-15T12:30:00Z", title: "Midday Show", artist: "Host B", origin: "Local" },
        ],
      },
      {
        period: "August 2025",
        periodId: "2025-08",
        status: "Paid",
        summary: {
          foreignPercentage: 29.5,
          surcharge: 0.0,
          totalTax: 5000.0,
          paidOn: "2025-09-01T10:00:00Z",
        },
        contentLog: [
          { timestamp: "2025-08-05T09:10:00Z", title: "Local Spotlight", artist: "Band C", origin: "Local" },
          { timestamp: "2025-08-05T09:15:00Z", title: "Global Chart", artist: "Artist Y", origin: "Foreign" },
        ],
      },
      {
        period: "July 2025",
        periodId: "2025-07",
        status: "Paid",
        summary: {
          foreignPercentage: 31.0,
          surcharge: 150.0,
          totalTax: 5150.0,
          paidOn: "2025-08-01T11:30:00Z",
        },
        contentLog: [
          { timestamp: "2025-07-10T07:20:00Z", title: "Breakfast Show", artist: "Host D", origin: "Local" },
          { timestamp: "2025-07-10T07:25:00Z", title: "Summer Hit", artist: "Artist Z", origin: "Foreign" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Citi FM",
    streamUrl: "http://stream.example.com/citifm",
    baseTax: 7000,
    contentLog: [
      { timestamp: "2025-10-23T09:55:00Z", title: "Heat Wave", artist: "Local Band", origin: "Local" },
      { timestamp: "2025-10-23T10:02:00Z", title: "Calm Down", artist: "Rema", origin: "Foreign" },
      { timestamp: "2025-10-23T10:18:00Z", title: "New Vibes", artist: "Citi Live DJ", origin: "Local" },
    ],
    historicalRecords: [
      {
        period: "September 2025",
        periodId: "2025-09",
        status: "Due",
        summary: {
          foreignPercentage: 42.0,
          surcharge: 588.0,
          totalTax: 7588.0,
          paidOn: null,
        },
        contentLog: [
          { timestamp: "2025-09-05T06:30:00Z", title: "Live News", artist: "Reporter", origin: "Local" },
          { timestamp: "2025-09-05T06:35:00Z", title: "Global Single", artist: "Star A", origin: "Foreign" },
        ],
      },
      {
        period: "August 2025",
        periodId: "2025-08",
        status: "Paid",
        summary: {
          foreignPercentage: 27.0,
          surcharge: 0.0,
          totalTax: 7000.0,
          paidOn: "2025-09-02T09:15:00Z",
        },
        contentLog: [
          { timestamp: "2025-08-12T14:00:00Z", title: "Afternoon Show", artist: "DJ Q", origin: "Local" },
        ],
      },
      {
        period: "July 2025",
        periodId: "2025-07",
        status: "Paid",
        summary: {
          foreignPercentage: 30.0,
          surcharge: 0.0,
          totalTax: 7000.0,
          paidOn: "2025-08-03T10:00:00Z",
        },
        contentLog: [
          { timestamp: "2025-07-20T18:00:00Z", title: "Evening Drive", artist: "Host X", origin: "Local" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Joy FM",
    streamUrl: "http://stream.example.com/joyfm",
    baseTax: 6000,
    contentLog: [
      { timestamp: "2025-10-23T09:50:00Z", title: "Morning Show Intro", artist: "Presenter", origin: "Local" },
      { timestamp: "2025-10-23T10:05:00Z", title: "As It Was", artist: "Harry Styles", origin: "Foreign" },
      { timestamp: "2025-10-23T10:25:00Z", title: "Local Hit", artist: "Sarkodie", origin: "Local" },
    ],
    historicalRecords: [
      {
        period: "September 2025",
        periodId: "2025-09",
        status: "Paid",
        summary: {
          foreignPercentage: 33.0,
          surcharge: 300.0,
          totalTax: 6300.0,
          paidOn: "2025-10-03T08:30:00Z",
        },
        contentLog: [
          { timestamp: "2025-09-08T09:00:00Z", title: "Community Talk", artist: "Host Y", origin: "Local" },
          { timestamp: "2025-09-08T09:05:00Z", title: "International", artist: "Band Z", origin: "Foreign" },
        ],
      },
      {
        period: "August 2025",
        periodId: "2025-08",
        status: "Paid",
        summary: {
          foreignPercentage: 28.0,
          surcharge: 0.0,
          totalTax: 6000.0,
          paidOn: "2025-09-04T12:00:00Z",
        },
        contentLog: [
          { timestamp: "2025-08-18T11:00:00Z", title: "Local Segment", artist: "Host Z", origin: "Local" },
        ],
      },
      {
        period: "July 2025",
        periodId: "2025-07",
        status: "Paid",
        summary: {
          foreignPercentage: 26.5,
          surcharge: 0.0,
          totalTax: 6000.0,
          paidOn: "2025-08-05T13:00:00Z",
        },
        contentLog: [
          { timestamp: "2025-07-22T10:30:00Z", title: "Morning Hit", artist: "Artist A", origin: "Local" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Adom FM",
    streamUrl: "http://stream.example.com/adomfm",
    baseTax: 4500,
    contentLog: [
      { timestamp: "2025-10-23T09:45:00Z", title: "Talk Segment", artist: "Host", origin: "Local" },
      { timestamp: "2025-10-23T10:10:00Z", title: "Ankra Kwa", artist: "Daddy Lumba", origin: "Local" },
      { timestamp: "2025-10-23T10:30:00Z", title: "Top International", artist: "Dua Lipa", origin: "Foreign" },
    ],
    historicalRecords: [
      {
        period: "September 2025",
        periodId: "2025-09",
        status: "Due",
        summary: {
          foreignPercentage: 36.0,
          surcharge: 270.0,
          totalTax: 4770.0,
          paidOn: null,
        },
        contentLog: [
          { timestamp: "2025-09-03T07:00:00Z", title: "Local News", artist: "Reporter", origin: "Local" },
        ],
      },
      {
        period: "August 2025",
        periodId: "2025-08",
        status: "Paid",
        summary: {
          foreignPercentage: 25.0,
          surcharge: 0.0,
          totalTax: 4500.0,
          paidOn: "2025-09-06T09:00:00Z",
        },
        contentLog: [
          { timestamp: "2025-08-14T09:45:00Z", title: "Midday", artist: "Host M", origin: "Local" },
        ],
      },
      {
        period: "July 2025",
        periodId: "2025-07",
        status: "Paid",
        summary: {
          foreignPercentage: 29.0,
          surcharge: 0.0,
          totalTax: 4500.0,
          paidOn: "2025-08-07T10:30:00Z",
        },
        contentLog: [
          { timestamp: "2025-07-30T08:00:00Z", title: "Local Morning", artist: "Presenter", origin: "Local" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Asempa FM",
    streamUrl: "http://stream.example.com/asempafm",
    baseTax: 4800,
    contentLog: [
      { timestamp: "2025-10-23T09:40:00Z", title: "Sports Roundup", artist: "Reporter", origin: "Local" },
      { timestamp: "2025-10-23T10:12:00Z", title: "Calypso Beat", artist: "International Artist", origin: "Foreign" },
      { timestamp: "2025-10-23T10:22:00Z", title: "Community News", artist: "Local Reporter", origin: "Local" },
    ],
    historicalRecords: [
      {
        period: "September 2025",
        periodId: "2025-09",
        status: "Paid",
        summary: {
          foreignPercentage: 30.0,
          surcharge: 0.0,
          totalTax: 4800.0,
          paidOn: "2025-10-04T09:00:00Z",
        },
        contentLog: [
          { timestamp: "2025-09-25T16:00:00Z", title: "Afternoon", artist: "Host A", origin: "Local" },
        ],
      },
      {
        period: "August 2025",
        periodId: "2025-08",
        status: "Paid",
        summary: {
          foreignPercentage: 27.5,
          surcharge: 0.0,
          totalTax: 4800.0,
          paidOn: "2025-09-07T11:00:00Z",
        },
        contentLog: [
          { timestamp: "2025-08-29T13:00:00Z", title: "Community Round", artist: "Reporter", origin: "Local" },
        ],
      },
      {
        period: "July 2025",
        periodId: "2025-07",
        status: "Paid",
        summary: {
          foreignPercentage: 28.0,
          surcharge: 0.0,
          totalTax: 4800.0,
          paidOn: "2025-08-08T12:00:00Z",
        },
        contentLog: [
          { timestamp: "2025-07-12T09:00:00Z", title: "Morning Feature", artist: "Host B", origin: "Local" },
        ],
      },
    ],
  },
];
// ...existing code...