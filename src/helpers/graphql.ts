import { setContext } from '@apollo/client/link/context';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, from } from '@apollo/client';
import { AUTH_TOKEN } from '../helpers/contants';

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_BASE_URL as string });
const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    if (token) {

        const authorizationHeader = token ? `Bearer ${token}` : null
        operation.setContext({
            headers: {
                authorization: authorizationHeader
            }
        })
    }
    return forward(operation)
})

const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        const context = operation.getContext()
        const { response: { headers } } = context

        if (headers) {
            const token = headers.get('authorization')
            if (token) {
                localStorage.setItem(AUTH_TOKEN, token)
            }
        }

        return response
    })
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([middlewareAuthLink, afterwareLink, httpLink]),
});

export default client;
