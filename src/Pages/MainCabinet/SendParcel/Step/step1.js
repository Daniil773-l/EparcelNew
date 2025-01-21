import { MdDelete } from "react-icons/md";
import plusIcon from "../../../../images/icon/plus.png";
import React, { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { ExpecteLink } from "../../../../components/misc/Headings";
import {db} from "../../../../FireBaseConfig";
import { useNavigate } from "react-router-dom";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    updateDoc,
    query,
    where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { auth } from "../../../../FireBaseConfig";

const FormContainer = styled.div`
        ${tw`flex justify-center items-center flex-grow `}; /* Исправлен класс */
        padding: 50px 20px;
    `;

const HighlightedText = styled.span`
        ${tw`text-primary-500`};
        color: #0ABD19;
    `;

const Container = styled.div`
        ${tw`w-full max-w-6xl p-8 bg-white shadow-lg rounded-lg`};
        border: 2px solid #1ba557;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
    `;
const StyledCheckbox = styled.label`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 24px;
        height: 24px;
        cursor: pointer;
        border: 2px solid #0abd19;
        border-radius: 6px;
        background-color: ${(props) => (props.checked ? "#0abd19" : "white")};
        transition: all 0.3s ease;
    
        &:hover {
            border-color: #35c442;
            transform: scale(1.1);
        }
    
        &::before {
            content: ${(props) => (props.checked ? "'✔'" : "''")};
            color: white;
            font-size: 16px;
            font-weight: bold;
            position: absolute;
        }
    
        input {
            appearance: none;
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
    `;
const CardsContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Адаптивная сетка */
        gap: 20px;
        width: 100%;
        margin-bottom: 30px;
    `;

const StepTitle = tw(ExpecteLink)`w-full mt-2 mb-4`;

const Card = styled.div`
        ${tw`p-6 rounded-lg flex flex-col items-center shadow-md`};
        border-radius: 15px;
        border: 2px solid #d1d5db;
        transition: transform 0.3s, box-shadow 0.3s;
    
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }
    `;



const CardTitle = styled.h2`
        ${tw`text-lg font-semibold text-black mb-2`};
    `;

const CardText = styled.p`
        ${tw`text-sm font-medium text-gray-700 mb-4`};
    `;

const EditLink = styled.a`
        ${tw`text-sm text-blue-500 cursor-pointer`};
    
        &:hover {
            text-decoration: underline;
        }
    `;

const DeleteIcon = styled.button`
        ${tw`bg-red-100 text-red-500 rounded-full p-2 mt-4`};
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
    
        &:hover {
            background-color: #fee2e2;
        }
    `;

const BottomButton = styled.button`
        ${tw`w-auto text-white font-bold rounded-lg flex items-center justify-center leading-none focus:outline-none transition duration-300 shadow-md`};
        padding: 10px 20px;
        font-size: 16px;
        background-color:#0abd19 ;
        &:hover,
        &:focus {
            transform: scale(1.05);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }
    `;

const Icon = styled.img`
        width: 18px;
        height: 18px;
        margin-right: 15px;
    `;

const NavLink = styled.a`
        text-decoration: none;
    `;
const PageTitle = styled.h1`
        ${tw`text-3xl font-bold `};
        text-align: left;
    `;
const Step1 = ({ onDataPass , parcelData, services }) => {
    const { id } = useParams();
    const [recipients, setRecipients] = useState([]); // Список получателей
    const [selectedRecipients, setSelectedRecipients] = useState({}); // Хранит выбранных получателей
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipients = async () => {
            const db = getFirestore();
            const user = auth.currentUser;
            if (user) {
                const q = query(
                    collection(db, "recipients"),
                    where("userId", "==", user.uid)
                );
                const querySnapshot = await getDocs(q);
                const fetchedRecipients = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setRecipients(fetchedRecipients);
            }
        };

        fetchRecipients();
    }, []);

    const handleEdit = (recipient) => {
        navigate("/RecipientsForm", { state: { recipient } });
    };


    const handleDelete = async (recipientId) => {
        try {
            const db = getFirestore();
            await deleteDoc(doc(db, "recipients", recipientId));
            setRecipients(
                recipients.filter((recipient) => recipient.id !== recipientId)
            );
        } catch (error) {

        }
    };
    const handleCheckboxChange = async (recipientId, isChecked) => {
        try {
            const selectedRecipient = recipients.find(
                (recipient) => recipient.id === recipientId
            );

            if (!selectedRecipient) return;

            // Обновление состояния выбранных получателей
            setSelectedRecipients((prevState) => ({
                ...prevState,
                [recipientId]: isChecked,
            }));

            if (isChecked) {
                // Логика сохранения получателя в базу данных
                const q = query(collection(db, "parcels"), where("id", "==", id));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return;

                const parcelDocId = querySnapshot.docs[0].id;
                await updateDoc(doc(db, "parcels", parcelDocId), {
                    recipient: selectedRecipient,
                });

                // Передача данных через onDataPass
                if (onDataPass) {


                    onDataPass({
                        parcelId: id,
                        servicesIds: services ? services.map((service) => service.id) : [],
                        parcelData: parcelData || null,
                        city: selectedRecipient.city,
                        recipient: selectedRecipient,
                    });
                }
            }
        } catch (error) {

        }
    };

    return (
        <FormContainer>
            <div style={{ width: "100%", maxWidth: "1280px" }}>
                <PageTitle active={true}>Заявка на отправку посылки в Казахстан</PageTitle>
                <StepTitle>
                    <HighlightedText>Шаг 1. </HighlightedText>Укажите получателя
                </StepTitle>
                <Container>
                    <CardsContainer>
                        {recipients.map((recipient) => (
                            <Card key={recipient.id}>
                                <StyledCheckbox
                                    checked={!!selectedRecipients[recipient.id]}
                                >
                                    <input
                                        type="checkbox"
                                        checked={!!selectedRecipients[recipient.id]}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                recipient.id,
                                                e.target.checked
                                            )
                                        }
                                    />
                                </StyledCheckbox>
                                <CardTitle>
                                    {recipient.name} {recipient.surname}
                                </CardTitle>
                                <CardText>{recipient.phone}</CardText>
                                <EditLink onClick={() => handleEdit(recipient)}>
                                    Редактировать
                                </EditLink>
                                <DeleteIcon
                                    onClick={() => handleDelete(recipient.id)}
                                >
                                    <MdDelete />
                                </DeleteIcon>
                            </Card>
                        ))}
                    </CardsContainer>
                    <NavLink href="/RecipientsForm">
                        <BottomButton>
                            <Icon src={plusIcon} alt="Plus Icon" />
                            Добавить получателя
                        </BottomButton>
                    </NavLink>
                </Container>
            </div>
        </FormContainer>
    );
};

export default Step1;