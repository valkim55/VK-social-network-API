
const formatDate = function(givenDate) {
    const jsonDate = givenDate.toJSON();
    //const convertedDate = new Date(jsonDate).toUTCString(); //Mon, 28 Nov 2022 07:51:15 GMT
    const convertedDate = new Date(jsonDate).toLocaleDateString(); // written on 11/28/2022
    const convertedTime =  new Date(jsonDate).toLocaleTimeString('en-US');
    return `written on ${convertedDate} at ${convertedTime}`; // written on 11/28/2022 at 3:07:24 AM
}

//formatDate(currDate);
//console.log(formatDate(currDate));

module.exports = formatDate;