import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;

import br.com.dexsandwich.facade.api.ApplicationFacadeLocal;
import br.com.dexsandwich.to.Ingredient;
import br.com.dexsandwich.to.Sandwich;


/**
 * 
 * Classe responsável pelos testes unitários
 *
 */


public class ApplicationTest {
	
	@Inject
	private ApplicationFacadeLocal applicationFacade;
	
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
		
	}

}
