import { useClickOutside } from "@/hooks";
import { answerAtom, modalResultAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { Info } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Paragraph } from "./ui/typography";

export default function ModalResult() {
  const answer = useAtomValue(answerAtom);
  const setModalResult = useSetAtom(modalResultAtom);

  const openRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = answer.filter((item) => item.status === true).length * 10;

  useClickOutside(setModalResult, openRef);

  return (
    <div className="fixed top-0 backdrop-blur-sm w-full flex justify-center items-center min-h-svh">
      <div
        ref={openRef}
        className="bg-white p-4 rounded-md drop-shadow-md flex justify-center items-center flex-col space-y-3"
      >
        <div className="flex justify-center items-center space-x-3">
          <Info />
          <Paragraph className="font-bold text-lg">
            {results >= 70 && results <= 100
              ? `Selamat! Nilai kamu ${results}`
              : `Maaf, nilai kamu ${results}!`}
          </Paragraph>
        </div>
        <Button
          onClick={() => {
            navigate("/");
            localStorage.removeItem("preferences");
          }}
          className="font-bold"
        >
          Kembali ke beranda
        </Button>
      </div>
    </div>
  );
}
