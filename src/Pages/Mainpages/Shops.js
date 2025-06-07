import React, { useState } from "react";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Header from "../../components/headers/MainHeader";
import Footer from "../../components/footers/MainFooterWithLinks";
import Shop from "./componets/DashedBorderSixFeatures";
import Cards from './componets/DashedBorderSixFeatures';
import styled, { css } from 'styled-components';
import tw from "twin.macro";
import SliderCard from "../../components/cards/ThreeColSlider.js";
import  DesignIllustration from "../../images/img/shops_1.png"
// Стили для контейнера кнопок
const ButtonContainer = styled.div`
        ${tw`flex flex-wrap items-center justify-center gap-4`}
        ${tw`p-4 sm:px-4 md:px-8 lg:px-12 xl:px-16`}
    `;

// Базовые стили для кнопок
const BaseButtonStyles = css`
        ${tw`px-6 py-2 font-semibold rounded-lg shadow-md bg-white text-lg text-gray-600`}
        ${tw`h-12 w-full sm:w-auto`}
        ${tw`m-2`}
        border: 2px solid #0ABD19;
    
        &:hover {
            ${tw`text-black bg-green-200`}
        }
    
        &:focus {
            ${tw`text-black bg-green-200`}
        }
    `;

// Стили для первичной кнопки
const PrimaryButton = styled.button`
        ${BaseButtonStyles}
        ${({ selected }) => selected && css`
            ${tw`bg-green-200 border-green-700 text-black`}
        `}
    `;

// Стили для вторичной кнопки
const SecondaryButton = styled.button`
        ${BaseButtonStyles}
    `;

// Описание секции
const SectionDescription = styled.p`
        ${tw`mt-8 text-xl text-gray-700`}
    `;

export default function App() {
    const [selectedCountry, setSelectedCountry] = useState("США");
    const [selectedCategory, setSelectedCategory] = useState("Детский мир");

    return (
        <AnimationRevealPage>
            <Header
                heading="Список популярных магазинов"
                paragraph="Мы собрали для вас лучшие магазины в каждой категории. Большой ассортимент, приемлемые цены и частые распродажи."
                imageSrc={DesignIllustration}
                roundedHeaderButton={false}
            />
            {/*<ButtonContainer>*/}
            {/*    <PrimaryButton onClick={() => setSelectedCountry('США')} selected={selectedCountry === 'США'}>США</PrimaryButton>*/}
            {/*    /!*<PrimaryButton onClick={() => setSelectedCountry('Турция')} selected={selectedCountry === 'Турция'}>Турция</PrimaryButton>*!/*/}
            {/*</ButtonContainer>*/}
            <ButtonContainer>
                <SecondaryButton onClick={() => setSelectedCategory('Детский мир')} selected={selectedCategory === 'Детский мир'}>Детский мир</SecondaryButton>
                <SecondaryButton onClick={() => setSelectedCategory('Здоровье')} selected={selectedCategory === 'Здоровье'}>Здоровье</SecondaryButton>
                {selectedCountry !== 'Турция' && (
                    <SecondaryButton onClick={() => setSelectedCategory('Зоотовары')} selected={selectedCategory === 'Зоотовары'}>Зоотовары</SecondaryButton>
                )}
                <SecondaryButton onClick={() => setSelectedCategory('Косметика и парфюмерия')} selected={selectedCategory === 'Косметика и парфюмерия'}>Косметика и парфюмерия</SecondaryButton>
                {selectedCountry !== 'Турция' && (
                    <SecondaryButton onClick={() => setSelectedCategory('Магазины с оплатой криптовалютой')} selected={selectedCategory === 'Магазины с оплатой криптовалютой'}>Магазины с оплатой криптовалютой</SecondaryButton>
                )}
            </ButtonContainer>
            <ButtonContainer>
                <SecondaryButton onClick={() => setSelectedCategory('Маркетплейсы')} selected={selectedCategory === 'Маркетплейсы'}>Маркетплейсы</SecondaryButton>
                <SecondaryButton onClick={() => setSelectedCategory('Одежда, обувь, аксессуары')} selected={selectedCategory === 'Одежда, обувь, аксессуары'}>Одежда, обувь, аксессуары</SecondaryButton>
                <SecondaryButton onClick={() => setSelectedCategory('Хобби и спорт')} selected={selectedCategory === 'Хобби и спорт'}>Хобби и спорт</SecondaryButton>
                <SecondaryButton onClick={() => setSelectedCategory('Электроника')} selected={selectedCategory === 'Электроника'}>Электроника</SecondaryButton>
                <SecondaryButton onClick={() => setSelectedCategory('Авто')} selected={selectedCategory === 'Авто'}>Авто</SecondaryButton>

            </ButtonContainer>
            <Shop/>
            <Cards selectedCountry={selectedCountry} selectedCategory={selectedCategory}/>
            <SliderCard />
            <Footer />
        </AnimationRevealPage>
    );
}
