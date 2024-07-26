import { useClickOutside } from "@/hooks";
import { answerAtom, modalResultAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { Paragraph } from "./ui/typography";
import { Info } from "lucide-react";

export default function ModalResult() {
  const answer = useAtomValue(answerAtom);
  const setModalResult = useSetAtom(modalResultAtom);

  const openRef = useRef<HTMLDivElement>(null);

  const results =
    (answer.filter((item) => item.status === true).length / 2) * 10;

  useClickOutside(setModalResult, openRef);

  return (
    <div className="fixed top-0 backdrop-blur-sm w-full flex justify-center items-center min-h-svh">
      <div
        ref={openRef}
        className="bg-white p-4 rounded-md drop-shadow-md flex justify-center items-center space-x-3"
      >
        <Info />
        <Paragraph className="font-medium">
          {results >= 70 && results <= 100
            ? `Selamat! Nilai kamu ${results}`
            : `Maaf, nilai kamu ${results}`}
        </Paragraph>
      </div>
    </div>
  );
}
