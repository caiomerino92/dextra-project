$(function() {
	var productPrice = 0.00;
	var promotionPrice = 0.00;
	var totalPrice = 0.00;
	var config = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 };
	var price;
	jsonList = [];
	
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
	
	$('#ingredientOption1').change(function() {
		if($(this).is(":checked")) {
			$("#ingredientQuantity1").prop("disabled", false);
			$("#ingredientQuantity1").val(1);
		} else {
			$("#ingredientQuantity1").prop("disabled", true);
			$("#ingredientQuantity1").val(null);
		}
	});
	
	$('#ingredientOption2').change(function() {
		if($(this).is(":checked")) {
			$("#ingredientQuantity2").prop("disabled", false);
			$("#ingredientQuantity2").val(1);
		} else {
			$("#ingredientQuantity2").prop("disabled", true);
			$("#ingredientQuantity2").val(null);
		}
	});
	
	$('#ingredientOption3').change(function() {
		if($(this).is(":checked")) {
			$("#ingredientQuantity3").prop("disabled", false);
			$("#ingredientQuantity3").val(1);
		} else {
			$("#ingredientQuantity3").prop("disabled", true);
			$("#ingredientQuantity3").val(null);
		}
	});
	
	$('#ingredientOption4').change(function() {
		if($(this).is(":checked")) {
			$("#ingredientQuantity4").prop("disabled", false);
			$("#ingredientQuantity4").val(1);
		} else {
			$("#ingredientQuantity4").prop("disabled", true);
			$("#ingredientQuantity4").val(null);
		}
	});
	
	$('#ingredientOption5').change(function() {
		if($(this).is(":checked")) {
			$("#ingredientQuantity5").prop("disabled", false);
			$("#ingredientQuantity5").val(1);
		} else {
			$("#ingredientQuantity5").prop("disabled", true);
			$("#ingredientQuantity5").val(null);
		}
	});
	
	$('#ingredientQuantity1').mouseup(function() {
		var priceIngredientOption = $("#ingredient1").text();
		priceIngredientOption = priceIngredientOption.replace(/,/g, '.');
		priceIngredientOption = Number(priceIngredientOption.replace(/[^0-9.-]+/g,""));
		
		var ingredientQuantity = $("#ingredientQuantity1").text();
		var totalIngredient = ingredientQuantity*priceIngredientOption;
		
		item = {};
        item ["ingredient"] = "Bacon";
        item ["total"] = totalIngredient;
        
        jsonList.push(item);
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});

});