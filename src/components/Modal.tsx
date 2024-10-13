const Modal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (x: boolean) => void;
}) => {
  return (
    <>
      <div
        className="absolute z-0 top-0 left-0 right-0 bottom-0 [background-color:rgba(0,0,0,0.3)]"
        onClick={() => setIsModalOpen(false)}
      />

      <div className="max-h-[90vh] overflow-y-auto fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <form className="p-6 w-[90vw] text-white max-w-[450px] bg-[#456] z-10 rounded-md [box-shadow:0_5px_20px_0_rgba(0,0,0,0.04)]">
          <button
            className="cursor-pointer  absolute right-4 top-4"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>

          <h2 className="font-bold text-lg md:text-xl">Add Movie</h2>

          <div className="input-label-holder mb-3 mt-3">
            <p>Movie title:</p>

            <input type="text" />
          </div>

          <div className="input-label-holder mb-3">
            <p>Year released:</p>

            <input type="text" />
          </div>

          <div className="input-label-holder mb-3">
            <p>Author:</p>

            <input type="text" />
          </div>

          <div className="input-label-holder mb-3">
            <p>Producer:</p>

            <input type="text" />
          </div>

          <div className="flex flex-col mt-8">
            <button className="button-primary">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
