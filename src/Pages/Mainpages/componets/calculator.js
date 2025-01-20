import React, { useState } from "react";
import Select from "react-select";

import styled, { css, keyframes } from "styled-components";
const cities = [
    { value: "Almaty", label: "Алматы" },
    { value: "Astana", label: "Астана" },
    { value: "Shymkent", label: "Шымкент" },
    { value: "Karaganda", label: "Караганда" },
    { value: "Aktobe", label: "Актобе" },
    { value: "Pavlodar", label: "Павлодар" },
    { value: "Semey", label: "Семей" },
    { value: "Atyrau", label: "Атырау" },
    { value: "Kostanay", label: "Костанай" },
    { value: "Taraz", label: "Тараз" },
    { value: "Oral", label: "Уральск" },
    { value: "Kyzylorda", label: "Кызылорда" },
    { value: "Aktau", label: "Актау" },
    { value: "Taldykorgan", label: "Талдыкорган" },
    { value: "Zhezkazgan", label: "Жезказган" },
    { value: "Petropavlovsk", label: "Петропавловск" },
    { value: "Turkestan", label: "Туркестан" },
    { value: "Ekibastuz", label: "Экибастуз" },
    { value: "Rudny", label: "Рудный" },
    { value: "Temirtau", label: "Темиртау" },
    { value: "Kokshetau", label: "Кокшетау" },
    { value: "Stepnogorsk", label: "Степногорск" },
    { value: "Baykonur", label: "Байконур" },
    { value: "Saryagash", label: "Сарыагаш" },
    { value: "Zharkent", label: "Жаркент" },
    { value: "Ayagoz", label: "Аягоз" },
    { value: "Balkhash", label: "Балхаш" },
    { value: "Zhanaozen", label: "Жанаозен" },
    { value: "Kapchagay", label: "Капшагай" },
    { value: "Satpayev", label: "Сатпаев" },
    { value: "Shakhtinsk", label: "Шахтинск" },
    { value: "Abay", label: "Абай" },
    { value: "Kentau", label: "Кентау" },
    { value: "Ridder", label: "Риддер" },
    { value: "Zyryanovsk", label: "Зыряновск" },
    { value: "Lisakovsk", label: "Лисаковск" },
    { value: "Esik", label: "Есик" },
    { value: "Shu", label: "Шу" },
    { value: "Talgar", label: "Талгар" },
    { value: "Tekeli", label: "Текели" },
    { value: "Zharkent", label: "Жаркент" },
    { value: "Aksay", label: "Аксай" },
    { value: "Kurchatov", label: "Курчатов" },
    { value: "Shardara", label: "Шардара" },
    { value: "Zhetysay", label: "Жетысай" },
    { value: "Sarkand", label: "Сарканд" },
    { value: "Lenger", label: "Ленгер" },
    { value: "Usharal", label: "Ушарал" },
    { value: "Zaysan", label: "Зайсан" },
    { value: "Fort-Shevchenko", label: "Форт-Шевченко" },
    { value: "Aralsk", label: "Аральск" },
    { value: "Zhanatas", label: "Жанатас" },
    { value: "Karazhal", label: "Каражал" },
    { value: "Priozersk", label: "Приозёрск" },
    { value: "Kandyagash", label: "Кандыагаш" },
    { value: "Atbasar", label: "Атбасар" },
    { value: "Bulaevo", label: "Булаево" },
    { value: "Stepnyak", label: "Степняк" },
    { value: "Zhualy", label: "Жуалы" },
    { value: "Derzhavinsk", label: "Державинск" }

];
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
    const [country, setCountry] = useState("USA");
    const [city, setCity] = useState("");
    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [showDimensions, setShowDimensions] = useState(false);
    const exchangeRates = { USD: 1.0, EUR: 1.18, TRY: 0.054 }; // Example rates
    const [isVisible, setIsVisible] = useState(true);
    const calculateDeliveryCost = (event) => {
        event.preventDefault();
        if (!length || !width || !height || !weight) {
            alert("Please fill in all fields with numbers.");
            return;
        }

        const lengthNum = parseFloat(length);
        const widthNum = parseFloat(width);
        const heightNum = parseFloat(height);
        const weightNum = parseFloat(weight);

        const totalVolume = lengthNum * widthNum * heightNum;
        const volumeWeight = totalVolume / 5000;
        const adjustedWeight = Math.max(weightNum, volumeWeight);

        const ratePerKg = country === "USA" ? 5 : 7;
        let cost = adjustedWeight * ratePerKg;

        const rate = exchangeRates[currency];
        cost *= rate;

        setDeliveryCost(cost);
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
                />
            </ToggleContainer>
            <Form onSubmit={calculateDeliveryCost}>
                <Row>
                    <Select
                        options={cities}
                        value={city}
                        onChange={(selectedOption) => setCity(selectedOption)}
                        placeholder="Выберите город"
                        isClearable
                        noOptionsMessage={() => "Город не найден"}
                        styles={customStyles} // Применение кастомных стилей
                    />

                    <Input
                        type="number"
                        placeholder="Вес (кг)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
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
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
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
            <Result>
                Стоимость доставки: <strong>{deliveryCost.toFixed(2)} {currency}</strong>
            </Result>
        </Wrapper>

    );
}

export default Calculator;