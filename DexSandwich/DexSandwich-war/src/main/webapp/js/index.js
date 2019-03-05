$(function() {
	var productPrice = 0.00;
	var customizedPrice = 0.00;
	var totalPrice = 0.00;
	var config = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 };
	var price;
	var customizedList = [];
	var sandwichesList = [];
	
	//Obtém as informações dos lanches do cardápio
	$.get("/dexsandwich-war/rest/application/getSandwichesInfo", function(data, status) {
		sandwichesList = data;
		for (var i = 0; i < data.length; i++) {
			$("#totalValue" + (i+1)).text(data[i].price.toLocaleString('pt-BR', config));
		}
	});
	
	//Obtém as informações dos ingredientes para montagem do lanche personalizado
	$.get("/dexsandwich-war/rest/application/getIngredientsInfo", function(data, status) {
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
	
	//Calcula o preço total
	$.fn.getTotalPrice = function() {
		totalPrice = productPrice + customizedPrice;
	}
	
	//Função seta o preço total dos lanches selecionados do cardápio
	$.fn.updatePrices = function(id) {
		if($(id).is(":checked")) {
			productPrice = productPrice + price;
		} else {
			productPrice = productPrice - price;
		}
		
		$.fn.getFormattedProductPrice();
		$.fn.getTotalPrice();
		$.fn.getFormattedTotalPrice();
	}
	
	//Função que calcula o preço do lanche selecionado do cardápio
	$.fn.calculateSandwichTotalPrice = function(sandwich, id) {
		$.ajax({
			method: "POST",
        	url: "/dexsandwich-war/rest/application/calculateSandwichTotalPrice",
        	dataType: 'json',
        	contentType: "application/json",
        	data: JSON.stringify(sandwich),
         	success: function(data, status) {
         		price = data;
         		$.fn.updatePrices(id);
         	}
    	});
	}
	
	//Função que calcula o preço do lanche personalizado (incluindo as promoções, caso exista)
	$.fn.calculateCustomizedTotalPrice = function() {
		$.ajax({
			method: "POST",
        	url: "/dexsandwich-war/rest/application/calculateCustomizedTotalPrice",
        	dataType: 'json',
        	contentType: "application/json",
        	data: JSON.stringify(customizedList),
         	success: function(data, status) {
         		customizedPrice = data;
         		$.fn.getFormattedCustomizedPrice();
         	    $.fn.getTotalPrice();
         	    $.fn.getFormattedTotalPrice();
         	}
    	});
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
	
	//Função chamada quando seleciona ou deseleciona a Opção "X-Bacon" do cardápio
	$('#customCheck1').change(function() {
		var item = {};
		for (var i = 0; i < sandwichesList.length; i++) {
			if (sandwichesList[i].name === 'X-Bacon') {
				item["name"] = sandwichesList[i].name;
				item["ingredientsList"] = sandwichesList[i].ingredientsList;
				item["price"] = sandwichesList[i].price;
			}
		}
		
		$.fn.calculateSandwichTotalPrice(item, "#customCheck1");
	});
	
	//Função chamada quando seleciona ou deseleciona a Opção "X-Burguer" do cardápio
	$('#customCheck2').change(function() {
		var item = {};
		for (var i = 0; i < sandwichesList.length; i++) {
			if (sandwichesList[i].name === 'X-Burguer') {
				item["name"] = sandwichesList[i].name;
				item["ingredientsList"] = sandwichesList[i].ingredientsList;
				item["price"] = sandwichesList[i].price;
			}
		}
		
		$.fn.calculateSandwichTotalPrice(item, "#customCheck2");
	});
	
	//Função chamada quando seleciona ou deseleciona a Opção "X-Egg" do cardápio
	$('#customCheck3').change(function() {
		var item = {};
		for (var i = 0; i < sandwichesList.length; i++) {
			if (sandwichesList[i].name === 'X-Egg') {
				item["name"] = sandwichesList[i].name;
				item["ingredientsList"] = sandwichesList[i].ingredientsList;
				item["price"] = sandwichesList[i].price;
			}
		}
		
		$.fn.calculateSandwichTotalPrice(item, "#customCheck3");
	});
	
	//Função chamada quando seleciona ou deseleciona a Opção "X-Egg Bacon" do cardápio
	$('#customCheck4').change(function() {
		var item = {};
		for (var i = 0; i < sandwichesList.length; i++) {
			if (sandwichesList[i].name === 'X-Egg Bacon') {
				item["name"] = sandwichesList[i].name;
				item["ingredientsList"] = sandwichesList[i].ingredientsList;
				item["price"] = sandwichesList[i].price;
			}
		}
		
		$.fn.calculateSandwichTotalPrice(item, "#customCheck4");
	});
	
	//Atualiza as informações dos ingredientes ao montar o lanche personalizado e chama as funções para atualizar os preços
	$.fn.calculateCustomizedSandwichPrice = function(ingredientName, ingredientType, ingredientQuantity, ingredientPrice) {
		customizedPrice = 0.00;
		var item = {};
	    item["name"] = ingredientName;
	    item["type"] = ingredientType;
	    item["quantity"] = ingredientQuantity;
	    item["price"] = ingredientPrice;
	    		
	    for (var i = 0; i < customizedList.length; i++) {
	    	if (customizedList[i].type === item["type"]) {
	    		customizedList[i].price = item["price"];
	    		customizedList[i].quantity = item["quantity"];
	    	}
	    }
	    
	    $.fn.calculateCustomizedTotalPrice();
	}
	
	//Função que adiciona ou remove os ingredientes e atualiza os preços
	$.fn.addDeleteCustomizedSandwichInfo = function(ingredientName, ingredientType, ingredientQuantity, ingredientPrice, isAdd) {
		customizedPrice = 0.00;
		var item = {};
	    item["name"] = ingredientName;
	    item["type"] = ingredientType;
	    item["quantity"] = ingredientQuantity;
	    item["price"] = ingredientPrice;
	    
	    if (isAdd) {
	    	customizedList.push(item);
	    } else {
	    	customizedList = $.grep(customizedList, function(e){ 
	    	     return e.name != item["name"]; 
	    	});
	    }
	    
	    $.fn.calculateCustomizedTotalPrice();
	}
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Bacon" para montagem do lanche personalizado
	$('#ingredientOption1').change(function() {
		var priceOption1 = $.fn.getPrices("#ingredient1");
		var quantityOption1 = $("#ingredientQuantity1").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity1").prop("disabled", false);
			$("#ingredientQuantity1").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Bacon", 1, 1, priceOption1, true);
		} else {
			$("#ingredientQuantity1").prop("disabled", true);
			$("#ingredientQuantity1").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Bacon", 1, quantityOption1, priceOption1, false);
		}
		
	});
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Hamburguer" para montagem do lanche personalizado
	$('#ingredientOption2').change(function() {
		var priceOption2 = $.fn.getPrices("#ingredient2");
		var quantityOption2 = $("#ingredientQuantity2").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity2").prop("disabled", false);
			$("#ingredientQuantity2").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Hamburguer", 2, 1, priceOption2, true);
		} else {
			$("#ingredientQuantity2").prop("disabled", true);
			$("#ingredientQuantity2").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Hamburguer", 2, quantityOption2, priceOption2, false);
		}
		
	});
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Ovo" para montagem do lanche personalizado
	$('#ingredientOption3').change(function() {
		var priceOption3 = $.fn.getPrices("#ingredient3");
		var quantityOption3 = $("#ingredientQuantity3").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity3").prop("disabled", false);
			$("#ingredientQuantity3").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Ovo", 3, 1, priceOption3, true);
		} else {
			$("#ingredientQuantity3").prop("disabled", true);
			$("#ingredientQuantity3").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Ovo", 3, quantityOption3, priceOption3, false);
		}
		
	});
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Queijo" para montagem do lanche personalizado
	$('#ingredientOption4').change(function() {
		var priceOption4 = $.fn.getPrices("#ingredient4");
		var quantityOption4 = $("#ingredientQuantity4").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity4").prop("disabled", false);
			$("#ingredientQuantity4").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Queijo", 4, 1, priceOption4, true);
		} else {
			$("#ingredientQuantity4").prop("disabled", true);
			$("#ingredientQuantity4").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Queijo", 4, quantityOption4, priceOption4, false);
		}
		
	});
	
	//Função chamada ao selecionar ou deselecionar o ingrediente "Alface" para montagem do lanche personalizado
	$('#ingredientOption5').change(function() {
		var priceOption5 = $.fn.getPrices("#ingredient5");
		var quantityOption5 = $("#ingredientQuantity5").val();
		
		if($(this).is(":checked")) {
			$("#ingredientQuantity5").prop("disabled", false);
			$("#ingredientQuantity5").val(1);
			$.fn.addDeleteCustomizedSandwichInfo("Alface", 5, 1, priceOption5, true);
		} else {
			$("#ingredientQuantity5").prop("disabled", true);
			$("#ingredientQuantity5").val(null);
			$.fn.addDeleteCustomizedSandwichInfo("Alface", 5, quantityOption5, priceOption5, false);
		}
		
	});
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Bacon"
	$('#ingredientQuantity1').bind('keyup mouseup', function() {
		var quantity1 = $("#ingredientQuantity1").val();
		var price1 = $.fn.getPrices("#ingredient1");
		$.fn.calculateCustomizedSandwichPrice("Bacon", 1, quantity1, price1);
	});
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Hamburguer"
	$('#ingredientQuantity2').bind('keyup mouseup', function() {
		var quantity2 = $("#ingredientQuantity2").val();
		var price2 = $.fn.getPrices("#ingredient2");
		$.fn.calculateCustomizedSandwichPrice("Hamburguer", 2, quantity2, price2);
	});
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Ovo"
	$('#ingredientQuantity3').bind('keyup mouseup', function() {
		var quantity3 = $("#ingredientQuantity3").val();
		var price3 = $.fn.getPrices("#ingredient3");
		$.fn.calculateCustomizedSandwichPrice("Ovo", 3, quantity3, price3);
	});
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Queijo"
	$('#ingredientQuantity4').bind('keyup mouseup', function() {
		var quantity4 = $("#ingredientQuantity4").val();
		var price4 = $.fn.getPrices("#ingredient4");
		$.fn.calculateCustomizedSandwichPrice("Queijo", 4, quantity4, price4);
	});
	
	//Função chamada quando existe alteração na quantidade do ingrediente "Alface"
	$('#ingredientQuantity5').bind('keyup mouseup', function() {
		var quantity5 = $("#ingredientQuantity5").val();
		var price5 = $.fn.getPrices("#ingredient5");
		$.fn.calculateCustomizedSandwichPrice("Alface", 5, quantity5, price5);
	});

});