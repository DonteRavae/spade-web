import { json } from "@remix-run/node";
import { loginUser, registerUser } from "../graphql/auth/mutations.server";
import { GraphQLResponse, UserProfile } from "../lib/types";
import { getUserProfile } from "../graphql/community/queries.server";
import { logOutUserProfile } from "../graphql/auth/queries.server";

export const GetUserProfileHandler = async (headers: Headers) => {
  const { success, message, payload } = (await getUserProfile(
    headers
  )) as unknown as GraphQLResponse;

  return success
    ? json({ profile: payload as UserProfile, error: null })
    : json({ profile: null, error: message });
};

export const RegisterUserHandler = async (formData: {
  [k: string]: FormDataEntryValue;
}) => {
  const { username, email, password } = formData;
  const { data, headers } = await registerUser(
    username as string,
    email as string,
    password as string
  );

  return json(
    { data },
    {
      headers: {
        "set-cookie": headers.get("set-cookie") || "",
      },
    }
  );
};

export const LogInUserHandler = async (formData: {
  [k: string]: FormDataEntryValue;
}) => {
  const { email, password } = formData;
  const { data, headers } = await loginUser(
    email as string,
    password as string
  );

  return json(
    { data },
    {
      headers: {
        "set-cookie": headers.get("set-cookie") || "",
      },
    }
  );
};

export const LogOutUserProfile = async (requestHeaders: Headers) => {
  const { data, headers } = await logOutUserProfile(requestHeaders);
  const { success, message } = data as unknown as GraphQLResponse;

  return success
    ? json(
        { errors: null },
        {
          headers: {
            "set-cookie": headers.get("set-cookie") || "",
          },
        }
      )
    : json({ errors: message });
};
