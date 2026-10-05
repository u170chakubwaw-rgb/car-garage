import { useState } from "react";
import "./App.css";
import carData from "./data/carData";
import PopUpBox from "./component/PopUpBox";
import Button from "./component/Button";
import CarCard from "./component/CarCard";
import CarForm from "./component/carEditor";
import PageSwitcher from "./component/pageSwitcher";

const CARS_PER_PAGE = 5;

export default function App() {
  const [cars, setCars] = useState(carData);
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState("All");
  const [sortBy, setSortBy] = useState("brand-asc");
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null); // null = dodajemy nowe auto
  const [carToDelete, setCarToDelete] = useState(null); // null = okienko zamknięte

  // 1. Szukanie i filtr po paliwie
  const shownCars = cars.filter((car) => {
    const text = (car.brand + " " + car.model).toLowerCase();
    if (!text.includes(search.toLowerCase())) {
      return false;
    }
    if (fuel !== "All" && car.fuel !== fuel) {
      return false;
    }
    return true;
  });

  // 2. Sortowanie
  shownCars.sort((a, b) => {
    if (sortBy === "brand-asc") {
      return a.brand.localeCompare(b.brand);
    } else if (sortBy === "brand-desc") {
      return b.brand.localeCompare(a.brand);
    } else if (sortBy === "year-asc") {
      return a.year - b.year;
    } else {
      return b.year - a.year;
    }
  });

  // 3. Strony: np. 12 aut / 5 = 2.4 -> 3 strony
  const totalPages = Math.max(1, Math.ceil(shownCars.length / CARS_PER_PAGE));
  const currentPage = Math.min(page, totalPages); // gdy po usunięciu strona zniknęła
  const start = (currentPage - 1) * CARS_PER_PAGE;
  const carsOnPage = shownCars.slice(start, start + CARS_PER_PAGE);

  function openForm(car) {
    setCarToEdit(car); // null = dodawanie, auto = edycja
    setIsFormOpen(true);
  }

  function handleSave(carFromForm) {
    if (carToEdit) {
      // edycja: podmieniamy auto o tym samym id
      setCars(cars.map((car) => {
        if (car.id === carToEdit.id) {
          return { ...carFromForm, id: car.id };
        }
        return car;
      }));
    } else {
      // dodawanie: Date.now() daje zawsze inną liczbę, więc nadaje się na id
      setCars([...cars, { ...carFromForm, id: Date.now() }]);
    }
    setIsFormOpen(false);
  }

  function handleDelete() {
    setCars(cars.filter((car) => car.id !== carToDelete.id));
    setCarToDelete(null);
  }

  // w return nie można pisać if, więc wybieramy wcześniej
  let formTitle = "Add a new car";
  if (carToEdit) {
    formTitle = "Edit car";
  }

  let deleteText = "";
  if (carToDelete) {
    deleteText = "Delete " + carToDelete.brand + " " + carToDelete.model + "?";
  }

  let carList = <p className="empty">No cars found.</p>;
  if (carsOnPage.length > 0) {
    carList = carsOnPage.map((car) => (
      <CarCard key={car.id} car={car} onEdit={openForm} onDelete={setCarToDelete} />
    ));
  }

  return (
    <div className="app">
      <div className="top-bar">
        <h1>My Car Garage</h1>
        <Button onClick={() => openForm(null)}>+ Add car</Button>
      </div>

      {/* po każdej zmianie wracamy na stronę 1 */}
      <div className="controls">
        <input
          placeholder="Search by brand or model..."
          value={search}
          onChange={(event) => { setSearch(event.target.value); setPage(1); }}
        />
        <select value={fuel} onChange={(event) => { setFuel(event.target.value); setPage(1); }}>
          <option value="All">All fuels</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select value={sortBy} onChange={(event) => { setSortBy(event.target.value); setPage(1); }}>
          <option value="brand-asc">Brand A-Z</option>
          <option value="brand-desc">Brand Z-A</option>
          <option value="year-asc">Oldest first</option>
          <option value="year-desc">Newest first</option>
        </select>
      </div>

      <div className="car-list">{carList}</div>

      <PageSwitcher currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />

      <PopUpBox
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={formTitle}
        content={<CarForm carToEdit={carToEdit} onSave={handleSave} onCancel={() => setIsFormOpen(false)} />}
      />

      <PopUpBox
        isOpen={carToDelete !== null}
        onClose={() => setCarToDelete(null)}
        title="Delete car"
        content={
          <div>
            <p>{deleteText}</p>
            <div className="box-buttons">
              <Button variant="secondary" onClick={() => setCarToDelete(null)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
