import { atom } from "jotai";

export const quizCategoryAtom = atom<number>();
export const answerAtom = atom<string>("");
export const rightAnswerAtom = atom<string>("");
export const modalConfirmationAtom = atom<boolean>(false);
export const amountQuestionsAtom = atom<number>(10);
