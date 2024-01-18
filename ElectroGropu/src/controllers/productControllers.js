const fs = require("fs");
const path = require("path");
const {setJson,getJson} = require("../utility/jsonMethod");


const detailcontrollers = {
    productDetail: function (req, res) {
        const {id}= req.params;
        const products = getJson("products");
        const detalle = products.find(detalle => detalle.id == id);
        res.render("products/productDetail",{ title: detalle.titulo, detalle });
    },
    
    productCart: function (req, res) {
        res.render("products/productCart", { title: "productCart" });
    },
    productcreate: function (req, res) {
        res.render("products/productcreate", { title: "productcreate" });
    },
    dashboard: (req, res) => {
        const products = getJson("products");
        res.render('products/dashboard', { title: "Dashboard", products });
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
        res.render("products/productsGeneral", { title: "ElectroGroup", products });
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
    
            fs.unlink(path.join(__dirname,`../../public/img/${product.image}`), (err) =>{
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