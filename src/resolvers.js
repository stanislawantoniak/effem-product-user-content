module.exports = {
	Product: {
		__resolveReference(product, { dataSources }) {
			return dataSources.userContentAPI.getProductById(product.id)
		}
	}
};