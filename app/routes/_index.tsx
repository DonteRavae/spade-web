import { type MetaFunction } from "@remix-run/node";
import PageContainer from "../containers/PageContainer";

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
      <div className="w-1/2">
        <section className="w-full min-h-72 border flex-auto">FEATURED</section>
        <section className="min-h-96 w-2/3 border flex-auto">TRENDING</section>
        <section className="h-auto w-1/4 border flex-auto">RECENT</section>
        <section className="h-auto w-full border flex-auto">NEWSLETTER</section>
        <section className="h-auto w-2/3 border flex-auto">DISCUSSIONS</section>
        <section className="h-auto w-1/4 border flex-auto">RANTS</section>
      </div>
      <aside>
        
      </aside>
    </PageContainer>
  );
}
