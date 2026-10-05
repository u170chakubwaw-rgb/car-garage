export default function Filters({ search, onSearchChange, engine, onEngineChange, sort, onSortChange }) {
  return (
    <div className="filters">
      <input
        type="search"
        className="input"
        placeholder="Search by name..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <select className="input" value={engine} onChange={(event) => onEngineChange(event.target.value)}>
        <option value="all">All engines</option>
        <option value="electric">Electric</option>
        <option value="combustion">Combustion</option>
      </select>
      <select className="input" value={sort} onChange={(event) => onSortChange(event.target.value)}>
        <option value="asc">Name A–Z</option>
        <option value="desc">Name Z–A</option>
      </select>
    </div>
  );
}