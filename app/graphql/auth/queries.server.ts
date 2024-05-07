import { GraphQLClient, gql } from "graphql-request";
import { GraphQLResponse } from "../../lib/types";

export const logOutUserProfile = async (headers: Headers) => {
  const CommunityClient = new GraphQLClient("http://localhost:8000/auth", {
    credentials: "include",
    mode: "cors",
    headers,
  });

  return await CommunityClient.rawRequest<GraphQLResponse>(
    gql`
      query LogOutUserProfile {
        logout {
          success
          message
        }
      }
    `
  ).then(({ data, headers }) => ({
    data: data.logout,
    headers,
  }));
};
