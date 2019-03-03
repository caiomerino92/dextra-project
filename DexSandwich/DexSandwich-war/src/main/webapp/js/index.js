$(function() {
	$.get("/dexsandwich-war/rest/application/getsandwichesinfo", function(data, status) {
		for (var i = 0; i < data.length; i++) {
			$("#totalValue" + (i+1)).text(data[i].price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }));
		}
	});
	
	$.get("/dexsandwich-war/rest/application/getingredientsinfo", function(data, status) {
		for (var i = 0; i < data.length; i++) {
			$("#ingredient" + (i+1)).text(data[i].name + " + " + data[i].price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }));
		}
	});
});