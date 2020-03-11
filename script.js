google.charts.load("current", { packages: ["gantt"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Task ID");
  data.addColumn("string", "Task Name");
  data.addColumn("string", "Resource");
  data.addColumn("date", "Start Date");
  data.addColumn("date", "End Date");
  data.addColumn("number", "Duration");
  data.addColumn("number", "Percent Complete");
  data.addColumn("string", "Dependencies");

  // Generally, 8.x is in security support until 8.x+2 is out:
  // "Security fixes are provided until the following minor release, approximately
  // six additional months (so each minor receives security coverage for one year
  // in total and two minors receive security coverage at a time)."
  const release_8_0 = new Date(2015, 11, 19);
  const release_8_1 = new Date(2016, 4, 20);
  const release_8_2 = new Date(2016, 10, 5);
  const release_8_3 = new Date(2017, 4, 5);
  const release_8_4 = new Date(2017, 10, 4);
  const release_8_5 = new Date(2018, 3, 3);
  const release_8_6 = new Date(2018, 9, 5);
  const release_8_7 = new Date(2019, 5, 1);
  const release_8_8 = new Date(2019, 12, 4);
  const release_8_9 = new Date(2020, 6, 3); // [1]
  const release_9_0 = new Date(2020, 6, 3); // [1]

  const releases = [
     {
      "taskID": "7",
      "taskName": "Drupal 7.41+",
      "resource": "security",
      "start": new Date(2015, 10, 21),
      "end": new Date(2021, 11, 30),
    },
     {
      "taskID": "8.0",
      "taskName": "Drupal 8.0",
      "resource": "dead",
      "start": release_8_0,
      "end": release_8_2,
    },
     {
      "taskID": "8.1",
      "taskName": "Drupal 8.1",
      "resource": "dead",
      "start": release_8_1,
      "end": release_8_3,
    },
     {
      "taskID": "8.2",
      "taskName": "Drupal 8.2",
      "resource": "dead",
      "start": release_8_2,
      "end": release_8_4,
    },
     {
      "taskID": "8.3",
      "taskName": "Drupal 8.3",
      "resource": "dead",
      "start": release_8_3,
      "end": release_8_5,
    },
     {
      "taskID": "8.4",
      "taskName": "Drupal 8.4",
      "resource": "dead",
      "start": release_8_4,
      "end": release_8_6,
    },
     {
      "taskID": "8.5",
      "taskName": "Drupal 8.5",
      "resource": "dead",
      "start": release_8_5,
      "end": release_8_7,
    },
    {
      "taskID": "8.6",
      "taskName": "Drupal 8.6",
      "resource": "security",
      "start": release_8_6,
      "end": release_8_8,
    },
    {
      "taskID": "8.7",
      "taskName": "Drupal 8.7",
      "resource": "security",
      "start": release_8_7,
      "end": release_8_9,
    },
    {
      "taskID": "8.8",
      "taskName": "Drupal 8.8",
      "resource": "bugfix",
      "start": release_8_8,
      "end": new Date(2020, 12, 2), // [1]
    },
    {
      "taskID": "8.9",
      "taskName": "Drupal 8.9 LTS",
      "resource": "prerelease",
      "start": release_8_9,
      "end": new Date(2021, 11, 30), // [2]
    },
    {
      "taskID": "9.0",
      "taskName": "Drupal 9.0",
      "resource": "prerelease",
      "start": release_9_0,
      "end": new Date(2021, 6, 30), // [3]
    }
  ];

  // [1] Drupal 8.9/9.0 if Drupal 9 beta requirements are met by March 13, 2020
  // https://www.drupal.org/core/release-cycle-overview#drupal9june

  // [2] D8 EOL no later than Nov 2021. Could be 8.9 or 8.10
  // https://www.drupal.org/core/release-cycle-overview#drupal-8-eol

  // [3] https://www.drupal.org/blog/plan-for-drupal-9

  const now = new Date();

  for (var release of releases) {
    // Validate past and future
    if (release.end < now) {
      release.resource = 'dead';
    } else if (now < release.start) {
      release.resource = 'prerelease';
    }

    data.addRow([
      release.taskID,
      release.taskName,
      release.resource,
      release.start,
      release.end,
      null,
      Math.floor(
        Math.max(
          ((Math.min(new Date(), release.end) - release.start) /
            (release.end - release.start)) *
            100,
          0
        ) * 100
      ) / 100,
      null
    ]);
  }

  var options = {
    height: 600,
    gantt: {
      trackHeight: 30,
      palette: [
        {
          // Yellow
          color: "#f2a600",
          dark: "#ee8100",
          light: "#fce8b2"
        },
        {
          // Red
          color: "#db4437",
          dark: "#a52714",
          light: "#f4c7c3"
        },
        {
          // Green
          color: "#0f9d58",
          dark: "#0b8043",
          light: "#b7e1cd"
        },
        {
          // Blue
          color: "#5e97f6",
          dark: "#2a56c6",
          light: "#c6dafc"
        },
        {
          color: "#ab47bc",
          dark: "#6a1b9a",
          light: "#e1bee7"
        },
        {
          color: "#00acc1",
          dark: "#00838f",
          light: "#b2ebf2"
        },
        {
          color: "#ff7043",
          dark: "#e64a19",
          light: "#ffccbc"
        },
        {
          color: "#9e9d24",
          dark: "#827717",
          light: "#f0f4c3"
        },
        {
          color: "#5c6bc0",
          dark: "#3949ab",
          light: "#c5cae9"
        },
        {
          color: "#f06292",
          dark: "#e91e63",
          light: "#f8bbd0"
        },
        {
          color: "#00796b",
          dark: "#004d40",
          light: "#b2dfdb"
        },
        {
          color: "#c2185b",
          dark: "#880e4f",
          light: "#f48fb1"
        }
      ]
    }
  };

  var chart = new google.visualization.Gantt(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);
}
