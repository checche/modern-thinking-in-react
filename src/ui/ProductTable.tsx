import {Product} from '../entity/product';
import {ProductCategoryRow} from './ProductCategoryRow';
import {ProductRow} from './ProductRow';

export const ProductTable = ({filterText, inStockOnly, products}:{
  filterText: string,
  inStockOnly: boolean,
  products: Product[],
}) => {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
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
            key={product.category}
          />,
      );
    }
    rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />,
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
};
