import express from 'express';
import cors from 'cors'

const app = express();

const port = process.env.PORT || 3000;

;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(cors());

app.get('/api/products' ,(req,res) => {
        
    const products = [
        {
            id: 1,
            name: 'pen',
            price: 10,
        },
        {
            id: 2,
            name: 'eraser',
            price: 5,
        },
        {
            id: 3,
            name: 'pencil',
            price: 5,
        },
        {
            id: 4,
            name: 'Gel-pen',
            price: 20,
        },
    ]


    //http://localhost:3000/api/products?search=pen

    if(req.query.search){
        const filterProducts = products.filter(product => product.name.includes(req.query.search))
        res.send(filterProducts)
        return;
    }

    setTimeout(() => {
        res.send(products);
    }, 3000);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
