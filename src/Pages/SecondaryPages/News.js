import React, {useState} from 'react';
import tw from 'twin.macro';
import styled, {css} from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Header from "../../components/headers/MainHeader";
import Footer from "../../components/footers/MainFooterWithLinks";
import {PrimaryButton as PrimaryButtonBase} from "./../../components/misc/Buttons";
import Photo from "../../images/img/Новости и спецпредложения.png"

const ButtonContainer = styled.div`
    ${tw`flex flex-wrap items-center justify-center gap-4`}
    ${tw`p-4 sm:px-4 md:px-8 lg:px-12 xl:px-16`}
    margin-bottom: 30px;
`;

const Button = styled(PrimaryButtonBase)`
    ${tw`px-6 py-2 font-semibold rounded-lg shadow-md text-lg text-gray-600`}
    ${tw`h-12 w-full sm:w-auto`}
    ${tw`m-2`}
    background-color: white;
    border: 2px solid #0ABD19;
    color: #0ABD19;

    ${({ selected }) => selected && css`
        background-color: #0ABD19;
        border-color: #0ABD19;
        color: white;
    `}
    &:hover {
        background-color: #0ABD19;
        border-color: #0ABD19;
        color: white;
    }

    &:focus {
        background-color: #0ABD19;
        border-color: #0ABD19;
        color: white;
    }
`;

const Card = styled(motion.div)`
    ${tw`rounded-lg overflow-hidden shadow-lg relative`}
    transition: transform 0.3s ease-in-out;
    background: white;
    cursor: pointer;
    height: 100%;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    }
`;

const CardText = styled.div`
    ${tw`p-4 justify-center items-center flex-col`}
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const CardTitle = styled.h2`
    ${tw`font-bold text-lg mb-2`}
    &:hover {
        color: #0ABD19;
    }
`;

const CardDescription = styled.p`
    ${tw`text-gray-700 text-sm`}
    font-size: 16px;
    line-height: 18px;
`;

const CardImage = styled.img`
    width: 100%;
    height: 40%;
    object-fit: cover;
    ${tw`rounded-t-lg`}
`;

const CardContainer = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 my-6`}
    max-width: 1200px;
    margin: auto;
    margin-bottom: 30px;
`;

const CardLabel = styled.span`
    ${tw`absolute top-0 left-0 text-white px-3 py-1 text-xs font-bold uppercase`}
    background-color: #0ABD19;
`;

const cardData = [
    {
        id: 1,
        category: 'Новости',
        title: 'Как правильно указывать адрес для доставки',
        description: 'Чтобы посылка точно пришла к нам на склад.',
        image: 'https://eparcel.ru/image/cache/catalog/news/stock3-300x214.png'
    },
    {
        id: 2,
        category: 'Новости',
        title: 'Топ-10 люксовых брендов сумочек',
        description: 'Ознакомьтесь с приведенным списком, чтобы узнать о самых роскошных сумках в мире.',
        image: 'https://eparcel.ru/image/catalog/news/luchshiye-brendy-sumok-e1676232705225.jpg'
    },
    {
        id: 3,
        category: 'Новости',
        title: 'Timberland. Вечная классика в мире обуви',
        description: 'Культовые модели и стильный дизайн – все это про Timberland!',
        image: 'https://eparcel.ru/image/catalog/timberland.jpg'
    },
    {
        id: 4,
        category: 'Скидки в магазинах',
        title: 'Где покупать товары с выгодой',
        description: 'Узнай, где самые выгодные покупки в США и Турции!',
        image: 'https://eparcel.ru/image/catalog/news/shopping.jpeg'
    },
    {
        id: 5,
        category: 'Скидки в магазинах',
        title: 'Две пары джинсов по сниженной цене в Levi',
        description: '50% на вторую пару!',
        image: 'https://eparcel.ru/image/catalog/levis.png'
    },
    {
        id: 6,
        category: 'Скидки в магазинах',
        title: 'Флэш-распродажа в Walmart',
        description: '65% на все!',
        image: 'https://eparcel.ru/image/catalog/walmart.png'
    },
    {
        id: 7,
        category: 'Скидки в магазинах',
        title: 'Акция от Amazon',
        description: 'Ищите нужную вещь: в Amazon она наверняка будет по скидке!',
        image: 'https://eparcel.ru/image/catalog/amazon.png'
    },

];

export default function App() {
    const [activeCategory, setActiveCategory] = useState('Все');

    const renderCards = () => {
        const filteredData = cardData.filter(card => card.category === activeCategory || activeCategory === 'Все');
        return filteredData.map(card => (
            <Card key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}>
                <CardLabel>{card.category}</CardLabel>
                <CardImage src={card.image} alt={card.title}/>
                <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                </CardText>
            </Card>
        ));
    };

    return (
        <AnimationRevealPage>
            <Header
                heading="Идеи для покупок, советы и многое другое от Eparcel.kz"
                paragraph="Актуальные новости и эксклюзивные предложения для наших клиентов. Следите за обновлениями, чтобы не пропустить выгодные акции и скидки на доставку товаров из-за границы."
                imageSrc=   {Photo}
                roundedHeaderButton={false}
            />
            <ButtonContainer>
                <Button onClick={() => setActiveCategory('Все')} selected={activeCategory === 'Все'}>Все</Button>
                <Button onClick={() => setActiveCategory('Скидки в магазинах')}
                        selected={activeCategory === 'Скидки в магазинах'}>Скидки в магазинах</Button>
                <Button onClick={() => setActiveCategory('Новости')}
                        selected={activeCategory === 'Новости'}>Новости</Button>
                <Button onClick={() => setActiveCategory('Советы')}
                        selected={activeCategory === 'Советы'}>Советы</Button>
            </ButtonContainer>
            <AnimatePresence>
                <CardContainer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={activeCategory}
                >
                    {renderCards()}
                </CardContainer>
            </AnimatePresence>
            <Footer/>
        </AnimationRevealPage>
    );
}
