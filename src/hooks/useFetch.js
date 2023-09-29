import { useEffect, useState } from "react"


export const useFetch = (url) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Set isLoading to true before making the request
    setData((prevData) => ({
      ...prevData,
      isLoading: true,
    }));

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((responseData) => {
        setData((prevData) => ({
          ...prevData,
          data: responseData,
          isLoading: false,
          error: null, // Clear any previous errors on success
        }));
      })
      .catch((error) => {
        setData((prevData) => ({
          ...prevData,
          isLoading: false,
          error: error, // Set the error state
        }));
      });
  }, [url]);

  return {
    data: data.data,
    isLoading: data.isLoading,
    error: data.error,
  };
};