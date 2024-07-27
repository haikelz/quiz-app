import { ModalPreferencesProps } from "@/types";
import { atom } from "jotai";

export const timeLeftAtom = atom<number>(20);
export const isRunningAtom = atom<boolean>(true);

export const modalConfirmationAtom = atom<boolean>(false);
export const selectAnswerAtom = atom<string>("");
export const modalConfirmationSubmitAtom = atom<boolean>(false);
export const modalResultAtom = atom<boolean>(false);
export const isOpenModalPreferencesAtom = atom<boolean>(false);
export const isBackToPreviousQuestionAtom = atom<boolean>(false);
export const isNextQuestionAtom = atom<boolean>(false);

export const answerAtom = atom<
  { id: number; answer: string; status: boolean }[]
>(
  Array(10)
    .fill(null)
    .map((_, index) => ({ id: index + 1, answer: "", status: false }))
);

export const modalPreferencesAtom = atom<ModalPreferencesProps>(
  (JSON.parse(localStorage.getItem("preferences") as string) || {
    category: "9",
    difficulity: "easy",
    type: "multiple",
    isOpenModal: false,
  }) as ModalPreferencesProps
);
