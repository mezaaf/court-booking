import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { convertIDR } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CourtCard = ({
  id,
  title,
  price,
  img,
}: {
  id: string;
  title: string;
  price: number;
  img: string;
}) => {
  return (
    <Card className="w-full pt-0 overflow-hidden">
      <CardHeader className="p-0 overflow-hidden aspect-video">
        <Image
          src={img}
          alt={title}
          width={500}
          height={300}
          className="w-full object-cover object-center"
        />
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p>{convertIDR(price)}</p>
        <Button className="mt-4 w-full bg-sky-700 hover:bg-sky-700/80" asChild>
          <Link href={`/courts/${id}`}>Lihat Jadwal</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourtCard;
