import { Paragraph } from "./ui/typography";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function ModalNotAvailableData() {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed z-50 top-0 backdrop-blur-sm w-full flex justify-center min-h-svh items-center">
        <div className="bg-white p-4 rounded-md drop-shadow-md flex justify-center items-center flex-col space-y-3">
          <Paragraph className="font-bold text-lg">
            Soal tidak tersedia!
          </Paragraph>
          <Button onClick={() => navigate("/")} className="font-bold">
            Kembali ke beranda
          </Button>
        </div>
      </div>
    </>
  );
}
