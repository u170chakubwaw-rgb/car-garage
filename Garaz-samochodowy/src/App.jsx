import { useState } from "react";
import carData from "../data/component/carData";
import PopUpBox from "../data/component/PopUpBox";
import Button from "../data/component/Button";
import CarCard from "../data/component/CarCard";

export default function App() {
  const [cars, setCars] = useState(carData);
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>My Car Garage</h1>

      {/* Przycisk otwierający pudełko */}
      <Button onClick={() => setIsBoxOpen(true)}>Add Car</Button>

      {/* Lista aut */}
      <div className="car-list" style={{ marginTop: "20px" }}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Wyskakujące pudełko z angielskimi napisami */}
      <PopUpBox
        isOpen={isBoxOpen}
        onClose={() => setIsBoxOpen(false)}
        title="Add a new car"
        content={
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              placeholder="Car Brand"
              style={{ display: "block", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Car Name / Model"
              style={{ display: "block", marginBottom: "10px" }}
            />
            <button type="submit">Save</button>
          </form>
        }
      />
    </div>
  );
}
