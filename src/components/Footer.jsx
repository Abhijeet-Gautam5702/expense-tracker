import React from "react";

function Footer() {
  return (
    <div className="w-full sticky bottom-0 p-3 text-[13px] bg-primary text-background">
      <p className="text-center">
        Made with love by{" "}
        <a
          href="https://github.com/Abhijeet-Gautam5702"
          target="_blank"
          className="text-link font-regular hover:underline"
        >
          Abhijeet Gautam
        </a>
      </p>
    </div>
  );
}

export default Footer;
