package br.com.dexsandwich.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Singleton;

import br.com.dexsandwich.service.api.ApplicationService;
import br.com.dexsandwich.to.Ingredient;
import br.com.dexsandwich.to.Sandwich;

@Singleton
public class ApplicationServiceImpl implements ApplicationService {
	
	private Ingredient generateIngredientInfo(int type) {
		Ingredient ingredient = new Ingredient();
		
		if (type == Ingredient.BACON) {
			ingredient.setName("Bacon");
			ingredient.setType(1);
			ingredient.setPrice(2.00);
		}
		
		if (type == Ingredient.BURGUER) {
			ingredient.setName("Hamburguer de carne");
			ingredient.setType(2);
			ingredient.setPrice(3.00);
		}
		
		if (type == Ingredient.EGG) {
			ingredient.setName("Ovo");
			ingredient.setType(3);
			ingredient.setPrice(0.80);
		}
		
		if (type == Ingredient.CHEESE) {
			ingredient.setName("Queijo");
			ingredient.setType(4);
			ingredient.setPrice(1.50);
		}
		
		if (type == Ingredient.LETTUCE) {
			ingredient.setName("Alface");
			ingredient.setType(5);
			ingredient.setPrice(0.40);
		}
		
		return ingredient;
	}
	
	private List<Sandwich> generateSandwichesInfo() {
		List<Sandwich> sandwichesList = new ArrayList<Sandwich>();
		
		Sandwich xBacon = new Sandwich();
		List<Ingredient> xBaconIngredientList = new ArrayList<Ingredient>();
		xBaconIngredientList.add(generateIngredientInfo(1));
		xBaconIngredientList.add(generateIngredientInfo(2));
		xBaconIngredientList.add(generateIngredientInfo(4));
		xBacon.setName("X-Bacon");
		xBacon.setIngredientsList(xBaconIngredientList);
		xBacon.setPrice(xBaconIngredientList.stream().mapToDouble(Ingredient::getPrice).sum());
		
		Sandwich xBurguer = new Sandwich();
		List<Ingredient> xBurguerIngredientList = new ArrayList<Ingredient>();
		xBurguerIngredientList.add(generateIngredientInfo(2));
		xBurguerIngredientList.add(generateIngredientInfo(4));
		xBurguer.setName("X-Burguer");
		xBurguer.setIngredientsList(xBurguerIngredientList);
		xBurguer.setPrice(xBurguerIngredientList.stream().mapToDouble(Ingredient::getPrice).sum());
		
		Sandwich xEgg = new Sandwich();
		List<Ingredient> xEggIngredientList = new ArrayList<Ingredient>();
		xEggIngredientList.add(generateIngredientInfo(2));
		xEggIngredientList.add(generateIngredientInfo(3));
		xEggIngredientList.add(generateIngredientInfo(4));
		xEgg.setName("X-Egg");
		xEgg.setIngredientsList(xEggIngredientList);
		xEgg.setPrice(xEggIngredientList.stream().mapToDouble(Ingredient::getPrice).sum());
		
		Sandwich xEggBacon = new Sandwich();
		List<Ingredient> xEggBaconIngredientList = new ArrayList<Ingredient>();
		xEggBaconIngredientList.add(generateIngredientInfo(1));
		xEggBaconIngredientList.add(generateIngredientInfo(2));
		xEggBaconIngredientList.add(generateIngredientInfo(3));
		xEggBaconIngredientList.add(generateIngredientInfo(4));
		xEggBacon.setName("X-Egg Bacon");
		xEggBacon.setIngredientsList(xEggBaconIngredientList);
		xEggBacon.setPrice(xEggBaconIngredientList.stream().mapToDouble(Ingredient::getPrice).sum());
		
		sandwichesList.add(xBacon);
		sandwichesList.add(xBurguer);
		sandwichesList.add(xEgg);
		sandwichesList.add(xEggBacon);
		
		return sandwichesList;
	}

	@Override
	public List<Sandwich> getSandwichesInfo() {
		return generateSandwichesInfo();
	}

	@Override
	public List<Ingredient> getIngredientsInfo() {
		List<Ingredient> ingredientsList = new ArrayList<Ingredient>();
		
		ingredientsList.add(generateIngredientInfo(1));
		ingredientsList.add(generateIngredientInfo(2));
		ingredientsList.add(generateIngredientInfo(3));
		ingredientsList.add(generateIngredientInfo(4));
		ingredientsList.add(generateIngredientInfo(5));
		
		return ingredientsList;
	}

	@Override
	public double calculateSandwichTotalPrice(Sandwich sandwich) {
		double result = 0.00;
		
		for (Ingredient ingredient : sandwich.getIngredientsList()) {
			result += ingredient.getPrice();
		}
		
		return result;
	}

}
