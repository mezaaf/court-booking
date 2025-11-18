import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

const WhyChooseUseCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <Card className="w-full flex flex-col items-center justify-center">
      <CardHeader className="w-full flex flex-col justify-center items-center">
        <CardTitle className="flex items-center gap-1">
          <Icon className="size-5" />
          {title}
        </CardTitle>
        <CardDescription className="text-center mt-2">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default WhyChooseUseCard;
