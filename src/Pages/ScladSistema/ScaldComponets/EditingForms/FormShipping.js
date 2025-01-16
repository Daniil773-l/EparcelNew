import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const ShippingTable = styled.div`
    ${tw`w-full mt-4`}
`;

const TableHeaderRow = styled.div`
    ${tw`flex justify-between items-center py-2 border-b border-gray-200`}
`;

const TableRow = styled.div`
    ${tw`flex justify-between items-center py-2 border-b border-gray-200`}
    
`;

const TableCell = styled.div`
    ${tw`text-sm text-gray-600`}
    width: ${(props) => props.width || 'auto'};
    text-align: left;
    border-bottom: 1px solid #e5e7eb; /* Добавлено для нижней линии */
    padding-bottom: 15px;
    
    a {
        text-decoration: none;
        color: #0ABD19;
    }
`;



const FormShipping = () => {
    const shippingData = [
        {
            number: '№ saferoute',
            type: 'Тип',
            cost: '₽',
            address: '…',
            palletId: '',
            shippingId: '',
            shippingDate: '',
            status: '',
        },
    ];

    return (
        <ShippingTable>
            <TableHeaderRow>
                <TableCell width="10%">Исходящий трек</TableCell>
                <TableCell width="10%">Способ доставки</TableCell>
                <TableCell width="10%">Стоимость доставки</TableCell>
                <TableCell width="20%">Адрес доставки</TableCell>
                <TableCell width="10%">Номер паллета</TableCell>
                <TableCell width="15%">Shipping ID</TableCell>
                <TableCell width="10%">Дата отправки</TableCell>
                <TableCell width="15%">Статус</TableCell>
            </TableHeaderRow>
            {shippingData.map((data, index) => (
                <TableRow key={index}>
                    <TableCell width="10%">{data.number}</TableCell>
                    <TableCell width="10%">{data.type}</TableCell>
                    <TableCell width="10%">{data.cost}</TableCell>
                    <TableCell width="20%">{data.address}</TableCell>
                    <TableCell width="10%">{data.palletId}</TableCell>
                    <TableCell width="15%">{data.shippingId}</TableCell>
                    <TableCell width="10%">{data.shippingDate}</TableCell>
                    <TableCell width="15%">{data.status}</TableCell>
                </TableRow>
            ))}
        </ShippingTable>
    );
};

export default FormShipping;