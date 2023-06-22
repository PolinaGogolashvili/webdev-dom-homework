export function getDate(date) {
    let currentDate = new Date(date);
    let month = Number(currentDate.getMonth() + 1);
    let minute = currentDate.getMinutes();
    let year = String(currentDate.getFullYear());
    year = year.split("").splice(2, 3).join("");
  
    if (month < 10) {
      month = "0" + month;
    }
  
    if (minute < 10) {
      minute = "0" + minute;
    }
  
    return (
      currentDate.getDate() +
      "." +
      month +
      "." +
      year +
      " " +
      currentDate.getHours() +
      ":" +
      minute
    );
  }