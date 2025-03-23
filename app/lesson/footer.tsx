import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  disabled?: boolean;
  status: "correct" | "incorrect" | "none" | "completed";
  onCheck: () => void;
  lessonId?: number;
};

export const Footer = ({ disabled, onCheck, status, lessonId }: Props) => {
    useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width:1024px)");
  return (
    <footer
      className={cn(
        ":lg:h-[140px] h-[100px] border-t-2 ",
        status === "correct" && "bg-green-100 border-transparent",
        status === "incorrect" && "bg-rose-100 border-transparent"
      )}
    >
      <div className="max-w-[1040px] fh-full max-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
            <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
                <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                Nicely Done!

            </div>

        )}
        {status === "incorrect" && (
            <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
                <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                Try Again.

            </div>

        )}
        {status === "completed" && (
            <Button variant="default" size={isMobile ? "sm" : "lg"} onClick={() => window.location.href = `/lesson/${lessonId}`}>
                Practice Again
            </Button>

        )}
        <Button
          disabled={disabled}
          onClick={onCheck}
          className="ml-auto mt-4"
          size={isMobile ? "sm" : "lg"}
          variant={status === "incorrect" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "incorrect" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};
