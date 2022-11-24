import React from "react";
import { Col, Layout, Row } from "antd";
import { useEffect } from "react";
import { useState } from "react";

function Footer() {
  const { Footer } = Layout;
  const [clock, setClock] = useState();
  const [date, setDate] = useState();

  // useEffect(() => {
  //   setInterval(() => {
  //     const date = new Date();
  //     setClock(date.toLocaleTimeString());
  //   }, 1000);
  // }, []);

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setDate(date.toLocaleDateString());
    });
  }, []);
  return (
    <Footer
      // style={{ textAlign: "center", height: "9vh" }}
      className="FooterLogin"
    >
      <div>VBPO ©{new Date().getFullYear()} Made by DRI Team</div>
      <div>
        {date} {clock}
      </div>
    </Footer>
  );
}

export default Footer;
