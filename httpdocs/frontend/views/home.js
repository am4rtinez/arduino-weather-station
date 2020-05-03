export default (props) => {
	return(/*html*/`
	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sd-2 col-md-2 col-lg-2">
					<div class="card">
						<div class="card-header">Condiciones Actuales</div>
						<div class="card-body dataCondActual">
							<div class="content">ABC</div>
							<hr>
							<div class="footer"> 
								<i class="fad fa-sync"></i> Ultima actualizacion: <span class="updated-time">00:00</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sd-10 col-md-10 col-lg-10">
					<div class="card">
						<div class="card-header">Predicción 15h</div>
						<div class="card-body dataForecast">
							<div class="content">ABC</div>
							<hr>
							<div class="footer">
								<i class="fad fa-sync"></i> Ultima actualizacion: <span class="updated-time">00:00</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<div class="card">
						<div class="card-body lastTempData">
							<div class="content text-center">
								<i class="fa fa-thermometer-three-quarters t-0 dataIcon"> </i><span class="dataField">00</span><span class="units">ºC</span>
							</div>
							<hr>
							<div class="footer">
								<i class="fad fa-sync"></i> Ultima actualizacion: <span class="updated_time">00:00</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card">
						<div class="card-body lastHumData">
							<div class="content text-center">
								<i class="fa fa-tint dataIcon"></i><span class="dataField">00</span><span class="units">%</span>
							</div>
							<hr>
							<div class="footer">
								<i class="fad fa-sync"></i> Ultima actualizacion: <span class="updated_time">00:00</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card">
						<div class="card-body lastPressData">
							<div class="content text-center">
								<i class="fa fa-heat dataIcon"></i><span class="dataField">00</span><span class="units">hPa</span>
							</div>
							<hr>
							<div class="footer">
								<i class="fad fa-sync"></i> Ultima actualizacion: <span class="updated_time">00:00</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card">
						<div class="card-body lastWindData">
							<div class="content text-center">
								<i class="fa fa-lightbulb dataIcon"></i><span class="dataField">00</span><span class="units">Lux</span>
							</div>
							<hr>
							<div class="footer">
								<i class="fad fa-sync"></i> Ultima actualizacion: <span class="updated_time">00:00</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card">
						<div class="card-body lastBrigData">
							<div class="content text-center">
								<i class="fa fa-lightbulb dataIcon"></i><span class="dataField">00</span><span class="units">Lux</span>
							</div>
							<hr>
							<div class="footer">
								<i class="fad fa-sync"></i> Ultima actualizacion: <span class="updated_time">00:00</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6 col-md-6">
					<div class="card">
						<div class="card-header">Temperatura</div>
						<div class="card-body">
							<div class="content">
								<canvas id="tempChart"></canvas>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6">
					<div class="card">
						<div class="card-header">Humedad</div>
						<div class="card-body">
							<div class="content">
								<canvas id="humChart"></canvas>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`)}