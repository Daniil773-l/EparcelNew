import React from "react";
import tw from "twin.macro";
import styled ,{ css }  from "styled-components";

import { SectionHeading } from "../misc/Headings.js";
import { Container, ContentWithPaddingXl } from "../misc/Layouts.js";

import PBZSvg from "../../images/img/PBZ.svg"; // Импортируем SVG-файл

const HeaderContainer = tw.div`mt-10 w-full flex flex-col items-center`;
const Heading = tw(SectionHeading)`w-full `;
const PlansContainer = styled.div`
    ${tw`flex justify-between flex-col lg:flex-row items-center lg:items-stretch relative`}
    margin-bottom: 70px; /* Добавление большего нижнего отступа */
`;


const Plan = styled.div`
    ${tw`w-full max-w-sm mt-16 lg:mr-8 lg:last:mr-0 text-center px-8 rounded-lg shadow relative pt-2 text-gray-900 bg-white flex flex-col`}
    ${props =>
    css`
      background: #FFFFFF; // White background
      ${tw`text-black`} // Black text color
    `}
`;

const PlanHeader = styled.div`
    ${tw`flex flex-col uppercase leading-relaxed `}
    .name {
        ${tw`font-bold text-xl`}
    }
    .price {
        ${tw`font-bold text-4xl sm:text-5xl my-1`}
    }
    .duration {
        ${tw`text-gray-500 font-bold tracking-widest`}
    }
`;

const PlanFeatures = styled.div`
    ${tw`flex flex-col -mx-8 px-8 py-8 border-t-2 border-b-2 flex-1 text-lg`}
    .feature {
        ${tw`mt-2 first:mt-0 font-medium`} // Reduced vertical spacing
        ${tw`text-gray-600`} // Darker text for features
    }
    .mainFeature {
        ${tw`text-gray-500 font-bold tracking-widest`}
    }
`;


const IconWrapper = styled.div`
    ${tw`p-4 rounded-full flex items-center justify-center`}
    img {
        width: 200px; // Larger image
        height: 200px; // Larger image
    }
`;

export default ({ heading = "Flexible Plans.", plans = null }) => {
    const defaultPlans = [
        {
            name: "Personal",
            price: "$17.99",
            duration: "Monthly",
            mainFeature: "Suited for Personal Blogs",
            icon: PBZSvg,
        },
        {
            name: "Business",
            price: "$37.99",
            duration: "Monthly",
            mainFeature: "Suited for Production Websites",
            featured: true,
        },
        {
            name: "Enterprise",
            price: "$57.99",
            duration: "Monthly",
            mainFeature: "Suited for Big Companies",
        },
    ];

    if (!plans) plans = defaultPlans;

    return (
        <Container>
            <ContentWithPaddingXl>
                <HeaderContainer>
                    <Heading>{heading}</Heading>
                </HeaderContainer>
                <PlansContainer>
                    {plans.map((plan, index) => (
                        <Plan key={index}>
                            <IconWrapper>
                                <img src={plan.icon} alt={plan.name} />
                            </IconWrapper>
                            <PlanHeader>
                                <span className="name">{plan.name}</span>
                            </PlanHeader>
                            <PlanFeatures>
                                <span className="feature mainFeature">{plan.mainFeature}</span>
                            </PlanFeatures>
                        </Plan>
                    ))}

                </PlansContainer>
            </ContentWithPaddingXl>
        </Container>
    );
};
