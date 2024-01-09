import React from "react";

function ErrorText({ children, ...props }) {
  return <p className="text-md leading-5 text-red-600 mt-3">{children}</p>;
}

export default ErrorText;
