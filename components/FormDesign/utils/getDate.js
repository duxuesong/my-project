export default {
  getCurrDate () {
    const myDate = new Date();
    const currDate = `${myDate.getFullYear()}-${myDate.getMonth() +
      1}-${myDate.getDate()}`;
    return currDate
  }
}