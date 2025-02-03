import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [products,setProducts] = useState([])
  const [error,setError] = useState(false)
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        setError(false)
        const result = await axios.get('http://localhost:3000/api/products')  // Use full URL
        console.log(result.data);
        setProducts(result.data);
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    })();
  }, []);

  if(error){
    return <h1>Something went wrong</h1>
  }

  if(loading){
    return <h1>Loading ...</h1>
  }
  

  return (
    <>
     <h1> Learning API </h1>
     <h2>Number of products are: {products.length}</h2>
    </>
  )
}

export default App
