module.exports = {
	Product: {
		__resolveReference(product, context) {
			console.log('resolver starting, context: ', context.user);
			switch(product.brand){
				case "Pedigree": 
					return context.dataSources.userContentAPI.getProductById(product.id);
				
				case "Whiskas": 
					return context.dataSources.staticUserContentAPI.getProductById(product.id);
					
				default: 
					return context.dataSources.staticUserContentAPI.getProductById(product.id);
			}
		}
	}
};