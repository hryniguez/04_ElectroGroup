const { Op, DATE } = require("sequelize");
const fs = require("fs");
const path = require("path");
const db = require('../database/models')


const detailcontrollers = {
    productDetail: function (req, res) {
            const { id } = req.params;
            db.Product.findByPk(id)
                .then((products) => {
                    // const productsRandom = () => {
                    //     const indiceAleatorio = [];
                    //     const cantidad = 3;
                    //     for (let i = 0; i < cantidad; i++) {
                    //         const productAleatorio = Math.floor(Math.random() * products.length);
                    //         indiceAleatorio.push(products[productAleatorio]);
                    //     }
                    //     return indiceAleatorio;
                    // };
    
                    // const productRandom = productsRandom();
    
                    res.render("products/productDetail", { title: "asda", products, usuario: req.session.user });
                })
                .catch(error => {
                    console.log(error);
                });
    },
     // revisar
        productCart: function (req, res) {
        res.render("products/productCart", { title: "productCart",usuario:req.session.user });
    },

    productcreate: function (req, res) {
        res.render("products/productcreate", { title: "productcreate" });
    },

    dashboard: (req, res) => {
        db.Product.findAll({
            include:
            [{
                association: "Images"
            }],
            where: {
                id: { [Op.ne]: req.session.user.id },
            }
        })
        .then((products)=>{
            res.render('products/dashboard', { title: "Dashboard", products, usuario:req.session.user });
        }
        ).catch(error => {
            console.log(error);
        });
    },
    formCreate: (req, res) => {
        
        res.render('products/createProduct', { title: "Create Product",usuario:req.session.user });
    },

    formEdit: (req, res) => {
        const { id } = req.params;
        db.Product.findByPk(id)

        .then((product)=> {
            res.render("products/editProduct", { title: db.Product.titulo, product , usuario:req.session.user });
        })
        .catch(error => {
            console.log(error);
        });
        

    },

    create:(req, res) => {
        const {titulo,description,price,image} = req.body
        const product = { 
            titulo,
            description_id:null,
            brand_id:null,
            price,
        
        } 
            
            db.Product.create(product)
            .then((resp) => {
                db.Image.create({
                    name: req.file ? req.file.filename : null,
                    path:null,
                    product_id:resp.dataValues.id,
                    createdAt: new Date,
                    updatedAt:new Date
                    
                })

            .then( resp => {
                db.Product.findByPk(resp.dataValues.product_id, {include:{
                association:"Images"
            }}).then( resp => {
                console.log("aqui va toda como A ella", resp);
                res.redirect('/products/dashboard');
            })
                
                // res.send (product)
            })
            })
            .catch(error => {
                console.log(error);
            });



            // const { body, file } = req;
    
            // db.Product.create({
            //     name: body.titulo,
            //     description_id: body.description,
            //     precio: body.price,
            //     image: file.filename,
        
            // })
            // .then(() => {
            //     res.redirect('/products/dashboard');
            // })
            // .catch(error => {
            //     console.log(error);
            // });
        

            
        // db.Product.create({
        //     titulo: req.body.name,
        //     nombre: req.body.brand_id ,
        //     price: req.body.precio,
        //     description: req.body.description_id,

        // })
        
            // .then(() => {
            //     res.redirect("/products/dashboard");
            // })
            // .catch((err) => {
            // console.log(err);
            // });
    
        // const products = getJson("products");
        // const producto = req.body;
        // producto.image = req.file.filename;
        // producto.id = products[products.length-1].id + 1;
        // products.push(producto);
        // setJson(products,"products");
        // res.redirect("/products/dashboard");
    },
    

    products: (req, res) =>{
    const products=db.Product.findAll()
        Promise.all([products])
            .then(products => {
                res.render("products/productsGeneral", { title: "ElectroGroup", products, usuario: req.session.user });
            })
            .catch(error => {
                console.log(error);
            });
    },

    formUpdate: (req, res) => {
        const { id } = req.params;

        db.Products.findByPk(id)
            .then(product => {
                res.render('products/createProduct', { title: product.nombre, product });
            })
            .catch(error => {
                console.log(error);
            });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { body, file } = req;

        db.Products.update({
            title: body.title,
            description: body.description,
            price: body.price,
            image: file.filename
        }, {
            where: { id: id }
        })
        .then(() => {
            res.redirect('/products/dashboard');
        })
        .catch(error => {
            console.log(error);
        });
    },

    destroy: async (req, res) => {
        const {id} = req.params
        const product = await db.Product.findByPk(id);

if (product) {
    await product.update({ Images: { product_id: null } }); // Update all images' product_id to NULL
    await product.destroy();                                  // Now delete the product
} else {
    console.log("Product with ID 4 not found.");
}
        },
      







        // const {id}= req.params;
        // const products = getJson("products");
            
        //     let product = products.find(product => product.id == id);
        //     let productClear = products.filter(product => product.id !== +req.params.id);
    
        //     fs.unlink(path.join(__dirname,`../../public/img/products/${product.image}`), (err) =>{
        //         if(err) throw err;
        //         console.log(`borre el archivo ${product.image}`);
        //     })
        //     setJson(productClear,"products");
        //     res.redirect ('/products/dashboard')
        
    
    editProduct: (req, res) => {
       const {id} = req.params
    const { titulo,description,price,image } = req.body;
    db.Product.update(
      {
        titulo,
         description,
        image: req.file ? req.file.filename : "default.jpg",
        price,
    
      },
      {
        where: {
          id,
        },
      }
    )
      .then((resp) => {
        res.redirect('/products/dashboard', );
      })
      .catch((err) => console.log(err));
        // const files = req.files;
        // const { id } = req.params;
        // const { titulo, description, price} = req.body;
        // const products = getJson("products");
        // const nuevoArray = products.map(product => {
        //     if (product.id == id) {
        //         return {
        //             id: +id,
        //             titulo: titulo,
        //             description: description,
        //             price: +price,
        //             image: files ? files[0].filename : product.image,
        //         };
        //     }
        //     return product;
        // });
    

        // setJson(nuevoArray,"products");
        // res.redirect('/products/dashboard');
    }
}
    module.exports = detailcontrollers