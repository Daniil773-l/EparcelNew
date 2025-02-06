import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import tw from "twin.macro";
import { ReactComponent as Cabinet } from './QuestionsIcon/Cabinet.svg';
import { ReactComponent as Ichoda} from './QuestionsIcon/Ichod.svg';
import { ReactComponent as Ichodashia} from './QuestionsIcon/Ichodashia.svg';
import { ReactComponent as NezvPos} from './QuestionsIcon/NezvPos.svg';
import { ReactComponent as Yslugi} from './QuestionsIcon/Yslugi.svg';
import { ReactComponent as Tariff} from './QuestionsIcon/QTariff.svg';
import { ReactComponent as Dostavka} from './QuestionsIcon/QDostavka.svg';
import { ReactComponent as Vozvrat} from './QuestionsIcon/QVozvrat.svg';
import { ReactComponent as Vukyp} from './QuestionsIcon/QVukyp.svg';
import { ReactComponent as Stahovka} from './QuestionsIcon/Qstrahovka.svg';
import { ReactComponent as Oplata} from './QuestionsIcon/QOplata.svg';
import { ReactComponent as Tamozha} from './QuestionsIcon/QTamozha.svg';
import { ReactComponent as Zaprehka} from './QuestionsIcon/QZaprehenka.svg';
import FAQs from '../../components/faqs/SingleCol';

import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Footer from "../../components/footers/MainFooterWithLinks";
import Header from "../../components/headers/MainHeader";
import Photo from "../../images/img/FAQs-pana.svg";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 15px;
    box-shadow: 2px 2px 10px rgba(45, 45, 45, 0.08);
    overflow: hidden;
    margin: 20px;
    height: auto;
    max-width: 1200px; /* Adjust the max-width as needed */
    margin: 20px auto; /* Center the layout */

    @media (min-width: 768px) {
        flex-direction: row;
        height: 100%;
    }

    @media (min-width: 1024px) {
        max-width: 1200px;
        margin: 20px auto; /* Центрирование */
    }
`;

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: auto; /* Добавляем горизонтальный скроллинг */
    background: #ffffff;
    border-bottom: 1px solid #F5F5F5;

    @media (min-width: 768px) {
        flex-direction: column;
        overflow-x: visible; /* Убираем горизонтальный скроллинг на планшетах и десктопах */
        width: 200px;
        border-right: 1px solid #F5F5F5;
        border-bottom: none;
    }

    @media (min-width: 1024px) {
        width: 300px;
    }
`;

const TabButton = styled.button`
    ${tw`text-lg sm:text-xl font-semibold text-center`}
    display: flex;
    align-items: center;
    background: ${({ active }) => (active ? '#DDF2E6' : 'transparent')};
    color: #243e63; /* Установлен синий цвет */
    border: none;
    padding: 20px 22px; /* Увеличенные отступы */
     /* Расстояние между табами */

    cursor: pointer;
    flex: 1;
    white-space: nowrap;

    &:hover {
        background-color: #DDF2E6;
    }

    svg {
        margin-right: 10px;
        width: 20px;
        height: 20px;

        @media (min-width: 768px) {
            margin-right: 15px;
            width: 24px;
            height: 24px;
        }

        @media (min-width: 1024px) {
            margin-right: 20px;
            width: 30px;
            height: 30px;
        }
    }

    @media (min-width: 768px) {
        font-size: 16px;
        padding: 20px; /* Увеличенные отступы для планшетов */
    }

    @media (min-width: 1024px) {
        font-size: 18px;
    }
`;


const ContentContainer = styled.div`
    flex-grow: 1; /* Контейнер растягивается, чтобы занять оставшееся пространство */
    padding: 20px;
    transition: opacity 0.5s ease;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    overflow: hidden; /* Убираем прокрутку */

    @media (min-width: 768px) {
        padding: 30px;
    }

    @media (min-width: 1024px) {
        max-width: 800px;
        margin: 0 auto; /* Центрируем */
    }
`;

const IconContainer = styled.span``;

const tabs = [
    {
        name: "Личный кабинет",
        Icon: Cabinet,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Как открыть личный кабинет на вашем сайте?",
                        answer: "На главной странице сайта есть активная зеленая кнопка \"Зарегистрироваться\", нажав на нее, Вы перейдете в раздел регистрации, где должны будете внести Ваши данные и подтвердить регистрацию, согласившись с условиями пользовательского соглашения."
                    },
                    {
                        question: "Почему я не получил письмо с подтверждением регистрации?",
                        answer: "Возможно, Вы указали неверный адрес e-mail."
                    },
                    {
                        question: "Возможно изменить имя, адрес почты или пароль в личном кабинете?",
                        answer: "Да. Зайдите в личный кабинет в раздел \"Профиль\" и измените необходимые Вам данные."
                    },
                    {
                        question: "Я потерял доступ к аккаунту. Что делать?",
                        answer: "При потере доступа к аккаунту необходимо написать в службу поддержки Eparcel."
                    },
                    {
                        question: "Я забыл пароль личного кабинета, что мне делать?",
                        answer: "Вы можете восстановить свой пароль на странице Авторизации, нажав на кнопку \"Забыли пароль\" и указать адрес Вашей почты. Вам придет письмо на почту для восстановления Вашего пароля."
                    },
                    {
                        question: "Как мне оформить заказ в интернет-магазине с доставкой на ваш склад?",
                        answer: "Необходимо зарегистрироваться на нашем сайте. Вы получите свой персональный номер и адрес склада. Затем Вы сможете делать покупки в интернет-магазине и добавить их в корзину. При оформлении доставки указывайте свое имя на латинице, свой персональный номер (например, EPL-1000) и адрес склада. Как только Вы получите трекинг-номер доставки Ваших покупок, отправленный интернет-магазином на Вашу почту, обязательно внесите трекинг-номер в ожидаемые посылки в личном кабинете."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            "Входящие посылки" ,
        Icon: Ichodashia,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Что такое входящая посылка?",
                        answer: "Посылка, полученная по адресу склада с интернет-магазина, на имя клиента."
                    },
                    {
                        question: "Как я могу узнать, что Вы получили мою посылку?",
                        answer: "Все полученные посылки на имена наших клиентов вносятся в складскую систему ежедневно. Если Вы ввели трекинг-номер Вашей посылки заранее, то статус Вашей посылки поменяется на \"На складе\"."
                    },
                    {
                        question: "Я выбрал товары в интернет-магазине и оформил заказ на адрес склада. Как мне отслеживать статус посылки?",
                        answer: "Необходимо добавить трекинг-номер Вашей посылки в ожидаемую входящую посылку через личный кабинет. При добавлении ожидаемой входящей посылки обязательно стоит указать полную информацию о Вашей посылке. Если на посылке не будет указан Ваш персональный номер личного кабинета или Вы не введете заранее трекинг-номер Вашей посылки до прихода на склад, то при получении и обработке в складской системе посылка автоматически попадает в список “Неизвестные посылки”, что увеличивает сроки обработки Вашей посылки."
                    },
                    {
                        question: "Какой срок хранения моей входящей посылки на складе?",
                        answer: "Входящие посылки хранятся в течение 90 дней, исчисляемых с даты их регистрации Eparcel. По истечении 90 дней хранения мы имеем право утилизировать содержимое входящей посылки, если Вы не оформили доставку в Казахстан."
                    },
                    {
                        question: "Интернет-магазин задерживает доставку посылки с товарами на адрес склада. Можно ли ускорить этот процесс?",
                        answer: "Мы не несем ответственность за недобросовестность интернет-магазинов, в том числе в случаях, когда: товар выслан с задержкой; товар выслан, но не соответствует описанию; товар нерабочий (хотя заявлен как рабочий); товар вообще не выслан (случаи мошенничества)."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            " Исходящие посылки" ,
        Icon: Ichoda,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Что такое исходящая посылка?",
                        answer: "Посылка, обработанная складом, ожидающая оплаты и отправки, прибывшая на склад в Казахстане, ожидающая доставки до адресата, доставленная. Посылка, оплаченная и отправленная в КЗ."
                    },
                    {
                        question: "Как я могу узнать, где моя посылка?",
                        answer: "Вы сможете отслеживать статус Вашей посылки в личном кабинете. Сроки доставки из США в КЗ составляют 14-20 дней. Сроки доставки из Турции в КЗ составляют 7-10 дней. Если необходимо узнать дополнительную информацию о статусе Вашей посылки, отправьте нам запрос по почте."
                    },
                    {
                        question: "Как меняется статус моей исходящей посылки?",
                        answer: "Статус исходящей посылки будет меняться в зависимости от того, на каком этапе находится."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            "Неизвестные посылки" ,
        Icon: NezvPos,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Что такое неизвестная посылка?",
                        answer: "Посылка, полученная без возможности складской системе определить трекинг-номер, к какому персональному номеру личного кабинета принадлежит посылка. Просим Вас не забывать указывать Ваш персональный номер личного кабинета."
                    },
                    {
                        question: "Что делать, если я забыл указать номер личного кабинета?",
                        answer: "В случае, если клиент не указал свой персональный номер или имя, фамилию при доставке на адрес склада, то данные посылки попадают в неизвестные посылки. Следовательно, просим Вас заранее вводить трекинг-номер в ожидаемые посылки. В случае, если Вы отправили посылку на адрес склада и статус не изменился в течение 5-10 рабочих дней с момента покупки товаров с интернет-магазина, то Вам необходимо написать или позвонить в службу поддержки."
                    },
                    {
                        question: "Как долго Вы храните неизвестные посылки?",
                        answer: "Неизвестные посылки хранятся на складе в течение 90 дней. Далее, все посылки утилизируются."
                    },
                    {
                        question: "Я не хочу регистрироваться на сайте и открывать личный кабинет, Вы сможете мне отправить мою посылку?",
                        answer: "Да, мы сможем Вам отправить посылку. Вам необходимо связаться со службой поддержки для уточнения условий по доставке."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            "Услуги склада" ,
        Icon: Yslugi,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Какие услуги склада Вы оказываете?",
                        answer: "Мы оказываем широкий спектр услуг для наших клиентов, включая необычные запросы. С полным перечнем услуг склада Вы можете ознакомиться в разделе \"Услуги и стоимость\". Обращаем Ваше внимание, что мы оказываем услуги, не входящие в список на нашем сайте. Для этого Вам необходимо связаться со службой поддержки и уточнить условия и стоимость услуги."
                    },
                    {
                        question: "Можно ли сократить вес посылки за счет переупаковки товара?",
                        answer: "Да. Услуга переупаковки товаров заключается в устранении излишней упаковки при наличии такой возможности путем ее удаления или уменьшения. Товары упаковываются в пакет из плотного полиэтилена, картонную коробку или в воздушно-пузырьковую пленку на усмотрение Eparcel. Данная услуга оказывается бесплатно, если иное не указано в договоре."
                    },
                    {
                        question: "Как долго Вы храните неизвестные посылки?",
                        answer: "Неизвестные посылки хранятся на складе в течение 90 дней. Далее, все посылки утилизируются."
                    },
                    {
                        question: "Можно ли объединить или же разделить товары из разных интернет-магазинов?",
                        answer: "На сегодняшний день данная услуга не предоставляется."
                    },
                    {
                        question: "Можно ли переупаковать мои товары в более прочную упаковку?",
                        answer: "Все входящие посылки переупаковываются для снижения объемного веса, а также в более прочную упаковку для дальнейшей доставки в КЗ. Данная услуга предоставляется совершенно бесплатно для наших клиентов."
                    },
                    {
                        question: "Мои товары точно не пострадают после переупаковки?",
                        answer: "Мы гарантируем, что при выполнении переупаковки товары не подвергаются смятию, уплотнению, скручиванию для уменьшения их габаритов."
                    },
                    {
                        question: "Вы проверяете состав товаров в посылке?",
                        answer: "Нет, но Вы можете заказать данную услугу в личном кабинете в разделе \"Услуги склада\" до оформления отправления. Услуга платная."
                    },
                    {
                        question: "Могу я вернуть посылку с товарами или часть товаров обратно в магазин или продавцу?",
                        answer: "Да. Заполните заявку в личном кабинете в разделе \"Услуги склада\". Услуга платная."
                    },
                    {
                        question: "Какие бесплатные дополнительные услуги может предложить Ваша компания?",
                        answer: "Вы можете ознакомиться с перечнем бесплатных услуг на сайте в разделе \"Услуги и стоимость\"."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            "Тарифы" ,
        Icon:  Tariff,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Как узнать конечную стоимость доставки?",
                        answer: "Итоговая стоимость услуг, оказываемых в соответствии с договором и подлежащая оплате заказчиком, устанавливается в Вашем личном кабинете по итогам формирования Вашего отправления в КЗ."
                    },
                    {
                        question: "Можно ли рассчитать стоимость доставки до оформления заказа на сайте Eparcel?",
                        answer: "Да. Стоимость услуг и планируемые сроки доставки можно предварительно рассчитать при помощи калькулятора на сайте. Расчеты калькулятора являются примерными, носят информационный/справочный характер и не имеют силы оферты."
                    },
                    {
                        question: "Почему стоимость доставки отличается от тарифа, указанного на сайте?",
                        answer: "Окончательная стоимость доставки Вашей посылки зависит от курса валют на день оплаты."
                    },
                    {
                        question: "Что включено в стоимость тарифа?",
                        answer: "В стоимость тарифа включено: почтовый адрес склада, получение и регистрация Вашей посылки, упаковка, таможенное оформление и доставка до склада в г. Алматы. Доставка до получателя в КЗ оплачивается отдельно в зависимости от выбранной Вами службы доставки и суммируется к общей стоимости отправления."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            " Доставка" ,
        Icon:  Dostavka,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Как мне отслеживать статус посылки?",
                        answer: "Вы можете отслеживать статус каждой посылки в личном кабинете. Дополнительно, Вам будет приходить сообщение при изменении статуса посылки на адрес электронной почты и СМС-уведомления на номер телефона, указанный при регистрации на сайте. В случае, если статус посылки не изменился в течение 10 рабочих дней, просим Вас заполнить заявление «Статус посылки» через обратную связь в личном кабинете. Срок рассмотрения заявки составляет максимально 48 часов."
                    },
                    {
                        question: "Какой срок хранения моей посылки в выбранном постамате / пункте выдачи заказа?",
                        answer: "Сроки хранения посылок устанавливаются службой доставки. По истечении срока хранения посылки в месте ее выдачи, посылка будет возвращена на наш склад в г. Алматы. По истечении 30 дней, исчисляемых с даты возврата посылки на наш склад, посылка подлежит утилизации. Денежные средства за утилизированное содержимое посылки не возмещаются. Повторная доставка посылки с нашего склада осуществляется за отдельную плату."
                    },
                    {
                        question: "Интернет-магазин задерживает доставку товаров на складской адрес. Можно ли ускорить этот процесс?",
                        answer: "Мы не несем ответственность за недобросовестность интернет-магазинов, в том числе в случаях, когда: товар выслан с задержкой; товар выслан, но не соответствует описанию; товар нерабочий (хотя заявлен как рабочий); товар вообще не выслан (случаи мошенничества)."
                    },
                    {
                        question: "Какие сроки доставки посылки из США и Турции?",
                        answer: "В среднем, сроки доставки из США в КЗ составляют от 10 до 20 дней. Сроки доставки из Турции в КЗ составляют от 5 до 15 дней в зависимости от Вашего региона. К сожалению, мы не отвечаем за действия государственной почты, курьерских служб и транспортных компаний (экспресс-перевозчиков) и не можем влиять на скорость доставки. Указанные на сайте сроки доставки являются приблизительными."
                    },
                    {
                        question: "Где я могу найти адрес доставки на сайте?",
                        answer: "В Вашем личном кабинете указаны адреса склада в США и Турции, на которые Вы можете отправлять все Ваши посылки."
                    },
                    {
                        question: "Есть ли у Вас экспресс-доставка?",
                        answer: "Все посылки отправляются авиадоставкой, что является экспресс-доставкой."
                    },
                    {
                        question: "Делаете ли Вы скидку на отправку большой партии товара?",
                        answer: "Если Ваше отправление более 31 кг, то просим Вас связаться со службой поддержки для уточнения правил и стоимости доставки."
                    },
                    {
                        question: "Какая служба доставляет посылки в КЗ?",
                        answer: "Доставку по Казахстану осуществляет служба доставки СДЭК."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            "Возврат" ,
        Icon:  Vozvrat,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Что такое возврат посылки?",
                        answer: "Полученная посылка на адрес склада и отправленная продавцу обратно для возврата денежных средств покупателю."
                    },
                    {
                        question: "Как мне вернуть товар покупателю?",
                        answer: "Если по каким-то причинам Вы пожелаете вернуть посылку, которая была доставлена на адрес нашего склада, обратно в магазин или иному продавцу Вашего купленного товара, то мы готовы предоставить данную услугу. Вам необходимо воспользоваться в личном кабинете разделом \"Услуги склада\" и оформить возврат посылки с товарами."
                    },
                    {
                        question: "Как я могу вернуть поврежденный товар в посылке?",
                        answer: "Мы сообщим Вам через личный кабинет, что товар в Вашей посылке был поврежден, и предложим Вам несколько вариантов помощи в решении данной ситуации."
                    }
                ]} />

            </div>
        )
    }
    ,
    {
        name:
            "Выкуп товаров" ,
        Icon:  Vukyp,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Что такое возврат посылки?",
                        answer: "Полученная посылка на адрес склада и отправленная продавцу обратно для возврата денежных средств покупателю."
                    },
                    {
                        question: "Как мне вернуть товар покупателю?",
                        answer: "Если по каким-то причинам Вы пожелаете вернуть посылку, которая была доставлена на адрес нашего склада, обратно в магазин или иному продавцу Вашего купленного товара, то мы готовы предоставить данную услугу. Вам необходимо воспользоваться в личном кабинете разделом \"Услуги склада\" и оформить возврат посылки с товарами."
                    },
                    {
                        question: "Как я могу вернуть поврежденный товар в посылке?",
                        answer: "Мы сообщим Вам через личный кабинет, что товар в Вашей посылке был поврежден, и предложим Вам несколько вариантов помощи в решении данной ситуации."
                    }
                ]} />

            </div>
        )
    } ,
    {
        name:
            "Страхование" ,
        Icon:  Stahovka,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Я могу застраховать свою посылку?",
                        answer: "Все посылки будут автоматически застрахованы при оформлении отправления посылки."
                    },
                    {
                        question: "Какая стоимость страхования моей посылки?",
                        answer: "Стоимость страхования составляет 1% от стоимости товаров в посылке и является обязательной."
                    },
                    {
                        question: "Какие страховые случаи покрывает страховка?",
                        answer: "К страховым случаям относятся: повреждение содержимого посылки и утеря посылки."
                    },
                    {
                        question: "В какие сроки Вы рассматриваете заявку страхового случая и сроки выплаты страховки?",
                        answer: "Как только мы получим подтверждение о том, что Ваша посылка была утеряна или повреждена, то в течение 24-72 часов вернем Вам деньги. Максимальный срок рассмотрения заявки — 45 дней."
                    },
                    {
                        question: "Как подать заявление о страховом случае?",
                        answer: "Заполните заявку в разделе «Контакты», указав подробно всю информацию о Вашей посылке. Срок рассмотрения заявки составляет 24-48 часов."
                    },
                    {
                        question: "Как доказать, что товары в посылке были повреждены?",
                        answer:"Если Вы получили поврежденную посылку, то обязательно снимите видео распаковки посылки и товаров и отправьте его в приложении с заявкой на страховой случай."
                    },
                    {
                        question: "Я не получил посылку в течение 30 дней, что делать? Могу я отказаться от страховки отправления?",
                        answer: "Отправьте запрос на почту, указав всю необходимую информацию: Ваш ID, номер заявки, трекинг-номер Вашей посылки, или свяжитесь со службой поддержки по телефону."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            "Оплата" ,
        Icon:  Oplata,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Какой валютой оплачивается заказ?",
                        answer: "Платежи совершаются в национальной валюте Заказчика по курсу доллара США к национальной валюте на дату совершения платежа. Это же касается других расходов: оплата импортных пошлин, налогов и других сборов, которая может возникнуть в стране назначения, ложится на Заказчика и совершается в национальной валюте."
                    },
                    {
                        question: "Что делать, если банк задерживает перевод за оплату заказа?",
                        answer: "Eparcel не несет ответственность за действия смежных служб и сервисов, не принадлежащих нам, таких как: банки, почтовые службы, интернет-провайдеры, e-mail-сервисы, платежные системы и т.д."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            "Таможня" ,
        Icon:  Tamozha,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Что такое «таможенное оформление»?",
                        answer: "Процедура таможенного оформления – это комплекс мероприятий, необходимых для перемещения товаров через таможенную границу государства. Если стоимость посылки превысит 200 (двести) евро либо вес посылки будет более 31 (тридцати одного) кг, то мы за отдельную плату обязуемся оказать Вам услугу по таможенному оформлению. Стоимость услуги указана на сайте. По требованию Eparcel Вы обязуетесь предоставить ИНН, паспортные данные, ссылки на товар в интернет-магазине, где ввозимый товар был приобретен, сканированные копии документа, удостоверяющего личность и скриншот заказа, а также иные сведения, необходимые для таможенного оформления. В случае предоставления неверной информации мы или наши партнеры имеем право произвести реэкспорт посылки (обратный вывоз). Все затраты по реэкспорту и повторной доставке посылки оплачиваются Вами через личный кабинет. При этом Вы даете согласие компании Eparcel, ее партнерам, уполномоченным государственным органам, включая таможенные, в целях соблюдения законодательства или устранения возможного вреда другим посылкам, а также при подозрении на недопустимое или опасное вложение, вскрывать и проверять посылки."
                    },
                    {
                        question: "Для чего нужна таможенная декларация?",
                        answer: "Таможенная декларация – это обязательный документ, который требуют таможенные органы Казахстана для почтовых отправлений с товарными вложениями. В нее необходимо внести содержимое посылки: стоимость, наименование и количество товаров – все это делается для контролирующих инстанций."
                    },
                    {
                        question: "Каковы беспошлинные лимиты на посылки из-за границы?",
                        answer: "На сегодняшний день допустимый таможенный лимит в Казахстане для одного физического лица составляет 200 евро и 31 кг на одну посылку (или несколько посылок, если они проходят таможню одновременно, в один день)."
                    },
                    {
                        question: "Что будет, если я не укажу состав посылки и характеристики товаров или укажу их неверно?",
                        answer: "При оформлении заказа Вы должны знать, что в случае предоставления недостоверной или заведомо ложной информации о товаре или его содержимом к нему может быть предъявлен гражданский иск и/или он может быть привлечен к административной или уголовной ответственности, в связи с чем к нему могут быть применены виды наказания в виде штрафов, конфискации и продажи товара. Перевозчик может на добровольной основе оказать содействие в осуществлении таможенного оформления и других процедур, но весь риск будет отнесен на счет заказчика. Вы будете должны возместить перевозчику убытки и оградить его от претензий, которые могут возникнуть в связи с предоставленной им информацией, а также от любых издержек, которые перевозчик может понести в связи с вышеизложенным, а также оплатить любые административные расходы, связанные с оказанием услуг, предусмотренных договором."
                    }
                ]} />

            </div>
        )
    },
    {
        name:
            "Запрещенные товары" ,
        Icon:  Zaprehka,
        content: (
            <div>
                <FAQs faqs={[
                    {
                        question: "Какие товары запрещены в доставке из-за границы в Казахстан?",
                        answer: "Вы можете ознакомиться с полным списком товаров, запрещенных в доставке, на нашем сайте в разделе «Запрещенные товары»."
                    }
                ]} />

            </div>
        )
    }

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
        }, 500);
    }, [activeTab]);

    return (
        <AnimationRevealPage>
            <Header
                heading="У вас остались вопросы?"
                paragraph="Мы собрали для Вас самую интересную и свежую информацию,а также расскажем, как сэкономить время и деньги."
                imageSrc=   {Photo}
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
                            <IconContainer><tab.Icon active={index === activeTab} /></IconContainer>
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
