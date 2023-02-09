import { useFormik } from "formik";
import * as yup from "yup";
import { FunctionComponent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getProductById, updateProduct } from "../../services/productsService";
import Product from "../../interfaces/Product";
import { sendSuccessMessage } from "../../services/feedBack";

interface UpdateProductProps {
  show: boolean;
  onHide: Function;
  refresh: Function;
  productId: number;
}

const UpdateProduct: FunctionComponent<UpdateProductProps> = ({
  show,
  onHide,
  refresh,
  productId,
}) => {
  let [product, setProduct] = useState<Product>({
    name: "",
    category: "",
    price: 0,
    description: "",
    image: "",
    purchases: 0,
    quantity: 1,
  });
  let formik = useFormik({
    initialValues: {
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      purchases: product.purchases,
      quantity: product.quantity,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      category: yup.string().required(),
    }),
    onSubmit: (product: Product) => {
      updateProduct(productId, product)
        .then(() => sendSuccessMessage("Product updated successfully"))
        .catch((err) => console.log(err));
      onHide();
      refresh();
    },
  });
  useEffect(() => {
    getProductById(productId)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [productId]);
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Product name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="floatingInput">Product name</label>
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
            <div className="form-floating mb-3">
              <label htmlFor="category">Category</label>
            </div>
            {formik.touched.category && formik.errors.category && (
              <p className="text-danger">{formik.errors.category}</p>
            )}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="price"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="floatingPassword">Price</label>
            </div>
            {formik.touched.price && formik.errors.price && (
              <p className="text-danger">{formik.errors.price}</p>
            )}
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="description"
                name="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
            <p className="text-danger">Uploading image coming soon</p>

            <button
              className="btn btn-warning w-100"
              disabled={!formik.dirty || !formik.isValid}
              type="submit"
            >
              Update
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={() => onHide()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProduct;
