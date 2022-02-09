import React,{useState} from 'react';

import './App.css';

type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

function ProductCategoryRow(props:{category: string}) {
  const category = props.category;
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  );
}

function ProductRow(props:{product: Product}) {
  const product = props.product;
  const name = product.stocked ?
    product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable(props:{filterText: string, inStockOnly: boolean, products: Product[]}) {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  props.products.forEach((product) => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow

          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow

        product={product}
        key={product.name}
      />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        {rows}
      </tbody>
    </table>
    );

}

function SearchBar(props: { filterText: string, inStockOnly: boolean, onFilterTextChange: (e: any) => void, onInStockChange: (e: any) => void}) {
  function handleFilterTextChange(e:any) {
    props.onFilterTextChange(e.target.value);
  }

  function handleInStockChange(e:any) {
    props.onInStockChange(e.target.checked);
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."

        value={props.filterText}
        onChange={handleFilterTextChange}
      />
      <p>
        <input
          type="checkbox"

          checked={props.inStockOnly}
          onChange={handleInStockChange}
        />
        {' '}
        Only show products in stock
      </p>
    </form>
  );

}

function FilterableProductTable(props: {products: Product[]}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  function handleFilterTextChange(filterText:string):void {
    setFilterText(filterText);
  }

  function handleInStockChange(inStockOnly:boolean):void {
    setInStockOnly(inStockOnly)
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
        products={props.products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );

}


const PRODUCTS: Product[] = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];


function App() {
  return (

    <FilterableProductTable products={PRODUCTS} />
  );
}

export default App;
