import { useClickOutside } from "@/hooks";
import { modalConfirmationSubmitAtom, modalResultAtom } from "@/store";
import { useSetAtom } from "jotai";
import { Info } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Paragraph } from "./ui/typography";

export default function ModalConfirmationSubmit() {
  const setModalConfirmationSubmit = useSetAtom(modalConfirmationSubmitAtom);
  const setModalResult = useSetAtom(modalResultAtom);

  const openRef = useRef<HTMLDivElement>(null);

  useClickOutside(setModalConfirmationSubmit, openRef);

  return (
    <div className="fixed top-0 backdrop-blur-sm w-full flex justify-center items-center min-h-svh">
      <div
        ref={openRef}
        className="bg-white p-4 rounded-md flex justify-center items-center flex-col drop-shadow-md"
      >
        <div className="flex justify-center items-center space-x-3">
          <Info />
          <Paragraph className="font-medium">
            Apakah kamu yakin ingin menyelesaikan kuis ini?
          </Paragraph>
        </div>
        <div className="flex space-x-3 justify-center items-center mt-3">
          <Button
            variant="destructive"
            onClick={() => setModalConfirmationSubmit(false)}
          >
            No
          </Button>
          <Button
            onClick={() => {
              setModalConfirmationSubmit(false);
              setModalResult(true);
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
