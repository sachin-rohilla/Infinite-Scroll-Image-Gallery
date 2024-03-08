import { useEffect, useState } from "react";

function App() {
  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  async function getImageData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments" +
          "?_limit=10 &_page=" +
          page
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
      <div className="flex items-center justify-center mx-auto ">
        <div className="flex flex-wrap items-center gap-4 w-[80%]">
          {imageData?.length > 0 &&
            imageData.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1709136485727-b4407111e90a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMzF8fHxlbnwwfHx8fHw%3D"
                  className="w-40 object-cover "
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
