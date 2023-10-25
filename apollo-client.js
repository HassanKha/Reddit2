import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://catasauqua.stepzen.net/api/reddit/__graphql",
    mode: 'no-cors',
    headers: {
        Authorization: "apikey catasauqua::stepzen.io+1000::37854a785ffc4c63ad2c88db5c5be0918ab357df8458e68fdc04264de54c810d",
        "Content-Type": "application/json"
    },
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;