import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";

const BankCard = ({
  bankName,
  accountNumber,
  accountHolder,
}: {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}) => {
  return (
    <Card className="rounded-sm">
      <CardContent>
        <h1 className="font-bold flex items-center justify-between">
          {bankName}{" "}
          <Button size="sm" variant="ghost">
            <Copy /> Salin
          </Button>
        </h1>
        <p>No. Rekening: {accountNumber}</p>
        <p>Atas Nama: {accountHolder}</p>
      </CardContent>
    </Card>
  );
};

export default BankCard;
