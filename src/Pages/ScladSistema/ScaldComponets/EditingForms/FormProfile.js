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
    ${tw` text-xl`}
    color: #2D2D2D;
`;

const LabelsContainer = styled.div`
    ${tw`grid grid-cols-5 gap-0 p-4`}
`;

const DataGrid = styled.div`
    ${tw`grid grid-cols-5 gap-0 bg-white p-4 rounded-md`}
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

const FormProfile = ({ profile }) => {
    if (!profile) {
        return <p>Профиль пользователя не найден.</p>;
    }

    return (
        <Container>
            <MainContent>
                <Content>
                    <Heading>Информация о пользователе:</Heading>
                    <LabelsContainer>
                        <CellLabel style={{ gridColumn: 'span 1' }}>ID клиента</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 1' }}>Кабинет</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 1' }}>Имя и фамилия</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 1' }}>Email</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 1' }}>Телефон</CellLabel>
                    </LabelsContainer>
                    <DataGrid>
                        <DataCell style={{ gridColumn: 'span 1' }}>{profile.userId}</DataCell>
                        <DataCell style={{ gridColumn: 'span 1' }}>{profile.cabinetName}</DataCell>
                        <DataCell style={{ gridColumn: 'span 1' }}>{profile.firstName} {profile.lastName}</DataCell>
                        <DataCell style={{ gridColumn: 'span 1' }}>{profile.email}</DataCell>
                        <DataCell style={{ gridColumn: 'span 1' }}>{profile.phone}</DataCell>
                    </DataGrid>
                </Content>
            </MainContent>
        </Container>
    );
};

export default FormProfile;
