import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const CourtCard = ({
  title,
  price,
  img,
}: {
  title: string;
  price: string;
  img: string;
}) => {
  return (
    <Card className="w-full pt-0 overflow-hidden">
      <CardHeader className="p-0 overflow-hidden aspect-video">
        <Image
          src={img}
          alt={title}
          layout="responsive"
          width={500}
          height={300}
          className="w-full object-cover object-center"
        />
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p>{price}</p>
        <Button className="mt-4 w-full">Lihat Jadwal</Button>
      </CardContent>
    </Card>
  );
};

export default CourtCard;
