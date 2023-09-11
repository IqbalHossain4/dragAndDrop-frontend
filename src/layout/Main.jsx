import React, { useEffect, useState } from "react";
import Home from "../Page/Home";
import PreLoader from "../Components/PreLoader/PreLoader";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  <style>body{isLoading}</style>;
  return (
    <div>
      <div>
        {isLoading ? (
          <PreLoader />
        ) : (
          <div>
            {" "}
            <Home />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
