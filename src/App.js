import React, { useEffect, useState } from 'react';
import ExpenseTracker from './Components/ExpenseTracker';
import './App.css';

// const getLocalData = () => {
//   let list = localStorage.getItem('lists');
//   console.log(list)
// }
function App() {

  const [data, setData] = useState([]);
  const [productName, setProductName] = useState(``)
  const [productDetails, setProductDetails] = useState(``)
  const [price, setPrice] = useState(0)
  const [id, setId] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    setData(ExpenseTracker)
  }, []);


  //to get


  const editHandler = (id) => {
    // alert(id)
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true)
      setId(id);
      setProductName(dt[0].productName);
      setProductDetails(dt[0].productDetails);
      setPrice(dt[0].price)
    }
  }
  const deleteHandler = (id) => {
    // alert(id)
    if (id > 0) {
      const dt = data.filter(item => item.id !== id);
      setData(dt)
    }
  }

  const saveHandler = (e) => {
    // let error = ``;
    // if(productName===``)
    //   error += `Fill Expense Form`;
    // if(error !== ``){
    e.preventDefault();
    const dt = [...data];
    const newObject = {
      id: ExpenseTracker.length * 9, productName: productName, productDetails: productDetails, price: price
    }
    dt.push(newObject);
    setData(dt);
    // }
    // else{
    //   alert(error)
    // }

  }

  //add data to localStorage
  // useEffect(() => {
  //   localStorage.setData('lists', JSON.stringify(data))
  // }, [data]);

  const updateHandler = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id)

    const dt = [...data]
    dt[index].productName = productName;
    dt[index].productDetails = productDetails;
    dt[index].price = price
    setData(dt);
    clearHandler();
  }

  const clearHandler = () => {
    setId(0);
    setProductName(``);
    setProductDetails(``);
    setPrice(0)
    setIsUpdate(false)
  }

  return (
    <div className="App">

      <h1>Expense Tracker</h1>
      <div className='form' >
        <div>
          <label>Product Name:
            <input type='text' placeholder='Enter Your Item Name' onChange={(e) => setProductName(e.target.value)} value={productName} />
          </label>
        </div>
        <div>
          <label>Product Details:
            <input type='text' placeholder='Enter Your Item Details' onChange={(e) => setProductDetails(e.target.value)} value={productDetails} />
          </label>
        </div>
        <div>
          <label>Price:
            <input type='number' placeholder='Enter Item Price' onChange={(e) => setPrice(e.target.value)} value={price} />
          </label>
        </div>
        <div className='btns'>
          {
            !isUpdate ?
              <button className='save btn-search' onClick={(e) => saveHandler(e)} >Save</button>
              :
              <button className='save btn-search' onClick={() => updateHandler()} >Update</button>
          }

          <button className='clear btn-search' onClick={() => clearHandler()} >Clear</button>
        </div>
      </div>
      <table className='table'>
        <thead className='thead'>
          <tr className='row'>
            <td>Sr .No</td>
            <td>Id</td>
            <td>Product Name</td>
            <td>Product Details</td>
            <td>Price</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody className='tbody'>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.productDetails}</td>
                  <td>{item.price}</td>
                  <td className='btn'>
                    <button className='btn btn-edit' onClick={() => editHandler(item.id)}>Edit</button>
                    <br />
                    <button className='btn btn-delete' onClick={() => deleteHandler(item.id)} >Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>
    </div>
  );
}

export default App;
