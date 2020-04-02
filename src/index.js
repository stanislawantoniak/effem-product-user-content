const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const UserContentAPI = require('./datasources/user_content');

const dotenv = require('dotenv');
dotenv.config();

const { buildFederatedSchema } = require('@apollo/federation');

const schema = buildFederatedSchema([{
	typeDefs,
	resolvers
}]);

const api = new UserContentAPI();

const server = new ApolloServer({
	schema: schema,
	dataSources: () => ({
		userContentAPI: api
	}),
    engine: {
		apiKey: process.env.AGM_API_KEY,
		schemaTag: process.env.AGM_SCHEMA_TAG
	}
});

//api.getProductById('xx').then( 
//		result => console.log('sample review: ', result) ,
//		error => console.error( error)
//		);

server.listen({ port: process.env.PORT || 4003 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
