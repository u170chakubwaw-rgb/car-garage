import { useState } from "react";
import Button from "./Button";

// Zwraca klasę CSS dla pola: czerwona ramka, jeśli jest błąd
function inputClass(errorText) {
  if (errorText) {
    return "input-error";
  } else {
    return "";
  }
}

// TEN SAM formularz do dodawania i edycji.
// carToEdit = null  -> dodajemy nowe auto (puste pola)
// carToEdit = auto  -> edytujemy (pola wypełnione danymi auta)
export default function CarForm({ carToEdit, onSave, onCancel }) {
  // Wartości początkowe pól – na start puste
  let startBrand = "";
  let startModel = "";
  let startYear = "";
  let startFuel = "";
  let startGearbox = "";
  let startIsForSale = false;

  // Jeśli edytujemy, to wpisujemy do pól dane auta
  if (carToEdit) {
    startBrand = carToEdit.brand;
    startModel = carToEdit.model;
    startYear = String(carToEdit.year);
    startFuel = carToEdit.fuel;
    startGearbox = carToEdit.gearbox;
    startIsForSale = carToEdit.isForSale;
  }

  // Każde pole ma swój własny useState (= pole kontrolowane)
  const [brand, setBrand] = useState(startBrand);
  const [model, setModel] = useState(startModel);
  const [year, setYear] = useState(startYear);
  const [fuel, setFuel] = useState(startFuel);
  const [gearbox, setGearbox] = useState(startGearbox);
  const [isForSale, setIsForSale] = useState(startIsForSale);

  // Tu trzymamy błędy, np. { brand: "Enter the brand." }
  const [errors, setErrors] = useState({});

  // Napis na przycisku zależy od tego, czy dodajemy, czy edytujemy
  let buttonText;
  if (carToEdit) {
    buttonText = "Save changes";
  } else {
    buttonText = "Add car";
  }

  function handleSubmit(event) {
    event.preventDefault(); // żeby strona się nie przeładowała

    // WALIDACJA – sprawdzamy każde pole
    const newErrors = {};
    if (brand.trim() === "") {
      newErrors.brand = "Enter the brand.";
    }
    if (model.trim() === "") {
      newErrors.model = "Enter the model.";
    }
    if (year === "" || Number(year) < 1900 || Number(year) > 2026) {
      newErrors.year = "Year must be between 1900 and 2026.";
    }
    if (fuel === "") {
      newErrors.fuel = "Choose the fuel type.";
    }
    if (gearbox === "") {
      newErrors.gearbox = "Choose the gearbox.";
    }

    setErrors(newErrors);

    // jeśli są jakieś błędy -> kończymy i NIE zapisujemy
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // brak błędów -> wysyłamy auto do App.jsx
    onSave({
      brand: brand,
      model: model,
      year: Number(year),
      fuel: fuel,
      gearbox: gearbox,
      isForSale: isForSale,
    });
  }

  // Uwaga: <span className="error">{errors.brand}</span>
  // jeśli błędu nie ma, errors.brand jest puste i nic się nie wyświetla
  return (
    <form onSubmit={handleSubmit} className="car-form">
      {/* KONTROLOWANE POLE TEKSTOWE */}
      <label className="field">
        Brand
        <input
          type="text"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          className={inputClass(errors.brand)}
        />
        <span className="error">{errors.brand}</span>
      </label>

      <label className="field">
        Model
        <input
          type="text"
          value={model}
          onChange={(event) => setModel(event.target.value)}
          className={inputClass(errors.model)}
        />
        <span className="error">{errors.model}</span>
      </label>

      <label className="field">
        Year
        <input
          type="number"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          className={inputClass(errors.year)}
        />
        <span className="error">{errors.year}</span>
      </label>

      {/* KONTROLOWANY SELECT */}
      <label className="field">
        Fuel
        <select
          value={fuel}
          onChange={(event) => setFuel(event.target.value)}
          className={inputClass(errors.fuel)}
        >
          <option value="">-- choose --</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <span className="error">{errors.fuel}</span>
      </label>

      {/* KONTROLOWANA GRUPA RADIO */}
      <div className="field">
        Gearbox
        <div className="radio-row">
          <label>
            <input
              type="radio"
              value="Manual"
              checked={gearbox === "Manual"}
              onChange={(event) => setGearbox(event.target.value)}
            />
            Manual
          </label>
          <label>
            <input
              type="radio"
              value="Automatic"
              checked={gearbox === "Automatic"}
              onChange={(event) => setGearbox(event.target.value)}
            />
            Automatic
          </label>
        </div>
        <span className="error">{errors.gearbox}</span>
      </div>

      {/* KONTROLOWANY CHECKBOX */}
      <label className="checkbox">
        <input
          type="checkbox"
          checked={isForSale}
          onChange={(event) => setIsForSale(event.target.checked)}
        />
        For sale
      </label>

      <div className="box-buttons">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{buttonText}</Button>
      </div>
    </form>
  );
}
