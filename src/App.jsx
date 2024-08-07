import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price)


  const addItem = () => {
    // Find the item from the products list based on the selected code
    let item = products.find((v) => itemRef.current.value === v.code);
  
    // Check if the item is found
    if (!item) return; // Exit if no item is found
  
    // Create a new item object from the form values
    const newItem = {
      item: item.name,
      ppu: parseFloat(ppuRef.current.value), // Ensure this is a number
      qty: parseInt(qtyRef.current.value, 10), // Ensure this is a number
      dis: parseFloat(disRef.current.value) || 0, // Ensure this is a number
    };
  
    // Check if an item with the same name and price already exists
    const existingItemIndex = dataItems.findIndex(existingItem =>
      existingItem.item === newItem.item && existingItem.ppu === newItem.ppu
    );
  
    if (existingItemIndex >= 0) {
      // If item exists, combine quantities and update the discount if needed
      let updatedItems = [...dataItems];
      let existingItem = updatedItems[existingItemIndex];
  
      existingItem.qty += newItem.qty; // Combine quantities
      existingItem.dis = newItem.dis; // Update the discount (if needed)
  
      // Update the state with combined items
      setDataItems(updatedItems);
    } else {
      // If not redundant, add the new item to the dataItems array
      setDataItems([...dataItems, newItem]);
    }
  };
  
  

  // const addItem = () => {
  //   let item = products.find((v) => itemRef.current.value === v.code)

  //   if(!item) return;

  //   const newItem = {
  //     item: item.name,
  //     ppu: ppuRef.current.value,
  //     qty: qtyRef.current.value,
  //     dis: disRef.current.value,
  //   };
  //   const existingItemIndex = dataItems.findIndex(existingItem =>
  //     existingItem.item === newItem.item && existingItem.ppu === newItem.ppu
  //   );
  
  //   if (existingItemIndex >= 0) {
      
  //     let updatedItems = [...dataItems];
  //     let existingItem = updatedItems[existingItemIndex];
  
  //     existingItem.qty += newItem.qty; // Combine quantities
  //     existingItem.dis += newItem.dis; // Update the discount (if needed)
  
      
  //     setDataItems(updatedItems);
  //   } else {
  //     setDataItems([...dataItems, newItem]);
  //   }
  // };

  const clearDataItems = () => {
    setDataItems([]);
  }

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code)
    setPpu(item.price)
  }

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {
                  products.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))
                }
              </Form.Select>
            </Col>
          </Row>
         <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control type="number" ref={ppuRef} value={ppu} onChange={e => setPpu(ppuRef.current.value)} />
            </Col>
          </Row> 
          
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" ref={disRef} defaultValue={0} />
            </Col>
          </Row>

          
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            deleteByIndex={deleteByIndex} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
