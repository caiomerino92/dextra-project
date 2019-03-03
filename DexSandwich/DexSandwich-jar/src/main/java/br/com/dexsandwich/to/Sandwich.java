package br.com.dexsandwich.to;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * Entidade Sanduíche
 *
 */
public class Sandwich implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String name;
	private List<Ingredient> ingredientsList;
	private double price;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public List<Ingredient> getIngredientsList() {
		return ingredientsList;
	}
	
	public void setIngredientsList(List<Ingredient> ingredientsList) {
		this.ingredientsList = ingredientsList;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}

}
