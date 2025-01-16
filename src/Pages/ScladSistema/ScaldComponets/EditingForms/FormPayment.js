import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
    ${tw`max-h-screen`}
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    ${tw`flex flex-col lg:flex-row`}
    flex-grow: 1;
`;

const Content = styled.div`
    ${tw`flex-grow p-8`}
    display: flex;
    flex-direction: column;
`;

const Heading = styled.h1`
    ${tw`text-green-500 font-semibold text-xl`}
`;

const Divider = styled.div`
    ${tw`bg-gray-300`}
    height: 1px;
    width: 100%;
    margin: 20px 0;
`;

const LabelsContainer = styled.div`
    ${tw`grid grid-cols-6 gap-0 p-3`}
 
`;

const DataGrid = styled.div`
    ${tw`grid grid-cols-6 gap-0 bg-white p-3 rounded-md`}
    margin-top: 0px;
   
`;

const DataCell = styled.div`
    ${tw`p-2`}
    border: 1px solid #d3d3d3;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding-left: 29px;
    height: 30px;
`;

const CellLabel = styled.span`
    ${tw`font-semibold text-sm text-gray-800`}
`;

const TotalRow = styled.div`
    ${tw`flex items-center py-2 mt-4`}
`;

const TotalLabel = styled.span`
    ${tw`ml-4 text-sm text-gray-800`}
    color: #0ABD19;
`;

const TotalValue = styled.span`
    ${tw`text-sm ml-2`}
    color: #0ABD19;
`;

const FormPayment = () => {
    const paymentData = {
        productCost: '$ (0 ₸)',
        customsDuty: '0 $ (₸)',
        insurance: '0 $ (₸)',
        services: '0 $ (₸)',
        deliveryInRussia: '0 $ (₸)',
        deliveryFromUSA: '0 $ (₸)',
    };

    const totalDeliveryCost = '0 $ (₸)';

    return (
        <Container>
            <MainContent>
                <Content>
                    <LabelsContainer>
                        <CellLabel>Стоимость товаров</CellLabel>
                        <CellLabel>Таможенная пошлина</CellLabel>
                        <CellLabel>Страхование</CellLabel>
                        <CellLabel>Услуги</CellLabel>
                        <CellLabel>Доставка внутри КЗ</CellLabel>
                        <CellLabel>Доставка из США</CellLabel>
                    </LabelsContainer>
                    <DataGrid>
                        <DataCell>{paymentData.productCost}</DataCell>
                        <DataCell>{paymentData.customsDuty}</DataCell>
                        <DataCell>{paymentData.insurance}</DataCell>
                        <DataCell>{paymentData.services}</DataCell>
                        <DataCell>{paymentData.deliveryInRussia}</DataCell>
                        <DataCell>{paymentData.deliveryFromUSA}</DataCell>
                    </DataGrid>
                    <TotalRow>
                        <TotalLabel>Общая стоимость доставки:</TotalLabel>
                        <TotalValue>{totalDeliveryCost}</TotalValue>
                    </TotalRow>
                </Content>
            </MainContent>
        </Container>
    );
};

export default FormPayment;
