// EXTERNAL
import { GraphQLClient, gql } from "graphql-request";
// INTERNAL
import { GraphQLResponse } from "../../lib/types";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const AuthClient = new GraphQLClient("http://localhost:8000/auth", {
      credentials: "include",
      mode: "cors",
    });

    return await AuthClient.rawRequest<GraphQLResponse>(
      gql`
        mutation CreateAuth($request: AuthRegistrationRequest!) {
          register(registration: $request) {
            success
            message
            statusCode
          }
        }
      `,
      {
        request: {
          email,
          password,
          username,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const AuthClient = new GraphQLClient("http://localhost:8000/auth", {
      credentials: "include",
      mode: "cors",
    });

    return await AuthClient.rawRequest<GraphQLResponse>(
      gql`
        mutation LoginAuth($request: AuthAccessRequest!) {
          login(credentials: $request) {
            success
            message
            statusCode
          }
        }
      `,
      {
        request: {
          email,
          password,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};