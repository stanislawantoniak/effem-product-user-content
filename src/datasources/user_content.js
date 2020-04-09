const { RESTDataSource } = require('apollo-datasource-rest');

class UserContentAPI extends RESTDataSource {

	constructor() {
		super();
		//constant url - generic BazaarVoice API returning constant data
		this.baseURL = 'https://stg.api.bazaarvoice.com/data/';
	}

	willSendRequest(request) {
		//?apiversion=5.4
		//&passkey=caB45h2jBqXFw1OE043qoMBD1gJC8EwFNCjktzgwncXY4
		//&Filter=ProductId:data-gen-moppq9ekthfzbc6qff3bqokie
		//&Include=Products
		//&Stats=Reviews
		//&limit=100';

		request.params.set('apiversion', '5.4');
		request.params.set('passkey', 'caB45h2jBqXFw1OE043qoMBD1gJC8EwFNCjktzgwncXY4');
		request.params.set('Filter', 'ProductId:data-gen-moppq9ekthfzbc6qff3bqokie');
		request.params.set('Include', 'Products');
		request.params.set('Stats', 'Reviews');
		request.params.set('limit', '100');

		console.log('query params: ', request.params);
		console.log('base url: ', this.baseURL);
	}

	//added for logging only
	async resolveURL(request) {
		console.log('path: ', request.path);
		return super.resolveURL(request);
	}

	async getProductById(id) {
		console.log('datasource getting product: ' + id);
		const response = await this.get('reviews.json');
		//console.log('product: ', response);
		return this.productReducer(response, id);
	}

	productReducer(product, id) {
		return {
			id: id,
			reviews: product.Results == null
				? []
				: product.Results.map(review => this.reviewReducer(review)),
			reviewStats: {
				reviewCount: this.productData(product).ReviewStatistics.TotalReviewCount,
				recommendedCount: this.productData(product).ReviewStatistics.RecommendedCount,
				notRecommendedCount: this.productData(product).ReviewStatistics.NotRecommendedCount,
				averageRating: this.productData(product).ReviewStatistics.AverageOverallRating,
				ratingRange: this.productData(product).ReviewStatistics.OverallRatingRange,
			}
		};
	}

	productData(product) {
		//get first propery from object
		//is is changing something like data-gen-moppq9ekthfzbc6qff3bqokie
		//console.log('product.Includes:',product.Includes);
		
		return product.Includes.Products[Object.keys(product.Includes.Products)[0]]
	}

	reviewReducer(review) {
		return review == null
			? null
			: {
				id: review.Id || 0,
				rating: review.Rating,
				moderationStatus: review.ModerationStatus,
				reviewText: review.ReviewText,
				userNickName: review.UserNickname,
				userEmail: review.UserNickname + "@example.com",
				submissionTimeStamp: review.SubmissionTime
			};
	}

}

module.exports = UserContentAPI;

