module.exports = {
	Product: {
		__resolveReference(product, { dataSources, context }) {
			console.log('resolver starting, context: ', context);
			return dataSources.userContentAPI.getProductById(product.id)
		}
	}
};