import React, { useState } from "react";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Header from '../../components/headers/MainHeader';
import Footer from "../../components/footers/MainFooterWithLinks";
import tw from "twin.macro";
import styled from "styled-components";
import DesignIllustration from "../../images/img/тарифы.png";
import Bacround_tarif from "../../images/img/Bacround-cardtarif.svg";
import Bacround_tarif2 from "../../images/img/Bacround-tarrif-2.svg";
import DutyCalculator from "./componets/customsDutyCalculator";
import MainFeature1 from "../../components/features/TwoColWithTwoHorizontalFeaturesAndButton1.js";
import Modal from "react-modal";
export default () => {



    const Prim = styled.span`
        ${tw`text-center text-primary-500 md:text-left`}
        color: #0ABD19;
    `;
    const Heading = tw.h2`w-full text-2xl sm:text-3xl font-black tracking-wide text-center`;

    const HeaderContainer = tw.div`w-full flex flex-col items-center mt-12 mb-12`;
    const BlockContainer = styled.div`
        ${tw`w-full flex flex-wrap justify-center`}
        max-width: 1280px;
        margin: 20px auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Автоматическая адаптация колонок */
        gap: 20px; /* Расстояние между элементами */
    `;

    const Block = styled.div`
        ${tw`w-full p-4`}
        max-width:380px;
        margin-bottom: 30px;
        background: url(${Bacround_tarif}) center no-repeat;
        background-size: cover;
        border-radius: 15px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    `;


    const BlockWrapper = styled.div`
        ${tw`w-full flex flex-col items-center`}

        @media (max-width: 768px) {
        ${tw`flex flex-col`} /* Столбцы превращаются в строки */
    }
    `;
    const Block2 = styled.div`
        ${tw`w-full p-4`}
        max-width:380px;
        margin-bottom: 30px;
        background: url(${Bacround_tarif2}) center no-repeat;
        border-radius: 15px; /* Скруглённые углы */
      
        display: flex; /* Используем flex для центрирования */
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-bottom: 10px; /* Отступ снизу */
        overflow: hidden; /* Обрезаем содержимое, выходящее за границы */
        padding: 20px; /* Отступы внутри */
    `;


    const BlockTitle = styled.h3`
        ${tw`text-3xl font-bold mb-4`}
        color: #1BA557;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const BlockDescription = styled.p`
        ${tw`text-lg text-black`}
    `;

    const ZoneNumber = styled.span`
        color: #0ABD19;
    `;

    const BlockTitleText = styled.span`
        color: black;
        margin-right: 5px;
    `;

    const PriceTable = styled.table`
        ${tw`w-full text-left`}
        border-collapse: collapse;
        border: none;
    `;

    const PriceRow = styled.tr`
        &:first-child td {
            border-top: none;
        }
        &:last-child td {
            border-bottom: none;
        }
    `;

    const PriceCell = styled.td`
        ${tw`py-2 border-2 border-gray-300`}
        &:first-child {
            border-left: none;
        }
        &:last-child {
            border-right: none;
        }
    `;
    const TarifZone = ({ zoneNumber, cities }) => {
        const [modalIsOpen, setModalIsOpen] = useState(false);

        return (
            <div>

                <button
                    onClick={() => setModalIsOpen(true)}
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#0ABD19",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Посмотреть
                </button>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнение фона
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        },
                        content: {
                            width: "340px", // Размер окна
                            maxHeight: "350px",
                            overflowY: "auto",
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            padding: "15px",
                            textAlign: "center",
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                            border: "none",
                            margin: "auto", // Центрирование
                            position: "relative", // Убираем абсолютное позиционирование
                            transition: "opacity 0.3s ease, transform 0.3s ease",
                            opacity: modalIsOpen ? "1" : "0",
                            transform: modalIsOpen ? "scale(1)" : "scale(0.95)",
                        },
                    }}
                >
                    <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
                        Города Тарифной Зоны {zoneNumber}
                    </h2>
                    <p style={{ fontSize: "14px", lineHeight: "1.4", color: "#333", marginBottom: "12px" }}>
                        {cities}
                    </p>
                    <button
                        onClick={() => setModalIsOpen(false)}
                        style={{
                            marginTop: "10px",
                            padding: "8px 16px",
                            backgroundColor: "#e74c3c",
                            color: "white",
                            fontSize: "14px",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "background 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#c0392b")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#e74c3c")}
                    >
                        Закрыть
                    </button>
                </Modal>


            </div>
        );
    };

    return (
        <AnimationRevealPage>
            <Header
                heading="Тарифы для выгодных покупок вместе с Eparcel.kz"
                paragraph="Доставка товаров осуществляется компанией Eparcel по тарифам в зависимости от региона, в котором Вы проживаете."
                imageSrc={DesignIllustration}
                roundedHeaderButton={false}
            />
            <HeaderContainer>
                <Heading>Тарифы</Heading>
                {/*<div>*/}
                {/*    <button onClick={() => setActiveCountry('США')} style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '10px', border: activeCountry === 'США' ? '2px solid #0ABD19' : '2px solid transparent', backgroundColor: activeCountry === 'США' ? '#DDF2E6' : 'transparent' }}>США</button>*/}
                {/*    /!*<button onClick={() => setActiveCountry('Турция')} style={{ padding: '10px 20px', borderRadius: '10px', border: activeCountry === 'Турция' ? '2px solid #0ABD19' : '2px solid transparent', backgroundColor: activeCountry === 'Турция' ? '#DDF2E6' : 'transparent' }}>Турция</button>*!/*/}
                {/*</div>*/}
            </HeaderContainer>
            <BlockContainer>
                <BlockWrapper>
                    <Block>
                        <BlockTitle>
                            <BlockTitleText>Тарифная</BlockTitleText> <ZoneNumber>Зона 1</ZoneNumber>
                        </BlockTitle>
                        <TarifZone
                            zoneNumber="1"
                            cities="Алматы, Абай, Бесагаш, Боралдай, Каскелен, Отеген-Батыр, Талгар, Туздыбастау, Есик, Конаев, Кордай, Талдыкорган"
                        />
                    </Block>

                    <Block2>
                        <PriceTable>
                            <tbody>
                            <PriceRow>
                                <PriceCell>Вес  посылки</PriceCell>
                                <PriceCell>Стоимость доставки</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>0.5 кг</PriceCell>
                                <PriceCell>10 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>1 кг</PriceCell>
                                <PriceCell>14 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>1.5 кг</PriceCell>
                                <PriceCell>21 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>2 кг</PriceCell>
                                <PriceCell>28 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>2.5 кг</PriceCell>
                                <PriceCell>35 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>3 кг</PriceCell>
                                <PriceCell>42 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>(+ 1кг)</PriceCell>
                                <PriceCell>+ 14 $</PriceCell>
                            </PriceRow>
                            </tbody>
                        </PriceTable>
                    </Block2>

                </BlockWrapper>
                <BlockWrapper>
                <Block>
                    <BlockTitle>
                        <BlockTitleText>Тарифная</BlockTitleText> <ZoneNumber>Зона 2</ZoneNumber>
                    </BlockTitle>

                    <TarifZone
                        zoneNumber="2"
                        cities=" Астана, Балкаш, Караганда, Косшы, Ленгер, Приозёрск, Сарань, Сарыагаш, Тараз, Темиртау, Туркестан, Шахтинск, Шымкент, Атбасар, Жезказган, Житикара, Кокшетау, Костанай, Лисаковск, Новоишимское, Петропавловск, Рудный, Сатпаев, Степногорск, Тайынша, Тобыл, Щучинск"
                        />
                </Block>
                    <Block2>
                        <PriceTable>
                            <tbody>
                            <PriceRow>
                                <PriceCell>Вес посылки</PriceCell>
                                <PriceCell>Стоимость доставки</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>0.5 кг</PriceCell>
                                <PriceCell>11 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>1 кг</PriceCell>
                                <PriceCell>15 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>1.5 кг</PriceCell>
                                <PriceCell>22 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>2 кг</PriceCell>
                                <PriceCell>29 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>2.5 кг</PriceCell>
                                <PriceCell>36 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>3 кг</PriceCell>
                                <PriceCell>43 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>(+ 1кг)</PriceCell>
                                <PriceCell>+ 15 $</PriceCell>
                            </PriceRow>
                            </tbody>
                        </PriceTable>
                    </Block2>
                </BlockWrapper>
                <BlockWrapper>
                <Block>
                    <BlockTitle>
                        <BlockTitleText>Тарифная</BlockTitleText> <ZoneNumber>Зона 3</ZoneNumber>
                    </BlockTitle>
                    <TarifZone
                        zoneNumber="3"
                       cities=" Алтай, Кызылорда, Павлодар, Риддер, Семей, Усть-Каменогорск, Шемонаиха, Экибастуз, Аксай, Актау, Актобе, Атырау, Жанаозен, Уральск"
                        />
                </Block>
                    <Block2>
                        <PriceTable>
                            <tbody>
                            <PriceRow>
                                <PriceCell>Вес посылки</PriceCell>
                                <PriceCell>Стоимость доставки</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>0.5 кг</PriceCell>
                                <PriceCell>12 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>1 кг</PriceCell>
                                <PriceCell>16 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>1.5 кг</PriceCell>
                                <PriceCell>23 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>2 кг</PriceCell>
                                <PriceCell>30 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>2.5 кг</PriceCell>
                                <PriceCell>37 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>3 кг</PriceCell>
                                <PriceCell>44 $</PriceCell>
                            </PriceRow>
                            <PriceRow>
                                <PriceCell>(+ 1кг)</PriceCell>
                                <PriceCell>+ 16 $</PriceCell>
                            </PriceRow>
                            </tbody>
                        </PriceTable>
                    </Block2>
                </BlockWrapper>


            </BlockContainer>
            <MainFeature1
                subheading={<Prim></Prim>}
                heading={
                    <>
                        Рассчитайте стоимость <Prim>доставки</Prim>
                    </>
                }
                showDecoratorBlob={false}
            />
            <DutyCalculator />
            <Footer />
        </AnimationRevealPage>
    );
};
