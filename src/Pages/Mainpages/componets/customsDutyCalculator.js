import React, {useState,useEffect} from "react";
import tw from "twin.macro";
import styled ,{css }from "styled-components";
import {SectionHeading, Subheading as SubheadingBase} from "../../../components/misc/Headings.js";
import axios from "axios";
const API_URL = "https://api.exchangerate-api.com/v4/latest/EUR"; // API для курса валют (основа - EUR)

const Container = tw.div`relative`; // Убрали отступы сверху и снизу полностью

const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-4 items-center`; // Сократили общий отступ до минимального (py-4)

const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

const TextColumn = styled(Column)(({ textOnLeft }) => [
    tw`md:w-6/12`,
    textOnLeft ? tw`md:mr-8 lg:mr-10 md:order-first` : tw`md:ml-8 lg:ml-10 md:order-last`,
    css`
        
    margin-top: -75px; /* Поднимаем текст вверх */

    @media (max-width: 768px) {
      margin-top: 0; /* Убираем отрицательный отступ на мобильных устройствах */
    }
  `,
]);



const Heading = tw(
    SectionHeading
)`font-black text-left text-3xl sm:text-3xl lg:text-4xl text-center md:text-left leading-tight mt-0`; // Убрали отступ сверху для заголовка

const Description = tw.p`mt-4 text-center md:text-left text-base xl:text-xl my-2 lg:my-4 text-gray-700`; // Сократили отступ сверху для описания

const CalculatorColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative mt-8`;


const TextContent = tw.div`lg:pt-2 lg:pb-4 text-center md:text-left`;



const Subheading = styled(SubheadingBase)`
    ${tw`text-center md:text-left`}
    color: #0ABD19; // Set the color to bright green
`;
const CalculatorHeading = styled.h3`
    font-size: 24px; /* Увеличиваем размер текста */
    text-align: center; /* Выравниваем по центру */
    color: #243e63; /* Устанавливаем цвет */
    font-weight: bold;
    margin-bottom: 20px;
`;
const Wrapper = styled.div`
  max-width: 480px;
  margin: 0px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 2px solid #0abd19;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

const Title = tw(
    SectionHeading
)`font-black text-3xl sm:text-2xl lg:text-2xl text-center leading-tight`;

const SubTitle = styled.p`
  text-align: center;
  color: #0abd19;
  font-size: 17px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 96%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    border-color: #34c759;
    box-shadow: 0 0 5px rgba(52, 199, 89, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    border-color: #34c759;
    box-shadow: 0 0 5px rgba(52, 199, 89, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #34c759;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #2a9d4d;
  }
`;

const Result = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;

  strong {
    color: #34c759;
    font-size: 24px;
  }
`;

const CustomsDutyCalculator = ({
                                   subheading = "", heading = (
        <>
            Заказали на сумму более 200 евро? <span tw="text-primary-500"></span> Рассчитайте стоимость таможенной
            пошлины заранее!
        </>
    ), textOnLeft = true
                               }) => {
    const [itemPrice, setItemPrice] = useState("");
    const [currency, setCurrency] = useState("EUR");
    const [customsDuty, setCustomsDuty] = useState(null);
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        axios
            .get(API_URL)
            .then((response) => {
                setExchangeRates(response.data.rates);
            })
            .catch((error) => {
                console.error("Ошибка загрузки курса валют:", error);
                setExchangeRates({ USD: 1, EUR: 1, TRY: 30 }); // Фиксированный курс для TRY, если API не доступно
            });
    }, []);

    const handleCalculate = (event) => {
        event.preventDefault();
        const priceUSD = parseFloat(itemPrice.replace(",", ".")); // Цена вводится в долларах

        if (isNaN(priceUSD) || priceUSD <= 0) {
            alert("Введите корректную сумму!");
            return;
        }

        // Получаем курс обмена USD → EUR
        const usdToEurRate = exchangeRates["USD"] ? 1 / exchangeRates["USD"] : 1;

        // Конвертируем цену товара в евро
        const priceEUR = priceUSD * usdToEurRate;

        console.log("Введенная цена в USD:", priceUSD);
        console.log("Курс USD → EUR:", usdToEurRate);
        console.log("Цена в EUR после конвертации:", priceEUR);

        let dutyEUR = 0;
        if (priceEUR > 200) {
            const excessAmount = priceEUR - 200;
            dutyEUR = excessAmount * 0.15; // 15% на сумму выше 200€
        }

        console.log("Таможенная пошлина в EUR:", dutyEUR);

        // Конвертируем пошлину в выбранную валюту
        const rate = exchangeRates[currency] || 1;
        const convertedDuty = dutyEUR * rate;

        console.log("Курс обмена в выбранную валюту:", rate);
        console.log("Рассчитанная пошлина в", currency, ":", convertedDuty);

        setCustomsDuty(convertedDuty);
    };



    return (
        <Container>
            <TwoColumn>
                <CalculatorColumn>
                    <Wrapper>
                        <Title>Калькулятор таможенной пошлины</Title>
                        <SubTitle>Укажите габариты посылки</SubTitle>
                        <form onSubmit={handleCalculate}>
                            <InputGroup>
                                <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                    <option value="USD">Доллар (USD)</option>
                                    <option value="EUR">Евро (EUR)</option>
                                    <option value="TRY">Турецкая лира (TRY)</option>
                                </Select>
                                <Input
                                    type="number"
                                    placeholder="Цена товара (€)"
                                    value={itemPrice}
                                    onChange={(e) => setItemPrice(e.target.value)}
                                />
                            </InputGroup>
                            <Button type="submit">Рассчитать</Button>
                        </form>
                        <Result>
                            Стоимость доставки: <strong>{customsDuty !== null ? customsDuty.toFixed(2) : "0.00"} {currency}</strong>
                        </Result>
                    </Wrapper>
                </CalculatorColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>
                        <Subheading>{subheading}</Subheading>
                        <Heading>{heading}</Heading>
                        <Description>
                            <span style={{ color: "#0ABD19" }}>Если стоимость товаров </span>более €200, оплачивается
                            таможенная пошлина в размере 15% на то, что свыше 200. Лимит 31 кг. на одного клиента, включая объемный
                            вес (габариты). Превышение – начисляется €2 за каждый дополнительный кг.
                        </Description>
                    </TextContent>
                </TextColumn>
            </TwoColumn>
        </Container>
    );
};

export default CustomsDutyCalculator;