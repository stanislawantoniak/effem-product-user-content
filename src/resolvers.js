module.exports = {
	Product: {
		__resolveReference(product, { dataSources }) {
			console.log('resolver starting');
			return dataSources.userContentAPI.getProductById(product.id)
		}
	}
};