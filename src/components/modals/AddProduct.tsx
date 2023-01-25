import { useFormik } from "formik";
import * as yup from "yup";
import { FunctionComponent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Category } from "../../interfaces/Category";
import { addProduct, getCategories } from "../../services/productsService";
import Product from "../../interfaces/Product";
import { sendSuccessMessage } from "../../interfaces/feedBack";

interface AddProductProps {
  show: boolean;
  onHide: Function;
  refresh: Function;
}

const AddProduct: FunctionComponent<AddProductProps> = ({
  show,
  onHide,
  refresh,
}) => {
  let [categories, setCategories] = useState([]);
  let formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: 0,
      description: "",
      image: "",
      purchases: 0,
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      category: yup.string().required(),
    }),
    onSubmit: (product: Product) => {
      addProduct(product)
        .then(() => {
          sendSuccessMessage("Added new product successfully");
        })
        .catch((err) => console.log(err));
      onHide();
      refresh();
    },
  });
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="floatingInput">Product name</label>
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="category"
                name="category"
                aria-label="Floating label select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option selected hidden>
                  Select category
                </option>
                {categories.length ? (
                  categories.map((item: Category) => {
                    return <option value={item.name}>{item.name}</option>;
                  })
                ) : (
                  <p>no categories</p>
                )}
              </select>
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
              className="btn btn-success w-100"
              disabled={!formik.dirty || !formik.isValid}
              type="submit"
            >
              Submit
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

export default AddProduct;
