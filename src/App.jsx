import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

function App() {
  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  async function getImageData() {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=10`
      );
      const jsonData = await response.json();
      setImageData((prev) => [...prev, ...jsonData]);
      // setImageData([...imageData, ...jsonData]);
    } catch (err) {
      console.log(err);
    }
  }
  const handleScroll = () => {
    // const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    getImageData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(imageData);
  return (
    <>
      <div className="py-10">
        <h1 className="font-semibold text-2xl mb-8 text-center">
          Image Gallery
        </h1>
        <div className="flex items-center justify-center mx-auto   ">
          <div className="flex flex-wrap justify-center items-center gap-4 w-[90%]">
            {imageData?.length > 0 &&
              imageData.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg shadow-md ">
                  <img
                    src={item?.download_url}
                    className=" w-64 lg:min-w-[300px] h-96  object-cover "
                  />
                </div>
              ))}
          </div>
        </div>
        {!isLoading && (
          <FaSpinner className="animate-spin text-2xl mx-auto  text-black mt-8" />
        )}
      </div>
    </>
  );
}

export default App;
