const { gql } = require('apollo-server');

const typeDefs = gql`
type Review {
  id: ID!
  rating: Int
  moderationStatus: String
  reviewText: String
  userNickName: String
  submissionTimeStamp: String
}

type ReviewStats {
    reviewCount: Int
	recommendedCount: Int
	notRecommendedCount: Int
	averageRating: Float
	ratingRange: Float
}

extend type Product @key(fields: "id") {
  id: ID! @external
  reviews: [Review]
  reviewStats: ReviewStats!
}

`;

module.exports = typeDefs;

