import * as Yup from "yup";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  image: Yup.string(),
  price: Yup.string().required(),
});
