import { useAtom } from "jotai";
import { Paragraph } from "./ui/typography";
import { dateAtom } from "@/store";
import { useEffect } from "react";
import { format } from "date-fns";

export default function Timer() {
  const [date, setDate] = useAtom(dateAtom);

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, [setDate, date]);

  return (
    <div>
      <Paragraph>{format(date, "m.s")}</Paragraph>
    </div>
  );
}
