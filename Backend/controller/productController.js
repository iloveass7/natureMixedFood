const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const image1 = req.files.image1 ? req.files.image1[0].path : null;
    const image2 = req.files.image2 ? req.files.image2[0].path : null;
    const image3 = req.files.image3 ? req.files.image3[0].path : null;
    const image4 = req.files.image4 ? req.files.image4[0].path : null;
    const image5 = req.files.image5 ? req.files.image5[0].path : null;

    res.status(200).json({
      name,
      description,
      price,
      image1,
      image2,
      image3,
      image4,
      image5,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProducts = async (req, res) => {};
const removeProduct = async (req, res) => {};
const singleProduct = async (req, res) => {};
export { addProduct, getAllProducts, removeProduct, singleProduct };
