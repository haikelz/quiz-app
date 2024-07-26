import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";
import { quizCategories } from "@/lib/utils";
import { modalPreferencesAtom } from "@/store";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [modalPreferences, setModalPreferences] = useAtom(modalPreferencesAtom);

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
                  <Button variant="destructive">Sign Out</Button>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton forceRedirectUrl="/">
                  <Button variant="outline" className="font-medium">
                    Sign In dengan Google
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button
                  onClick={() =>
                    setModalPreferences((prev) => ({
                      ...prev,
                      isOpenModal: true,
                    }))
                  }
                >
                  Set your preferences
                </Button>
              </SignedIn>
            </div>
          </div>
          <img src="/images/illustration.svg" className="w-96 h-96" />
        </div>
      </section>
      {modalPreferences.isOpenModal ? <ModalPreferences /> : null}
    </>
  );
}

function ModalPreferences() {
  const [modalPreferences, setModalPreferences] = useAtom(modalPreferencesAtom);

  const openRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 backdrop-blur-sm w-full flex justify-center items-center min-h-svh">
      <div
        ref={openRef}
        className="bg-white p-4 rounded-md flex justify-center items-center flex-col drop-shadow-md"
      >
        <Paragraph>Kategori</Paragraph>
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
        <Paragraph>Tingkat kesusahan</Paragraph>
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
        <Paragraph>Tipe</Paragraph>
        <select
          value={modalPreferences.type}
          onChange={(e) =>
            setModalPreferences((prev) => ({
              ...prev,
              type: e.target.value,
            }))
          }
        >
          {[{ type: "multiple" }, { type: "boolean" }].map((item, index) => (
            <option key={index + 1} value={item.type}>
              {item.type}
            </option>
          ))}
        </select>
        <div className="flex justify-center items-center space-x-3 w-fit">
          <Button
            onClick={() =>
              setModalPreferences((prev) => ({ ...prev, isOpenModal: false }))
            }
            variant="destructive"
          >
            Batal
          </Button>
          <Button
            onClick={() => {
              localStorage.setItem(
                "preferences",
                JSON.stringify(modalPreferences)
              );
              navigate("/quiz");
            }}
          >
            Mulai!
          </Button>
        </div>
      </div>
    </div>
  );
}
