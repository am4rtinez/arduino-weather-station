//Functions.js
let exports = {};

exports.checkTime = (i) =>{
		if(i<10) {i = "0" + i};
		return i;
}

exports.convertTime = (timestamp) =>{
		let date = new Date(timestamp * 1000);
		let hours = exports.checkTime(date.getHours());
		let minutes = exports.checkTime(date.getMinutes());
		let seconds = exports.checkTime(date.getSeconds());
	
		// Will display time in 10:30:23 format
		let formattedTime = `${hours}:${minutes}:${seconds}`;
		return formattedTime;
}
	
exports.convertDate = (timestamp) =>{
		let date = new Date(timestamp * 1000);
		let day = exports.checkTime(date.getDay())
		let month = exports.checkTime(date.getMonth())
		let hours = exports.checkTime(date.getHours());
		let minutes = exports.checkTime(date.getMinutes());
		let seconds = exports.checkTime(date.getSeconds());
	
		let formattedDate = `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
		return formattedDate;
}
	

export default exports;