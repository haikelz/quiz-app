import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";
import { useClickOutside, useTitle } from "@/hooks";
import { quizCategories } from "@/lib/utils";
import { isOpenModalPreferencesAtom, modalPreferencesAtom } from "@/store";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useAtom, useSetAtom } from "jotai";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const setModalPreferences = useSetAtom(modalPreferencesAtom);

  const [isOpenModalPreferences, setIsOpenModalPreferences] = useAtom(
    isOpenModalPreferencesAtom
  );

  const navigate = useNavigate();

  return (
    <>
      <section className="w-full flex flex-col justify-center max-w-4xl min-h-svh items-center">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-start">
            <div>
              <div>
                <Heading as="h2">Unleash the Fun, One Quiz at a Time</Heading>
                <Paragraph className="mt-2">
                  Welcome to Quizkuy, the ultimate destination for quiz lovers!
                </Paragraph>
              </div>
            </div>
            <div className="flex space-x-3 mt-4 justify-center items-center w-fit">
              <SignedIn>
                <SignOutButton>
                  <Button variant="destructive" className="font-bold">
                    Sign Out
                  </Button>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <Button
                  variant="outline"
                  className="font-bold"
                  onClick={() => navigate("/auth/sign-in")}
                >
                  Sign In dengan Google
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  onClick={() => {
                    setIsOpenModalPreferences(true);
                    setModalPreferences((prev) => ({
                      ...prev,
                      isOpenModal: true,
                    }));
                  }}
                  className="font-bold"
                >
                  Set your preferences
                </Button>
              </SignedIn>
            </div>
          </div>
          <img src="/images/illustration.svg" className="w-96 h-96" />
        </div>
      </section>
      {isOpenModalPreferences ? <ModalPreferences /> : null}
    </>
  );
}

function ModalPreferences() {
  const [modalPreferences, setModalPreferences] = useAtom(modalPreferencesAtom);

  const setIsOpenModalPreferences = useSetAtom(isOpenModalPreferencesAtom);

  const openRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useTitle("Quizkuy");
  useClickOutside(setIsOpenModalPreferences, openRef);

  return (
    <div className="fixed top-0 backdrop-blur-sm w-full flex justify-center items-center min-h-svh">
      <div
        ref={openRef}
        className="bg-white p-4 rounded-md flex justify-center items-center flex-col drop-shadow-md"
      >
        <div className="space-y-3">
          <div>
            <Paragraph className="font-bold">Kategori</Paragraph>
            <select
              value={modalPreferences.category}
              onChange={(e) =>
                setModalPreferences((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              {quizCategories.map((item, index) => (
                <option key={index + 1} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Paragraph className="font-bold">Tingkat kesusahan</Paragraph>
            <select
              value={modalPreferences.difficulity}
              onChange={(e) =>
                setModalPreferences((prev) => ({
                  ...prev,
                  difficulity: e.target.value,
                }))
              }
            >
              {[
                { difficulity: "easy" },
                { difficulity: "medium" },
                { difficulity: "hard" },
              ].map((item, index) => (
                <option key={index + 1} value={item.difficulity}>
                  {item.difficulity}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Paragraph className="font-bold">Tipe</Paragraph>
            <select
              value={modalPreferences.type}
              onChange={(e) =>
                setModalPreferences((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
            >
              {[
                { type: "random" },
                { type: "multiple" },
                { type: "boolean" },
              ].map((item, index) => (
                <option key={index + 1} value={item.type}>
                  {item.type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 space-x-3 w-fit">
          <Button
            onClick={() => {
              setIsOpenModalPreferences(false);
              setModalPreferences((prev) => ({ ...prev, isOpenModal: false }));
            }}
            variant="destructive"
            className="font-bold"
          >
            Batal
          </Button>
          <Button
            onClick={() => {
              setIsOpenModalPreferences(false);
              localStorage.setItem(
                "preferences",
                JSON.stringify(modalPreferences)
              );
              navigate("/quiz");
            }}
            className="font-bold"
          >
            Mulai!
          </Button>
        </div>
      </div>
    </div>
  );
}
