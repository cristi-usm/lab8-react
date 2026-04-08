import { useState } from "react";

 export default function useDestination() {
  const [destinations, setDestinations] = useState(
    JSON.parse(localStorage.getItem("destinations")) || []
  );

  const toggleDestination = (country) => {
    const exists = destinations.find(
      (item) => item.name.common === country.name.common
    );

    let updated;

    if (exists) {
      updated = destinations.filter(
        (item) => item.name.common !== country.name.common
      );
    } else {
      updated = [...destinations, country];
    }

    setDestinations(updated);
    localStorage.setItem("destinations", JSON.stringify(updated));
  };

  return { destinations, toggleDestination };
}

