import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "./Loader";

const Modal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (x: boolean) => void;
}) => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSuccessful(true);
        resolve();
      }, 2000);
    });
  };

  return (
    <>
      <div
        className="absolute z-0 top-0 left-0 right-0 bottom-0 [background-color:rgba(0,0,0,0.3)]"
        onClick={() => (isSubmitting ? null : setIsModalOpen(false))}
      />

      <div className="max-h-[90vh] bg-[#456] rounded-md overflow-y-auto fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <button
          className="cursor-pointer hover:text-[#456] hover:bg-white absolute right-4 top-4 rounded-md border border-grey-header px-3 py-1 text-xs text-grey-header"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>

        {isSuccessful ? (
          <>
            <div className="w-[90vw] text-white flex items-center justify-center max-w-[450px] h-[80vh] max-h-[400px] rounded-md">
              <h3 className="font-bold text-grey-body text-2xl">
                Movie Added Successfully!
              </h3>
            </div>
          </>
        ) : isSubmitting ? (
          <div className="w-[90vw] text-white max-w-[450px]">
            <Loader />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-10 w-[90vw] text-white max-w-[450px]  z-10 rounded-md [box-shadow:0_5px_20px_0_rgba(0,0,0,0.04)]"
          >
            <h2 className="font-bold text-lg md:text-xl">Add Movie</h2>

            <div className="input-label-holder mb-3 mt-3">
              <p>Movie title:</p>

              <input
                {...register("title", { required: "Movie title is required" })}
                type="text"
              />
            </div>

            <div className="input-label-holder mb-3">
              <p>Year released:</p>

              <input
                {...register("year", { required: "Year released is required" })}
                type="number"
              />
            </div>

            <div className="input-label-holder mb-3">
              <p>Author:</p>

              <input
                {...register("author", { required: "Author is required" })}
                type="text"
              />
            </div>

            <div className="input-label-holder mb-3">
              <p>Producer:</p>

              <input
                {...register("producer", { required: "Producer is required" })}
                type="text"
              />
            </div>

            <div className="flex flex-col mt-8">
              <button disabled={!isValid} className="button-primary">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Modal;
