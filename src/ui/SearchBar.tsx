export const SearchBar = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockChange,
}:{
  filterText: string,
  inStockOnly: boolean,
  onFilterTextChange: (filterText: string) => void,
  onInStockChange: (inStockOnly: boolean) => void
}) => {
  function handleFilterTextChange(e: React.ChangeEvent<HTMLInputElement>):void {
    onFilterTextChange(e.target.value);
  }

  function handleInStockChange(e: React.ChangeEvent<HTMLInputElement>):void {
    onInStockChange(e.target.checked);
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={handleFilterTextChange}
      />
      <p>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={handleInStockChange}
        />
        {' '}
        Only show products in stock
      </p>
    </form>
  );
};
