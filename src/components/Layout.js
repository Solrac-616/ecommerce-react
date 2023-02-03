import React, {useState, useEffect} from 'react';
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Layout = () => {
  /*----------------------------------------------------------SCROLL NAVBAR*/ 
  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = (winScroll/height) * 100;
    setScrollTop(scrolled);
  }
  console.log(scrollTop)

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () =>  window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <>
      <Header isScrolling={scrollTop} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
