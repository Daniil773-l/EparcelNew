import React, {useState} from "react";
import InputMask from 'react-input-mask';
import tw from "twin.macro";
import styled from "styled-components";
import {SectionHeading} from "../../../components/misc/Headings.js";
import {PrimaryButton as PrimaryButtonBase} from "../../../components/misc/Buttons.js";


const Container = tw.div`relative bg-white `; // уменьшение py-16 до py-8
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-8 md:py-12 items-center`; // Выровнял по центру вертикально


const Heading = tw(SectionHeading)`mt-2 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`; // уменьшение отступа сверху


const TextColumn = tw(Column)`md:w-5/12 md:order-first flex flex-col gap-4 mb-auto`; // Между элементами в колонке добавил gap-4
const FormColumn = tw(Column)`md:w-6/12 flex items-center justify-center mb-auto`;


const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-2xl  text-secondary-600 md:leading-snug`; // Уменьшил межстрочный интервал


const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-2xl mx-auto md:mx-0`;
const Input = styled.input`
    ${tw`mt-8 first:mt-0 py-3 focus:outline-none font-medium transition duration-300 border-b-2 text-lg`};
    color: #203859;
    border-color: transparent;
    border-bottom-color: #adb5bd;
    font-family: inherit;

    &::placeholder {
        color: #203859;
    }

    &:hover {
        border-bottom-color: #0ABD19;
    }

    &:focus {
        border-bottom-color: #0ABD19;
    }
`;

const PhoneInput = styled(InputMask)`
    ${tw`mt-8 first:mt-0 py-3 focus:outline-none font-medium transition duration-300 text-lg border-b-2`};
    color: #6c757d;
    border-color: transparent;
    border-bottom-color: #adb5bd;
    font-family: inherit;

    &::placeholder {
        color: #203859;
    }

    &:hover {
        border-bottom-color: #0ABD19;
    }

    &:focus {
        border-bottom-color: #0ABD19;
    }
`;

const SelectWrapper = styled.div`
    ${tw`relative mt-8`};
`;

const SelectButton = styled.button`
    ${tw`appearance-none w-full px-4 py-3 text-lg border-b-2 border-gray-300 bg-white text-left`};
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding-left: 0;
    color: ${({selected}) => (selected ? '#203859' : '#203859')};
    font-family: inherit;

    &:hover {
        border-bottom-color: #0ABD19;
    }

    &:focus {
        outline: none;
        border-bottom-color: #0ABD19;
    }
`;

const Dropdown = styled.div`
    ${tw`absolute mt-1 w-full rounded-md bg-white z-10`};
    box-shadow: none;
    border-bottom: 2px solid #adb5bd;
`;

const Option = styled.div`
    ${tw`cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-200 text-sm`};
`;

const Textarea = styled(Input).attrs({as: "textarea"})`
    ${tw`h-24 mt-8`}
`;

const SubmitButton = styled(PrimaryButtonBase)`
    ${tw`inline-block mt-12`}
    background-color: #0ABD19;

    &:hover {
        background-color: #098E14;
    }
`;
const Highlight = styled.span`
    color: #0ABD19; // Green color for emphasis
`;

const optionsSubject = [
    {value: "", label: "Выберите тему обращения", disabled: true},
    {value: "insurance", label: "Страховка"},
    {value: "delivery", label: "Доставка"},
    {value: "packaging", label: "Упаковка"},
    {value: "customs", label: "Таможня"},
    {value: "complaint", label: "Претензия"},
    {value: "warehouse", label: "Услуги склада"},
    {value: "refund", label: "Возврат денег"},
    {value: "return", label: "Возврат товаров"},
    {value: "storage", label: "Хранения"},
    {value: "other", label: "Другое"},
    {value: "business", label: "Бизнес"},
];

const optionsContact = [
    {value: "", label: "Выберите удобный способ связи", disabled: true},
    {value: "phone", label: "Телефон"},
    {value: "email", label: "Email"},
];

const ContactForm = ({
                         heading = (
                             <>
                                 <Highlight> Связаться</Highlight> с нами!
                             </>
                         ),
                         submitButtonText = "Отправить",
                         formAction = "#",
                         formMethod = "get",
                         textOnLeft = true,
                     }) => {
    const [selectedSubject, setSelectedSubject] = useState("");
    const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);

    const [selectedContactMethod, setSelectedContactMethod] = useState("");
    const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

    const handleSelectSubject = (value) => {
        setSelectedSubject(value);
        setSubjectDropdownOpen(false);
    };

    const handleSelectContactMethod = (value) => {
        setSelectedContactMethod(value);
        setContactDropdownOpen(false);
    };

    const toggleDropdown = (event, setDropdownOpen) => {
        event.preventDefault();
        setDropdownOpen((prev) => !prev);
    };

    return (
        <Container>
            <TwoColumn>
                <TextColumn>
                    <TextContent>
                        <Heading>Контакты</Heading>
                        <Description>
                            <p>Телефон для связи: 8 (700) 131-07-57</p>
                            <p>Режим работы склада (США): </p>
                            <p>Понедельник - пятница с 15:00 до 23:00 </p>
                            <p>Суббота, Воскресенье - Выходные дни</p>


                            <p>email: info@eparcel.kz</p> {/* Добавлена новая почта */}
                        </Description>
                    </TextContent>
                </TextColumn>
                <FormColumn>
                    <TextContent>
                        <Heading>{heading}</Heading>
                        <Form action={formAction} method={formMethod}>
                            <Input type="text" name="name" placeholder="Имя"/>
                            <PhoneInput
                                mask="+7 (999) 999-99-99"
                                placeholder="Номер телефона"
                                maskChar=" "
                            />
                            <Input type="email" name="email" placeholder="Email"/>
                            <SelectWrapper>
                                <SelectButton
                                    selected={selectedSubject}
                                    onClick={(event) => toggleDropdown(event, setSubjectDropdownOpen)}
                                >
                                    {optionsSubject.find(option => option.value === selectedSubject)?.label || "Выберите тему обращения"}
                                </SelectButton>
                                {subjectDropdownOpen && (
                                    <Dropdown>
                                        {optionsSubject.filter(option => !option.disabled).map((option) => (
                                            <Option
                                                key={option.value}
                                                onClick={() => handleSelectSubject(option.value)}
                                                style={{
                                                    color: option.disabled ? "#ccc" : "#000",
                                                    pointerEvents: option.disabled ? "none" : "auto"
                                                }}
                                            >
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Dropdown>
                                )}
                            </SelectWrapper>
                            <SelectWrapper>
                                <SelectButton
                                    selected={selectedContactMethod}
                                    onClick={(event) => toggleDropdown(event, setContactDropdownOpen)}
                                >
                                    {optionsContact.find(option => option.value === selectedContactMethod)?.label || "Выберите удобный способ связи"}
                                </SelectButton>
                                {contactDropdownOpen && (
                                    <Dropdown>
                                        {optionsContact.filter(option => !option.disabled).map((option) => (
                                            <Option
                                                key={option.value}
                                                onClick={() => handleSelectContactMethod(option.value)}
                                                style={{
                                                    color: option.disabled ? "#ccc" : "#000",
                                                    pointerEvents: option.disabled ? "none" : "auto"
                                                }}
                                            >
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Dropdown>
                                )}
                            </SelectWrapper>
                            <Textarea name="message" placeholder="Сообщение"/>
                            <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                        </Form>
                    </TextContent>
                </FormColumn>

            </TwoColumn>
        </Container>
    );
};

export default ContactForm;
