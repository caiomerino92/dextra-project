package br.com.dexsandwich.facade.impl;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;

import br.com.dexsandwich.facade.api.ApplicationFacadeLocal;
import br.com.dexsandwich.service.api.ApplicationService;
import br.com.dexsandwich.to.Ingredient;
import br.com.dexsandwich.to.Sandwich;

@Stateless
@TransactionManagement(TransactionManagementType.CONTAINER)
@TransactionAttribute(TransactionAttributeType.REQUIRED)
public class ApplicationFacadeBeanImpl implements ApplicationFacadeLocal {
	
	@EJB
	private ApplicationService applicationService;

	@Override
	public List<Sandwich> getSandwichesInfo() {
		return applicationService.getSandwichesInfo();
	}

	@Override
	public List<Ingredient> getIngredientsInfo() {
		return applicationService.getIngredientsInfo();
	}

	@Override
	public double calculateSandwichTotalPrice(Sandwich sandwich) {
		return applicationService.calculateSandwichTotalPrice(sandwich);
	}

}
