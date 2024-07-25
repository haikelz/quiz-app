import { useClickOutside } from "@/hooks";
import { answerAtom, modalResultAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { Paragraph } from "./ui/typography";

export default function ModalResult() {
  const answer = useAtomValue(answerAtom);
  const setModalResult = useSetAtom(modalResultAtom);

  const openRef = useRef<HTMLDivElement>(null);

  const results = answer.filter((item) => item.status === true).length / 2;

  useClickOutside(setModalResult, openRef);

  return (
    <div className="fixed top-0 backdrop-blur-sm w-full flex justify-center items-center min-h-svh">
      <div ref={openRef} className="bg-white p-4 rounded-md drop-shadow-md">
        <Paragraph>
          {results === 10
            ? "Selamat! Kamu mendapatkan nilai yang sempurna nih."
            : results >= 7
            ? "Selamat! Kamu mendapatkan nilai yang bagus nih."
            : "Maaf, tapi kamu mendapatkan nilai yang kurang bagus nih, coba lagi yaa :)"}
        </Paragraph>
      </div>
    </div>
  );
}
