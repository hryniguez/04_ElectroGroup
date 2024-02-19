const fs = require("fs");
const path = require("path");
const db = require('../../database/models')


const detailcontrollers = {
    productDetail: function (req, res) {
        const {id}= req.params;
        const detalle = products.then(detalle => detalle.id == id);
        const productsRandom = () => {
            const indiceAleatorio = [];
            const cantidad = 3;
            for(let i = 0; i < cantidad ; i++) {
                const productAleatorio = Math.floor(Math.random()* products.length);
                indiceAleatorio.push(products[productAleatorio])
                .catch( error =>{ console.log(error)
                });
            }
            return indiceAleatorio
        }
        const productRandom = productsRandom()
        res.render("products/productDetail",{ title: detalle.titulo, detalle, productRandom, usuario:req.session.user });
    },
    
    productCart: function (req, res) {
        res.render("products/productCart", { title: "productCart",usuario:req.session.user });
    },
    productcreate: function (req, res) {
        res.render("products/productcreate", { title: "productcreate" });
    },
    dashboard: (req, res) => {
        
        res.render('products/dashboard', { title: "Dashboard", products,usuario:req.session.user });
    },
    formCreate: (req, res) => {
        
        res.render('products/createProduct', { title: "Create Product" });
    },
    formEdit: (req, res) => {
        const products = getJson("products");
        const { id } = req.params;
        const product = products.find(product => product.id == id);
        res.render("products/editProduct", { title: products.titulo, product });
    },


    create:(req, res) => {
        const products = getJson("products");
        console.log(req.file);
        const producto = req.body;
        producto.image = req.file.filename;
        producto.id = products[products.length-1].id + 1;
        products.push(producto);
        setJson(products,"products");
        res.redirect("/products/dashboard");
    },
    

    products: function (req, res) {
        const products = getJson("products");
        res.render("products/productsGeneral", { title: "ElectroGroup", products,usuario:req.session.user });
    }, 

    formUpdate: (req, res) => {
        const { id } = req.params;
        const products = getJson("products");
        const product = products.find(producto => producto.id == id);
        res.render('products/createProduct', { title: product.nombre, product });
    },
    update: (req, res) => {
        const products = getJson("products");
        const { id } = req.params;
        const product = products.find(producto => producto.id == id);
        res.redirect("/products/dashboard");
    },
    destroy: (req, res) => {
        const {id}= req.params;
        const products = getJson("products");
            
            let product = products.find(product => product.id == id);
            let productClear = products.filter(product => product.id !== +req.params.id);
    
            fs.unlink(path.join(__dirname,`../../public/img/products/${product.image}`), (err) =>{
                if(err) throw err;
                console.log(`borre el archivo ${product.image}`);
            })
            setJson(productClear,"products");
            res.redirect ('/products/dashboard')
        
    },
    editProduct: (req, res) => {
        const files = req.files;
        const { id } = req.params;
        const { titulo, description, price} = req.body;
        const products = getJson("products");

    
        const nuevoArray = products.map(product => {
            if (product.id == id) {
                return {
                    id: +id,
                    titulo: titulo,
                    description: description,
                    price: +price,
                    image: files ? files[0].filename : product.image,
                };
            }
            return product;
        });
    

        setJson(nuevoArray,"products");
        res.redirect('/products/dashboard');
    }
}
    module.exports = detailcontrollers