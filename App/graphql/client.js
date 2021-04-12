import { ApolloClient, InMemoryCache, HttpLink, concat } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getAuthToken } from "../util/AuthManager";

const httpLink = new HttpLink({ uri: "https://mighty-reaches-57750.herokuapp.com/" });

const authMiddleware = setContext((request, context) => {
  return getAuthToken()
    .then((token) => {
      return {
        ...context,
        headers: {
          ...context.headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    })
    .catch(() => {
      return context;
    });
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
