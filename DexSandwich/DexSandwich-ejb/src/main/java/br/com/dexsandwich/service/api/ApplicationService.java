package br.com.dexsandwich.service.api;

import java.util.List;

import br.com.dexsandwich.to.Ingredient;
import br.com.dexsandwich.to.Sandwich;


public interface ApplicationService {
	
	List<Sandwich> getSandwichesInfo();
	
	List<Ingredient> getIngredientsInfo();
	
	double calculateSandwichTotalPrice(Sandwich sandwich);
}
