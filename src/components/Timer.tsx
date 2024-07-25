import { useAtom } from "jotai";
import { Paragraph } from "./ui/typography";
import { dateAtom } from "@/store";
import { useEffect } from "react";

export default function Timer() {
  const [date, setDate] = useAtom(dateAtom);

  useEffect(() => {
    setInterval(() => {
      // setDate();
    });
  }, [setDate]);

  return (
    <div>
      <Paragraph>{date}</Paragraph>
    </div>
  );
}
