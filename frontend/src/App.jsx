import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [products,setProducts] = useState([])
  const [error,setError] = useState(false)
  const [loading , setLoading] = useState(false)
  const [search,setSearch] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError(false)
        const result = await axios.get('http://localhost:3000/api/products?search=' + search,{
          signal: controller.signal
        })  // Use full URL
        console.log(result.data);
        setProducts(result.data);
        setLoading(false)
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Request canceled', error.message)
        }
        setError(true)
        setLoading(false)
      }
    })();

    //cleanup code 
    return () => {
            controller.abort()
    }
  }, [search]);

  // if(error){
  //   return <h1>Something went wrong</h1>
  // }

  // if(loading){
  //   return <h1>Loading ...</h1>
  // }
  

  return (
    <>
     <h1> Learning API </h1>
     <input type='text' placeholder='search'
     value={search}
     onChange={(e) => setSearch(e.target.value)} // performance of application will be down as network tab will update eeach query and raise the input/query
      // so we use use axios to cancel the old request

     />

     {loading && (<h1> Loading ...</h1>)}
     {error && (<h1> Something went wrong </h1>)}


     <h2>Number of products are: {products.length}</h2>
    </>
  )
}

export default App
