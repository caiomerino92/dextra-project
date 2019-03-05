package br.com.dexsandwich.facade.api;

import java.util.List;

import br.com.dexsandwich.to.Ingredient;
import br.com.dexsandwich.to.Sandwich;

 
public interface ApplicationFacade {
	
	List<Sandwich> getSandwichesInfo();
	
	List<Ingredient> getIngredientsInfo();
	
	double calculateSandwichTotalPrice(Sandwich sandwich);
}
