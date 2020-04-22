$(document).ready(function(){
	const hours = document.getElementById('dig_hours');
	const minutes = document.getElementById('dig_minutes');
	const seconds = document.getElementById('dig_seconds');
	const descday = document.getElementById('descDay');
	const day	= document.getElementById('day');
	const month = document.getElementById('month');

	const days = ['Domingo', 'Lunes','Martes','Miércoles','Jueves','Viernes', 'Sábado'];
	const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	
	let interval = setInterval(dig_time, 1000);
	showDate();

	function dig_time(){
		let d = new Date();	
		hours.innerHTML = checkTime(d.getHours());
		minutes.innerHTML = checkTime(d.getMinutes());
		seconds.innerHTML = checkTime(d.getSeconds());
	}

	function showDate(){
		let d = new Date();

		descday.innerHTML = days[d.getDay()] + ' ';
		day.innerHTML = d.getDate() + ' ';
		month.innerHTML = months[d.getMonth()];
	}

	function checkTime(i){
		if(i<10) {i = "0" + i};
		return i;
	}
});