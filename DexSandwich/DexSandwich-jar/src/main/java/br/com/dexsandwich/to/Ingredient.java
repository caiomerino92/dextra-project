package br.com.dexsandwich.to;

import java.io.Serializable;

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
	private int quantity;
	private double price;
	
	public Ingredient() {
		
	}
	
	public Ingredient(String name, int type, double price) {
		this.name = name;
		this.type = type;
		this.price = price;
	}
	
	public Ingredient(String name, int type, int quantity, double price) {
		this.name = name;
		this.type = type;
		this.quantity = quantity;
		this.price = price;
	}
	
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

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}

}
