const Footer = () => {
  return (
    <footer className="bg-[#2C3440]  wx pt-4 pb-8 grid gap-y-3">
      <div className="flex gap-4 flex-wrap">
        <span className="font-semibold text-grey-header">About</span>
        <span className="font-semibold text-grey-header">Pro</span>
        <span className="font-semibold text-grey-header">News</span>
        <span className="font-semibold text-grey-header">Apps</span>
        <span className="font-semibold text-grey-header">Podcast</span>
      </div>

      <p className="text-grey-body text-sm">
        Meuvie Limited. Made by Engr Osemegbe, Nigeria.
      </p>
    </footer>
  );
};

export default Footer;
