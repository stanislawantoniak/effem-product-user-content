class StaticUserContentAPI {

	async getProductById(id) {
		return this.productReducer(id);
	}

	productReducer(id) {
		return {
			id: id,
			reviews: this.getReviews(),
			reviewStats: {
				reviewCount: 3,
				recommendedCount: 2,
				notRecommendedCount: 1,
				averageRating: 4.1,
				ratingRange: 5,
			}
		};
	}

	getReviews() {
		return [ {
				id: 1,
				rating: 4,
				moderationStatus: 'accepted',
				reviewText: 'Great product!',
				userNickName: 'Stan',
				userEmail:  "Stan@example.com",
				submissionTimeStamp: '2019-01-23 12:28:31'
			},{
				id: 2,
				rating: 1,
				moderationStatus: 'accepted',
				reviewText: 'Now way!',
				userNickName: 'Jon',
				userEmail:  "Jon@example.com",
				submissionTimeStamp: '2019-12-03 10:12:15'
			},{
				id: 3,
				rating: 5,
				moderationStatus: 'accepted',
				reviewText: 'Fabulous!',
				userNickName: 'mary',
				userEmail:  "maryjane@example.com",
				submissionTimeStamp: '2020-03-15 02:08:45'
			}
			]
	}

}

module.exports = StaticUserContentAPI;

