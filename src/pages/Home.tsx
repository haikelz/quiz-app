import IsError from "@/components/IsError";
import IsPending from "@/components/IsPending";
import { Heading, Paragraph } from "@/components/ui/typography";
import { useFetch } from "@/hooks";
import { env } from "@/lib/utils";
import { QuestionProps } from "@/types";
import htmr from "htmr";

export default function Homepage() {
  const { data, isPending, isError } = useFetch(`${env.API_URL}?amount=10`);

  if (isPending) return <IsPending />;
  if (isError) return <IsError />;

  const questions = data.results as QuestionProps[];

  return (
    <section>
      <Heading>Quizkuy</Heading>
      {questions.map((item, index) => (
        <div key={index + 1}>
          <Paragraph>{item.type}</Paragraph>
          <Paragraph>{htmr(item.question)}</Paragraph>
        </div>
      ))}
    </section>
  );
}
