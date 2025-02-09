import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { ReactComponent as MailIcon } from './RatesIcon/Pochto.svg';
import { ReactComponent as DeliveryIcon } from './RatesIcon/dilevery.svg';
import { ReactComponent as RegistrationIcon } from './RatesIcon/package.svg';
import { ReactComponent as StorageIcon } from './RatesIcon/Storage.svg';
import { ReactComponent as PhotoIcon } from './RatesIcon/Photo.svg';
import { ReactComponent as Track } from './RatesIcon/Track.svg';
import { ReactComponent as Packaging } from './RatesIcon/Packaging.svg';
import { ReactComponent as Insurance } from './RatesIcon/Insurance.svg';
import { ReactComponent as ransom } from './RatesIcon/ransom.svg';
import { ReactComponent as Customs } from './RatesIcon/Customs.svg';
import { ReactComponent as Payment } from './RatesIcon/Payment.svg';
import { ReactComponent as Tracking } from './RatesIcon/Tracking.svg';
import { ReactComponent as Limitations } from './RatesIcon/Limitations.svg';
import { ReactComponent as service } from './RatesIcon/service.svg';
import { ReactComponent as MailboxImage } from './RatesIcon/Mailbox-bro.svg';
import { ReactComponent as DiliveryImage } from './RatesIcon/DiliveryImage.svg';
import WarehouseImage from './RatesIcon/4968469.jpg';
import { ReactComponent as ReceptionImage } from './RatesIcon/Printer-cuate.svg';
import { ReactComponent as PhototsImage  } from './RatesIcon/PhototsImage.svg';
import { ReactComponent as RefundImage  } from './RatesIcon/RefundImage.svg';
import { ReactComponent as PackaginImage  } from './RatesIcon/PackagingImage.svg';
import cardboardBoxImage from './RatesIcon/Card-box.svg';
import plasticBagImage from './RatesIcon/Plastic-paket.svg';
import bubbleWrapImage from './RatesIcon/buble-bag.svg';
import {ReactComponent as Weight} from './RatesIcon/weight.svg';
import {ReactComponent as Volume} from './RatesIcon/Volume.svg';
import { ReactComponent as BoxIcon } from './RatesIcon/box.svg';
import { ReactComponent as RollIcon } from './RatesIcon/roll.svg';
import { ReactComponent as TubeIcon } from './RatesIcon/tube.svg';
import { ReactComponent as Insurances } from './RatesIcon/Insurances.svg';
import { ReactComponent as Preorder } from './RatesIcon/Preorder.svg';
import { ReactComponent as Tomozhka } from './RatesIcon/Tomozhka.svg';
import { ReactComponent as Oplata } from './RatesIcon/Oplata.svg';
import { ReactComponent as Otlezhivania  } from './RatesIcon/Otlezhivania.svg';
import { ReactComponent as DopYsluga  } from './RatesIcon/DopYsluga.svg';
import { ReactComponent as Ogranicenia } from './RatesIcon/Ogranicenia.svg';
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Footer from "../../components/footers/MainFooterWithLinks";
import Header from "../../components/headers/MainHeader";
import DesignIllustration from "./../../images/img/услуги.png";
import tw from "twin.macro";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 15px;
    box-shadow: 10px 10px 10px rgba(45, 45, 45, 0.10);
    overflow: hidden;
    max-width: 1400px;
    margin: 100px auto; // Добавлен отступ сверху
    height: auto;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;


const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #ffffff;
    border-right: 1px solid #F5F5F5;
    @media (min-width: 768px) {
        width: 400px;
    }
`;

const TabButton = styled.button`
    ${tw`text-lg sm:text-xl font-semibold text-center`}
    display: flex;
    
    align-items: center;
    background: ${({ active }) => (active ? '#DDF2E6' : 'transparent')};
    color: #243e63; /* Установлен синий цвет */
    border: none;
    padding: 10px 22px;
    line-height: 18px;
    cursor: pointer;
    text-align: left;
    &:hover {
        background-color: #DDF2E6;
    }
    svg {
        margin-right: 20px;
        width: 30px;
        height: 30px;
    }
`;

const Title =styled.h1`
    ${tw`font-bold text-2xl md:text-2xl lg:text-2xl  leading-tight`}
    /* Центрируем текст на маленьких экранах */
   

  
`;

const SectionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
    padding: 20px;
    gap: 20px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1;
    min-width: 300px;
    height: 250px;
`;

const Icon = styled.img`
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
`;

const Text = styled.p`
    font-size: 16px;
    color: #2D2D2D;
    text-align: center;
    line-height: 1.4;
    margin: 0;
    flex-grow: 1;
    overflow: hidden;
`;

const ContentContainer = styled.div`
    flex: 1;
    padding: 20px;
    transition: opacity 0.5s ease;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
`;

const IconContainer = styled.span``;

const StyledParagraph = styled.p`
    ${tw`text-lg `};
    padding: 0;
    margin-bottom: 30px;

    line-height: 30px;
    color: #2D2D2D;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    outline: none;
    cursor: default;
    text-align: left;
`;

const StyledDescription = styled.p`
    ${tw`text-lg `};
    padding: 0;
    margin-bottom: 30px;
    line-height: 30px;
    color: #2D2D2D;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    outline: none;
    cursor: default;
    text-align: center;
`;

const Highlight = styled.span`
    color: #0ABD19;  // Green color for emphasis
`;

const PackagingOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
`;

const PackagingImage = styled.img`
    width: 183px;
    height: auto;
    margin-bottom: 30px;
`;

const PackagingDescription = styled.span`
    text-align: center;
    font-size: 14px;
    color: #666;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
`;

const Card = styled.div`
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Add shadow
    width: 30%; // Set width of each card
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CardTitle = styled.h2`
    color: #333;
    font-size: 18px;
    margin-bottom: 10px;
`;

const CardFormula = styled.div`
    font-size: 16px;
    color: #666;
    text-align: center;
`;

const Fraction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Numerator = styled.span`
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
`;

const Denominator = styled.span`
    padding-top: 5px;
`;

const CardIcon = styled.div`
    width: 60px;  // Set width of the icon container
    height: 60px;  // Set height of the icon container
    margin-bottom: 15px;  // Space between the icon and the title
    display: flex;  // Use flexbox to center the icon
    align-items: center;  // Center the icon vertically
    justify-content: center;  // Center the icon horizontally

    svg {
        width: 100%;  // Ensure the SVG fills the container
        height: auto;  // Maintain the aspect ratio of the icon
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
    padding: 8px;
    border: 1px solid #ccc;
    background-color: #f8f9fa;
    text-align: center;
`;

const TableCell = styled.td`
    padding: 8px;
    border: 1px solid #ccc;
    text-align: center; 
`;

const CardContainer1 = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: nowrap; // Disable wrapping to new lines
    overflow-x: auto; // Add horizontal scroll if cards don't fit
    padding-bottom: 20px; // Add padding at the bottom to not overlap the horizontal scroll
`;
const tabs = [
    {
        name: "Почтовый адрес",
        content: (
            <div>
                <Title>Почтовый адрес</Title>
                <MailboxImage style={{ width: '90%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Почтовый адрес предоставляется Вам после регистрации в личном кабинете, на который Вы можете отправлять все свои покупки, сделанные в онлайн-магазинах для последующей доставки в Казахстан. Просим Вас обязательно указывать Ваш персональный номер личного кабинета при оформлении доставки на наш склад. Номер Вашего личного кабинета Вы можете найти в разделе "Ваш адрес склада", а также ознакомиться с подробной инструкцией и с правилами заполнения адреса доставки в онлайн-магазине. Ваш номер личного кабинета начинается с EKZ-(Ваш номер).</StyledParagraph>
                <StyledParagraph>Стоимость услуги <Highlight>– бесплатно</Highlight></StyledParagraph>
            </div>
        ),
        Icon: MailIcon
    },
    { name: "Доставка",content: (
            <div>
                <Title>Доставка</Title>
                <DiliveryImage  style={{ width: '100%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Все посылки, полученные на адреса наших складов в других странах, доставляются авиадоставкой до Алматы. Далее все посылки передаются в службу доставки по всему Казахстану.
                    В случае повторной доставки до адресата по Казахстану Вам необходимо заполнить запрос на доставку Вашей посылки в личном кабинете и оплатить услугу повторно по Казахстану.
                    Сроки доставки из США в Казахстан от 7 до 10 дней. Сроки доставки из Турции в Казахстан от 5 до 10 дней в зависимости от Вашего города.</StyledParagraph>
                <StyledParagraph><Highlight>Стоимость </Highlight>доставки посылки с зарубежного склада до адресата в Казахстан Вы можете рассчитать при помощи нашего калькулятора.</StyledParagraph>
            </div>
        )
        , Icon: DeliveryIcon },
    { name: "Прием и регистрация посылки",content: (
            <div>
                <Title>Прием и регистрация посылки</Title>
                <img src={WarehouseImage}  style={{ width: '100%', maxWidth: '400px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Все посылки, доставленные на наш склад, принимаются работниками склада. После чего каждая посылка регистрируется в онлайн-системе нашего склада по трекинг-номеру, полученному с интернет-магазина, где была совершена покупка.</StyledParagraph>
                <StyledParagraph>Все складские действия будут отображены и доступны Вам для отслеживания статуса в личном кабинете и дальнейшей доставки в Казахстан.</StyledParagraph>
                <StyledParagraph>Максимальный срок хранения входящей посылки 60 дней. По истечении этого срока посылка будет утилизирована.</StyledParagraph>
                <StyledParagraph>Обращаем Ваше внимание, что при самостоятельной покупке товаров в интернет-магазинах, обязательно указывать Ваш персональный номер личного кабинета в адрес доставки до нашего склада и/или вносить трекинг номер доставки в личный кабинет до прихода посылки на наш склад для быстрой обработки в системе. Если на посылке не будет указан Ваш персональный номер личного кабинете или Вы не введете заранее трекинг номер до прихода посылки на склад, то при получении и обработке в нашей системе посылка автоматически попадает в список «Неизвестные посылки», что увеличивает сроки обработки вашей посылки.</StyledParagraph>
                <StyledParagraph>Стоимость услуги <Highlight>– бесплатно.</Highlight></StyledParagraph>
            </div>
        )
        , Icon: RegistrationIcon },
    { name: "Хранение посылки на складе",content: (
            <div>
                <Title>Хранение посылки на складе</Title>
                <ReceptionImage  style={{ width: '100%', maxWidth: '400px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Срок хранения всех входящих посылок на складе, зарегистрированных в системе, составляет 60 дней. По истечении этого срока, если Вам понадобится продлить срок хранения посылки или груза, то отправьте нам запрос через обратную связь на нашем сайте. Если Вы не продлили срок хранения после 60 дней, то посылка будет утилизирована.</StyledParagraph>
                <StyledParagraph>Стоимость услуги <Highlight>– бесплатно.</Highlight></StyledParagraph>
            </div>
        ), Icon: StorageIcon },
    { name: "Фото товаров в посылке",content: (
            <div>
                <Title>Фото товаров в посылке</Title>
                <PhototsImage  style={{ width: '100%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Вам необходимо зайти в личный кабинет, в разделе «Услуги склада» выбрать нужную Вам посылку, затем описать услугу. К примеру: "Прошу сфотографировать товары в посылке". В течение 24-48 часов мы выполним данную услугу.
                    В стоимость услуги входят 3-5 фотографий всех товаров в посылке, а также Ваши товары сверяются на общее соответствие с описанием в личном кабинете. В случае несоответствия товаров мы уведомим Вас об этом в личном кабинете.</StyledParagraph>
                <StyledParagraph>Стоимость услуги <Highlight>– 10$ (3-5 фото).</Highlight></StyledParagraph>
            </div>
        ), Icon: PhotoIcon },
    { name: "Возврат посылки или товара", content: (
            <div>
                <Title>Возврат посылки или товара</Title>
                <RefundImage  style={{ width: '100%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Если по каким-то причинам Вы пожелаете вернуть посылку, которая была доставлена на адрес нашего склада обратно в магазин или иному продавцу Вашего купленного товара, то мы готовы предоставить данную услугу. Вам необходимо выбрать в личном кабинете «Услуги склада», затем описать услугу и указать адрес возврата. К примеру: Прошу вернуть товар обратно продавцу.
                    Мы рассчитаем стоимость доставки и выставим Вам счет в личном кабинете, после чего Вы сможете оплатить за данную услугу отдельно. В стоимость услуги входит упаковка и доставка до адресата.</StyledParagraph>
                <StyledParagraph>Стоимость услуги <Highlight>– платная.</Highlight></StyledParagraph>
            </div>
        ), Icon: Track },
    {
        name: "Упаковка и вес посылки",
        content: (
            <div>
                <Title>Упаковка и вес посылки</Title>
                <PackaginImage style={{
                    width: '100%',
                    maxWidth: '700px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}/>
                <StyledParagraph>Все входящие посылки с товарами полученные нашим складом вскрываются и осматриваются сотрудником склада при получении. Если посылка с товарами пригодна для дальнейшей доставки до адресата, то товар отправляется в оригинальной упаковке. При необходимости посылка с товаром переупаковываются для уменьшения объемного и фактического веса на наше усмотрение для уменьшения стоимости дальнейшей доставки. Мы используем прочные картонные коробки, пузырчатые пакеты, пакеты из прочного полиэтилена, воздушные мешки, наполнители, бумагу и все остальное, чтобы обеспечить сохранность товаров и внешнюю упаковку, предназначенную для международных отправлений.</StyledParagraph>
                <StyledParagraph>Стоимость услуги <Highlight>– бесплатно.</Highlight></StyledParagraph>
                <Title>Упаковка</Title>
                <StyledDescription>Мы бесплатно переупаковываем ваши товары в пакет или б/у коробку на наше усмотрение.
                    Виды упаковок:</StyledDescription>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <PackagingOption>
                        <PackagingImage src={cardboardBoxImage} alt="Картонная коробка"/>
                        <PackagingDescription>Картонная коробка</PackagingDescription>
                    </PackagingOption>
                    <PackagingOption>
                        <PackagingImage src={plasticBagImage} alt="Пакеты из прочного полиэтилена"/>
                        <PackagingDescription>Пакеты из прочного полиэтилена</PackagingDescription>
                    </PackagingOption>
                    <PackagingOption>
                        <PackagingImage src={bubbleWrapImage} alt="Воздушно-пузырчатая пленка"/>
                        <PackagingDescription>Воздушно-пузырчатая пленка</PackagingDescription>
                    </PackagingOption>
                </div>
                <SectionContainer>
                    <InfoContainer>
                        <Icon as={Weight}/>
                        <Title>Фактический вес</Title>
                        <Text>Вес посылки, получаемый при её взвешивании.</Text>
                    </InfoContainer>
                    <InfoContainer>
                        <Icon as={Volume}/>
                        <Title>Объемный вес</Title>
                        <Text>Расчет объемного веса применяется в том случае, если его объемный вес превышает
                            фактический вес:  <Numerator>Длина (см) · Ширина (см) · Высота (см)</Numerator> <Denominator>5000</Denominator></Text>

                    </InfoContainer>
                </SectionContainer>
                <CardContainer1>
                    <Card>
                        <CardIcon>
                            <BoxIcon/>
                        </CardIcon>
                        <CardTitle>Для коробки:</CardTitle>
                        <CardFormula>
                            <div>Объемный вес (kr) =</div>
                            <Fraction>
                                Длина (см) · Ширина (см) · Высота (см)/5000
                            </Fraction>
                        </CardFormula>
                    </Card>

                    <Card>
                        <CardIcon>
                            <RollIcon/>
                        </CardIcon>
                        <CardTitle>Для рулона:</CardTitle>
                        <CardFormula>
                            <div>Объемный вес (kr) = Площадь круга (cm²) × Высота (cm) / 5000</div>
                            <div>Площадь круга = πR², где R = радиус круга, π = 3.14</div>
                        </CardFormula>
                    </Card>

                    <Card>
                        <CardIcon>
                            <TubeIcon />
                        </CardIcon>
                        <CardTitle>Для тубуса:</CardTitle>
                        <CardFormula>
                            <div>Объемный вес (kr) = Площадь треугольника (cm²) × Высота (cm) / 5000</div>
                            <div>Площадь треугольника = (Ширина (cm) × Ширина (cm) × 1.73) / 4</div>
                        </CardFormula>
                    </Card>
                </CardContainer1>
            </div>
        ),
        Icon: Packaging
    },

    {name: "Страхование",content: (
            <div>
                <Title>Страхование</Title>
                <Insurances  style={{ width: '100%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
               <StyledParagraph>Услуга по страхованию является обязательной. В случае, если Ваша посылка не будет доставлена в течение 30 дней с момента отправки с зарубежного склада или будет утеряна в процессе доставки по Казахстану, мы вернем Вам полную стоимость доставки и оценочную стоимость товаров, указанную при оформлении. Для этого необходимо написать нам на почту. Срок рассмотрения претензии – 24-48 часов.</StyledParagraph>
                <StyledParagraph>Стоимость услуги <Highlight>– 2% от общей стоимости товаров.</Highlight></StyledParagraph>
            </div>
        ),
        Icon: Insurance},
    {name: "Выкуп товаров", content: (
            <div>
                <Title>Выкуп товаров
                </Title>
                <Preorder  style={{ width: '100%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Данная услуга дает возможность приобрести товар в других странах напрямую и без каких-либо трудностей с оплатой и не понимая языка. Необходимо заполнить заявку на выкуп товаров в личном кабинете, указать все нужные характеристики и ссылку на товар. А все остальное мы сделаем за Вас.</StyledParagraph>
                <StyledParagraph>Воспользовавшись данной услугой, порой общая стоимость товаров, купленная нашим сотрудником, будет дешевле, чем если Вы сами будете покупать в интернет-магазинах из Казахстана, так как мы покупаем много и часто, и можем использовать различные скидки и купоны.</StyledParagraph>
                <StyledParagraph>Стоимость услуги <Highlight>–  10% от стоимости товаров, минимальная стоимость – 10$.</Highlight></StyledParagraph>
            </div>
        )
        , Icon: ransom},
    {name: "Таможенное оформление", content: (
            <div>
                <Title>Таможенное оформление
                </Title>
                <Tomozhka style={{ width: '100%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Для упрощения процедуры мы сами заполним таможенную декларацию и передадим в таможенные органы. Данная услуга сократит время прохождения таможенной очистки всего груза с посылками, отправленного с зарубежных складов, и, соответственно, сократит сроки доставки посылки до получателя.
                    Если стоимость товаров превышает €200, то Вам будет начислена таможенная пошлина и Вы сможете оплатить ее через сайт: www.egov.kz или приложения kaspi.kz и e-Salyq Azamat</StyledParagraph>
                <StyledParagraph>Стоимость услуги <Highlight>–      $3 за посылку</Highlight></StyledParagraph>
            </div>
        ), Icon: Customs},
    {name: "Оплата и возврат денежных средств", content: (
            <div>
                <Title>Оплата и возврат денежных средств
                </Title>
                <Oplata style={{ width: '100%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Предлагаем различные методы оплаты. Оплата за услуги производиться в различных валютах по курсу платежной системы в тенге. Мы принимаем к оплате:</StyledParagraph>
                <StyledParagraph><Highlight>Карты Казахстана:</Highlight> VISA International, MasterCard Worldwide, UnionPay International</StyledParagraph>
                <StyledParagraph><Highlight>Карты Казахстана:</Highlight>  MasterCard Worldwide, UnionPay International</StyledParagraph>
                <Title>
                    Возврат денежных средств
                </Title>
                <StyledParagraph>Мы гарантируем нашим клиентам возврат денежных средств за не предоставленные услуги. Вам необходимо отправить заявление на возврат денежных средств при этом указав все данные посылки и описать причину запроса. Мы обязательно рассмотрим вашу заявку в течении 24-48 часов и в случае положительного решения вернем вам деньги. Возврат денежных средств производится на банковскую карту, с которой была произведена оплата.</StyledParagraph>
            </div>
        ), Icon: Payment},
    {name: "Отслеживание доставки",  content: (
            <div>
                <Title>Отслеживание доставки
                </Title>
                <Otlezhivania style={{ width: '100%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Каждая входящая посылка регистрируется в нашей системе в течение 24 часов после получения по адресу склада. Вы сможете отслеживать статус каждой посылки в личном кабинете. Дополнительно Вам будет приходить сообщение при изменении статуса посылки на адрес электронной почты и СМС-уведомления на номер телефона, указанный при регистрации на нашем сайте. В случае, если статус Вашей посылки не изменился в течение 10 рабочих дней, просим Вас заполнить заявление и отправить его на электронную почту, указав в теме письма «Статус посылки». Срок рассмотрения заявки составляет максимально 48 часов.</StyledParagraph>
            </div>
        ), Icon: Tracking},
    {name: "Ограничения  службы  доставки ",content: (
            <div>
                <Title>Ограничения  службы  доставки
                </Title>
                <Ogranicenia style={{ width: '100%', maxWidth: '700px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <StyledParagraph>Доставку посылок по Казахстану осуществляет СДЭК. Ограничение по максимальным габаритам составляет 700 кг (по объемному или по фактическому весу)</StyledParagraph>
                {/*<Table>*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <TableHeader rowSpan="2">Служба доставки</TableHeader>*/}
                {/*        <TableHeader colSpan="3">Макс. вес посылки, кг</TableHeader>*/}
                {/*        <TableHeader colSpan="2">Макс. сумма сторон, см</TableHeader>*/}
                {/*        <TableHeader colSpan="2">Макс. сторона, см</TableHeader>*/}
                {/*        <TableHeader rowSpan="2">Макс. габариты, см</TableHeader>*/}
                {/*        <TableHeader colSpan="2">Срок хранения, дн</TableHeader>*/}
                {/*        <TableHeader rowSpan="1">Лимит, Р</TableHeader>*/}

                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableHeader>Курьер</TableHeader>*/}
                {/*        <TableHeader>ПВЗ</TableHeader>*/}
                {/*        <TableHeader>Постамат</TableHeader>*/}
                {/*        <TableHeader>Курьер</TableHeader>*/}
                {/*        <TableHeader>ПВЗ</TableHeader>*/}
                {/*        <TableHeader>Курьер</TableHeader>*/}
                {/*        <TableHeader>ПВЗ</TableHeader>*/}
                {/*        <TableHeader>ПВЗ</TableHeader>*/}
                {/*        <TableHeader>Постамат</TableHeader>*/}
                {/*        <TableHeader>Страховой суммы</TableHeader>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    <tr>*/}
                {/*        <TableCell>CDEK</TableCell>*/}
                {/*        <TableCell>30</TableCell>*/}
                {/*        <TableCell>30</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>14</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}

                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>CDEK economy</TableCell>*/}
                {/*        <TableCell>50</TableCell>*/}
                {/*        <TableCell>30</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>14</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}

                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>CDEK omni</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>15</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>64.5 x 36.5 x 40.5</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>7</TableCell>*/}

                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Boxberry</TableCell>*/}
                {/*        <TableCell>31</TableCell>*/}
                {/*        <TableCell>31</TableCell>*/}
                {/*        <TableCell>5</TableCell>*/}
                {/*        <TableCell>250</TableCell>*/}
                {/*        <TableCell>250</TableCell>*/}
                {/*        <TableCell>120</TableCell>*/}
                {/*        <TableCell>120</TableCell>*/}
                {/*        <TableCell>35 x 20 x 20</TableCell>*/}
                {/*        <TableCell>7</TableCell>*/}
                {/*        <TableCell>7</TableCell>*/}
                {/*        <TableCell>300 000</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>PickPoint</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>15</TableCell>*/}
                {/*        <TableCell>15</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>150</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>62.5 x 56.5 x 40.5</TableCell>*/}
                {/*        <TableCell>7</TableCell>*/}
                {/*        <TableCell>3</TableCell>*/}
                {/*        <TableCell>Без огранич.</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>5Post</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>15</TableCell>*/}
                {/*        <TableCell>15</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>135</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>60</TableCell>*/}
                {/*        <TableCell>36.5 x 40.5 x 36</TableCell>*/}
                {/*        <TableCell>7</TableCell>*/}
                {/*        <TableCell>7</TableCell>*/}
                {/*        <TableCell>Без огранич.</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>DPD</TableCell>*/}
                {/*        <TableCell>1000</TableCell>*/}
                {/*        <TableCell>30</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>690</TableCell>*/}
                {/*        <TableCell>200</TableCell>*/}
                {/*        <TableCell>350</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>7</TableCell>*/}
                {/*        <TableCell>4</TableCell>*/}
                {/*        <TableCell>30 000 000</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>DPD economy</TableCell>*/}
                {/*        <TableCell>1000</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>690</TableCell>*/}
                {/*        <TableCell>200</TableCell>*/}
                {/*        <TableCell>350</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>7</TableCell>*/}
                {/*        <TableCell>4</TableCell>*/}
                {/*        <TableCell>30 000 000</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Почта</TableCell>*/}
                {/*        <TableCell>31.5</TableCell>*/}
                {/*        <TableCell>20</TableCell>*/}
                {/*        <TableCell>20</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>300</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>150</TableCell>*/}
                {/*        <TableCell>53 x 36 x 22</TableCell>*/}
                {/*        <TableCell>30</TableCell>*/}
                {/*        <TableCell>3</TableCell>*/}
                {/*        <TableCell>100 000</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Почта Онлайн</TableCell>*/}
                {/*        <TableCell>31.5</TableCell>*/}
                {/*        <TableCell>20</TableCell>*/}
                {/*        <TableCell>20</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>220</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>150</TableCell>*/}
                {/*        <TableCell>53 x 36 x 22</TableCell>*/}
                {/*        <TableCell>30</TableCell>*/}
                {/*        <TableCell>3</TableCell>*/}
                {/*        <TableCell>300 000</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Почта 1 класс</TableCell>*/}
                {/*        <TableCell>31.5</TableCell>*/}
                {/*        <TableCell>5</TableCell>*/}
                {/*        <TableCell>20</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>70</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>36</TableCell>*/}
                {/*        <TableCell>53 x 36 x 22</TableCell>*/}
                {/*        <TableCell>30</TableCell>*/}
                {/*        <TableCell>3</TableCell>*/}
                {/*        <TableCell>100 000</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Почта зарубеж.</TableCell>*/}
                {/*        <TableCell>20</TableCell>*/}
                {/*        <TableCell>20</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>200</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>53 x 36 x 22</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Деловые Линии</TableCell>*/}
                {/*        <TableCell>20 000</TableCell>*/}
                {/*        <TableCell>20 000</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>1840</TableCell>*/}
                {/*        <TableCell>1360</TableCell>*/}
                {/*        <TableCell>1360</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>2</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>300 000 000</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Dostavista</TableCell>*/}
                {/*        <TableCell>1500</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>790</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>400</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>50 000</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Яндекс Go</TableCell>*/}
                {/*        <TableCell>1500</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>790</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>400</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>Без огранич.</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Яндекс Доставка</TableCell>*/}
                {/*        <TableCell>200</TableCell>*/}
                {/*        <TableCell>30</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>300</TableCell>*/}
                {/*        <TableCell>110</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>250 000</TableCell>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <TableCell>Logsis</TableCell>*/}
                {/*        <TableCell>50</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>180</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>100</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>—</TableCell>*/}
                {/*        <TableCell>Без огранич.</TableCell>*/}
                {/*    </tr>*/}
                {/*    </tbody>*/}
                {/*</Table>*/}
            </div>
        ), Icon: Limitations
    },
    {
        name: "Дополнительная услуга", content: (
            <div>
                <Title>Дополнительная услуга
                </Title>
                <DopYsluga style={{
                    width: '100%',
                    maxWidth: '700px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}/>
                <StyledParagraph>Наша служба доставки всегда готова предложить дополнительные услуги, чтобы
                    удовлетворить все потребности наших клиентов. Мы понимаем, что каждый заказ уникален и может
                    требовать индивидуального подхода.</StyledParagraph>
                <StyledParagraph>Через личный кабинет в разделе Услуги склада  Вы можете запросить любую дополнительную услугу, которая не входит в стандартный пакет доставки и Вам очень необходима. Например, Вы можете попросить команду Eparcel съездить и забрать товар с другого склада и многое другое. Мы рассчитаем стоимость услуги и сообщим Вам. При вашем согласии стоимости услуги мы включим в  счет за доставку до адресата. Таким образом, Вы можете быть уверены, что получите полную информацию о стоимости заказа до его выполнения.</StyledParagraph>
            </div>
        ), Icon: service},
];

export default function App() {
    const [activeTab, setActiveTab] = useState(0);
    const [activeContent, setActiveContent] = useState(tabs[0].content);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        setIsActive(false);
        setTimeout(() => {
            setActiveContent(tabs[activeTab].content);
            setIsActive(true);
        }, 500); // Wait for the fade-out effect to finish
    }, [activeTab]);

    return (
        <AnimationRevealPage>
            <Header
                heading="Услуги и стоимость"
                paragraph="В стоимость доставки включено множество базовых бесплатных услуг. Также Вы можете воспользоваться дополнительными услугами."
                imageSrc={DesignIllustration}
                roundedHeaderButton={false}
            />
            <Layout>
                <SidebarContainer>
                    {tabs.map((tab, index) => (
                        <TabButton
                            key={index}
                            active={index === activeTab}
                            onClick={() => setActiveTab(index)}
                        >
                            <IconContainer>{<tab.Icon active={index === activeTab} />}</IconContainer>
                            {tab.name}
                        </TabButton>
                    ))}
                </SidebarContainer>
                <ContentContainer isActive={isActive}>
                    {activeContent}
                </ContentContainer>
            </Layout>
            <Footer />
        </AnimationRevealPage>
    );
}