import { GraphQLClient, gql } from "graphql-request";
import { AuthResponse } from "../lib/types";

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

    return await AuthClient.rawRequest<AuthResponse>(
      gql`
        mutation CreateAuth($request: AuthRegistrationRequest!) {
          register(registration: $request) {
            success
            message
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
