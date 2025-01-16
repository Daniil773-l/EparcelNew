import React from "react";

import AnimationRevealPage from "../../components/helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import Header from '../../components/headers/MainHeader';
import Footer from "../../components/footers/MainFooterWithLinks";

import DataIcon from "./Forbiddencookies/data.jpg";
import GunIcon from "./Forbiddencookies/gun.jpg";
import ToxicIcon from "./Forbiddencookies/toxic.jpg";
import SprayIcon from "./Forbiddencookies/spray.jpg";
import DrugIcon from "./Forbiddencookies/rast.jpg";
import HeartIcon from "./Forbiddencookies/organ.jpg";
import SobelIcon from "./Forbiddencookies/sobol.jpg";
import DiamondIcon from "./Forbiddencookies/diamond.jpg";
import MineralIcon from "./Forbiddencookies/miniral.jpg";
import MapIcon from "./Forbiddencookies/map.jpg";
import TreeIcon from "./Forbiddencookies/tree.jpg";
import FishIcon from "./Forbiddencookies/fish.jpg";
import PoisonIcon from "./Forbiddencookies/poison.jpg";
import MoneyIcon from "./Forbiddencookies/money.jpg";
import CrossIcon from "./Forbiddencookies/cross.jpg";
import BunnyIcon from "./Forbiddencookies/bunny.jpg";
import DogIcon from "./Forbiddencookies/dog.jpg";
import SeedIcon from "./Forbiddencookies/seed.jpg";
import GearIcon from "./Forbiddencookies/gear.jpg";
import CandleIcon from "./Forbiddencookies/candle.jpg";
import FireIcon from "./Forbiddencookies/fire.jpg";
import CamIcon from "./Forbiddencookies/cam.jpg";
import PictureIcon from "./Forbiddencookies/picture.jpg";
import AccIcon from "./Forbiddencookies/acc.jpg";
import MedicIcon from "./Forbiddencookies/medic.jpg";
import FruitIcon from "./Forbiddencookies/fruit.jpg";
import SmokeIcon from "./Forbiddencookies/smoke.jpg";
import TimerIcon from "./Forbiddencookies/timer.jpg";
import WtfIcon from "./Forbiddencookies/wtf.jpg";
import AnyIcon from "./Forbiddencookies/any.jpg";
import DesignIllustration from "../../images/img/Запрещенные товары. КЗ.png";

const Container = tw.div`relative bg-white min-h-screen`;
const Content = tw.div`max-w-screen-xl mx-auto py-12 lg:py-16`;



const CardWrapper = tw.div`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8`;
const Card = styled.div`
    ${tw`flex flex-col items-center p-4 bg-white shadow-lg rounded-lg text-center text-lg font-bold`}
    img {
        ${tw`w-16 h-16 mb-4`}
    }
    p {
        ${tw`mt-2`}
    }
`;

const prohibitedItems = [
    { icon: DataIcon, description: "Информация на печатных, аудиовизуальных и иных носителях информации", },
    { icon: GunIcon, description: "Служебное и гражданское оружие, его основные части, и патроны к нему" },
    { icon: ToxicIcon, description: "Опасные отходы" },
    { icon: SprayIcon, description: "Озоноразрушающие вещества и продукция, содержащая озоноразрушающие вещества" },
    { icon: PoisonIcon, description: "Ядовитые вещества, не являющиеся прекурсорами наркотических средств и психотропных веществ" },
    { icon: HeartIcon, description: "Органы и (или) ткани человека, кровь и ее компоненты" },
    { icon: SobelIcon, description: "Соболи живые" },
    { icon: CandleIcon, description: "Ароматизаторы и свечи" },
    { icon: MineralIcon, description: "Виды минерального сырья" },
    { icon: MapIcon, description: "Информация о недрах по районам и месторождениям топливно-энергетического и минерального сырья" },
    { icon: TreeIcon, description: "Средства защиты растений и другие стойкие органические загрязнители" },
    { icon: FishIcon, description: "Орудия добычи (вылова) водных биологических ресурсов" },
    { icon: DrugIcon, description: "Наркотические средства, психотропные вещества и их прекурсоры" },
    { icon: MoneyIcon, description: "Информация на печатных, аудиовизуальных и иных носителях информации: подарочные карты, монеты, наличные деньги и их эквиваленты, банкноты и любых финансовых инструментов" },
    { icon: CrossIcon, description: "Служебное и гражданское оружие, его основные части и патроны к нему: приборы ночного видения, электрошокеры, оптические прицела" },
    { icon: BunnyIcon, description: "Видеопродукция и печатные издания порнографического содержания" },
    { icon: DogIcon, description: "Дикие и (или) домашние животные, корма для животных" },
    { icon: SeedIcon, description: "Растения и семена, удобрения" },
    { icon: DrugIcon, description: "Лекарственные средства содержащие наркотические средства, психотропные вещества и их прекурсоры" },
    { icon: DiamondIcon, description: "Необработанные драгоценные металлы, лом и отходы драгоценных металлов" },
    { icon: FireIcon, description: "Взрывчатые, озоноразрушающие легковоспламеняющиеся, окисляющие, ядовитые, токсичные, отравляющие, жидкости и предметы" },
    { icon: PictureIcon, description: "Коллекции и предметы коллекционирования, культурные ценности, документы национальных архивных фондов, оригиналы архивных документов" },
    { icon: CamIcon, description: "Специальные технические средства, предназначенные для негласного получения информации" },
    { icon: DiamondIcon, description: "Драгоценные камни и металлы, сырьевые товары" },
    { icon: GearIcon, description: "Автозапчасти содержащие жидкости и масло" },
    { icon: FishIcon, description: "Орудия добычи (вылова) водных биологических ресурсов" },
    { icon: AccIcon, description: "Товары, содержащие аккумуляторные батарейки Li-ion АКБ" },
    { icon: MedicIcon, description: "Медицинские товары и приборы" },
    { icon: FruitIcon, description: "Скоропортящиеся товары" },
    { icon: SmokeIcon, description: "Табачная продукция" },
    { icon: TimerIcon, description: "Товары, на которые наложены временные запреты на их ввоз на территорию РФ и ЕАЭС" },
    { icon: WtfIcon, description: "Неопознанные товары, не имеющие никаких данных и информации" },
    { icon: AnyIcon, description: "Товары не относящиеся для личного пользования согласно Решению Коллегии ЕЭК" }
];

const ProhibitedItems = () => (
    <AnimationRevealPage>
        <Header
            heading="Запрещенные товары"
            paragraph="Согласно Решению Коллегии ЕЭК от 21 апреля 2015 г. № 30 при ввозе товаров физическими лицами для личного пользования применяются запреты на ввоз и ввоз товаров, а также ряд ограничений (в том числе разрешительный порядок ввоза и вывоза).
Запрещенные к ввозу товары вообще нельзя перемещать через таможенную границу ни при каких обстоятельствах ни физическим, ни юридическим лицам.
Перечень товаров, в отношении которых установлен запрет ввоза на таможенную территорию ЕАЭС.
"
            imageSrc={DesignIllustration}
            roundedHeaderButton={false}
        />
        <Container>
            <Content>

                <CardWrapper>
                    {prohibitedItems.map((item, index) => (
                        <Card key={index}>
                            <img src={item.icon} alt="Icon" />
                            <p>{item.description}</p>
                        </Card>
                    ))}
                </CardWrapper>
            </Content>
        </Container>
        <Footer />
    </AnimationRevealPage>
);

export default ProhibitedItems;
