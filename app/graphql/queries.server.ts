import { GraphQLClient, gql } from "graphql-request";
// import { CommunityClient } from "./client.server";
import { UserProfile } from "../lib/types";

export const getUserProfile = async (headers: Headers) => {
  const CommunityClient = new GraphQLClient("http://localhost:8000/community", {
    credentials: "include",
    mode: "cors",
    headers,
  });

  return await CommunityClient.rawRequest<UserProfile>(
    gql`
      query GetUserProfile {
        getUserProfile {
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
