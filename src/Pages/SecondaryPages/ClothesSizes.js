import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header from "../../components/headers/MainHeader";
import Footer from "../../components/footers/MainFooterWithLinks";
import DressRoom from "../../images/img/Zameru.svg";
import UsaMap from "../../images/icon/usa.svg";
import TurkeyMap from "../../images/icon/TurkeyMap.svg";

import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-12 lg:py-16`;
const ImageWrapper = tw.div`flex justify-center items-center flex-col md:flex-row`;
const InfoColumn = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;



const HighlightedText = styled.span`
    ${tw`font-bold text-black`}
    color: #2D2D2D;
`;

const MapTitle = styled.h2`
    ${tw`text-lg md:text-xl lg:text-2xl `}
    margin-bottom: 20px;
    color: #2D2D2D;
    text-align: center;
`;

const TableTitle = styled.h2`
    ${tw`font-semibold text-2xl my-4`}
    color: #2D2D2D;
`;

const TableWrapper = styled.div`
    ${tw`overflow-x-auto`}
`;

const StyledTable = styled.table`
    ${tw`w-full text-sm md:text-base border-collapse`}
    border: 2px solid #ccc;
    text-align: center;
    vertical-align: middle;
    th, td {
        ${tw`border border-gray-400 px-4 py-2`}
    }
    th {
        ${tw`bg-gray-100`}
    }
`;

const InfoText = styled.p`
    ${tw`my-4 text-base md:text-lg lg:text-xl xl:text-xl`}
    font-size: 22px;
    line-height: 32px;
    color: #2D2D2D;
    font-weight: normal;
`;

export default () => {
    return (
        <>
            <AnimationRevealPage>
                <Header
                    heading="Размеры одежды"
                    paragraph="При заказе одежды и обуви из других стран возникает вопрос о выборе правильного размера. Что же делать, если Вы хотите заказать желанную вещь, но боитесь прогадать с размером? Команда Eparcel рекомендует Вам совершить следующие действия:"
                    imageSrc={DressRoom}
                    roundedHeaderButton={false}
                />
                <Container>
                    <Content>
                        <InfoColumn>
                            <InfoText>
                                <HighlightedText>1. Правильно снимите мерки.</HighlightedText> Чтобы точно определить свой размер, нужно замерить обхват груди, талии и бедер с помощью сантиметровой ленты. Лента должна плотно прилегать к телу, но не деформировать кожу. Обхват груди и бедер замеряют в выступающих местах, а талию – в самом узком месте. Лента должна быть параллельна полу, а замеры проводятся в нижнем белье. Что касается обуви, необходимо измерить длину стопы при помощи листка бумаги и карандаша (встать на лист бумаги и обвести ногу карандашом). Для определения длины стопы измерьте расстояние между самыми удаленными точками на чертеже.<br/><br/>
                                <HighlightedText>2. Изучите таблицы размеров.</HighlightedText> Каждый производитель имеет свою таблицу размеров, поэтому перед заказом необходимо изучить таблицу размеров на сайте продавца. Обычно она находится на странице товара и содержит информацию о длине, ширине и объеме изделия.<br/><br/>
                                <HighlightedText>3. Обращайте внимание на материалы.</HighlightedText> При выборе одежды и обуви необходимо обращать внимание на материалы, из которых они изготовлены. Например, хлопок может садиться после стирки, а синтетические ткани могут быть неудобными для ношения.<br/><br/>
                                <HighlightedText>4. Изучите отзывы покупателей.</HighlightedText> Перед заказом товара необходимо изучить отзывы покупателей на сайте продавца или на других платформах-отзовиках. Это поможет Вам понять, как садится та или иная вещь, и определить, какие размеры подходят большинству людей.<br/><br/>
                                <HighlightedText>5. Пользуйтесь конвертерами размеров.</HighlightedText> Существуют специальные конвертеры размеров, которые помогают переводить размеры одежды и обуви из одной системы в другую. Использование таких инструментов поможет Вам выбрать правильный размер при заказе товаров из других стран.
                                <ImageWrapper>
                                    <MapTitle>Размеры для магазинов в США</MapTitle>
                                    <img src={UsaMap} alt="USA Map" style={{ maxWidth: '100%', height: 'auto', marginLeft: '20px' }} />
                                </ImageWrapper>
                                <br/>
                                В отличие от Казахстана, где используется система размеров, основанная на единицах измерения в сантиметрах, в США используются другие единицы измерения, такие как дюймы и футы.<br/><br/>
                                Размерная сетка для одежды<br/><br/>
                                В США размер одежды определяется по системе, которая основывается на мере груди, талии и бедер. Обычно размерная сетка для одежды включает в себя следующие размеры: <HighlightedText>XS</HighlightedText>  (экстра-маленький), <HighlightedText>S</HighlightedText> (маленький), <HighlightedText>M</HighlightedText> (средний), <HighlightedText>L</HighlightedText> (большой), <HighlightedText>XL</HighlightedText> (экстра-большой) и <HighlightedText>XXL</HighlightedText> (очень большой). Кроме того, в США используется также система размеров, основанная на росте и весе.<br/><br/>
                                Чтобы определить свой размер одежды в США, необходимо знать свои параметры – грудь, талию и бедра. Обычно размерная сетка для одежды включает в себя таблицу, которая позволяет определить свой размер на основе этих параметров. Например, если ваша грудь составляет 88 см, талия - 70 см и бедра - 94 см, то ваш размер одежды в США будет <HighlightedText>M</HighlightedText>.
                            </InfoText>
                        </InfoColumn>
                        <InfoColumn>
                            <TableTitle>Таблица женских размеров одежды из США</TableTitle>
                            <TableWrapper>
                                <StyledTable>
                                    <thead>
                                    <tr>
                                        <td>Размер, Казахстан</td>
                                        <td>Международный стандарт</td>
                                        <td>Обхват груди, см</td>
                                        <td>Обхват талии, см</td>
                                        <td>Обхват бедер, см</td>
                                        <td>Длина рукава, см</td>
                                        <td>Размер, США</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>38</td>
                                        <td>XXS</td>
                                        <td>76</td>
                                        <td>58</td>
                                        <td>82</td>
                                        <td>58/60</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>40</td>
                                        <td>XS</td>
                                        <td>80</td>
                                        <td>62</td>
                                        <td>86</td>
                                        <td>59/61</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>42</td>
                                        <td>S</td>
                                        <td>84</td>
                                        <td>66</td>
                                        <td>92</td>
                                        <td>59/61</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <td>44</td>
                                        <td>M</td>
                                        <td>88</td>
                                        <td>70</td>
                                        <td>96</td>
                                        <td>60/62</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td>46</td>
                                        <td>M</td>
                                        <td>92</td>
                                        <td>74</td>
                                        <td>100</td>
                                        <td>60/62</td>
                                        <td>8</td>
                                    </tr>
                                    <tr>
                                        <td>48</td>
                                        <td>L</td>
                                        <td>96</td>
                                        <td>78</td>
                                        <td>104</td>
                                        <td>60/62</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>50</td>
                                        <td>L</td>
                                        <td>100</td>
                                        <td>82</td>
                                        <td>108</td>
                                        <td>61/63</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>52</td>
                                        <td>XL</td>
                                        <td>104</td>
                                        <td>86</td>
                                        <td>112</td>
                                        <td>61/63</td>
                                        <td>14</td>
                                    </tr>
                                    <tr>
                                        <td>54</td>
                                        <td>XXL</td>
                                        <td>108</td>
                                        <td>90</td>
                                        <td>116</td>
                                        <td>61/63</td>
                                        <td>16</td>
                                    </tr>
                                    <tr>
                                        <td>56</td>
                                        <td>XXL</td>
                                        <td>112</td>
                                        <td>94</td>
                                        <td>120</td>
                                        <td>61/63</td>
                                        <td>18</td>
                                    </tr>
                                    <tr>
                                        <td>58</td>
                                        <td>XXXL</td>
                                        <td>116</td>
                                        <td>98</td>
                                        <td>124</td>
                                        <td>62/64</td>
                                        <td>20</td>
                                    </tr>
                                    <tr>
                                        <td>60</td>
                                        <td>4XL</td>
                                        <td>120</td>
                                        <td>100</td>
                                        <td>128</td>
                                        <td>62/64</td>
                                        <td>22</td>
                                    </tr>
                                    <tr>
                                        <td>62</td>
                                        <td>4XL</td>
                                        <td>124</td>
                                        <td>104</td>
                                        <td>132</td>
                                        <td>62,5/65</td>
                                        <td>24</td>
                                    </tr>
                                    <tr>
                                        <td>64</td>
                                        <td>4XL</td>
                                        <td>128</td>
                                        <td>108</td>
                                        <td>136</td>
                                        <td>62,5/65</td>
                                        <td>26</td>
                                    </tr>
                                    </tbody>
                                </StyledTable>
                            </TableWrapper>
                        </InfoColumn>
                        <InfoColumn>
                            <TableTitle>Таблица мужских размеров одежды из США</TableTitle>
                            <TableWrapper>
                                <StyledTable>
                                    <thead>
                                    <tr>
                                        <td>Размер, Казахстан</td>
                                        <td>Международный стандарт</td>
                                        <td>Обхват груди, см</td>
                                        <td>Обхват талии, см</td>
                                        <td>Обхват бедер, см</td>
                                        <td>Длина рукава, см</td>
                                        <td>Размер, США</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>44</td>
                                        <td>XS</td>
                                        <td>88</td>
                                        <td>70</td>
                                        <td>92</td>
                                        <td>59</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <td>46</td>
                                        <td>S</td>
                                        <td>92</td>
                                        <td>76</td>
                                        <td>96</td>
                                        <td>60</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td>48</td>
                                        <td>M</td>
                                        <td>96</td>
                                        <td>82</td>
                                        <td>100</td>
                                        <td>61</td>
                                        <td>8</td>
                                    </tr>
                                    <tr>
                                        <td>50</td>
                                        <td>L</td>
                                        <td>100</td>
                                        <td>88</td>
                                        <td>104</td>
                                        <td>62</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>52</td>
                                        <td>L / XL</td>
                                        <td>104</td>
                                        <td>94</td>
                                        <td>108</td>
                                        <td>63</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>54</td>
                                        <td>XL</td>
                                        <td>108</td>
                                        <td>100</td>
                                        <td>112</td>
                                        <td>63</td>
                                        <td>14</td>
                                    </tr>
                                    <tr>
                                        <td>56</td>
                                        <td>XXL</td>
                                        <td>112</td>
                                        <td>106</td>
                                        <td>116</td>
                                        <td>64</td>
                                        <td>16</td>
                                    </tr>
                                    <tr>
                                        <td>58</td>
                                        <td>XXL</td>
                                        <td>116</td>
                                        <td>112</td>
                                        <td>120</td>
                                        <td>64</td>
                                        <td>18</td>
                                    </tr>
                                    <tr>
                                        <td>60</td>
                                        <td>XXXL</td>
                                        <td>120</td>
                                        <td>118</td>
                                        <td>124</td>
                                        <td>65</td>
                                        <td>20</td>
                                    </tr>
                                    <tr>
                                        <td>62</td>
                                        <td>XXXL</td>
                                        <td>124</td>
                                        <td>120</td>
                                        <td>128</td>
                                        <td>65</td>
                                        <td>22</td>
                                    </tr>
                                    <tr>
                                        <td>64</td>
                                        <td>4XL</td>
                                        <td>128</td>
                                        <td>124</td>
                                        <td>132</td>
                                        <td>66</td>
                                        <td>24</td>
                                    </tr>
                                    </tbody>
                                </StyledTable>
                            </TableWrapper>
                            <InfoText>
                                Размерная сетка для обуви <br /> <br />
                                Чтобы определить свой размер обуви в США, необходимо измерить длину стопы в дюймах. Обычно размерная сетка для обуви включает в себя таблицу, которая позволяет определить свой размер на основе этого параметра. Например, если длина вашей стопы составляет 9 дюймов, то ваш размер обуви в США будет 6.
                            </InfoText>
                        </InfoColumn>
                        <InfoColumn>
                            <InfoText>
                                <TableTitle>Таблица женских размеров обуви США на русский</TableTitle>
                                <TableWrapper>
                                    <StyledTable>
                                        <thead>
                                        <tr>
                                            <td>Длина стопы (см)</td>
                                            <td>22</td>
                                            <td>22.5</td>
                                            <td>23</td>
                                            <td>23.5</td>
                                            <td>24</td>
                                            <td>24.5</td>
                                            <td>25</td>
                                            <td>25.5</td>
                                            <td>26</td>
                                            <td>26.5</td>
                                            <td>27</td>
                                            <td>27.5</td>
                                            <td>28</td>
                                            <td>28.5</td>
                                            <td>29</td>
                                        </tr>
                                        <tr>
                                            <td>Длина стопы (дюймы)</td>
                                            <td>8.7</td>
                                            <td>8.9</td>
                                            <td>9.1</td>
                                            <td>9.3</td>
                                            <td>9.4</td>
                                            <td>9.6</td>
                                            <td>9.8</td>
                                            <td>10.0</td>
                                            <td>10.2</td>
                                            <td>10.4</td>
                                            <td>10.6</td>
                                            <td>10.8</td>
                                            <td>11</td>
                                            <td>11.2</td>
                                            <td>11.4</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Казахстан</td>
                                            <td>35</td>
                                            <td>35.5</td>
                                            <td>36</td>
                                            <td>36.5</td>
                                            <td>37</td>
                                            <td>37.5</td>
                                            <td>38</td>
                                            <td>38.5</td>
                                            <td>39</td>
                                            <td>39.5</td>
                                            <td>40</td>
                                            <td>40.5</td>
                                            <td>41</td>
                                            <td>41.5</td>
                                            <td>42</td>
                                        </tr>
                                        <tr>
                                            <td>США</td>
                                            <td>5</td>
                                            <td>5.5</td>
                                            <td>6</td>
                                            <td>6.5</td>
                                            <td>7</td>
                                            <td>7.5</td>
                                            <td>8</td>
                                            <td>8.5</td>
                                            <td>9</td>
                                            <td>9.5</td>
                                            <td>10</td>
                                            <td>10.5</td>
                                            <td>11</td>
                                            <td>11.5</td>
                                            <td>12</td>
                                        </tr>
                                        </tbody>
                                    </StyledTable>
                                </TableWrapper>
                                <TableTitle>Таблица мужских размеров обуви США на русский</TableTitle>
                                <TableWrapper>
                                    <StyledTable>
                                        <thead>
                                        <tr>
                                            <td>Длина стопы (см)</td>
                                            <td>23.5</td>
                                            <td>24</td>
                                            <td>24.5</td>
                                            <td>25</td>
                                            <td>25.5</td>
                                            <td>26</td>
                                            <td>26.5</td>
                                            <td>27</td>
                                            <td>27.5</td>
                                            <td>28</td>
                                            <td>28.5</td>
                                            <td>29</td>
                                            <td>29.5</td>
                                            <td>30</td>
                                            <td>30.5</td>
                                            <td>31</td>
                                            <td>31.5</td>
                                        </tr>
                                        <tr>
                                            <td>Длина стопы (дюймы)</td>
                                            <td>9.3</td>
                                            <td>9.4</td>
                                            <td>9.6</td>
                                            <td>9.8</td>
                                            <td>10.0</td>
                                            <td>10.2</td>
                                            <td>10.4</td>
                                            <td>10.6</td>
                                            <td>10.8</td>
                                            <td>11.0</td>
                                            <td>11.2</td>
                                            <td>11.4</td>
                                            <td>11.6</td>
                                            <td>11.8</td>
                                            <td>12.0</td>
                                            <td>12.2</td>
                                            <td>12.4</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Казахстан</td>
                                            <td>36.5</td>
                                            <td>37</td>
                                            <td>37.5</td>
                                            <td>38</td>
                                            <td>39</td>
                                            <td>40</td>
                                            <td>40.5</td>
                                            <td>41</td>
                                            <td>42</td>
                                            <td>43</td>
                                            <td>43.5</td>
                                            <td>44</td>
                                            <td>44.5</td>
                                            <td>45</td>
                                            <td>45.5</td>
                                            <td>46</td>
                                            <td>46.5</td>
                                        </tr>
                                        <tr>
                                            <td>США</td>
                                            <td>5.5</td>
                                            <td>6</td>
                                            <td>6.5</td>
                                            <td>7</td>
                                            <td>7.5</td>
                                            <td>8</td>
                                            <td>8.5</td>
                                            <td>9</td>
                                            <td>9.5</td>
                                            <td>10</td>
                                            <td>10.5</td>
                                            <td>11</td>
                                            <td>11.5</td>
                                            <td>12</td>
                                            <td>12.5</td>
                                            <td>13</td>
                                            <td>13.5</td>
                                        </tr>
                                        </tbody>
                                    </StyledTable>
                                </TableWrapper>
                                <ImageWrapper>
                                    <MapTitle>Размеры для магазинов в Турций</MapTitle>
                                    <img src={TurkeyMap} alt="Turkey Map" style={{ maxWidth: '100%', height: 'auto', marginLeft: '20px' }} />
                                </ImageWrapper>
                                <br />
                                Размерная сетка для одежды <br /> <br />
                                Чтобы определить свой размер одежды в Турции, необходимо знать свои параметры – грудь, талию и бедра. Обычно размерная сетка для одежды включает в себя таблицу, которая позволяет определить свой размер на основе этих параметров.
                                <TableTitle>Таблица соответствий размеров женской одежды</TableTitle>
                                <TableWrapper>
                                    <StyledTable>
                                        <thead>
                                        <tr>
                                            <td>Турецкие размеры (TR)</td>
                                            <td>36</td>
                                            <td>38</td>
                                            <td>40</td>
                                            <td>42</td>
                                            <td>44</td>
                                            <td>46</td>
                                            <td>48</td>
                                        </tr>
                                        <tr>
                                            <td>Международные размеры</td>
                                            <td>S</td>
                                            <td>M</td>
                                            <td>L</td>
                                            <td>XL</td>
                                            <td>XXL</td>
                                            <td>XXXL</td>
                                            <td>4XL</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Казахстанские размеры (KZ)</td>
                                            <td>42</td>
                                            <td>44</td>
                                            <td>46</td>
                                            <td>48</td>
                                            <td>50</td>
                                            <td>52</td>
                                            <td>54</td>
                                        </tr>
                                        <tr>
                                            <td>Европейские размеры (EU)</td>
                                            <td>36</td>
                                            <td>38</td>
                                            <td>40</td>
                                            <td>42</td>
                                            <td>44</td>
                                            <td>46</td>
                                            <td>48</td>
                                        </tr>
                                        <tr>
                                            <td>США</td>
                                            <td>2</td>
                                            <td>4</td>
                                            <td>6</td>
                                            <td>8</td>
                                            <td>10</td>
                                            <td>12</td>
                                            <td>14</td>
                                        </tr>
                                        <tr>
                                            <td>Англия</td>
                                            <td>6</td>
                                            <td>8</td>
                                            <td>10</td>
                                            <td>12</td>
                                            <td>14</td>
                                            <td>16</td>
                                            <td>18</td>
                                        </tr>
                                        </tbody>
                                    </StyledTable>
                                </TableWrapper>
                                <TableTitle>Размерная сетка для обуви</TableTitle> <br />
                                Чтобы определить свой размер обуви в Турции, необходимо измерить длину стопы в сантиметрах. Обычно размерная сетка для обуви включает в себя таблицу, которая позволяет определить свой размер на основе этого параметра. <br /> <br />
                                <TableWrapper>
                                    <StyledTable>
                                        <thead>
                                        <tr>
                                            <td>США</td>
                                            <td>Европа</td>
                                            <td>Казахстан</td>
                                            <td>Сантиметры</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr><td>5</td><td>35</td><td>35</td><td>22.8</td></tr>
                                        <tr><td>5.5</td><td>35.5</td><td>35.5</td><td>23.1</td></tr>
                                        <tr><td>6</td><td>36 (3)</td><td>35-36</td><td>23.5</td></tr>
                                        <tr><td>6.5</td><td>37 (4)</td><td>36</td><td>23.8</td></tr>
                                        <tr><td>7</td><td>37.5 (4.5)</td><td>36.5</td><td>24.1</td></tr>
                                        <tr><td>7.5</td><td>38 (5)</td><td>37</td><td>24.5</td></tr>
                                        <tr><td>8</td><td>38.5 (5.5)</td><td>37.5</td><td>24.8</td></tr>
                                        <tr><td>8.5</td><td>39 (6)</td><td>38</td><td>25.1</td></tr>
                                        <tr><td>9</td><td>40 (6.5)</td><td>39</td><td>25.4</td></tr>
                                        <tr><td>9.5</td><td>40.5 (7)</td><td>39.5</td><td>25.7</td></tr>
                                        <tr><td>10</td><td>41 (7.5)</td><td>40</td><td>26.0</td></tr>
                                        <tr><td>10.5</td><td>42 (8.5)</td><td>41</td><td>26.7</td></tr>
                                        <tr><td>11</td><td>42.2</td><td>41.5</td><td>27.6</td></tr>
                                        </tbody>
                                    </StyledTable>
                                </TableWrapper>
                                <br />
                                Важно помнить, что размеры одежды и обуви могут немного отличаться в разных магазинах и брендах. Поэтому перед покупкой всегда стоит проверять таблицу размеров для конкретного бренда и магазина. <br /> <br />
                                Правильный выбор размера одежды и обуви – это гарантия комфорта и удобства. При покупке товаров за рубежом с доставкой в Казахстан необходимо учитывать особенности таблиц размеров и материалов, обращать внимание на отзывы покупателей и использовать конвертеры размеров. Так, любая заказанная вещь сядет идеально.
                            </InfoText>
                        </InfoColumn>
                    </Content>
                </Container>
                <Footer />
            </AnimationRevealPage>
        </>
    );
};
