import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import LogoImage from "../../images/logo/logo-kz.svg";
import TelegramIcon from "../../images/icon/telegram.svg";
import ViberIcon from "../../images/icon/Viber.svg";
import WhatsappIcon from "../../images/icon/whatsapp.svg";
import ClassmatesIcon from "../../images/icon/classmates.svg";
import VkIcon from "../../images/icon/vk.svg";
import PhoneIcon from "../../images/icon/phone-call.png"; // Импорт иконки телефона
import EmailIcon from "../../images/icon/email.png";
import { FiClock } from 'react-icons/fi';
import { FiPhone, FiMail } from 'react-icons/fi';
const Container = styled.div`
    ${tw`relative text-gray-100 -mx-8 -mb-8 px-8 p-10`}
    background-color: #e2ffe2 !important; // Ensure it takes precedence
    color: #2D2D2D;
`;

const Content = tw.div`max-w-screen-xl mx-auto pt-16 pb-8`;
const FiveColumns = tw.div`flex flex-wrap justify-between`;

const Column = tw.div`w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm sm:text-base text-center md:text-left`;
const CompanyColumn = tw.div`text-center md:text-left mb-16 lg:mb-0 w-full lg:w-1/5`;

const CompanyAddress = tw.p`mt-4 max-w-xs font-medium text-lg mx-auto lg:mx-0 lg:mr-4 leading-loose text-center lg:text-left`;


const ColumnHeading = tw.h5`ml-10 font-bold text-lg uppercase`;

const LinkList = styled.ul`
    ${tw`mt-4 text-base font-medium list-none`}; // Removes bullets
`;
const LinkListItem = tw.li`mt-3`;
const Link = styled.a`
    ${tw`hover:text-green-500  text-lg text-base cursor-pointer`};
    text-decoration: none; // Ensures no underline at all
    color: #2D2D2D;
    &:hover {
        text-decoration: none; // Prevents any text-decoration on hover as well
    }
`;

const LogoImg = styled.img`
  ${tw`w-32 h-24`}; // Базовый размер для логотипа
  width: 100%; // Полная ширина
  height: auto; // Сохраняем пропорции изображения

  @media (max-width: 768px) {
    width: 80%; // Уменьшаем размер логотипа на мобильных устройствах
    margin: 0 auto; // Центрируем логотип
  }

  @media (max-width: 480px) {
    width: 60%; // Ещё больше уменьшаем на маленьких устройствах
  }
`;

const LogoContainer = tw.div`
  flex items-center justify-center lg:justify-start
  p-4 // Добавляем отступы вокруг логотипа
`;


const SocialLinksContainer = tw.div`mt-4 flex justify-center lg:justify-start space-x-2`;
const SocialLink = styled.a`
    ${tw`cursor-pointer inline-block p-2 text-gray-900 transition duration-300`}
    svg {
        ${tw`w-4 h-4`} // Adjusted icon size
    }
    font-size: 20px;
    line-height: 30px;
    color: #2D2D2D;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
    &:hover {
        filter: none;
    }
`;




const Divider = styled.div`
    ${tw`my-0`} // Убираем отступы
    background-color: white; // Цвет фона для линии
    height: 20px; // Высота линии
    width: 100%; // Полная ширина
`;

const CopyrightNotice = styled.div`
    ${tw`text-center`} // Центрируем текст
    background-color: #ffffff; // Устанавливаем фон совпадающий с основным
    padding: 5px 0; // Отступы сверху и снизу
    font-size: 14px;
    width: 100%;// Размер шрифта
`;



export default () => {
    return (
        <Container>
            <Content>
                <FiveColumns>
                    <CompanyColumn>
                        <LogoContainer>
                            <LogoImg src={LogoImage} style={{width:"100%"}} />
                        </LogoContainer>
                        <SocialLinksContainer>
                            <SocialLink href="https://web.telegram.org/a/">
                                <img src={TelegramIcon} />
                            </SocialLink>

                            <SocialLink href="https://web.whatsapp.com">
                                <img src={WhatsappIcon} />
                            </SocialLink>
                            <SocialLink href="https://ok.ru">
                                <img src={ClassmatesIcon} />
                            </SocialLink>
                            <SocialLink href="https://vk.com/feed">
                                <img src={VkIcon} />
                            </SocialLink>
                        </SocialLinksContainer>
                        <CompanyAddress>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                <FiPhone style={{ color: "#0ABD19", marginRight: "8px", width: "25px", height: "25px" }} />
                                <span>8 (---) --- - --- - --</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                <FiMail style={{ color: "#0ABD19", marginRight: "8px", width: "25px", height: "25px" }} />
                                <span>mailto:info@eparcel.kz</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FiClock style={{ color: "#0ABD19", marginRight: "8px", width: "25px", height: "25px" }} />
                                <span>Пн. - Пт.: 9:00 - 17:00</span>
                            </div>
                        </CompanyAddress>
                    </CompanyColumn>
                    <Column>
                        <ColumnHeading>Общая информация</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                <Link href="AboutUS">О нас</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="Rates">Услуги и стоимость</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="Tariffs">Тарифы</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="Shops">Магазины</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="RedemptionOfGoods">Выкуп товаров</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="Contacts">Контакты</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                    <Column>
                        <ColumnHeading>Клиентам</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                <Link href="News">Новости и спецпредложения</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="Questions">Вопросы и ответы</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="ProhibitedProductsPage">Запрещенные товары</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="CustomRegulations">Таможенные правила</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="DeliveryCalculator">Калькулятор доставки</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="DutyCalculatorPage">Калькулятор таможенной пошлины</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                    <Column>
                        <ColumnHeading>Полезное</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                <Link href="LegalInformation">Правовая информация</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="HowToBuyGoodsAbroadPage">Как покупать товары из-за границы</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="ClothesSizes">Размеры одежды и обуви</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="ForBussinesPage">Для бизнеса</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                </FiveColumns>




            </Content>

            <Divider>
                <CopyrightNotice>&copy; 2025 Eparcel. Все права защищены.</CopyrightNotice>
            </Divider>


        </Container>

    );
};
