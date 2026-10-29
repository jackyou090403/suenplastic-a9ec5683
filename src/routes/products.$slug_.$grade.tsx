import { createFileRoute, notFound } from "@tanstack/react-router";
import { getGradePage } from "@/lib/grades.functions";
import { GradePage, GradeNotFound, makeGradeHead } from "@/components/grade/GradePage";

export const Route = createFileRoute("/products/$slug_/$grade")({
  loader: async ({ params }) => {
    const data = await getGradePage({ data: { series: params.slug, grade: params.grade } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => makeGradeHead("zh", params.slug, params.grade, loaderData),
  component: ZhGrade,
  notFoundComponent: GradeNotFound,
  errorComponent: GradeNotFound,
});

function ZhGrade() {
  const data = Route.useLoaderData();
  const { slug } = Route.useParams();
  return <GradePage data={data} series={slug} />;
}
