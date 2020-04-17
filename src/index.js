const { ApolloServer, AuthenticationError } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const BazaarUserContentAPI = require('./datasources/user_content_bazaar');
const StaticUserContentAPI = require('./datasources/user_content_bazaar');

const dotenv = require('dotenv');
dotenv.config();

const { buildFederatedSchema } = require('@apollo/federation');

const schema = buildFederatedSchema([{
	typeDefs,
	resolvers
}]);

const api = new BazaarUserContentAPI();
const staticApi = new StaticUserContentAPI();

const server = new ApolloServer({
	schema: schema,
	dataSources: () => ({
		userContentAPI: api,
		staticUserContentAPI: staticApi
	}),
	context: ({ req }) => {
		var userbase64 = req.headers['x-user-data'] || '';

		const user = JSON.parse(new Buffer(userbase64, 'base64').toString());

		//if (!user.authenticated) throw new AuthenticationError('Unauthorized: You must pass valid user data here.');

		console.log('user from upstream: ', user);
		// add the user to the context
		return { user };
	}

});

//api.getProductById('xx').then( 
//		result => console.log('sample review: ', result) ,
//		error => console.error( error)
//		);

server.listen({ port: process.env.PORT || 4003 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
