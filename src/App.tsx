import React, {useState} from 'react';

import './App.css';
import {Product} from './entity/product';
import {ProductTable} from './ui/ProductTable';


const SearchBar = ({
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

const FilterableProductTable = ({products}:{ products: Product[]}) => {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

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


const PRODUCTS: Product[] = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football',
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball',
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball',
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch',
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5',
  },
  {
    category: 'Electronics',
    price: '$199.99',
    stocked: true,
    name: 'Nexus 7',
  },
];


const App:React.VFC = () => {
  return (
    <FilterableProductTable products={PRODUCTS} />
  );
};

export default App;
