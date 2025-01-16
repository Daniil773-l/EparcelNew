import React, { useState } from "react";
import Select from "react-select";
import './calculator.css'; // Assuming you save the CSS in a file named Header.css
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
        borderColor: state.isFocused ? "#0ABD19" : "#D1D5DB", // Граница зелёного цвета при фокусе
        boxShadow: state.isFocused ? "0 0 0 2px #A7F3D0" : "none", // Тень зелёного цвета при фокусе
        "&:hover": {
            borderColor: "#0ABD19",
        },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "#A7F3D0" : state.isFocused ? "#D1FAE5" : "white", // Фон зелёный при выборе и наведении
        color: state.isSelected ? "#065F46" : "#111827", // Тёмно-зелёный текст для выбранного пункта
        "&:hover": {
            backgroundColor: "#D1FAE5", // Светло-зелёный при наведении
            color: "#065F46",
        },
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#0ABD19", // Индикатор зелёного цвета
        "&:hover": {
            color: "#065F46",
        },
    }),
    clearIndicator: (base) => ({
        ...base,
        color: "#0ABD19", // Крестик очистки
        "&:hover": {
            color: "#065F46",
        },
    }),
    singleValue: (base) => ({
        ...base,
        color: "#065F46", // Тёмно-зелёный текст выбранного элемента
    }),
    placeholder: (base) => ({
        ...base,
        color: "#6B7280", // Серый цвет для placeholder
    }),
};
function Header() {
    const [country, setCountry] = useState("USA");
    const [city, setCity] = useState("");
    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [deliveryCost, setDeliveryCost] = useState(0);

    const exchangeRates = { USD: 1.0, EUR: 1.18, TRY: 0.054 }; // Example rates

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

    return (
        <>
            <div className="country-switcher">
                <button
                    type="button"
                    data-country="USA"
                    className={`country-button ${country === "USA" ? "active" : ""}`}
                    onClick={() => setCountry("USA")}
                >
                    из США
                </button>
                {/*<button*/}
                {/*    type="button"*/}
                {/*    data-country="Turkey"*/}
                {/*    className={`country-button ${country === "Turkey" ? "active" : ""}`}*/}
                {/*    onClick={() => setCountry("Turkey")}*/}
                {/*>*/}
                {/*    из Турции*/}
                {/*</button>*/}
            </div>
            <section className="calculator-section">
                <form className="calculator-form" onSubmit={calculateDeliveryCost}>
                    <div className="input-row">
                        <div className="input-group">

                            <Select
                                options={cities}
                                value={city}
                                onChange={(selectedOption) => setCity(selectedOption)}
                                placeholder="Выберите город"
                                isClearable
                                noOptionsMessage={() => "Город не найден"}
                                styles={customStyles} // Применение кастомных стилей
                            />

                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                className="dimension-field input-placeholder-fade long-input"
                                placeholder="Вес посылки (кг)"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label><span className="green">Габариты посылки (см):</span></label>
                        <div className="input-row">
                            <input
                                type="number"
                                id="length"
                                name="length"
                                placeholder="Длина"
                                className="input-placeholder-fade"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                            />
                            <input
                                type="number"
                                id="width"
                                name="width"
                                placeholder="Ширина"
                                className="input-placeholder-fade"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </div>
                        <div className="input-row">
                            <input
                                type="number"
                                id="height"
                                name="height"
                                placeholder="Высота"
                                className="input-placeholder-fade"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label><span className="green">Выберите валюту:</span></label>
                        <div className="input-row">
                            <select className="custom-select" id="currency" name="currency" required value={currency} onChange={e => setCurrency(e.target.value)}>
                                <option value="USD">Доллар (USD)</option>
                                <option value="EUR">Евро (EUR)</option>
                                <option value="TRY">Турецкая лира (TRY)</option>
                            </select>
                        </div>
                    </div>
                    <div className="calculation-container">
                        <button type="submit" className="calculate-button">Рассчитать</button>
                        <div className="calculation-result">
                            <span>Стоимость доставки: <br/> <br/></span>
                            <strong>{deliveryCost.toFixed(2)} {currency}</strong>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Header;