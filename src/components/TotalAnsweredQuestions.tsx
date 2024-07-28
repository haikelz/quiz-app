import { answerAtom } from "@/store";
import { useAtomValue } from "jotai";
import { Paragraph } from "./ui/typography";

export default function TotalAnsweredQuestions() {
  const answer = useAtomValue(answerAtom);
  const answeredQuestions = answer.filter((item) => item.answer.length);

  return (
    <div>
      <Paragraph className="font-bold">
        Terjawab: {answeredQuestions.length} dari {answer.length} soal
      </Paragraph>
    </div>
  );
}
