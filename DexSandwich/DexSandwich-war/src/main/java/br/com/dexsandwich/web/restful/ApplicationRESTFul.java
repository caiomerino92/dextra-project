package br.com.dexsandwich.web.restful;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.dexsandwich.facade.api.ApplicationFacadeLocal;
import br.com.dexsandwich.to.Ingredient;
import br.com.dexsandwich.to.Sandwich;

@Named
@Path("/application")
public class ApplicationRESTFul {
	
	@Inject
	private ApplicationFacadeLocal applicationFacade;
	
	@GET
	@Path("/getSandwichesInfo")
	@Produces(MediaType.APPLICATION_JSON)
    public List<Sandwich> getSandwichesInfo() {
		return applicationFacade.getSandwichesInfo();
	}
	
	@GET
	@Path("/getIngredientsInfo")
	@Produces(MediaType.APPLICATION_JSON)
    public List<Ingredient> getIngredientsInfo() {
		return applicationFacade.getIngredientsInfo();
	}
	
	@POST
	@Path("/calculateSandwichTotalPrice")
	@Consumes(MediaType.APPLICATION_JSON)
    public double calculateSandwichTotalPrice(Sandwich sandwich) {
		return applicationFacade.calculateSandwichTotalPrice(sandwich);
	}
	
	@POST
	@Path("/calculateCustomizedTotalPrice")
	@Consumes(MediaType.APPLICATION_JSON)
    public double calculateCustomizedTotalPrice(List<Ingredient> ingredientsList) {
		return applicationFacade.calculateCustomizedTotalPrice(ingredientsList);
	}

}
