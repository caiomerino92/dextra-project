import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;

import br.com.dexsandwich.facade.api.ApplicationFacadeLocal;
import br.com.dexsandwich.service.api.ApplicationService;
import br.com.dexsandwich.service.impl.ApplicationServiceImpl;
import br.com.dexsandwich.to.Ingredient;
import br.com.dexsandwich.to.Sandwich;


/**
 * 
 * Classe responsável pelos testes unitários
 *
 */


public class ApplicationTest {
	
	private ApplicationService applicationService = new ApplicationServiceImpl();
	
	@Test
	public void testMenu() {
		Ingredient bacon = new Ingredient("Bacon", Ingredient.BACON, 2.00);
		Ingredient burguer = new Ingredient("Hamburguer de carne", Ingredient.BURGUER, 3.00);
		Ingredient egg = new Ingredient("Ovo", Ingredient.EGG, 0.80);
		Ingredient cheese = new Ingredient("Quejo", Ingredient.CHEESE, 1.50);
		Ingredient lettuce = new Ingredient("Alface", Ingredient.LETTUCE, 0.40);
		
		//X-Bacon
		List<Ingredient> xBaconIngredientsList = new ArrayList<Ingredient>();
		xBaconIngredientsList.add(bacon);
		xBaconIngredientsList.add(burguer);
		xBaconIngredientsList.add(cheese);
		Sandwich xBacon = new Sandwich("X-Bacon", xBaconIngredientsList);
		
		//X-Burguer
		List<Ingredient> xBurguerIngredientsList = new ArrayList<Ingredient>();
		xBurguerIngredientsList.add(burguer);
		xBurguerIngredientsList.add(cheese);
		Sandwich xBurguer = new Sandwich("X-Burguer", xBurguerIngredientsList);
		
		//X-Egg
		List<Ingredient> xEggIngredientsList = new ArrayList<Ingredient>();
		xEggIngredientsList.add(egg);
		xEggIngredientsList.add(burguer);
		xEggIngredientsList.add(cheese);
		Sandwich xEgg = new Sandwich("X-Egg", xEggIngredientsList);
		
		//X-Bacon
		List<Ingredient> xEggBaconIngredientsList = new ArrayList<Ingredient>();
		xEggBaconIngredientsList.add(egg);
		xEggBaconIngredientsList.add(bacon);
		xEggBaconIngredientsList.add(burguer);
		xEggBaconIngredientsList.add(cheese);
		Sandwich xEggBacon = new Sandwich("X-Egg Bacon", xEggBaconIngredientsList);
		
		assertEquals(6.50, applicationService.calculateSandwichTotalPrice(xBacon), 0.00);
		assertEquals(4.50, applicationService.calculateSandwichTotalPrice(xBurguer), 0.00);
		assertEquals(5.30, applicationService.calculateSandwichTotalPrice(xEgg), 0.00);
		assertEquals(7.30, applicationService.calculateSandwichTotalPrice(xEggBacon), 0.00);
	}

}
