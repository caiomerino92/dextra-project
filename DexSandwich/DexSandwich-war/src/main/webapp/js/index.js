$(function() {
	var productPrice = 0.00;
	var promotionPrice = 0.00;
	var totalPrice = 0.00;
	var config = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 };
	var price;
	var quantity;
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
	
	$.fn.getProductPrice = function() {
		$('#productPrice').text(productPrice.toLocaleString('pt-BR', config));
	}
	
	$.fn.getPromotionPrice = function() {
		$('#promotionPrice').text(promotionPrice.toLocaleString('pt-BR', config));
	}
	
	$.fn.getTotalPrice = function() {
		$('#totalPrice').text(totalPrice.toLocaleString('pt-BR', config));
	}
	
	$.fn.initializePrices = function() {
		$.fn.getProductPrice();
		$.fn.getPromotionPrice();
		$.fn.getTotalPrice();
		
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
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#customCheck2').change(function() {
		price = $.fn.getPrices("#totalValue2");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		totalPrice = productPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#customCheck3').change(function() {
		price = $.fn.getPrices("#totalValue3");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		totalPrice = productPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#customCheck4').change(function() {
		price = $.fn.getPrices("#totalValue4");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		totalPrice = productPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	//Adiciona as informações do lanche customizados ao selecionar o checkbox de um ingrediente
	$.fn.calculateCustomizedSandwichPrice = function(ingredientName, ingredientPrice, ingredientQuantity) {
		item = {};
	    item["ingredientName"] = ingredientName;
	    item["ingredientPrice"] = ingredientPrice;
	    item["ingredientQuantity"] = ingredientQuantity;
	    item["totalPriceCustomizedSandwich"] = ingredientPrice*ingredientQuantity;
	    		
	    for (var i = 0; i < customizedList.length; i++) {
	    	if (customizedList[i].ingredientName === item["ingredientName"]) {
	    		customizedList[i].ingredientQuantity = item["ingredientQuantity"];
	    		customizedList[i].totalPriceCustomizedSandwich = item["totalPriceCustomizedSandwich"];
	    		
	    		alert("ingredientName: " + customizedList[i].ingredientName);
	    		alert("ingredientQuantity: " + customizedList[i].ingredientQuantity);
	    		alert("totalPriceCustomizedSandwich: " + customizedList[i].totalPriceCustomizedSandwich);
	    	}
	    }
		
		console.log(customizedList.length);
	}
	
	$.fn.addDeleteCustomizedSandwichInfo = function(ingredientName, ingredientPrice, ingredientQuantity, isAdd) {
		item = {};
	    item["ingredientName"] = ingredientName;
	    item["ingredientPrice"] = ingredientPrice;
	    item["ingredientQuantity"] = ingredientQuantity;
	    item["totalPriceCustomizedSandwich"] = ingredientPrice*ingredientQuantity;
	    
	    if (isAdd) {
	    	customizedList.push(item);
	    } else {
	    	customizedList.splice($.inArray(item, customizedList),1);
	    }
	}
	
	$('#ingredientOption1').change(function() {
		price = $.fn.getPrices("#ingredient1");
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity1").prop("disabled", false);
			$("#ingredientQuantity1").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Bacon", price, 1, true);
		} else {
			$("#ingredientQuantity1").prop("disabled", true);
			$("#ingredientQuantity1").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Bacon", price, 1, false);
		}
	});
	
	$('#ingredientOption2').change(function() {
		price = $.fn.getPrices("#ingredient2");
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity2").prop("disabled", false);
			$("#ingredientQuantity2").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Hamburguer", price, 1, true);
		} else {
			$("#ingredientQuantity2").prop("disabled", true);
			$("#ingredientQuantity2").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Hamburguer", price, 1, false);
		}
	});
	
	$('#ingredientOption3').change(function() {
		price = $.fn.getPrices("#ingredient3");
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity3").prop("disabled", false);
			$("#ingredientQuantity3").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Ovo", price, 1, true);
		} else {
			$("#ingredientQuantity3").prop("disabled", true);
			$("#ingredientQuantity3").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Ovo", price, 1, false);
		}
	});
	
	$('#ingredientOption4').change(function() {
		price = $.fn.getPrices("#ingredient4");
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity4").prop("disabled", false);
			$("#ingredientQuantity4").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Queijo", price, 1, true);
		} else {
			$("#ingredientQuantity4").prop("disabled", true);
			$("#ingredientQuantity4").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Queijo", price, 1, false);
		}
	});
	
	$('#ingredientOption5').change(function() {
		price = $.fn.getPrices("#ingredient5");
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity5").prop("disabled", false);
			$("#ingredientQuantity5").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Alface", price, 1, true);
		} else {
			$("#ingredientQuantity5").prop("disabled", true);
			$("#ingredientQuantity5").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Alface", price, 1, false);
		}
	});
	
	$('#ingredientQuantity1').bind('keyup mouseup', function() {
		quantity = $("#ingredientQuantity1").val();
		alert(quantity);
		$.fn.calculateCustomizedSandwichPrice("Bacon", price, quantity);
	});
	
	$('#ingredientQuantity2').bind('keyup mouseup', function() {
		quantity = $("#ingredientQuantity2").val();
		alert(quantity);
		$.fn.calculateCustomizedSandwichPrice("Hamburguer", price, quantity);
	});
	
	$('#ingredientQuantity3').bind('keyup mouseup', function() {
		quantity = $("#ingredientQuantity3").val();
		alert(quantity);
		$.fn.calculateCustomizedSandwichPrice("Ovo", price, quantity);
	});
	
	$('#ingredientQuantity4').bind('keyup mouseup', function() {
		quantity = $("#ingredientQuantity4").val();
		alert(quantity);
		$.fn.calculateCustomizedSandwichPrice("Queijo", price, quantity);
	});
	
	$('#ingredientQuantity5').bind('keyup mouseup', function() {
		quantity = $("#ingredientQuantity5").val();
		alert(quantity);
		$.fn.calculateCustomizedSandwichPrice("Alface", price, quantity);
	});

});