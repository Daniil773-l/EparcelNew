import React, {useRef, useState, useEffect} from "react";
import styled, {keyframes} from "styled-components";
import tw from "twin.macro";
import { FaPaperclip } from "react-icons/fa"; // Импорт иконки Paperclip
import {doc, updateDoc, setDoc, getDoc, getFirestore, getDocs, collection, where, query} from 'firebase/firestore';
import {useNavigate} from "react-router-dom";



const Form = styled.form`
    ${tw`space-y-6`}
`;

const Row = styled.div`
    ${tw`grid grid-cols-3 gap-6`}
`;

const Label = styled.label`
    ${tw`text-sm font-semibold mb-1`}
    color: #d3d3d3;
`;

const InputContainer = styled.div`
    ${tw`flex flex-col justify-between`}
`;

const Input = styled.input`
    ${tw`rounded-lg p-3 text-gray-700`};
    border: 1px solid #d3d3d3; /* Легкая серая граница */
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
        border-color: #0ABD19;
        box-shadow: 0 0 6px rgba(10, 189, 25, 0.5); /* Подсветка при фокусе */
        outline: none;
    }

    &::placeholder {
        color: #b0b0b0; /* Более светлый текст для placeholder */
        font-style: italic; /* Курсив для текстового подсказки */
    }

    &:hover {
        border-color: #0ABD19; /* Легкий акцент на hover */
    }
`;

const Select = styled.select`
    ${tw`rounded-lg p-3 w-full text-gray-700`};
    border: 1px solid #d3d3d3;
    background-color: #fff;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
        border-color: #0ABD19;
        box-shadow: 0 0 6px rgba(10, 189, 25, 0.5);
        outline: none;
    }
`;

const TextArea = styled.textarea`
    ${tw`rounded-lg p-3 w-full text-gray-700`};
    border: 1px solid #d3d3d3;
    background-color: #fff;
    font-size: 16px;
    height: 100px; /* Увеличение высоты */
    transition: all 0.3s ease;

    &:focus {
        border-color: #0ABD19;
        box-shadow: 0 0 6px rgba(10, 189, 25, 0.5);
        outline: none;
    }

    &::placeholder {
        color: #b0b0b0;
        font-style: italic;
    }
`;

const AttachPhotoContainer = styled.div`
    ${tw`flex items-center mt-6`}
`;

const FolderContainer = styled.div`
    ${tw`mr-4`}
`;

const AttachPhotoText = styled.span`
    ${tw`ml-2 text-green-500 cursor-pointer`}
    text-decoration: underline;
`;

const AttachPhotoDescription = styled.span`
    ${tw`mt-1 text-gray-400`}
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const FilePreviewRow = styled.div`
    ${tw`flex flex-wrap items-center mt-4`}
`;

const FilePreviewContainer = styled.div`
    ${tw`flex items-center p-2 rounded-lg border mr-2 mb-2 cursor-pointer`}
    border: 1px solid #0ABD19;
    color: #0ABD19;
`;

const FileName = styled.span`
    ${tw`text-sm`}
`;

const StatusContainer = styled.div`
    ${tw`mt-4`}
`;

const BiggerLabel = styled.label`
    ${tw` font-semibold mb-1`}
    color: #d3d3d3;
`;

const CheckboxLabel = styled.label`
    ${tw`flex items-center text-sm font-semibold text-gray-600`}
    font-size: 16px;
`;

const Checkbox = styled.input.attrs({type: 'checkbox'})`
    width: 20px;
    height: 20px;
    ${tw`mr-2 cursor-pointer`};
    appearance: none;
    border: 2px solid #fb0000;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:checked {
        background-color: #df0000;
        border-color: #fb0000;
    }

    &:checked::after {
        content: '×';
        font-size: 14px;
        color: #fff;
        display: block;
        text-align: center;
        line-height: 1.1;
    }
`;

const ButtonContainer = styled.div`
    ${tw`flex justify-between mt-8`}
`;

const GreenButton = styled.button`
    ${tw`text-white py-3 px-16 rounded-lg`}
    transition: transform 0.3s ease;
    background: #0ABD19;
    font-size: 16px;
    border: none;

    &:hover {
        transform: scale(1.1);
    }
`;

const TransparentButton = styled.button`
    ${tw`border-2 border-gray-300 text-gray-600 py-3 px-16 rounded-lg`}
    background-color: transparent;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    font-size: 16px;

    &:hover {
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
`;

const fadeOutPlaceholder = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;


const AdmissionDate = styled.input`
    ${tw`rounded-lg p-3 text-gray-700`};
    border: 1px solid #d3d3d3;
    background-color: #fff;
    font-size: 16px;
    width: 100%; /* Растянуть инпут на весь контейнер */
    transition: all 0.3s ease;

    &:focus {
        border-color: #0ABD19;
        box-shadow: 0 0 6px rgba(10, 189, 25, 0.5);
        outline: none;
    }

    &::placeholder {
        color: #b0b0b0;
        font-style: italic;
    }
`;
const FormProcessing = ({parcelData, onUpdateParcelData}) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formData, setFormData] = useState(parcelData);
    const [hasService, setHasService] = useState(false);
    const db = getFirestore();

    const navigate = useNavigate();
    useEffect(() => {
        const savedFormData = JSON.parse(sessionStorage.getItem("formData"));
        const savedFiles = JSON.parse(sessionStorage.getItem("selectedFiles"));

        if (savedFormData) setFormData(savedFormData);
        if (savedFiles) setSelectedFiles(savedFiles);
    }, []);

    useEffect(() => {
        sessionStorage.setItem("formData", JSON.stringify(formData));
        sessionStorage.setItem("selectedFiles", JSON.stringify(selectedFiles));
    }, [formData, selectedFiles]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.removeItem("formData");
            sessionStorage.removeItem("selectedFiles");
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const {width, length, height} = formData;
        if (width && length && height) {
            const volumetricWeight = (width * length * height) / 5000;
            setFormData((prev) => ({...prev, volumetricWeight}));
        }
    }, [formData.width, formData.length, formData.height]);

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        const inputValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: inputValue,
        }));

        if (onUpdateParcelData) {
            onUpdateParcelData({
                ...formData,
                [name]: inputValue,
            });
        }
    };




    const handleAttachPhotoClick = () => {
        fileInputRef.current.value = ""; // Сбрасываем значение инпута
        fileInputRef.current.click();
    };


    const handleFileChange = async (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        try {
            const parcelCollectionRef = collection(db, "parcels");
            const q = query(parcelCollectionRef, where("trackingNumber", "==", formData.trackingNumber));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("Ошибка: документ с указанным Tracking ID не найден!");
                return;
            }

            const parcelDocRef = querySnapshot.docs[0].ref;
            const parcelDocSnapshot = await getDoc(parcelDocRef);
            const existingFiles = parcelDocSnapshot.data().files || []; // Берем текущие файлы из Firestore

            // Преобразуем файлы в Base64 и сохраняем
            const fileUploadPromises = Array.from(files).map(async (file) => {
                const reader = new FileReader();
                return new Promise((resolve, reject) => {
                    reader.onload = (e) => resolve({ name: file.name, url: e.target.result }); // Base64 в поле `url`
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            const newFiles = await Promise.all(fileUploadPromises);
            const updatedFiles = [...existingFiles, ...newFiles];

            // Обновляем Firestore
            await updateDoc(parcelDocRef, { files: updatedFiles });

            alert("Файлы успешно загружены!");
        } catch (error) {
            console.error("Ошибка обновления файлов:", error);
            alert("Произошла ошибка при загрузке файлов.");
        }
    };

    const handleFileRemove = async (indexToRemove) => {
        try {
            const parcelCollectionRef = collection(db, "parcels");
            const q = query(parcelCollectionRef, where("trackingNumber", "==", formData.trackingNumber));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("Ошибка: документ с указанным Tracking ID не найден!");
                return;
            }

            const parcelDocRef = querySnapshot.docs[0].ref;
            const parcelDocSnapshot = await getDoc(parcelDocRef);
            const existingFiles = parcelDocSnapshot.data().files || [];

            // Удаляем файл локально и в Firestore
            const updatedFiles = existingFiles.filter((_, index) => index !== indexToRemove);
            await updateDoc(parcelDocRef, { files: updatedFiles });

            // Обновляем локальное состояние
            setSelectedFiles(updatedFiles);
            console.log("Файл успешно удален!");
        } catch (error) {
            console.error("Ошибка удаления файла:", error);
        }
    };







    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const parcelsCollection = collection(db, "parcels");
            const q = query(parcelsCollection, where("trackingNumber", "==", formData.trackingNumber));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("Ошибка: документ с указанным Tracking ID не найден!");
                return;
            }

            const parcelDocRef = querySnapshot.docs[0].ref;

            // Получаем текущие файлы из Firestore
            const parcelDoc = await getDoc(parcelDocRef);
            const existingFiles = parcelDoc.data().attachedFiles || []; // Берем существующие файлы

            // Добавляем новые файлы только из локального состояния (без Storage)
            const updatedFiles = [
                ...existingFiles,
                ...selectedFiles.map((file) => ({ name: file.name, content: file.content })),
            ];

            // Обновляем данные в Firestore
            const updatedData = {
                ...formData,
                attachedFiles: updatedFiles, // Добавляем новые файлы из состояния
                status: formData.isDamaged ? "Обработана, повреждена" : "Обработана",
            };

            await updateDoc(parcelDocRef, updatedData);

            // Очищаем sessionStorage
            sessionStorage.removeItem("formData");
            sessionStorage.removeItem("selectedFiles");

            alert("Данные успешно сохранены!");
            navigate("/ProccessingParcels"); // Перенаправляем пользователя
        } catch (error) {
            console.error("Ошибка при сохранении данных:", error);
            alert("Произошла ошибка при сохранении данных.");
        }
    };


    useEffect(() => {
        const checkServiceAvailability = async () => {
            if (!formData?.trackingNumber) return; // Если Tracking ID отсутствует, выход

            try {
                const servicesCollection = collection(db, "applications"); // Укажите правильное название коллекции
                const q = query(servicesCollection, where("trackingNumber", "==", formData.trackingNumber));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Если услуга найдена
                    setHasService(true);
                } else {
                    setHasService(false);
                }
            } catch (error) {
                console.error("Ошибка при проверке наличия услуги:", error);
            }
        };

        checkServiceAvailability();
    }, [formData?.trackingNumber]); // Следим за изменениями Tracking ID


    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <InputContainer>
                    <Label>Tracking ID</Label>
                    <Input
                        type="text"
                        name="trackingNumber"
                        placeholder="Tracking ID"
                        value={formData?.trackingNumber || ''}
                        onChange={handleInputChange}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>ID клиента</Label>
                    <Select
                        name="userId"
                        value={formData?.userId || ''}
                        onChange={handleInputChange}
                    >
                        <option value={formData?.userId}>{formData?.userId}</option>
                    </Select>
                </InputContainer>
                <InputContainer>
                    <Label>Shelf number</Label>
                    <Input
                        type="text"
                        name="shelfNumber"
                        placeholder="Shelf number"
                        value={formData?.shelfNumber || ''}
                        onChange={handleInputChange}
                    />
                </InputContainer>
            </Row>

            <Row>
                <InputContainer>
                    <Label>Магазин</Label>
                    <Input
                        type="text"
                        name="storeName"
                        placeholder="Магазин"
                        value={formData?.storeName || ''}
                        onChange={handleInputChange}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Вес фактический (фунт)</Label>
                    <Input
                        type="number"
                        name="actualWeight"
                        placeholder="Вес фактический"
                        value={formData?.actualWeight || ''}
                        onChange={handleInputChange}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Ширина (дюйм)</Label>
                    <Input
                        type="number"
                        name="width"
                        placeholder="Ширина"
                        value={formData?.width || ''}
                        onChange={handleInputChange}
                    />
                </InputContainer>
            </Row>

            <Row>
                <InputContainer>
                    <Label>Длина (дюйм)</Label>
                    <Input
                        type="number"
                        name="length"
                        placeholder="Длина"
                        value={formData?.length || ''}
                        onChange={handleInputChange}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Высота (дюйм)</Label>
                    <Input
                        type="number"
                        name="height"
                        placeholder="Высота"
                        value={formData?.height || ''}
                        onChange={handleInputChange}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Объемный вес</Label>
                    <Input
                        type="number"
                        name="volumetricWeight"
                        placeholder="Объемный вес"
                        value={formData?.volumetricWeight || ''}
                        readOnly
                    />
                </InputContainer>
            </Row>

            <InputContainer>
                <Label>Дата приема</Label>
                <AdmissionDate
                    type="text"
                    name="dateReceived"
                    placeholder="Дата приема"
                    value={formData?.dateReceived || ''}
                    onChange={handleInputChange}
                />
            </InputContainer>

            <InputContainer>
                <Label>Комментарий оператора</Label>
                <TextArea
                    name="comment"
                    placeholder="Укажите комментарий"
                    value={formData?.comment || ''}
                    onChange={handleInputChange}
                />
                {hasService ? (
                    <>
                        <AttachPhotoContainer>
                            <img src={FaPaperclip} alt="Clip Icon"/>
                            <AttachPhotoText onClick={handleAttachPhotoClick}>
                                Прикрепить фото
                            </AttachPhotoText>
                            <HiddenFileInput
                                type="file"
                                ref={fileInputRef}
                                multiple
                                onChange={handleFileChange}
                                accept=".png,.jpg,.jpeg,.gif,.pdf"
                            />
                        </AttachPhotoContainer>
                        <AttachPhotoDescription>
                            Для удаления фото - нажмите на него
                        </AttachPhotoDescription>
                        <FilePreviewRow>
                            {selectedFiles.map((file, index) => (
                                <FilePreviewContainer key={index} onClick={() => handleFileRemove(index)}>
                                    <img
                                        src={file.content} // Отображаем фото из Base64
                                        alt={file.name}
                                        style={{ width: "50px", height: "50px", marginRight: "8px" }}
                                    />
                                    <FileName>{file.name}</FileName>
                                </FilePreviewContainer>
                            ))}
                        </FilePreviewRow>


                    </>
                ) : (
                    <p>Для этой посылки услуга не найдена.</p>
                )}

                <StatusContainer>
                    <BiggerLabel>Status</BiggerLabel>
                    <CheckboxLabel>
                        <Checkbox
                            name="isDamaged"
                            checked={formData?.isDamaged || false}
                            onChange={(e) => setFormData({...formData, isDamaged: e.target.checked})}
                        />
                        Повреждена
                    </CheckboxLabel>
                </StatusContainer>
            </InputContainer>

            <ButtonContainer>
                <GreenButton type="submit">Сохранить</GreenButton>
                <TransparentButton type="reset">Сбросить</TransparentButton>
            </ButtonContainer>
        </Form>
    );
};

export default FormProcessing;