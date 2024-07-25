import { atom } from "jotai";

export const quizCategoryAtom = atom<number>();
export const rightAnswerAtom = atom<string>("");
export const modalConfirmationAtom = atom<boolean>(false);
export const amountQuestionsAtom = atom<number>(10);
export const dateAtom = atom<Date>(new Date());
export const selectAnswerAtom = atom<string>("");
export const modalConfirmationSubmitAtom = atom<boolean>(false);
export const modalResultAtom = atom<boolean>(false);
export const answerAtom = atom<
  { id: number; answer: string; status: boolean }[]
>(
  Array(10)
    .fill(null)
    .map((_, index) => ({ id: index + 1, answer: "", status: false }))
);
