$(document).ready(function(){
	$("#btnCalcular").click(function(){
		var capital = $("#txtCapital").val();
		var tasa = $("#txtTasa").val();
		var plazo = $("#txtPlazo").val();
		var frecuencia = $("input[type=radio][name=frecuencia]:checked").val();


		function validar(){
			if($.isNumeric(capital) && $.isNumeric(tasa) && $.isNumeric(plazo)){
				if(capital <= 0 || tasa <= 0 || plazo <= 0){
					$("#msg").remove();
					$("<div id='msg' class='animated bounceIn alert alert-danger'>Los valores deben ser mayores a 0</div>").insertBefore("#formCalculadora");
					return false;
				}else{
					$("#msg").remove();
					return true;
			}
			}else{

				$("#msg").remove();
				$("<div id='msg' class='animated bounceIn alert alert-danger'>Solo se permiten numeros</div>").insertBefore("#formCalculadora");
				return false;
			}
		}
		function roundMoney(number){
			return Math.round(number * 100) / 100;
		}
		function generarTabla(capital, interes, plazos, frecuencia){
			interes = interes / 100;
			var amortizacionAcum = 0;
			var cuota = calcularCuota(capital, interes, plazos);
			var pagoInteres = 0;
			var amortizacion = 0;
			var tabla = "<table id='tblAmort' class='table table-hover animated slideInLeft'> <thead><tr><th>"+frecuencia+"</th><th>Cuota</th><th>Pago de interes</th><th>Amortizacion del principal</th><th>Amortizacion acumulada</th><th>Capital Pendiente</th></tr></thead>";
			tabla += "<tbody> <tr><td>"+0+"</td><td></td><td></td><td></td><td></td><td>"+capital+"</td></tr>";

			for(var i = 1; i <= plazos; i++){
				pagoInteres = calcularPagoInteres(interes, capital);
				amortizacion = calcularAmortizacion(cuota, pagoInteres);
				amortizacionAcum += amortizacion;
				capital = calcularCapitalPendiente(capital, amortizacion);
				tabla += "<tr><td>"+i+"</td><td>"+roundMoney(cuota)+"</td><td>"+roundMoney(pagoInteres)+"</td><td>"+roundMoney(amortizacion)+"</td><td>"+
				roundMoney(amortizacionAcum)+"</td><td>"+roundMoney(capital)+"</td></tr>";
			}
			tabla += "</tbody>";
			tabla +="</table>";
			return tabla;
		}
		

		function calcularCuota(capital, interes, plazos){
			return capital * ((Math.pow((1+interes),plazos) * interes)/(Math.pow((1+interes),plazos) - 1));
		}
		function calcularPagoInteres(interes, capital){
			return interes * capital;
		}
		function calcularAmortizacion(cuota, pagoInteres){
			return cuota - pagoInteres;
		}

		function calcularCapitalPendiente(capital, amortizacion){
			return capital - amortizacion;
		}
		if(validar()){
			$("#resultado").html(generarTabla(capital,tasa,plazo,frecuencia));
		}
	});
	
});