// Wyskakujące pudełko. Używamy go 2 razy:
// 1) formularz dodawania / edycji auta
// 2) pytanie "czy na pewno usunąć?"
export default function PopUpBox({ isOpen, onClose, title, content }) {
  // jeśli pudełko jest zamknięte, nic nie pokazujemy
  if (!isOpen) return null;

  return (
    // kliknięcie w szare tło zamyka pudełko
    <div className="overlay" onClick={onClose}>
      {/* stopPropagation = kliknięcie w samo pudełko go NIE zamyka */}
      <div className="box" onClick={(event) => event.stopPropagation()}>
        <div className="box-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {content}
      </div>
    </div>
  );
}