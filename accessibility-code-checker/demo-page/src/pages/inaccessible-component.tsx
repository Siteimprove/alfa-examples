import React, { useState } from "react";

export const InaccessibleComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Non-semantic div used for a button */}
      <div
        onClick={toggleDropdown}
        style={{ cursor: "pointer", padding: "10px", backgroundColor: "#ddd" }}
      >
        Click me to toggle dropdown
      </div>

      {/* Dropdown content without proper ARIA roles */}
      {isOpen && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <div>Option 1</div>
          <div>Option 2</div>
          <div>Option 3</div>
        </div>
      )}

      {/* Text input without label */}
      <input type="text" placeholder="Enter text here" />

      {/* Link without href */}
      <div
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Read more
      </div>
    </div>
  );
};
