import { Card, CardContent } from "@/components/ui/card";
import HeroBookForm from "./HeroBookForm";

const HeroSection = () => {
  return (
    <div className="w-full bg-[url('/images/hero-bg.jpg')] bg-top-center bg-cover bg-no-repeat py-8 sm:py-12 lg:py-16">
      <div className="w-full min-h-[calc(100vh-64px)] max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center gap-4 sm:gap-6 lg:gap-8 pt-16 sm:pt-20 lg:pt-24">
        <h1 className="text-white text-4xl font-semibold md:text-5xl lg:text-6xl max-w-3xl">
          Pesan lapangan bulutangkis Anda dalam hitungan detik
        </h1>
        <p className="text-white max-w-2xl">
          Amankan tempat Anda kapan saja - tingkatkan permainan Anda hari ini
          dengan membuat pilihan yang lebih cerdas, bukan hanya bekerja lebih
          keras!
        </p>
        <Card className="w-full max-w-3xl">
          <CardContent>
            <HeroBookForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
