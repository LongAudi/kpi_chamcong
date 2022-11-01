import React from "react";
import { Layout } from "antd";

function Footer() {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: "center", height: "6vh" }}>
      VBPO ©{new Date().getFullYear()} Made by DRI Team
    </Footer>
  );
}

export default Footer;
