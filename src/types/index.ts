import { HTMLAttributes, ReactNode } from "react";

export type ChildrenProps = { children: ReactNode };

export type QuestionProps = {
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
