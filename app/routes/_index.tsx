import { type MetaFunction } from "@remix-run/node";
import PageContainer from "../containers/PageContainer";
import CommunityOverview from "../containers/CommunityOverview";
import CreatePostForm from "../containers/CreatePostForm";

export const meta: MetaFunction = () => {
  return [
    { title: "SPADE Mental Health | Home" },
    {
      name: "description",
      content:
        "SPADE Mental Health provides Suicide, PTSD, Anxiety, Depression, and Epilepsy awareness for the African American community.",
    },
  ];
};

export default function Home() {
  return (
    <PageContainer className="">
      <CommunityOverview />
      <aside>
        <CreatePostForm />
      </aside>
    </PageContainer>
  );
}
