import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const SubmitLoadingButton = ({
  text,
  loadingText,
  isLoading,
  className,
  type = "submit",
  onClick,
}: {
  text: ReactNode | string;
  loadingText: ReactNode | string;
  isLoading: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) => {
  return (
    <Button
      type={onClick ? "button" : type}
      onClick={onClick ? onClick : undefined}
      disabled={isLoading}
      className={cn("bg-sky-700 hover:bg-sky-700/80", className)}
    >
      {isLoading ? (
        <>
          <Loader className="animate-spin" /> {loadingText}
        </>
      ) : (
        <>{text}</>
      )}
    </Button>
  );
};

export default SubmitLoadingButton;
