import axios from "axios";
import { useEffect, useState } from "react";

function ProductCrud() {

const [id, setId] = useState("");
const [name, setName] = useState("");
const [size, setSize] = useState("");
const [description, setDescription] = useState("");
const [value, setValue] = useState("");
const [photoUrl, setPhotoUrl] = useState("");

const [products, setProducts] = useState([]);
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {
    
    const result = await axios.get("https://localhost:7231/api/Product");
    setProducts(result.data.data);
    console.log("result.data");
    console.log(result.data.data);
    console.log("products");
    console.log(products);
  }
 
  async function save(event) {
   
    event.preventDefault();
    try {
      await axios.post("https://localhost:7231/api/Product", {
        
        name: name,
        description: description,
        value: value,
        size: size,
        photoUrl: photoUrl,


       
      });
      alert("Product Save Successfully");
          setId("");
          setName("");
          setDescription("");
          setValue("");
            setSize("");
            setPhotoUrl("");
        
       
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editProduct(products) {
    setName(products.name);
    setDescription(products.description);
    setPhotoUrl(products.photoUrl);
    setValue(products.value);
    setSize(products.size);
 
    setId(products.id);
  }
 

  async function DeleteProduct(id) {
  await axios.delete("https://localhost:7231/api/Product/" + id);
    alert("Product deleted Successfully");
    setId("");
    setName("");
    setDescription("");
    setValue("");
    setSize("");
    setPhotoUrl("");

   Load();
  }
 

  async function update(event) {
    event.preventDefault();
    try {

  await axios.put("https://localhost:7231/api/Product/"+ products.find((u) => u.id === id).id || id,
        {
        id: id,
        name: name,
        description: description,
        value: value,
        size: size,
        photoUrl: photoUrl,

        }
      );
      alert("Product Updated");
      setId("");
      setName("");
      setDescription("");
        setValue("");
        setSize("");
        setPhotoUrl("");
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

    return (
      <div>
        <div className="parent-container">
        <h1>Product Details</h1>
        </div>
      <div class="form-container">
        <form>
          <div class="form-group">
           
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <label>Product Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input
              type="text"
              class="form-control"
              id="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Value</label>
            <input
              type="number"
              class="form-control"
              id="value"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Size</label>
            <input
              type="number"
              class="form-control"
              id="description"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>PhotoUrl</label>
            <input
              type="text"
              class="form-control"
              id="photoUrl"
              value={photoUrl}
              onChange={(event) => {
                setPhotoUrl(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="create" onClick={save}>
              Create
            </button>
            <button class="btn update" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
      <div className="parent-container">
        <h1>Product List</h1>
        </div>
      <table class="table" align="center">
        <thead>
          <tr>
            <th scope="col">Product Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
         
 
            <th scope="col">Option</th>
          </tr>
        </thead>
        
        {products.map(function fn(product) {
          return (
            <tbody>
              <tr>
                <th scope="row">{product.id} </th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn update"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => DeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default ProductCrud;