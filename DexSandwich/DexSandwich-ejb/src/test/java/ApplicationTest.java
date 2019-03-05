import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

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
	
	@Test
	public void testLightPromotion() {
		Ingredient burguer = new Ingredient("Hamburguer de carne", Ingredient.BURGUER, 2, 3.00);
		Ingredient egg = new Ingredient("Ovo", Ingredient.EGG, 2, 0.80);
		Ingredient cheese = new Ingredient("Quejo", Ingredient.CHEESE, 1, 1.50);
		Ingredient lettuce = new Ingredient("Alface", Ingredient.LETTUCE, 8, 0.40);
		
		List<Ingredient> ingredientsListWithPromotion = new ArrayList<>();
		ingredientsListWithPromotion.add(burguer);
		ingredientsListWithPromotion.add(egg);
		ingredientsListWithPromotion.add(cheese);
		ingredientsListWithPromotion.add(lettuce);
		
		//Teste com a promoção light (não contém o ingrediente "Bacon", mas contém o ingrediente "Alface")
		assertEquals(11.07, applicationService.calculateCustomizedTotalPrice(ingredientsListWithPromotion), 0.00);
		
	}
	
	@Test
	public void testBurguerPromotion() {
		Ingredient bacon = new Ingredient("Bacon", Ingredient.BACON, 3, 2.00);
		Ingredient burguer = new Ingredient("Hamburguer de carne", Ingredient.BURGUER, 9, 3.00);
		Ingredient egg = new Ingredient("Ovo", Ingredient.EGG, 2, 0.80);
		
		List<Ingredient> ingredientsListWithPromotion = new ArrayList<>();
		ingredientsListWithPromotion.add(bacon);
		ingredientsListWithPromotion.add(burguer);
		ingredientsListWithPromotion.add(egg);
		
		//Teste com a promoção "Muita carne"
		assertEquals(25.60, applicationService.calculateCustomizedTotalPrice(ingredientsListWithPromotion), 0.00);
	}
	
	@Test
	public void testCheesePromotion() {
		Ingredient bacon = new Ingredient("Bacon", Ingredient.BACON, 3, 2.00);
		Ingredient egg = new Ingredient("Ovo", Ingredient.EGG, 2, 0.80);
		Ingredient cheese = new Ingredient("Quejo", Ingredient.CHEESE, 12, 1.50);
		
		List<Ingredient> ingredientsListWithPromotion = new ArrayList<>();
		ingredientsListWithPromotion.add(bacon);
		ingredientsListWithPromotion.add(egg);
		ingredientsListWithPromotion.add(cheese);
		
		//Teste com a promoção "Muito queijo"
		assertEquals(19.60, applicationService.calculateCustomizedTotalPrice(ingredientsListWithPromotion), 0.00);
	}
	
	@Test
	public void testCustomizedSandwich() {
		Ingredient bacon = new Ingredient("Bacon", Ingredient.BACON, 3, 2.00);
		Ingredient burguer = new Ingredient("Hamburguer de carne", Ingredient.BURGUER, 2, 3.00);
		Ingredient egg = new Ingredient("Ovo", Ingredient.EGG, 2, 0.80);
		Ingredient cheese = new Ingredient("Quejo", Ingredient.CHEESE, 1, 1.50);
		Ingredient lettuce = new Ingredient("Alface", Ingredient.LETTUCE, 8, 0.40);
		
		List<Ingredient> ingredientsListWithoutPromotion = new ArrayList<>();
		ingredientsListWithoutPromotion.add(bacon);
		ingredientsListWithoutPromotion.add(burguer);
		ingredientsListWithoutPromotion.add(egg);
		ingredientsListWithoutPromotion.add(cheese);
		ingredientsListWithoutPromotion.add(lettuce);
		
		//Teste sem promoção (contém todos os ingredientes)
		assertEquals(18.30, applicationService.calculateCustomizedTotalPrice(ingredientsListWithoutPromotion), 0.00);
	}

}
