$(function() {
	var productPrice = 0.00;
	var promotionPrice = 0.00;
	var totalPrice = 0.00;
	var config = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 };
	
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
		$("#ingredientQuantity2").prop("disabled", true);
		$("#ingredientQuantity3").prop("disabled", true);
		$("#ingredientQuantity4").prop("disabled", true);
		$("#ingredientQuantity5").prop("disabled", true);
	}
	$.fn.initializePrices();
	
	$('#customCheck1').change(function() {
		var price1 =  $("#totalValue1").text();
		price1 = price1.replace(/,/g, '.');
		price1 = Number(price1.replace(/[^0-9.-]+/g,""));
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price1;
		} else {
			productPrice = productPrice - price1;
		}
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#customCheck2').change(function() {
		var price2 =  $("#totalValue2").text();
		price2 = price2.replace(/,/g, '.');
		price2 = Number(price2.replace(/[^0-9.-]+/g,""));
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price2;
		} else {
			productPrice = productPrice - price2;
		}
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#customCheck3').change(function() {
		var price3 =  $("#totalValue3").text();
		price3 = price3.replace(/,/g, '.');
		price3 = Number(price3.replace(/[^0-9.-]+/g,""));
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price3;
		} else {
			productPrice = productPrice - price3;
		}
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#customCheck4').change(function() {
		var price4 =  $("#totalValue4").text();
		price4 = price4.replace(/,/g, '.');
		price4 = Number(price4.replace(/[^0-9.-]+/g,""));
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price4;
		} else {
			productPrice = productPrice - price4;
		}
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#ingredientOption1').change(function() {
		var priceIngredientOption1 = $("#ingredient1").text();
		priceIngredientOption1 = priceIngredientOption1.replace(/,/g, '.');
		priceIngredientOption1 = Number(priceIngredientOption1.replace(/[^0-9.-]+/g,""));
		
		if($(this).is(":checked")) {
			productPrice = productPrice + priceIngredientOption1;
			$("#ingredientQuantity1").prop("disabled", false);
		} else {
			productPrice = productPrice - priceIngredientOption1;
			$("#ingredientQuantity1").prop("disabled", true);
		}
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#ingredientOption2').change(function() {
		var priceIngredientOption1 = $("#ingredient2").text();
		priceIngredientOption1 = priceIngredientOption1.replace(/,/g, '.');
		priceIngredientOption1 = Number(priceIngredientOption1.replace(/[^0-9.-]+/g,""));
		
		if($(this).is(":checked")) {
			productPrice = productPrice + priceIngredientOption1;
			$("#ingredientQuantity2").prop("disabled", false);
		} else {
			productPrice = productPrice - priceIngredientOption1;
			$("#ingredientQuantity2").prop("disabled", true);
		}
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#ingredientOption3').change(function() {
		var priceIngredientOption1 = $("#ingredient3").text();
		priceIngredientOption1 = priceIngredientOption1.replace(/,/g, '.');
		priceIngredientOption1 = Number(priceIngredientOption1.replace(/[^0-9.-]+/g,""));
		
		if($(this).is(":checked")) {
			productPrice = productPrice + priceIngredientOption1;
			$("#ingredientQuantity3").prop("disabled", false);
		} else {
			productPrice = productPrice - priceIngredientOption1;
			$("#ingredientQuantity3").prop("disabled", true);
		}
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#ingredientOption4').change(function() {
		var priceIngredientOption1 = $("#ingredient4").text();
		priceIngredientOption1 = priceIngredientOption1.replace(/,/g, '.');
		priceIngredientOption1 = Number(priceIngredientOption1.replace(/[^0-9.-]+/g,""));
		
		if($(this).is(":checked")) {
			productPrice = productPrice + priceIngredientOption1;
			$("#ingredientQuantity4").prop("disabled", false);
		} else {
			productPrice = productPrice - priceIngredientOption1;
			$("#ingredientQuantity4").prop("disabled", true);
		}
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});
	
	$('#ingredientOption5').change(function() {
		var priceIngredientOption1 = $("#ingredient5").text();
		priceIngredientOption1 = priceIngredientOption1.replace(/,/g, '.');
		priceIngredientOption1 = Number(priceIngredientOption1.replace(/[^0-9.-]+/g,""));
		
		if($(this).is(":checked")) {
			productPrice = productPrice + priceIngredientOption1;
			$("#ingredientQuantity5").prop("disabled", false);
		} else {
			productPrice = productPrice - priceIngredientOption1;
			$("#ingredientQuantity5").prop("disabled", true);
		}
		
		totalPrice = productPrice - promotionPrice;
		
		$.fn.getProductPrice();
		$.fn.getTotalPrice();
	});

});