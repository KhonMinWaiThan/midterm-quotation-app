/*
More icons at https://react-icons.github.io/react-icons/
*/

import { Container, Button, Table } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import style from "./mystyle.module.css";

function QuotationTable({ data, clearDataItems, deleteByIndex }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p><CiShoppingCart /> No items</p>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => {
    const discount = v.dis ? parseFloat(v.dis) : 0;
    const amount = v.qty * v.ppu - discount;
    return acc + amount;
  }, 0);

  const totalDiscount = data.reduce((acc, v) => {
    const discount = v.dis ? parseFloat(v.dis) : 0;
    return acc + discount;
  }, 0);

  const clearTable = () => {
    clearDataItems();
  };

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  return (
    <Container>
      <h1>Quotation</h1>
      <Button onClick={clearTable} variant="outline-dark">
        <MdClear /> Clear
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>-</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Discount</th>
            <th className={style.textCenter}>Amount</th>

          </tr>
        </thead>
        <tbody>{
          data.map((v, i) => {
            let discount = v.dis ? parseFloat(v.dis) : 0; // Parse discount as float
            let amount = v.qty * v.ppu - discount;
            return (
              <tr key={i}>
                <td className={style.textCenter}><BsFillTrashFill onClick={() => handleDelete(i)} /></td>
                <td className={style.textCenter}>{v.qty}</td>
                <td>{v.item}</td>
                <td className={style.textCenter}>{v.ppu}</td>
                <td className={style.textCenter}>{v.dis} </td>
                <td className={style.textRight}>{amount}</td>
              </tr>
            );
          })
        }</tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className={style.textRight}> {/* Adjust colSpan to 5 */}
              Total Discount
            </td>
            <td className={style.textRight}>{totalDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={5} className={style.textRight}>
              Total Amount
            </td>
            <td className={style.textRight}>{total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
