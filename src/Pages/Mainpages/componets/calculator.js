import React, { useState ,useEffect} from "react";
import Select from "react-select";
import axios from "axios";
import styled, { css, keyframes } from "styled-components";

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
const cities = [
    { value: "Almaty", label: "Алматы" ,zone:1 },
    { value: "Astana", label: "Астана",zone: 2 },
    {value: "Balkhash",label: "Балкаш", zone: 2 },
    { value: "Shymkent", label: "Шымкент" ,zone: 2 },
    { value: "Karaganda", label: "Караганда", zone: 2 },
    {value: "Kosshy",label: "Косшы", zone: 2 },
    { value: "Aktobe", label: "Актобе", zone: 3 },
    { value: "Pavlodar", label: "Павлодар", zone: 3 },
    { value: "Semey", label: "Семей" ,zone: 3},
    {value: "Ust-Kamenogorsk",label: "Усть-Каменогорск", zone: 3},
    {value: "Shemonaikha",label: "Шемонаиха", zone: 3 },
    { value: "Atyrau", label: "Атырау", zone: 3 },
    { value: "Kostanay", label: "Костанай" ,zone: 2 },
    { value: "Taraz", label: "Тараз", zone: 2 },
    { value: "Oral", label: "Уральск", zone: 3 },
    { value: "Kyzylorda", label: "Кызылорда", zone: 3 },
    { value: "Aktau", label: "Актау", zone: 3 },
    { value: "Taldykorgan", label: "Талдыкорган", zone:1 },
    { value: "Zhezkazgan", label: "Жезказган", zone: 2 },
    { value: "Zhitikara", label: "Житикара", zone: 2 },
    { value: "Petropavlovsk", label: "Петропавловск", zone: 2 },
    { value: "Turkestan", label: "Туркестан", zone:2 },
    { value: "Ekibastuz", label: "Экибастуз", zone:3 },
    { value: "Rudny", label: "Рудный", zone:2 },
    { value: "Temirtau", label: "Темиртау",zone: 2},
    { value: "Kokshetau", label: "Кокшетау" ,zone:2},
    { value: "Stepnogorsk", label: "Степногорск", zone:2 },
    {value: "Tayynsha",label: "Тайынша",zone: 2},
    {value:"Tobyl" ,label: "Тобыл", zone:2 },
    {value:"Altai" ,label: "Алтай", zone:3 },
    {value: "Shchuchinsk", label: "Щучинск", zone:2 },
    { value: "Saryagash", label: "Сарыагаш" ,zone:2},
    { value: "Zhanaozen", label: "Жанаозен", zone:3 },
    { value: "Satpayev", label: "Сатпаев",zone: 2 },
    { value: "Shakhtinsk", label: "Шахтинск", zone:2 },
    { value: "Abay", label: "Абай" ,zone:1},
    {value: "Besagash",label: "Бесагаш",zone:1},
    {value: "Boraldai",label: "Боралдай",zone:1},
    {value:"Kaskelen",label: "Каскелен", zone:1},
    {value: "Otegen-Batyr",label: "Отеген-Батыр", zone:1},
    { value: "Ridder", label: "Риддер",zone: 3 },
    { value: "Zyryanovsk", label: "Зыряновск" },
    { value: "Lisakovsk", label: "Лисаковск" , zone: 2},
    {value: "Novoishimskoe",label: "Новоишимское", zone:2 },
    { value: "Esik", label: "Есик" ,zone:1},
    {value: "Konaev",label: "Конаев", zone:1},
    {value: "Korday",label: "Кордай", zone:1},
    { value: "Talgar", label: "Талгар", zone:1 },
    {value: "Tuzdybastau",label: "Туздыбастау", zone:1},
    { value: "Aksay", label: "Аксай",zone: 3 },
    { value: "Lenger", label: "Ленгер", zone: 2 },
    { value: "Priozersk", label: "Приозёрск", zone:2 },
    {value: "Saran",label: "Сарань",zone: 2},
    { value: "Kandyagash", label: "Кандыагаш" },
    { value: "Atbasar", label: "Атбасар", zone:2 },
];

const tariffs = {
    1: [10, 14, 21, 28, 35, 42, 14], // Тарифы для зоны 1
    2: [11, 15, 22, 29, 36, 43, 15], // Тарифы для зоны 2
    3: [12, 16, 23, 30, 37, 44, 16], // Тарифы для зоны 3
};

const customStyles = {
    control: (base, state) => ({
        ...base,
        borderColor: state.isFocused ? "#0ABD19" : "#D1D5DB",
        boxShadow: state.isFocused ? "0 0 0 2px #A7F3D0" : "none",
        "&:hover": {
            borderColor: "#0ABD19",
        },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "#A7F3D0" : state.isFocused ? "#D1FAE5" : "white",
        color: state.isSelected ? "#065F46" : "#111827",
        "&:hover": {
            backgroundColor: "#D1FAE5",
            color: "#065F46",
        },
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#0ABD19",
        "&:hover": {
            color: "#065F46",
        },
    }),
    clearIndicator: (base) => ({
        ...base,
        color: "#0ABD19",
        "&:hover": {
            color: "#065F46",
        },
    }),
    singleValue: (base) => ({
        ...base,
        color: "#065F46",
    }),
    placeholder: (base) => ({
        ...base,
        color: "#6B7280",
    }),
};
const fadeIn = keyframes`
    from {
        opacity: 0;
        height: 0;
        transform: scaleY(0);
    }
    to {
        opacity: 1;
        height: auto;
        transform: scaleY(1);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        height: auto;
        transform: scaleY(1);
    }
    to {
        opacity: 0;
        height: 0;
        transform: scaleY(0);
    }
`;

const Wrapper = styled.div`
    max-width: 480px;
    margin: 50px auto;
    padding: 25px;
    background-color: #ffffff;
    border-radius: 16px;
    border: 2px solid #0ABD19;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    position: relative;
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
`;

const CountrySwitcher = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 5px;
`;

const CountryButton = styled.button`
    flex: 1;
    padding: 12px 0;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    background-color: ${(props) => (props.active ? "#0ABD19" : "#ffffff")};
    color: ${(props) => (props.active ? "#ffffff" : "#0ABD19")};
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: ${(props) => (props.active ? "#36cf62" : "#d1fae5")};
        color: #065f46;
    }

    &:not(:last-child) {
        margin-right: 5px;
    }
`;

const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const ToggleLabel = styled.label`
    font-size: 16px;
    color: #333;
`;

const ToggleSwitch = styled.input`
    appearance: none;
    width: 40px;
    height: 20px;
    background: #ccc;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    outline: none;
    transition: background 0.3s;

    &:checked {
        background: #34c759;
    }

    &::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s;
    }

    &:checked::before {
        transform: translateX(20px);
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  ${(props) =>
    props.animate &&
    css`
      animation: ${props.visible ? fadeIn : fadeOut} 0.3s ease forwards;
    `}
`;

const Input = styled.input`
  flex: 1;
  min-width: 45%;
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
  background-color: #34c759;
  color: white;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2a9d4d;
  }
`;

const Result = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 24px;
  color: #333;

  strong {
    color: #34c759;
    font-size: 24px;
  }
`;
const AnimatedWrapper = styled.div`
    overflow: hidden;
    ${(props) =>
            props.animate &&
            css`
                animation: ${props.visible ? fadeIn : fadeOut} 0.3s ease forwards;
            `}
`;
function Calculator() {
    const [city, setCity] = useState(null);
    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [showDimensions, setShowDimensions] = useState(false);
    const [deliveryCost, setDeliveryCost] = useState(null);
    const [currency, setCurrency] = useState("USD");
    const [exchangeRates, setExchangeRates] = useState({});
    const [country, setCountry] = useState("USA");
    // Получаем курс валют при загрузке страницы
    useEffect(() => {
        axios
            .get(API_URL)
            .then((response) => setExchangeRates(response.data.rates))
            .catch((error) => console.error("Ошибка загрузки курса валют:", error));
    }, []);

    const calculateDeliveryCost = (event) => {
        event.preventDefault();
        if (!city || !weight) {
            alert("Выберите город и введите вес!");
            return;
        }

        const zone = city.zone;
        const weightNum = parseFloat(weight);

        if (weightNum <= 0) {
            alert("Введите корректный вес!");
            return;
        }

        let cost;
        if (weightNum <= 0.5) cost = tariffs[zone][0];
        else if (weightNum <= 1) cost = tariffs[zone][1];
        else if (weightNum <= 1.5) cost = tariffs[zone][2];
        else if (weightNum <= 2) cost = tariffs[zone][3];
        else if (weightNum <= 2.5) cost = tariffs[zone][4];
        else if (weightNum <= 3) cost = tariffs[zone][5];
        else cost = tariffs[zone][6] * (Math.ceil(weightNum) - 3) + tariffs[zone][5];

        const rate = exchangeRates[currency] || 1; // Проверяем наличие курса
        const convertedCost = cost / rate;

        setDeliveryCost(isNaN(convertedCost) ? 0 : convertedCost);
    };


    return  (

        <Wrapper>
            <Title>Калькулятор доставки</Title>
            <CountrySwitcher>
                <CountryButton
                    active={country === "USA"}
                    onClick={() => setCountry("USA")}
                >
                    из США
                </CountryButton>
                <CountryButton
                    active={country === "Turkey"}
                    onClick={() => setCountry("Turkey")}
                >
                    из Турции
                </CountryButton>
            </CountrySwitcher>
            <ToggleContainer>
                <ToggleLabel>Указать габариты посылки</ToggleLabel>
                <ToggleSwitch
                    type="checkbox"
                    checked={showDimensions}
                    onChange={() => setShowDimensions(!showDimensions)}
                    disabled={country === "Turkey"} // Блокируем переключение при выборе Турции
                />
            </ToggleContainer>
            <Form onSubmit={calculateDeliveryCost}>
                <Row>
                    <Select
                        options={cities}
                        value={city}
                        onChange={(selectedOption) => setCity(selectedOption)}
                        placeholder={country === "Turkey" ? "Скоро" : "Выберите город"}
                        isClearable
                        isDisabled={country === "Turkey"} // Блокируем выбор
                        noOptionsMessage={() => "Город не найден"}
                        styles={customStyles} // Применение кастомных стилей
                    />

                    <Input
                        type="text"
                        placeholder={country === "Turkey" ? "Скоро" : "Вес (кг)"}
                        value={country === "Turkey" ? "" : weight}
                        onChange={(e) => setWeight(e.target.value)}
                        disabled={country === "Turkey"} // Блокируем ввод
                    />
                </Row>
                {showDimensions && (
                    <Row animate visible={showDimensions}>
                        <Input
                            type="number"
                            placeholder="Длина (см)"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="Ширина (см)"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="Высота (см)"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </Row>
                )}
                <Row>
                    <select
                        value={currency} onChange={(e) => setCurrency(e.target.value)}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "6px",
                            fontSize: "16px",
                        }}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="TRY">TRY</option>
                    </select>
                </Row>
                <Button type="submit">Рассчитать</Button>
            </Form>
            {deliveryCost !== null && country !== "Turkey" && (
                <Result>
                    Стоимость доставки: <strong>{Number(deliveryCost).toFixed(2)} {currency}</strong>
                </Result>
            )}

            {country === "Turkey" && (
                <Result>
                    <strong>Скоро!</strong>
                </Result>
            )}

        </Wrapper>

    );
}

export default Calculator;