import { answerAtom } from "@/store";
import { useAtomValue } from "jotai";
import { Info } from "lucide-react";
import { Button } from "./ui/button";
import { Paragraph } from "./ui/typography";

export default function ModalTimeout() {
  const answer = useAtomValue(answerAtom);
  const results = answer.filter((item) => item.status === true).length * 10;

  return (
    <div className="fixed top-0 backdrop-blur-sm w-full flex justify-center items-center min-h-svh">
      <div className="bg-white p-4 rounded-md drop-shadow-md flex justify-center items-center flex-col space-y-3">
        <div className="flex justify-center items-center space-x-3">
          <Info />
          <Paragraph className="font-bold text-lg">
            Maaf, waktu telah habis! Nilai kamu adalah {results}
          </Paragraph>
        </div>
        <Button
          onClick={() => {
            localStorage.removeItem("preferences");
            window.location.replace("/");
          }}
          className="font-bold"
        >
          Kembali ke beranda
        </Button>
      </div>
    </div>
  );
}
