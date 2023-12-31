const fs = require ("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8")
const products = JSON.parse(json);


const detailcontrollers = {
    productDetail: function (req, res) {
        const id = req.params.id;
        const detalle = products.find(detalle => detalle.id == id)
        res.render("products/productDetail", { title: "productDetail", detalle });
    },
    productCart: function (req, res) {
        res.render("products/productCart", { title: "productCart" });
    },
    productcreate: function (req, res) {
        res.render("products/productcreate", { title: "productcreate" });
    },
    dashboard: (req, res) => {
        res.render('products/dashboard', { title: "Dashboard", products });
    },
    formCreate: (req, res) => {
        res.render('products/createProduct', { title: "Create Product" });
    },
    formEdit: (req, res) => {
        const { id } = req.params;
        const product = products.find(product => product.id == id);
        res.render("products/editProduct", { title: products.titulo, product });
    },

    create:(req, res) => {
        console.log(req.file);
        const producto = req.body;
        producto.image = req.file.filename;
        producto.id = products[products.length-1].id + 1;
        products.push(producto);
        const json = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname,"../data/products.json"),json,'utf-8')
        res.redirect("/products/dashboard");
    },
    

    formUpdate: (req, res) => {
        const { id } = req.params;
        const product = products.find(producto => producto.id == id);
        res.render('products/createProduct', { title: product.nombre, product });
    },
    update: (req, res) => {
        const { id } = req.params;
        const product = products.find(producto => producto.id == id);
        res.redirect("/products/dashboard");
    },
    destroy: (req, res) => {
        const {id}= req.params;
        const json = fs.readFileSync(path.join(__dirname,"../data/products.json"),"utf-8")
        const products = JSON.parse(json);
            
            let product = products.find(product => product.id == id);
            let productClear = products.filter(product => product.id !== +req.params.id);
            const jsonn = JSON.stringify(productClear);
    
            fs.unlink(path.join(__dirname,`../../public/img/${product.image}`), (err) =>{
                if(err) throw err;
                console.log(`borre el archivo ${product.image}`);
            })
    
    
            
        fs.writeFileSync(path.join(__dirname,"../data/products.json"),jsonn,'utf-8')
            res.redirect ('/products/dashboard')
    
    
        
    },  
    editProduct: (req, res) => {
        const files = req.files;
        const { id } = req.params;
        const { titulo, description, price} = req.body;
        const json = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
        const products = JSON.parse(json);
    
        const nuevoArray = products.map(product => {
            if (product.id == id) {
                return {
                    id,
                    titulo: titulo,
                    description: description,
                    price: +price,
                    image: files ? files[0].filename : product.image,
                };
            }
            return product;
        });
    
        const jsonData = JSON.stringify(nuevoArray);
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), jsonData, 'utf-8');
        res.redirect('/products/dashboard');
    }
}
    module.exports = detailcontrollers