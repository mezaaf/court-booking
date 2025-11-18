const Footer = () => {
  return (
    <footer className="flex items-center justify-center flex-wrap gap-5 border-t py-5 bg-muted mt-16 sm:mt-20 lg:mt-24 w-full">
      <p>&copy; {new Date().getFullYear()} Laraia Sport. All rights reserved</p>
    </footer>
  );
};

export default Footer;
