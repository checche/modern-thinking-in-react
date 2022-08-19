import {useState} from 'react';
import {Product} from '../entity/product';
import {ProductTable} from './ProductTable';
import {SearchBar} from './SearchBar';

export const FilterableProductTable = ({products}:{ products: Product[]}) => {
  const [filterText, setFilterText] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  function handleFilterTextChange(filterText:string):void {
    setFilterText(filterText);
  }

  function handleInStockChange(inStockOnly:boolean):void {
    setInStockOnly(inStockOnly);
  }

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
};
