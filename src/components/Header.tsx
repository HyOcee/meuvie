import BannerImg from "/banner.jpg";

const Header = ({ addNewMovie }: { addNewMovie: () => void }) => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(transparent, rgb(0 0 0 / 59%)), url(${BannerImg})`,
      }}
      className="wx banner-container"
    >
      {/* <img src={BannerImg} alt="Banner Image" /> */}
      {/* <img src={Logo} alt="Banner Image" /> */}

      <div className="pb-5 absolute bottom-0 w-full left-0 flex flex-col gap-6 items-center">
        <h2 className="text-white text-xl xs:text-2xl md:text-3xl text-center">
          Track movies you've watched. <br />
          Save those you want to see. <br />
          Tell your friends what's good.
        </h2>

        <button onClick={addNewMovie} className="button-primary">
          <span className="font-bold">Add Movie</span> - it's free!
        </button>

        <p className="text-grey-header">
          A great way to share memories with loved ones
        </p>
      </div>
    </section>
  );
};

export default Header;
