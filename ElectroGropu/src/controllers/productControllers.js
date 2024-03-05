const { Op, DATE } = require("sequelize");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const detailcontrollers = {
    productDetail: function (req, res) {
        const { id } = req.params;
        db.Product.findByPk(id, {
            include: [
                {
                    association: "Images",
                },
            ],
        })
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

                res.render("products/productDetail", {
                    title: "asda",
                    products,
                    usuario: req.session.user,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    // revisar
    productCart: function (req, res) {
        res.render("products/productCart", {
            title: "productCart",
            usuario: req.session.user,
        });
    },

    productcreate: function (req, res) {
        res.render("products/productcreate", { title: "productcreate" });
    },

    dashboard: (req, res) => {
        db.Product.findAll({
            include: [
                {
                    association: "Images",
                },
            ],
            where: {
                id: { [Op.ne]: req.session.user.id },
            },
        })
            .then((products) => {
                res.render("products/dashboard", {
                    title: "Dashboard",
                    products,
                    usuario: req.session.user,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    formCreate: (req, res) => {
        res.render("products/createProduct", {
            title: "Create Product",
            usuario: req.session.user,
        });
    },

    formEdit: (req, res) => {
        const { id } = req.params;
        db.Product.findByPk(id)

            .then((product) => {
                res.render("products/editProduct", {
                    title: db.Product.titulo,
                    product,
                    usuario: req.session.user,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    create: async function (req, res) {
        const { titulo, description, price, brand } = req.body;

        try {

            const brands = await db.Brand.create({
                name: brand,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const descript = await db.Description.create({
                name: description,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const product = {
                titulo,
                description_id: descript.id,
                brand_id: brands.id,
                price,
            };
            const productos = await db.Product.create(product);

            if (req.file) {
                await db.Image.create({
                    name: req.file.filename,
                    path: null, 
                    product_id: productos.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }

            const imagenproduct = await db.Product.findByPk(productos.id, {
                include: [
                    { association: "Images",
                    }
                ]
            });

            res.redirect("/products/dashboard");
        } catch (error) {
            console.error(error);
        }
    },

    products: (req, res) => {
        db.Product.findAll({
            include: {
                association: "Images",
            },
        })
            .then((products) => {
                res.render("products/productsGeneral", {
                    title: "ElectroGroup",
                    products,
                    usuario: req.session.user,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    formUpdate: (req, res) => {
        const { id } = req.params;

        db.Products.findByPk(id)
            .then((product) => {
                res.render("products/createProduct", {
                    title: product.nombre,
                    product,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        db.Product.destroy({
            where: { id },
        })
            .then((Product) => {
                res.send(Product);
            })
            .catch((err) => console.log(err));
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

//     editProduct: (req, res) => {
//         const {id} = req.params
//      const { titulo,description,price,image } = req.body;
//      db.Product.update(
//        {
//          titulo,
//           description,
//          image: req.file ? req.file.filename : "default.jpg",
//          price,
     
//        },
       
//      )
//        .then((resp) => {
//          res.redirect('/products/dashboard', );
//        })
//        .catch((err) => console.log(err));
// }
editProduct: (req, res) => {

async function editProduct(req, res) {
  const { id, titulo, brand, description, price, image } = req.body;

  try {
    const productToUpdate = await Product.findByPk(id, {
      include: {
        model: Image,
        as: 'image',
      },
    });

    // Handle image deletion if a new image is uploaded
    if (image && productToUpdate.image) {
      await productToUpdate.image.destroy(); // Delete from database
      // Implement logic to delete image from cloud storage (AWS S3, etc.)
      // ...
    }

    // Update product data, including handling empty image field
    productToUpdate.titulo = titulo;
    productToUpdate.brand_id = brand;
    productToUpdate.description_id = description; // Assuming description_id stores description text
    productToUpdate.price = price;

    if (image) {
      // Assuming image data is stored in the "image" property
      productToUpdate.image = image; // Update image data (likely a path or reference)
    } else {
      // If no new image is uploaded, keep the existing image reference
      productToUpdate.image = productToUpdate.image.id;
    }

    await productToUpdate.save();

        res.redirect('/products/dashboard', );
            
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

}
}
module.exports = detailcontrollers;
