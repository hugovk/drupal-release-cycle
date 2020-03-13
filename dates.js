const release_1_0 = new Date(2001, 1, 15);
const release_2_0 = new Date(2001, 3, 15);
const release_3_0 = new Date(2001, 9, 15);
const release_4_0 = new Date(2002, 6, 15);
const release_5_0 = new Date(2007, 1, 15);
const release_6_0 = new Date(2008, 2, 13);
const release_7_0 = new Date(2011, 1, 5);
const release_7_41 = new Date(2015, 10, 21);

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

const eol_6 = new Date(2016, 2, 24);
const eol_7 = new Date(2021, 11, 30);
const eol_8_8 = new Date(2020, 12, 2); // [1]
const eol_8 = new Date(2021, 11, 30); // [2]
const eol_9_0 = new Date(2021, 6, 30); // [1]
const eol_9 = new Date(2023, 12, 31); // [3]


// [1] Drupal 8.9/9.0 if Drupal 9 beta requirements are met by March 13, 2020
// https://www.drupal.org/core/release-cycle-overview#drupal9june

// [2] D8 EOL no later than Nov 2021. Could be 8.9 or 8.10
// https://www.drupal.org/core/release-cycle-overview#drupal-8-eol

// [3] estimate
// https://www.drupal.org/blog/plan-for-drupal-9