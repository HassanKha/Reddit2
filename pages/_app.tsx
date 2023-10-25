import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "./../components/Header";
import {ApolloProvider}from "@apollo/client";
import createApolloClient from '../apollo-client'

export default function App({ Component, pageProps }: AppProps) {
  const client = createApolloClient()
  return (
    <SessionProvider session={pageProps.session}>
    <ApolloProvider client={client} >
      
      <div className="h-screen overflow-y-scroll bg-slate-200">
        <Header />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>   
    </SessionProvider>
  );
}
