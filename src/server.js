const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLInt = graphql.GraphQLInt;

const goldbergs = require('./goldbergs');

const getGoldberg = id => goldbergs[id];

const goldbergType = new GraphQLObjectType({
    name: 'Goldberg',
    description: 'Member of The Goldbergs',
    fields: {
        character: {
            type: GraphQLString,
            description: 'Name of the character',
        },
        actor: {
            type: GraphQLString,
            description: 'Actor playing the character',
       },
       role: {
           type: GraphQLString,
           description: 'Family role'
       },
       traits: {
           type: GraphQLString,
           description: 'Traits this Goldberg is known for'
       },
       id: {
           type: GraphQLInt,
           description: 'ID of this Goldberg'
       }
   }
});

const queryType = new GraphQLObjectType({
    name: 'query',
    description: 'Goldberg query',
    fields: {
        goldberg: {
            type: goldbergType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (_, args) => getGoldberg(args.id)
        }
    }
});

const schema = new GraphQLSchema({ query: queryType });

const graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(8080);
console.log('The GraphQL Server is running.')

const compiler = webpack({
    entry: './src/index',
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '../static/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
});

const app = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {
        '/graphql': `http://localhost:${8080}`
    },
    publicPath: '/static/',
    stats: {
        colors: true
    }
});
app.use('/', express.static('static'));
app.listen(3000);
console.log('The App Server is running.')
