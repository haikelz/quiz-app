import { useEffect } from "react";

/**
 * A custom hook to dynamically set title
 * @export
 * @param {string} title
 */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
