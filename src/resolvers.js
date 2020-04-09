module.exports = {
	Product: {
		__resolveReference(product, context) {
			console.log('resolver starting, context: ', context.user);
			return context.dataSources.userContentAPI.getProductById(product.id)
		}
	}
};