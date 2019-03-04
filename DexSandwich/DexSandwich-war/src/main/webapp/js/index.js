$(function() {
	var productPrice = 0.00;
	var customizedPrice = 0.00;
	var totalPrice = 0.00;
	var config = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 };
	var price;
	customizedList = [];
	
	$.get("/dexsandwich-war/rest/application/getsandwichesinfo", function(data, status) {
		for (var i = 0; i < data.length; i++) {
			$("#totalValue" + (i+1)).text(data[i].price.toLocaleString('pt-BR', config));
		}
	});
	
	$.get("/dexsandwich-war/rest/application/getingredientsinfo", function(data, status) {
		for (var i = 0; i < data.length; i++) {
			$("#ingredient" + (i+1)).text(data[i].name + " + " + data[i].price.toLocaleString('pt-BR', config));
		}
	});
	
	$.fn.getFormattedProductPrice = function() {
		$('#productPrice').text(productPrice.toLocaleString('pt-BR', config));
	}
	
	$.fn.getFormattedCustomizedPrice = function() {
		$('#customizedPrice').text(customizedPrice.toLocaleString('pt-BR', config));
	}
	
	$.fn.getFormattedTotalPrice = function() {
		$('#totalPrice').text(totalPrice.toLocaleString('pt-BR', config));
	}
	
	$.fn.getCustomizedPrice = function() {
		for (var i = 0; i < customizedList.length; i++) {
	    	customizedPrice = customizedPrice + customizedList[i].totalPriceCustomizedSandwich;
	    }
	}
	
	$.fn.initializePrices = function() {
		$.fn.getFormattedProductPrice();
		$.fn.getFormattedCustomizedPrice();
		$.fn.getFormattedTotalPrice();
		
		$("#ingredientQuantity1").prop("disabled", true);
		$("#ingredientQuantity1").text(1);
		
		$("#ingredientQuantity2").prop("disabled", true);
		$("#ingredientQuantity2").text(1);
		
		$("#ingredientQuantity3").prop("disabled", true);
		$("#ingredientQuantity3").text(1);
		
		$("#ingredientQuantity4").prop("disabled", true);
		$("#ingredientQuantity4").text(1);
		
		$("#ingredientQuantity5").prop("disabled", true);
		$("#ingredientQuantity5").text(1);
	}
	$.fn.initializePrices();
	
	$.fn.getPrices = function(id) {
		var priceValue = $(id).text();
		priceValue = priceValue.replace(/,/g, '.');
		priceValue = Number(priceValue.replace(/[^0-9.-]+/g,""));
		
		return priceValue
	}
	
	$('#customCheck1').change(function() {
		price = $.fn.getPrices("#totalValue1");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		totalPrice = productPrice;
		
		$.fn.getFormattedProductPrice();
		$.fn.getFormattedTotalPrice();
	});
	
	$('#customCheck2').change(function() {
		price = $.fn.getPrices("#totalValue2");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		totalPrice = productPrice;
		
		$.fn.getFormattedProductPrice();
		$.fn.getFormattedTotalPrice();
	});
	
	$('#customCheck3').change(function() {
		price = $.fn.getPrices("#totalValue3");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		totalPrice = productPrice;
		
		$.fn.getFormattedProductPrice();
		$.fn.getFormattedTotalPrice();
	});
	
	$('#customCheck4').change(function() {
		price = $.fn.getPrices("#totalValue4");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		totalPrice = productPrice;
		
		$.fn.getFormattedProductPrice();
		$.fn.getFormattedTotalPrice();
	});
	
	//Adiciona as informações do lanche customizados ao selecionar o checkbox de um ingrediente
	$.fn.calculateCustomizedSandwichPrice = function(ingredientName, ingredientPrice, ingredientQuantity) {
		customizedPrice = 0.00;
		var item = {};
	    item["ingredientName"] = ingredientName;
	    item["ingredientPrice"] = ingredientPrice;
	    item["ingredientQuantity"] = ingredientQuantity;
	    item["totalPriceCustomizedSandwich"] = ingredientPrice*ingredientQuantity;
	    		
	    for (var i = 0; i < customizedList.length; i++) {
	    	if (customizedList[i].ingredientName === item["ingredientName"]) {
	    		customizedList[i].ingredientPrice = item["ingredientPrice"];
	    		customizedList[i].ingredientQuantity = item["ingredientQuantity"];
	    		customizedList[i].totalPriceCustomizedSandwich = item["totalPriceCustomizedSandwich"];
	    	}
	    }
	    
	    $.fn.getCustomizedPrice();
	    $.fn.getFormattedCustomizedPrice();
		
		console.log(customizedList.length);
	}
	
	$.fn.addDeleteCustomizedSandwichInfo = function(ingredientName, ingredientPrice, ingredientQuantity, isAdd) {
		customizedPrice = 0.00;
		var item = {};
	    item["ingredientName"] = ingredientName;
	    item["ingredientPrice"] = ingredientPrice;
	    item["ingredientQuantity"] = ingredientQuantity;
	    item["totalPriceCustomizedSandwich"] = ingredientPrice*ingredientQuantity;
	    
	    if (isAdd) {
	    	customizedList.push(item);
	    } else {
	    	customizedList = $.grep(customizedList, function(e){ 
	    	     return e.ingredientName != item["ingredientName"]; 
	    	});
	    }
	    
	    if (customizedList.length > 0) {
	    	$.fn.getCustomizedPrice();
	    } else {
	    	customizedPrice = 0.00;
	    }
	    
	    $.fn.getFormattedCustomizedPrice();
	}
	
	$('#ingredientOption1').change(function() {
		var priceOption1 = $.fn.getPrices("#ingredient1");
		var quantityOption1 = $("#ingredientQuantity1").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity1").prop("disabled", false);
			$("#ingredientQuantity1").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Bacon", priceOption1, 1, true);
		} else {
			$("#ingredientQuantity1").prop("disabled", true);
			$("#ingredientQuantity1").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Bacon", priceOption1, quantityOption1, false);
		}
		
	});
	
	$('#ingredientOption2').change(function() {
		var priceOption2 = $.fn.getPrices("#ingredient2");
		var quantityOption2 = $("#ingredientQuantity2").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity2").prop("disabled", false);
			$("#ingredientQuantity2").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Hamburguer", priceOption2, 1, true);
		} else {
			$("#ingredientQuantity2").prop("disabled", true);
			$("#ingredientQuantity2").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Hamburguer", priceOption2, quantityOption2, false);
		}
		
	});
	
	$('#ingredientOption3').change(function() {
		var priceOption3 = $.fn.getPrices("#ingredient3");
		var quantityOption3 = $("#ingredientQuantity3").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity3").prop("disabled", false);
			$("#ingredientQuantity3").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Ovo", priceOption3, 1, true);
		} else {
			$("#ingredientQuantity3").prop("disabled", true);
			$("#ingredientQuantity3").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Ovo", priceOption3, quantityOption3, false);
		}
		
	});
	
	$('#ingredientOption4').change(function() {
		var priceOption4 = $.fn.getPrices("#ingredient4");
		var quantityOption4 = $("#ingredientQuantity4").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity4").prop("disabled", false);
			$("#ingredientQuantity4").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Queijo", priceOption4, 1, true);
		} else {
			$("#ingredientQuantity4").prop("disabled", true);
			$("#ingredientQuantity4").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Queijo", priceOption4, quantityOption4, false);
		}
		
	});
	
	$('#ingredientOption5').change(function() {
		var priceOption5 = $.fn.getPrices("#ingredient5");
		var quantityOption5 = $("#ingredientQuantity5").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity5").prop("disabled", false);
			$("#ingredientQuantity5").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Alface", priceOption5, 1, true);
		} else {
			$("#ingredientQuantity5").prop("disabled", true);
			$("#ingredientQuantity5").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Alface", priceOption5, quantityOption5, false);
		}
		
	});
	
	$('#ingredientQuantity1').bind('keyup mouseup', function() {
		var quantity1 = $("#ingredientQuantity1").val();
		var price1 = $.fn.getPrices("#ingredient1");
		$.fn.calculateCustomizedSandwichPrice("Bacon", price1, quantity1);
	});
	
	$('#ingredientQuantity2').bind('keyup mouseup', function() {
		var quantity2 = $("#ingredientQuantity2").val();
		var price2 = $.fn.getPrices("#ingredient2");
		$.fn.calculateCustomizedSandwichPrice("Hamburguer", price2, quantity2);
	});
	
	$('#ingredientQuantity3').bind('keyup mouseup', function() {
		var quantity3 = $("#ingredientQuantity3").val();
		var price3 = $.fn.getPrices("#ingredient3");
		$.fn.calculateCustomizedSandwichPrice("Ovo", price3, quantity3);
	});
	
	$('#ingredientQuantity4').bind('keyup mouseup', function() {
		var quantity4 = $("#ingredientQuantity4").val();
		var price4 = $.fn.getPrices("#ingredient4");
		$.fn.calculateCustomizedSandwichPrice("Queijo", price4, quantity4);
	});
	
	$('#ingredientQuantity5').bind('keyup mouseup', function() {
		var quantity5 = $("#ingredientQuantity5").val();
		var price5 = $.fn.getPrices("#ingredient5");
		$.fn.calculateCustomizedSandwichPrice("Alface", price5, quantity5);
	});

});