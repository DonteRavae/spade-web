// EXTERNAL
import { GraphQLClient, gql } from "graphql-request";
// INTERNAL
import { UserProfile } from "../../lib/types";

export const getUserProfile = async (headers: Headers) => {
  const CommunityClient = new GraphQLClient("http://localhost:8000/community", {
    credentials: "include",
    mode: "cors",
    headers,
  });

  return await CommunityClient.rawRequest<UserProfile>(
    gql`
      query GetLoggedInUserProfile {
        getLoggedInUserProfile {
          success
          message
          payload {
            username
            avatar
            likes
          }
        }
      }
    `
  );
};
