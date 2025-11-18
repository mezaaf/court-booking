import Image from "next/image";
import Link from "next/link";

const ContactSection = () => {
  return (
    <div
      id="contact"
      className="w-full grid grid-cols-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-20 lg:mt-24"
    >
      <div className="w-full">
        <h1 className="text-3xl font-bold">Hubungi Kami</h1>
        <p className="text-lg mt-2 mb-4">
          Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.
          Jangan ragu untuk menghubungi kami melalui informasi kontak yang
          tersedia.
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-semibold">Alamat:</h2>
            <Link
              href="https://maps.app.goo.gl/WwyEPz9YZHSEYvoB6"
              className="hover:underline hover:font-semibold transition-all duration-300 ease-in-out"
              target="_blank"
            >
              Jl. Mojoarum RT.41/RW.03, Krajan I, Mojopurno, Wungu, Madiun, Jawa
              Timur (63181)
            </Link>
          </div>
          <div>
            <h2 className="font-semibold">Whatsapp:</h2>
            <Link
              href="https://wa.me/62895603575957"
              className="hover:underline hover:font-semibold transition-all duration-300 ease-in-out"
              target="_blank"
            >
              +62 895-6035-75957
            </Link>
          </div>
          <div>
            <h2 className="font-semibold">Instagram :</h2>
            <Link
              href="https://instagram.com/laraiasportmadiun"
              className="hover:underline hover:font-semibold transition-all duration-300 ease-in-out"
              target="_blank"
            >
              @laraiasportmadiun
            </Link>
          </div>
          <div>
            <h2 className="font-semibold">Email:</h2>
            <Link
              href="mailto:contact@contohemail.com"
              className="hover:underline hover:font-semibold transition-all duration-300 ease-in-out"
              target="_blank"
            >
              contact@contohemail.com
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center rounded-lg overflow-hidden p-3 bg-sky-700">
        <Image
          src="/images/logo.png"
          alt="Contact Us"
          width={600}
          height={400}
          className="w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default ContactSection;
