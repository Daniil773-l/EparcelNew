import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import AnimationRevealPage from '../../../components/helpers/AnimationRevealPage';
import MainCabinetHeader from '../../../components/headers/MainCabinetHeader';
import { MdDelete } from "react-icons/md";
import {  ExpecteLink } from "../../../components/misc/Headings.js";
import { toast, Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners'; // Импортируем лоадер из библиотеки
const PageContainer = styled.div`
    ${tw`min-h-screen flex flex-col`}
`;

const HighlightedText = styled.span`
    ${tw`text-primary-500`}
    color: #0ABD19;
`;

const FormContainer = styled.div`
    ${tw`flex justify-center items-center flex-grow py-10`}
`;

const Container = styled.div`
    ${tw`w-full max-w-6xl p-8 bg-white shadow-lg rounded-lg border`}
    border: 2px solid #1BA557;
    border-radius: 15px;
    padding: 60px 57px;
`;

const Form = styled.form`
    ${tw`grid grid-cols-2 gap-6`}
`;

const FormGroup = styled.div`
    ${tw`relative flex flex-col mb-6`}
`;

const Label = styled.label`
    ${tw`mt-1 sm:mt-0 mb-2 font-medium text-secondary-100 leading-loose`}
`;

const Input = styled.input`
    ${tw`mt-2 first:mt-0 py-3 focus:outline-none font-medium transition duration-300 border-b-2`}
    color: #6c757d;
    border-color: transparent;
    border-bottom-color: #adb5bd;
    font-family: inherit;
    &::placeholder {
        color: #adb5bd;
    }
    &:hover {
        border-bottom-color: #0ABD19;
    }
    &:focus {
        border-bottom-color: #0ABD19;
    }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
    ${tw`mt-2 w-full`}
    height: 35px;
`;

const ButtonContainer = styled.div`
    ${tw`flex justify-center mt-10`}
    gap: 20px;
`;

const Button = styled.button`
    ${tw`px-8 py-3 font-bold text-white rounded-full focus:outline-none transition-transform duration-300`}
    background-color: #0ABD19;
    &:hover {
        background-color: #0ABD50;
        transform: scale(1.05);
    }
`;

const WhiteButton = styled(Button)`
    ${tw`text-green-600 bg-white border border-green-600`}
    &:hover {
        background-color: #f0f0f0;
    }
`;

const StepTitle = tw(ExpecteLink)`w-full mt-2 mb-4`;

const DeleteIconContainer = styled.div`
    ${tw`flex justify-end`}
    svg {
        ${tw`w-6 h-6 cursor-pointer`}
        color: red;
        &:hover {
            color: darkred;
        }
    }
`;
const LoadingContainer = styled.div`
    ${tw`w-full h-screen flex justify-center items-center`}
`;
const ProductForm = ({ index, product, handleChange, handleDelete }) => {
    return (
        <>
            <StepTitle>
                <HighlightedText>Товар {index + 1}</HighlightedText>
                <DeleteIconContainer>
                    <MdDelete onClick={() => handleDelete(index)} />
                </DeleteIconContainer>
            </StepTitle>
            <Form>
                <FormGroup style={{ gridColumn: 'span 1' }}>
                    <Label htmlFor={`productType-${index}`}>Тип товара</Label>
                    <Input
                        id={`productType-${index}`}
                        type="text"
                        placeholder="Введите тип товара"
                        value={product.productType || ''}
                        onChange={(e) => handleChange(e, index)}
                    />
                </FormGroup>
                <FormGroup style={{ gridColumn: 'span 1' }}>
                    <Label htmlFor={`productBrand-${index}`}>Бренд товара</Label>
                    <Input
                        id={`productBrand-${index}`}
                        type="text"
                        placeholder="Введите бренд товара"
                        value={product.productBrand || ''}
                        onChange={(e) => handleChange(e, index)}
                    />
                </FormGroup>
                <FormGroup style={{ gridColumn: 'span 1' }}>
                    <Label htmlFor={`productColor-${index}`}>Цвет и размер</Label>
                    <Input
                        id={`productColor-${index}`}
                        type="text"
                        placeholder="Введите цвет и размер"
                        value={product.productColor || ''}
                        onChange={(e) => handleChange(e, index)}
                    />
                </FormGroup>
                <FormGroup style={{ gridColumn: 'span 1' }}>
                    <Label htmlFor={`productQuantity-${index}`}>Количество товара(ов)</Label>
                    <Input
                        id={`productQuantity-${index}`}
                        type="number"
                        placeholder="Введите количество"
                        value={product.productQuantity || ''}
                        onChange={(e) => handleChange(e, index)}
                    />
                </FormGroup>
                <FormGroup style={{ gridColumn: 'span 1' }}>
                    <Label htmlFor={`productPrice-${index}`}>Стоимость товара (за шт)</Label>
                    <Input
                        id={`productPrice-${index}`}
                        type="text"
                        placeholder="Введите стоимость"
                        value={product.productPrice || ''}
                        onChange={(e) => handleChange(e, index)}
                    />
                </FormGroup>
                <FormGroup style={{ gridColumn: 'span 1' }}>
                    <Label htmlFor={`productName-${index}`}>Назване товара на (англ)</Label>
                    <Input
                        id={`productName-${index}`}
                        type="text"
                        placeholder="Введите название товара"
                        value={product.productName || ''}
                        onChange={(e) => handleChange(e, index)}
                    />
                </FormGroup>
                <FormGroup style={{ gridColumn: 'span 2' }}>
                    <Label htmlFor={`productLink-${index}`}>Ссылка на товар</Label>
                    <Input
                        id={`productLink-${index}`}
                        type="text"
                        placeholder="Введите ссылку на товар"
                        value={product.productLink || ''}
                        onChange={(e) => handleChange(e, index)}
                    />
                </FormGroup>
            </Form>
        </>
    );
};

const EditExpectedLink = () => {
    const [formValues, setFormValues] = useState({
        parcelName: '',
        warehouse: '',
        trackingNumber: '',
        storeName: '',
        comment: '',
        products: [],
    });
    const { documentId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadParcelData = async () => {
            setLoading(true);
            setFormValues({
                parcelName: '',
                warehouse: '',
                trackingNumber: '',
                storeName: '',
                comment: '',
                products: [],
            }); // Очищаем данные перед загрузкой новой посылки

            if (!documentId) {
                toast.error("Посылка не найдена!");
                setLoading(false);
                return;
            }

            const db = getFirestore();
            const q = query(collection(db, 'parcels'), where('id', '==', documentId));

            try {
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docSnap = querySnapshot.docs[0];
                    const parcelData = docSnap.data();
                    setFormValues({
                        parcelName: parcelData.parcelName || '',
                        warehouse: parcelData.warehouse || '',
                        trackingNumber: parcelData.trackingNumber || '',
                        storeName: parcelData.storeName || '',
                        comment: parcelData.comment || '',
                        products: parcelData.products || [],
                    });
                } else {

                }
            } catch (error) {

            } finally {
                setLoading(false);
            }
        };

        loadParcelData();
    }, [documentId, location.pathname]); // Обновляем при изменении documentId или пути

    const handleSubmit = async () => {
        if (!documentId) {
            return;
        }

        const db = getFirestore();
        const q = query(collection(db, 'parcels'), where('id', '==', documentId));

        try {
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, {
                    ...formValues,
                    products: formValues.products,
                });
                toast.success("Посылка успешно обновлена!");

                // Задержка для отображения тоста перед переходом
                setTimeout(() => {
                    navigate("/IncomingParcels");
                }, 2000);  // Устанавливаем задержку, например, 2 секунды
            } else {
                toast.error("Посылка не найдена!");
            }
        } catch (error) {
            toast.error(`Ошибка при редактировании посылки: ${error.message}`);
        }
    };


    const handleChange = (e, index = null) => {
        const { id, value } = e.target;
        if (index === null) {
            setFormValues({
                ...formValues,
                [id]: value,
            });
        } else {
            const updatedProducts = [...formValues.products];
            const productKey = id.split('-')[0];
            updatedProducts[index] = {
                ...updatedProducts[index],
                [productKey]: value,
            };
            setFormValues({
                ...formValues,
                products: updatedProducts,
            });
        }
    };

    const handleDelete = (index) => {
        const updatedProducts = [...formValues.products];
        updatedProducts.splice(index, 1);
        setFormValues({
            ...formValues,
            products: updatedProducts,
        });
    };

    const addProduct = () => {
        setFormValues({
            ...formValues,
            products: [...formValues.products, {}],
        });
    };


    if (loading) {
        return (
            <LoadingContainer>
                <ClipLoader size={150} color="#0ABD19" /> {/* Анимированный лоадер */}
            </LoadingContainer>
        ); // Индикатор загрузки
    }

    return (
        <AnimationRevealPage>
            <MainCabinetHeader />
            <PageContainer>
                <Toaster />
                <FormContainer>
                    <div style={{ width: '100%', maxWidth: '1280px' }}>
                        <StepTitle active={true}><HighlightedText>Шаг 1. </HighlightedText>Заполните информацию о посылке</StepTitle>
                        <Container>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="parcelName">Название посылки</Label>
                                    <Input
                                        id="parcelName"
                                        type="text"
                                        placeholder="Введите название посылки"
                                        value={formValues.parcelName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="warehouse">Склад</Label>
                                    <Input
                                        id="warehouse"
                                        type="text"
                                        placeholder="Введите склад"
                                        value={formValues.warehouse}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="trackingNumber">Трек-номер</Label>
                                    <Input
                                        id="trackingNumber"
                                        type="text"
                                        placeholder="Введите трек-номер"
                                        value={formValues.trackingNumber}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="storeName">Название магазина (на англ.)</Label>
                                    <Input
                                        id="storeName"
                                        type="text"
                                        placeholder="Укажите название магазина"
                                        value={formValues.storeName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup style={{ gridColumn: 'span 2' }}>
                                    <Label htmlFor="comment">Комментарий для оператора</Label>
                                    <TextArea
                                        id="comment"
                                        placeholder="Оставьте комментарий для оператора"
                                        value={formValues.comment}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Form>
                        </Container>
                    </div>
                </FormContainer>
                <FormContainer>
                    <div style={{ width: '100%', maxWidth: '1280px' }}>
                        <StepTitle active={false}><HighlightedText>Шаг 2.</HighlightedText> Добавьте информацию о товаре</StepTitle>
                        <Container>
                            <div>
                                {formValues.products.map((product, index) => (
                                    <ProductForm key={index} index={index} product={product} handleChange={handleChange} handleDelete={handleDelete} />
                                ))}
                            </div>
                            <ButtonContainer>
                                <Button type="button" onClick={addProduct}>+ Добавить товар</Button>
                            </ButtonContainer>
                        </Container>
                    </div>
                </FormContainer>
                <ButtonContainer>
                    <Button type="button" onClick={handleSubmit}>
                        Сохранить изменения
                    </Button>
                    <WhiteButton type="button" onClick={() => navigate("/your-url-here")}>
                        Отмена
                    </WhiteButton>
                </ButtonContainer>
            </PageContainer>
        </AnimationRevealPage>
    );
};

export default EditExpectedLink;
