import { useClickOutside } from "@/hooks";
import { modalConfirmationSubmitAtom, modalResultAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { Button } from "./ui/button";

export default function ModalConfirmationSubmit() {
  const setModalConfirmationSubmit = useSetAtom(modalConfirmationSubmitAtom);
  const setModalResult = useSetAtom(modalResultAtom);

  const openRef = useRef<HTMLDivElement>(null);

  useClickOutside(setModalResult, openRef);

  return (
    <div className="fixed top-0 backdrop-blur-sm w-full flex justify-center items-center min-h-svh">
      <div ref={openRef} className="bg-white p-4 rounded-md drop-shadow-md">
        <Button>No</Button>
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
  );
}
