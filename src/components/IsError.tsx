import { Paragraph } from "./ui/typography";

export default function IsError() {
  return (
    <section className="flex justify-center items-center w-full min-h-svh">
      <Paragraph className="font-bold text-2xl">Error!</Paragraph>
    </section>
  );
}
