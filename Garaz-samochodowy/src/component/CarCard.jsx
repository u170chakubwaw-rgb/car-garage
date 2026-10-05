import Button from "./Button";

// Jedno auto na liście
export default function CarCard({ car, onEdit, onDelete }) {
  // Wybieramy etykietę PRZED return (w return nie można pisać if)
  let badge;
  if (car.isForSale) {
    badge = <span className="badge badge-green">For sale</span>;
  } else {
    badge = <span className="badge badge-gray">Not for sale</span>;
  }

  return (
    <div className="car-card">
      <div>
        <h3>
          {car.brand} {car.model}
        </h3>
        <p className="car-details">
          Year: {car.year}, Fuel: {car.fuel}, Gearbox: {car.gearbox}
        </p>
        {badge}
      </div>

      <div className="card-buttons">
        <Button variant="secondary" onClick={() => onEdit(car)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(car)}>
          Delete
        </Button>
      </div>
    </div>
  );
}