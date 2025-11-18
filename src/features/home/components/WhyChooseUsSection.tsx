import { ClockIcon, DollarSign, ShieldPlusIcon } from "lucide-react";
import WhyChooseUseCard from "./WhyChooseUseCard";

const WhyChooseUsSection = () => {
  return (
    <div className="w-full flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-20 lg:mt-24">
      <h2 className="text-3xl font-bold text-center">Mengapa Memilih Kami?</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {whyChooseUseData.map((item) => (
          <WhyChooseUseCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUsSection;

const whyChooseUseData = [
  {
    title: "Harga Terjangkau",
    description:
      "Nikmati harga kompetitif yang memberikan nilai terbaik untuk pengalaman bermain bulutangkis Anda tanpa mengorbankan kualitas.",
    icon: DollarSign,
  },
  {
    title: "Fasilitas Terjamin",
    description:
      "Bermain di lapangan yang bersih dan terawat dengan peralatan modern untuk memastikan kenyamanan dan keamanan Anda.",
    icon: ShieldPlusIcon,
  },
  {
    title: "Jadwal Fleksibel",
    description:
      "Pesan lapangan kapan saja sesuai kebutuhan Anda, dengan sistem pemesanan online yang mudah digunakan.",
    icon: ClockIcon,
  },
];
