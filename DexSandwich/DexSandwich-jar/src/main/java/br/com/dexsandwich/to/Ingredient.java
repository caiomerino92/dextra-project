package br.com.dexsandwich.to;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 
 * Entidade Ingredientes
 *
 */
public class Ingredient implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final int BACON = 1;
	public static final int BURGUER = 2;
	public static final int EGG = 3;
	public static final int CHEESE = 4;
	public static final int LETTUCE = 5;
	
	private String name;
	private int type;
	private double price;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	

}
