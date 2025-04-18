import { defineData } from '@aws-amplify/backend';

export const financeApi = defineData({
  schema: /* GraphQL */ `
    type Query {
      getStockData(symbol: String!, region: String, interval: String, range: String): String @function(name: "financeApiProxy")
      getFundamentalData(symbol: String!): String @function(name: "financeApiProxy")
      getHistoricalData(symbol: String!, period: String, interval: String): String @function(name: "financeApiProxy")
    }
  `,
});
