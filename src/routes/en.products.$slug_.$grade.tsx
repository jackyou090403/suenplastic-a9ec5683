import { createFileRoute, notFound } from "@tanstack/react-router";
import { getGradePage } from "@/lib/grades.functions";
import { GradePage, GradeNotFound, makeGradeHead } from "@/components/grade/GradePage";

export const Route = createFileRoute("/en/products/$slug_/$grade")({
  loader: async ({ params }) => {
    const data = await getGradePage({ data: { series: params.slug, grade: params.grade } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => makeGradeHead("en", params.slug, params.grade, loaderData),
  component: EnGrade,
  notFoundComponent: GradeNotFound,
  errorComponent: GradeNotFound,
});

function EnGrade() {
  const data = Route.useLoaderData();
  const { slug } = Route.useParams();
  return <GradePage data={data} series={slug} />;
}
