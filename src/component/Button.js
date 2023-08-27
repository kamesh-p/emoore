import React, { useState } from "react";

import { Button } from "@mui/material";

export default function BuyButton() {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <Button
      variant="contained"
      color={selected ? "success" : "error"}
      onClick={handleClick}
    >
      {selected ? "Selected" : "Buy"}
    </Button>
  );
}
