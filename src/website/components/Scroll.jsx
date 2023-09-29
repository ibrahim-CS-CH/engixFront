import { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

export const Scroll = () => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => {
      const scroll = document.documentElement.scrollTop;
      if (scroll > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    window.addEventListener("scroll", toggleVisible);
    return (
      <button className={`${visible ? "block" : "hidden"}`}>
        <FaArrowCircleUp
          onClick={scrollTop}
          className="fixed bottom-0 right-5 text-5xl text-end animate-bounce text-[#1cda7b]"
        />
      </button>
    );
  };