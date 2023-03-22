export enum ProductCategory {
    "Other",
    "Fruits and vegetables",
    "Meat",
    "Cereal products",
    "Milk products",
    "Candy",
}

export interface ProductInterface {
    id: string;
    name: string;
    category: ProductCategory;
}

export type AddProductResponse = {
    product: { id: string };
};

export type DeleteProductResponse = {
    message: string;
};

export type ProductListResponse = {
    products: ProductInterface[];
};

export type CreateProductRequest = {
    name: string;
    category: number;
};
export type UpdateProductRequest = {
    name: string;
    category: number;
};
