import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Arrow from "../../../images/icon/GreenSmallArrow.svg";
import BoxIcon from "../../../images/icon/cardboard-box_11530648.png";

const SidebarContainer = styled.div`
    ${tw`bg-white`}
    width: 250px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    height: 100%;

    @media (max-width: 768px) {
        width: 200px;
    }
`;

const SidebarItem = styled.div`
    ${tw`flex flex-col mb-4`}
`;

const SidebarItemTitle = styled.div`
    ${tw`flex justify-between items-center cursor-pointer p-2 text-gray-800 font-semibold`}
    &:hover {
        background-color: #f1f1f1;
    }
`;

const SidebarItemIconText = styled.div`
    ${tw`flex items-center`}
`;

const SidebarSubItem = styled.a`
    ${tw`flex items-center pl-8 text-gray-600 cursor-pointer my-2`}
    text-decoration: none;
    &:hover {
        color: #0ABD19;
    }
`;

const Icon = styled.img`
    ${tw`mr-2`}
    width: 25px;
    height: 25px;
`;

const SidebarToggleIcon = styled.img.attrs({ src: Arrow })`
    ${tw`ml-2 transition-transform duration-300`}
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
`;

const SidebarMenu = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subItemOpen, setSubItemOpen] = useState({});

    const toggleSubItem = (index) => {
        setSubItemOpen((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <SidebarItem>
            <SidebarItemTitle onClick={() => setIsOpen(!isOpen)}>
                <SidebarItemIconText>
                    <Icon src={BoxIcon} alt="icon" />
                    {title}
                </SidebarItemIconText>
                <SidebarToggleIcon isOpen={isOpen} />
            </SidebarItemTitle>
            {isOpen &&
                items.map((item, index) => (
                    <React.Fragment key={index}>
                        <SidebarSubItem
                            href={item.href}
                            onClick={(e) => item.subItems && e.preventDefault()}
                        >
                            <Icon src={BoxIcon} alt="icon" />
                            {item.name}
                            {item.subItems && (
                                <SidebarToggleIcon
                                    isOpen={subItemOpen[index]}
                                    onClick={() => toggleSubItem(index)}
                                />
                            )}
                        </SidebarSubItem>
                        {subItemOpen[index] &&
                            item.subItems &&
                            item.subItems.map((subItem, subIndex) => (
                                <SidebarSubItem
                                    href={subItem.href}
                                    key={`${index}-${subIndex}`}
                                    style={{ paddingLeft: "40px" }}
                                >
                                    <Icon src={BoxIcon} alt="icon" />
                                    {subItem.name}
                                </SidebarSubItem>
                            ))}
                    </React.Fragment>
                ))}
        </SidebarItem>
    );
};

const Sidebar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (query) => {
        setSearchQuery(query);

        const parcels = [
            { id: "P001", status: "Ожидается", href: "/ExpectedParcels" },
            { id: "P002", status: "Оплачена", href: "/paid" },
            { id: "P003", status: "Обработана", href: "/Parsed" },
        ];

        if (query.trim() === "") {
            setSearchResults([]);
        } else {
            const results = parcels.filter(
                (p) =>
                    p.id.toLowerCase().includes(query.toLowerCase()) ||
                    p.status.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        }
    };

    return (
        <SidebarContainer>
            <SearchInput
                type="text"
                placeholder="Поиск посылки..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />

            {searchResults.length > 0 && (
                <div style={{ marginBottom: "16px" }}>
                    {searchResults.map((result, i) => (
                        <SidebarSubItem href={result.href} key={i}>
                            <Icon src={BoxIcon} alt="icon" />
                            {result.id} — {result.status}
                        </SidebarSubItem>
                    ))}
                </div>
            )}

            <SidebarMenu
                title="Клиент"
                items={[{ name: "Выкуп товаров", href: "/purchaseofgoodssclad" }]}
            />
            <SidebarMenu
                title="Склад"
                items={[
                    { name: "Прием посылок", href: "/WareHouseMainPage" },
                    { name: "Принятые посылки", href: "/acceptedparcels" },
                    { name: "Ожидаемые посылки", href: "/ExpectedParcels" },
                    { name: "Обработать посылку", href: "/ProccessingParcels" },
                    { name: "Входящие", href: "/IncomingPParcels" },
                    { name: "Обработанные", href: "/Parsed" },
                    { name: "Оплаченные посылки", href: "/paid" },
                    { name: "Неизвестные посылки", href: "/unknow-parcel" },
                    { name: "Поврежденные посылки", href: "/damaged" },
                    { name: "Услуги склада", href: "/servicesclad" },
                ]}
            />
            <SidebarMenu
                title="Доставка"
                items={[
                    { name: "Исходящие посылки", href: "/otgoingscaldparcel" },
                    {
                        name: "Палет",
                        href: "/subpage5",
                        subItems: [
                            { name: "Добавить палет", href: "/add-pallet" },
                            { name: "Список палетов", href: "/pallet-list" },
                        ],
                    },
                    {
                        name: "Отправка",
                        href: "/subpage6",
                        subItems: [
                            { name: "Создать Shipment", href: "/create-shipment" },
                        ],
                    },
                ]}
            />
            <SidebarItemTitle>
                <SidebarItemIconText>
                    <Icon src={BoxIcon} alt="icon" />
                    Поиск
                </SidebarItemIconText>
            </SidebarItemTitle>
        </SidebarContainer>
    );
};

export default Sidebar;

