import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const ProductsTable = styled.div`
    ${tw`w-full mt-4 `}
`;

const TableHeaderRow = styled.div`
    ${tw`flex justify-between items-center py-2 border-b border-gray-200`}
`;

const TableRow = styled.div`
    ${tw`flex justify-between items-center py-2 border-b border-gray-200`}
`;

const TableCell = styled.div`
    ${tw`text-sm text-gray-600`}
    width: ${(props) => props.width || 'auto'};
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;

    a {
        text-decoration: none;
        color: #0ABD19;
    }
`;

const EditLink = styled.a`
    ${tw`text-sm text-green-600 cursor-pointer`}
`;

const ButtonContainer = styled.div`
    ${tw`flex justify-between mt-8`}
`;

const GreenButton = styled.button`
    ${tw`text-white py-3 px-16 rounded-lg`}
    transition: transform 0.3s ease;
    background: #0ABD19;
    font-size: 16px;
    border: none;
    &:hover {
        transform: scale(1.1);
    }
`;

const ProductsTitle = styled.h4`
    ${tw`text-base`}
    color: #2D2D2D;
    font-weight: inherit;
    margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
    ${tw`flex flex-col justify-between mt-6`}
`;

const Row = styled.div`
    ${tw`grid grid-cols-3 gap-6 mt-4`}
`;

const Label = styled.label`
    ${tw`text-sm font-semibold mb-1`}
    color: #d3d3d3;
`;

const Input = styled.input`
    ${tw`border-2 rounded-lg p-3 text-gray-600`}
    border-color: #D3D3D3;
    transition: border-color 0.3s ease;
    font-size: 16px;
    &:focus {
        border-color: #0ABD19;
    }

    &::placeholder {
        color: #d3d3d3;
        transition: color 0.3s ease;
    }
`;

const Container = styled.div`
    ${tw`flex items-center py-2 items-start justify-start`}
    margin-top: 20px;
`;

const TotalLabel = styled.div`
    ${tw`text-sm`}
`;

const TotalValue = styled.div`
    ${tw`text-sm text-green-600`}
    margin-left: 10px;
`;

const InformationContainer = styled.div`
    ${tw`flex items-center py-2 items-start justify-start`}
`;

const FormProducts = ({ productsData }) => {
    const [products, setProducts] = useState(productsData || []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [addingNewProduct, setAddingNewProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        type: '',
        name: '',
        brand: '',
        color: '',
        link: '',
        price: '',
        quantity: 0,
        total: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddNewProduct = () => {
        if (editingIndex !== null) {
            const updatedProducts = [...products];
            const total = parseFloat(newProduct.price) * parseInt(newProduct.quantity);
            updatedProducts[editingIndex] = { ...newProduct, total: `${total} $` };
            setProducts(updatedProducts);
            setEditingIndex(null);
        } else if (addingNewProduct) {
            const price = parseFloat(newProduct.price) || 0;
            const quantity = parseInt(newProduct.quantity) || 0;
            const total = price * quantity;

            const updatedProduct = { ...newProduct, total: `${total} $` };

            setProducts([...products, updatedProduct]);
        }
        setNewProduct({
            type: '',
            name: '',
            brand: '',
            color: '',
            link: '',
            price: '',
            quantity: 0,
            total: '',
        });
        setAddingNewProduct(!addingNewProduct);
    };

    const handleEditProduct = (index) => {
        const productToEdit = products[index];
        setNewProduct(productToEdit);
        setAddingNewProduct(true);
        setEditingIndex(index);
    };

    const totalQuantity = products.reduce((acc, product) => acc + (parseInt(product.productQuantity) || 0), 0);
    const totalPrice = products.reduce((acc, product) => acc + ((parseFloat(product.productPrice) || 0) * (parseInt(product.productQuantity) || 0)), 0);

    return (
        <ProductsTable>
            <ProductsTitle>Товары</ProductsTitle>
            <TableHeaderRow>
                <TableCell width="5%">№</TableCell>
                <TableCell width="10%">Тип</TableCell>
                <TableCell width="15%">Название товара</TableCell>
                <TableCell width="15%">Бренд</TableCell>
                <TableCell width="10%">Цвет/размер</TableCell>
                <TableCell width="10%">Ссылка на товар</TableCell>
                <TableCell width="10%">Цена за штуку</TableCell>
                <TableCell width="10%">Количество</TableCell>
                <TableCell width="7%">Итого</TableCell>
                <TableCell width="8%">Edit</TableCell>
            </TableHeaderRow>
            {products.map((product, index) => {
                const totalProductPrice = (parseFloat(product.productPrice) || 0) * (parseInt(product.productQuantity) || 0);
                return (
                    <TableRow key={index}>
                        <TableCell width="5%">{index + 1}</TableCell>
                        <TableCell width="10%">{product.productType}</TableCell>
                        <TableCell width="15%">{product.productName}</TableCell>
                        <TableCell width="15%">{product.productBrand}</TableCell>
                        <TableCell width="10%">{product.productColor}</TableCell>
                        <TableCell width="10%">
                            <a href={product.productLink} target="_blank" rel="noopener noreferrer">Просмотреть</a>
                        </TableCell>

                        <TableCell width="10%">{product.productPrice}</TableCell>
                        <TableCell width="10%">{product.productQuantity}</TableCell>
                        <TableCell width="7%">{totalProductPrice} $</TableCell>
                        <TableCell width="8%"><EditLink onClick={() => handleEditProduct(index)}>Редактировать</EditLink></TableCell>
                    </TableRow>
                );
            })}
            <Container>
                <TotalLabel>Общее количество товаров:</TotalLabel>
                <TotalValue>{totalQuantity}</TotalValue>
            </Container>
            <InformationContainer>
                <TotalLabel>Общая стоимость товаров:</TotalLabel>
                <TotalValue>{totalPrice} $</TotalValue>
            </InformationContainer>
            {addingNewProduct && (
                <div>
                    <Row>
                        <InputContainer>
                            <Label>Название товара</Label>
                            <Input
                                type="text"
                                placeholder="Введите название"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Производитель</Label>
                            <Input
                                type="text"
                                placeholder="Укажите производителя"
                                name="brand"
                                value={newProduct.brand}
                                onChange={handleInputChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Тип товара</Label>
                            <Input
                                type="text"
                                placeholder="Укажите тип товара"
                                name="type"
                                value={newProduct.type}
                                onChange={handleInputChange}
                            />
                        </InputContainer>
                    </Row>
                    <Row>
                        <InputContainer>
                            <Label>Характеристики</Label>
                            <Input
                                type="text"
                                placeholder="Цвет-размер"
                                name="color"
                                value={newProduct.color}
                                onChange={handleInputChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Стоимость</Label>
                            <Input
                                type="text"
                                placeholder="Стоимость"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Количество</Label>
                            <Input
                                type="number"
                                placeholder="Количество"
                                name="quantity"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                            />
                        </InputContainer>
                    </Row>
                    <Row>
                        <InputContainer>
                            <Label>Название магазина</Label>
                            <Input
                                type="text"
                                placeholder="Название магазина"
                                name="storeName"
                                value={newProduct.storeName}
                                onChange={handleInputChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Ссылка</Label>
                            <Input
                                type="text"
                                placeholder="http:"
                                name="link"
                                value={newProduct.link}
                                onChange={handleInputChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Комментарий</Label>
                            <Input
                                type="text"
                                placeholder="Бла бла бла"
                                name="comment"
                                value={newProduct.comment}
                                onChange={handleInputChange}
                            />
                        </InputContainer>
                    </Row>
                </div>
            )}

            <ButtonContainer>
                <GreenButton onClick={handleAddNewProduct}>
                    {addingNewProduct ? 'Сохранить' : 'Добавить новый товар'}
                </GreenButton>
            </ButtonContainer>
        </ProductsTable>
    );
};

export default FormProducts;
