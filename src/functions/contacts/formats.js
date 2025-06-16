export function createFormattedDate(time) {
  const date = new Date(time);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and the timestamp
  const differenceMs = currentDate - date;

  // Convert milliseconds to days
  const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

  // Define an array of day names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Format the time if it's more than one day old
  let formattedTime;

  if (differenceDays < 1) {
    // Extract hours, minutes, and AM/PM from the date
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Add leading zero to minutes if necessary
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Create the formatted time string
    formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  } else if (differenceDays < 2) {
    formattedTime = "Yesterday";
  } else {
    if (differenceDays <= 7) {
      formattedTime = daysOfWeek[date.getDay()];
    } else {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear() % 100;
      formattedTime = `${month}/${day}/${year}`;
    }
  }

  return formattedTime;
}

export function formatMessage(message) {
  let formattedMessage = " ";
  const savedMessageDescription = message.message.description;
  const messageData = message.message;

  if (savedMessageDescription) {
    formattedMessage = savedMessageDescription;
  }
  return String(formattedMessage);
}
