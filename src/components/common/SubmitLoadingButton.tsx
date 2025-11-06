import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const SubmitLoadingButton = ({
  text,
  loadingText,
  isLoading,
  className,
}: {
  text: string;
  loadingText: string;
  isLoading: boolean;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
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
