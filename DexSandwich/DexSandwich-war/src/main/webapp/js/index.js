$(function() {
	var productPrice = 0.00;
	var customizedPrice = 0.00;
	var promotionPrice = 0.00;
	var totalPrice = 0.00;
	var config = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 };
	var price;
	customizedList = [];
	
	//Obtém as informações dos lanches do cardápio
	$.get("/dexsandwich-war/rest/application/getsandwichesinfo", function(data, status) {
		for (var i = 0; i < data.length; i++) {
			$("#totalValue" + (i+1)).text(data[i].price.toLocaleString('pt-BR', config));
		}
	});
	
	//Obtém as informações dos ingredientes para montagem do lanche personalizado
	$.get("/dexsandwich-war/rest/application/getingredientsinfo", function(data, status) {
		for (var i = 0; i < data.length; i++) {
			$("#ingredient" + (i+1)).text(data[i].name + " + " + data[i].price.toLocaleString('pt-BR', config));
		}
	});
	
	//Formatação do preço dos lanches do cardápio
	$.fn.getFormattedProductPrice = function() {
		$('#productPrice').text(productPrice.toLocaleString('pt-BR', config));
	}
	
	//Formatação do preço do lanche personalizado
	$.fn.getFormattedCustomizedPrice = function() {
		$('#customizedPrice').text(customizedPrice.toLocaleString('pt-BR', config));
	}
	
	//Formatação do preço total
	$.fn.getFormattedTotalPrice = function() {
		$('#totalPrice').text(totalPrice.toLocaleString('pt-BR', config));
	}
	
	//Calcula o preço do lanche personalizado
	$.fn.getCustomizedPrice = function() {
		if (customizedList.length > 0) {
			for (var i = 0; i < customizedList.length; i++) {
		    	customizedPrice = customizedPrice + customizedList[i].totalPriceCustomizedSandwich;
		    }
			
			customizedPrice = customizedPrice - promotionPrice;
		} else {
			customizedPrice = 0.00;
		}
	}
	
	//Calcula o preço total
	$.fn.getTotalPrice = function() {
		totalPrice = productPrice + customizedPrice;
	}
	
	//Função de inicialização
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
	
	//Obtém os valores dos preços de acordo com o id do html (passado como parâmetro)
	$.fn.getPrices = function(id) {
		var priceValue = $(id).text();
		priceValue = priceValue.replace(/,/g, '.');
		priceValue = Number(priceValue.replace(/[^0-9.-]+/g,""));
		
		return priceValue
	}
	
	//Função chamada quando seleciona ou deseleciona a Opção 1 do lanche do cardápio
	$('#customCheck1').change(function() {
		price = $.fn.getPrices("#totalValue1");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		$.fn.getFormattedProductPrice();
		$.fn.getTotalPrice();
		$.fn.getFormattedTotalPrice();
	});
	
	//Função chamada quando seleciona ou deseleciona a Opção 2 do lanche do cardápio
	$('#customCheck2').change(function() {
		price = $.fn.getPrices("#totalValue2");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		$.fn.getFormattedProductPrice();
		$.fn.getTotalPrice();
		$.fn.getFormattedTotalPrice();
	});
	
	//Função chamada quando seleciona ou deseleciona a Opção 3 do lanche do cardápio
	$('#customCheck3').change(function() {
		price = $.fn.getPrices("#totalValue3");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		$.fn.getFormattedProductPrice();
		$.fn.getTotalPrice();
		$.fn.getFormattedTotalPrice();
	});
	
	//Função chamada quando seleciona ou deseleciona a Opção 4 do lanche do cardápio
	$('#customCheck4').change(function() {
		price = $.fn.getPrices("#totalValue4");
		
		if($(this).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		$.fn.getFormattedProductPrice();
		$.fn.getTotalPrice();
		$.fn.getFormattedTotalPrice();
	});
	
	//Função que realiza os cálculos das promoções
	$.fn.calculatePromotion = function() {
		var hasLettuce = false;
		var hasBacon = false;
		promotionPrice = 0.00;
		var promotionPriceTemp = 0.00;
		var cheeseCount = 0;
		
		if (customizedList.length > 0) {
			
			for (var i = 0; i < customizedList.length; i++) {
				
				if (customizedList[i].ingredientName === "Alface") {
					hasLettuce = true;
				}
				
				if (customizedList[i].ingredientName === "Bacon") {
					hasBacon = true;
				}
				
				if (customizedList[i].ingredientName === "Hamburguer") {
					if (customizedList[i].ingredientQuantity >= 3) {
						var burguerMultiplier = customizedList[i].ingredientQuantity/3;
						var burguerParserValue = parseInt(burguerMultiplier, 10);
						customizedList[i].totalPriceCustomizedSandwich = ((customizedList[i].ingredientQuantity - burguerParserValue)*customizedList[i].ingredientPrice);
					}
				}
				
				if (customizedList[i].ingredientName === "Queijo") {
					if (customizedList[i].ingredientQuantity >= 3) {
						var cheeseMultiplier = customizedList[i].ingredientQuantity/3;
						var cheeseParserValue = parseInt(cheeseMultiplier, 10);
						customizedList[i].totalPriceCustomizedSandwich = ((customizedList[i].ingredientQuantity - cheeseParserValue)*customizedList[i].ingredientPrice);
					}
				}
				
				promotionPriceTemp = promotionPriceTemp + customizedList[i].totalPriceCustomizedSandwich;
				
			}
			
			if (hasLettuce && !hasBacon) {
				promotionPrice = (promotionPriceTemp*0.10);
			}
		}
	}
	
	//Atualiza as informações dos ingredientes ao montar o lanche personalizado e chama as funções para atualizar os preços
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
	    
	    $.fn.calculatePromotion();
	    $.fn.getCustomizedPrice();
	    $.fn.getFormattedCustomizedPrice();
	    $.fn.getTotalPrice();
	    $.fn.getFormattedTotalPrice();
	}
	
	//Função que adiciona ou remove os ingredientes e atualiza os preços
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
	    
	    $.fn.calculatePromotion()
	    $.fn.getCustomizedPrice();
	    $.fn.getFormattedCustomizedPrice();
	    $.fn.getTotalPrice();
	    $.fn.getFormattedTotalPrice();
	}
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Bacon" para montagem do lanche personalizado
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
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Hamburguer" para montagem do lanche personalizado
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
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Ovo" para montagem do lanche personalizado
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
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Queijo" para montagem do lanche personalizado
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
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Alface" para montagem do lanche personalizado
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
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Bacon"
	$('#ingredientQuantity1').bind('keyup mouseup', function() {
		var quantity1 = $("#ingredientQuantity1").val();
		var price1 = $.fn.getPrices("#ingredient1");
		$.fn.calculateCustomizedSandwichPrice("Bacon", price1, quantity1);
	});
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Hamburguer"
	$('#ingredientQuantity2').bind('keyup mouseup', function() {
		var quantity2 = $("#ingredientQuantity2").val();
		var price2 = $.fn.getPrices("#ingredient2");
		$.fn.calculateCustomizedSandwichPrice("Hamburguer", price2, quantity2);
	});
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Ovo"
	$('#ingredientQuantity3').bind('keyup mouseup', function() {
		var quantity3 = $("#ingredientQuantity3").val();
		var price3 = $.fn.getPrices("#ingredient3");
		$.fn.calculateCustomizedSandwichPrice("Ovo", price3, quantity3);
	});
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Queijo"
	$('#ingredientQuantity4').bind('keyup mouseup', function() {
		var quantity4 = $("#ingredientQuantity4").val();
		var price4 = $.fn.getPrices("#ingredient4");
		$.fn.calculateCustomizedSandwichPrice("Queijo", price4, quantity4);
	});
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Alface"
	$('#ingredientQuantity5').bind('keyup mouseup', function() {
		var quantity5 = $("#ingredientQuantity5").val();
		var price5 = $.fn.getPrices("#ingredient5");
		$.fn.calculateCustomizedSandwichPrice("Alface", price5, quantity5);
	});

});