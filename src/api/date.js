export default function date(date) {
  const dateObject = new Date(date);
  const timeDifference = Date.now() - dateObject.getTime();
  if (timeDifference < 1000) {
    return "Just now";
  } else if (timeDifference < 1000 * 60) {
    return Math.floor(timeDifference / 1000) + " seconds ago";
  } else if (timeDifference < 1000 * 60 * 60) {
    return Math.floor(timeDifference / (1000 * 60)) + " minutes ago";
  } else if (timeDifference < 1000 * 60 * 60 * 24) {
    return Math.floor(timeDifference / (1000 * 60 * 60)) + " hours ago";
  } else if (timeDifference < 1000 * 60 * 60 * 24 * 7) {
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + " days ago";
  } else if (timeDifference < 1000 * 60 * 60 * 24 * 31) {
    return (
      Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7)) + " weeks ago"
    );
  } else {
    return (
      dateObject.getUTCDate().toLocaleString() +
      "-" +
      dateObject.getUTCMonth().toLocaleString() +
      "-" +
      dateObject.getUTCFullYear().toString()
    );
  }
}
