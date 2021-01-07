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

  const releases = [
     {
      "taskID": "1",
      "taskName": "Drupal 1",
      "resource": "dead",
      "start": release_1_0,
      "end": release_2_0, // Assumption, correction welcome!
    },
     {
      "taskID": "2",
      "taskName": "Drupal 2",
      "resource": "dead",
      "start": release_2_0,
      "end": release_3_0, // Assumption, correction welcome!
    },
     {
      "taskID": "3",
      "taskName": "Drupal 3",
      "resource": "dead",
      "start": release_3_0,
      "end": release_4_0, // Assumption, correction welcome!
    },
     {
      "taskID": "4",
      "taskName": "Drupal 4",
      "resource": "dead",
      "start": release_4_0,
      "end": release_5_0, // Assumption, correction welcome!
    },
     {
      "taskID": "5",
      "taskName": "Drupal 5",
      "resource": "dead",
      "start": release_5_0,
      "end": release_7_0,
    },
     {
      "taskID": "6",
      "taskName": "Drupal 6",
      "resource": "dead",
      "start": release_6_0,
      "end": eol_6,
    },
     {
      "taskID": "7",
      "taskName": "Drupal 7",
      "resource": "security",
      "start": release_7_0,
      "end": eol_7,
    },
     {
      "taskID": "8",
      "taskName": "Drupal 8",
      "resource": "bugfix",
      "start": release_8_0,
      "end": eol_8,
    },
     {
      "taskID": "9",
      "taskName": "Drupal 9",
      "resource": "bugfix",
      "start": release_9_0,
      "end": eol_9,
    },
     {
      "taskID": "10",
      "taskName": "Drupal 10",
      "resource": "prerelease",
      "start": release_10_0,
      "end": eol_10,
    },
  ];

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

  // height per horizontal track
  var trackHeight = 30;
  // buffer for container height
  var bufferForHeight = 50;
  // height of entire container
  var containerHeight = (trackHeight * releases.length) + bufferForHeight;

  var options = {
    height: containerHeight,
    gantt: {
      trackHeight: trackHeight,
      palette: [
        {
          // Red
          color: "#db4437",
          dark: "#a52714",
          light: "#f4c7c3"
        },
        {
          // Yellow
          color: "#f2a600",
          dark: "#ee8100",
          light: "#fce8b2"
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

  var container = document.getElementById("chart_div");
  var chart = new google.visualization.Gantt(
    container
  );

  // declare these variables to be used in addMarker function
  var dateRangeStart = data.getColumnRange(3);
  var dateRangeEnd = data.getColumnRange(4);
  var formatDate = new google.visualization.DateFormat({
    pattern: 'yyyy-MM-dd'
  });

  // adds the vertical line
  function addMarker(markerDate) {
    var baseline;
    var baselineBounds;
    var chartElements;
    var markerLabel;
    var markerLine;
    var markerSpan;
    var svg;
    var timeline;
    var timelineUnit;
    var timelineWidth;
    var timespan;
  
    baseline = null;
    timeline = null;
    svg = null;
    markerLabel = null;
    chartElements = container.getElementsByTagName('svg');

    if (chartElements.length > 0) {
      svg = chartElements[0];
    }
    chartElements = container.getElementsByTagName('rect');
    if (chartElements.length > 0) {
      timeline = chartElements[0];
    }
    chartElements = container.getElementsByTagName('path');
    if (chartElements.length > 0) {
      baseline = chartElements[0];
    }
    chartElements = container.getElementsByTagName('text');
    if (chartElements.length > 0) {
      markerLabel = chartElements[0].cloneNode(true);
    }
    if ((svg === null) || (timeline === null) || (baseline === null) || (markerLabel === null) ||
        (markerDate.getTime() < dateRangeStart.min.getTime()) ||
        (markerDate.getTime() > dateRangeEnd.max.getTime())) {
      return;
    }
  
    // calculate placement
    timelineWidth = parseFloat(timeline.getAttribute('width'));
    baselineBounds = baseline.getBBox();
    timespan = dateRangeEnd.max.getTime() - dateRangeStart.min.getTime();
    timelineUnit = (timelineWidth - baselineBounds.x) / timespan;
    markerSpan = markerDate.getTime() - dateRangeStart.min.getTime();
  
    // add label
    markerLabel.setAttribute('fill', '#e91e63');
    markerLabel.setAttribute('y', options.height);
    markerLabel.setAttribute('x', (baselineBounds.x + (timelineUnit * markerSpan) - 4));
    markerLabel.textContent = formatDate.formatValue(markerDate);
    svg.appendChild(markerLabel);
  
    // add line
    markerLine = timeline.cloneNode(true);
    markerLine.setAttribute('y', 0);
    markerLine.setAttribute('x', (baselineBounds.x + (timelineUnit * markerSpan)));
    markerLine.setAttribute('height', options.height - bufferForHeight);
    markerLine.setAttribute('width', 1);
    markerLine.setAttribute('stroke', 'none');
    markerLine.setAttribute('stroke-width', '0');
    markerLine.setAttribute('fill', '#e91e63');
    svg.appendChild(markerLine);
  }

  chart.draw(data, options);
  google.visualization.events.addListener(chart, 'ready', function () {
    // add marker for current date
    addMarker(new Date());
  });
}
