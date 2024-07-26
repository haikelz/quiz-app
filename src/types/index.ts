import { SetStateAction } from "jotai";
import { Dispatch, HTMLAttributes, ReactNode } from "react";

export type ChildrenProps = { children: ReactNode };

export type QuestionProps = {
  id: number;
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as: "h1" | "h2" | "h3" | "h4";
};

export type ParagraphProps = ChildrenProps &
  HTMLAttributes<HTMLParagraphElement>;

export type UsePaginationProps<T> = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageNumbers: number[];
  currentData: Array<T>;
};

export type ModalPreferencesProps = {
  category: string;
  difficulity: string;
  type: string;
  isOpenModal: boolean;
};
