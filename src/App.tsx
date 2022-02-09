import React,{useState} from 'react';
import './App.css';

function ProductCategoryRow(props:any) {
  // @ts-ignore
  const category = props.category;
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  );
}

function ProductRow(props:any) {
  // @ts-ignore
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

function ProductTable(props:any) {
  // @ts-ignore
  const filterText = props.filterText;
  // @ts-ignore
  const inStockOnly = props.inStockOnly;
  // @ts-ignore
  const rows = [];
  // @ts-ignore
  let lastCategory = null;
  // @ts-ignore
  props.products.forEach((product) => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    // @ts-ignore
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
        // @ts-ignore
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
      // @ts-ignore
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

      <tbody>{
      // @ts-ignore
        rows}</tbody>
    </table>
    );

}

function SearchBar(props:any) {
// @ts-ignore
  function handleFilterTextChange(e) {
    // @ts-ignore
    props.onFilterTextChange(e.target.value);
  }
// @ts-ignore
  function handleInStockChange(e) {
    // @ts-ignore
    props.onInStockChange(e.target.checked);
  }


  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        // @ts-ignore
        value={props.filterText}
        onChange={handleFilterTextChange}
      />
      <p>
        <input
          type="checkbox"
          // @ts-ignore
          checked={props.inStockOnly}
          onChange={handleInStockChange}
        />
        {' '}
        Only show products in stock
      </p>
    </form>
  );

}

function FilterableProductTable(props:any) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  function handleFilterTextChange(filterText:string) {
    setFilterText(filterText);
  }

  function handleInStockChange(inStockOnly:boolean) {
    setInStockOnly(inStockOnly)
  }

  return (
    <div>
      <SearchBar
      // @ts-ignore
        filterText={filterText}
        // @ts-ignore
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
      />
      <ProductTable
      // @ts-ignore
        products={props.products}
        // @ts-ignore
        filterText={filterText}
        // @ts-ignore
        inStockOnly={inStockOnly}
      />
    </div>
  );

}


const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];


function App() {
  return (
    // @ts-ignore
    <FilterableProductTable products={PRODUCTS} />
  );
}

export default App;
