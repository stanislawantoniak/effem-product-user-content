module.exports = {
	Product: {
		__resolveReference(product, context) {
			console.log('resolver starting, context: ', context);
			console.log('resolver starting, product: ', product);
			switch(product.brand){
				case "Pedigree":
					console.log('switch: pedigree'); 
					return context.dataSources.userContentAPI.getProductById(product.id);
				
				case "Whiskas":
					console.log('switch: whiskas'); 
					return context.dataSources.staticUserContentAPI.getProductById(product.id);
					
				default: 
					console.log('switch: other'); 
					return context.dataSources.staticUserContentAPI.getProductById(product.id);
			}
		}
	}
};