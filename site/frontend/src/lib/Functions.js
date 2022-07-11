// Functions.js
// Contiene funciones varias.

function checkTime (i){
	if(i<10) {i = "0" + i};
	return i;
}

function convertTime (timestamp) {
	let date = new Date(timestamp * 1000);
	let hours = checkTime(date.getHours());
	let minutes = checkTime(date.getMinutes());
	let seconds = checkTime(date.getSeconds());

	// Will display time in 10:30:23 format
	let formattedTime = `${hours}:${minutes}:${seconds}`;
	return formattedTime;
}

function convertDate (timestamp) {
	let date = new Date(timestamp * 1000);
	let day = checkTime(date.getDay())
	let month = checkTime(date.getMonth())
	let hours = checkTime(date.getHours());
	let minutes = checkTime(date.getMinutes());
	let seconds = checkTime(date.getSeconds());

	let formattedDate = `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
	return formattedDate;
}

export default {
	checkTime,
	convertTime,
	convertDate
}