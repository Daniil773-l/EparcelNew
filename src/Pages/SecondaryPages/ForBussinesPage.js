import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header from "../../components/headers/MainHeader";
import Footer from "../../components/footers/MainFooterWithLinks";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import DressRoom from "../../images/img/Для бизнеса. КЗ.png";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-2xl mx-auto py-8 lg:py-12`; // Увеличил max-w до 2xl
const HeadingColumn = tw.div`text-left max-w-full mx-auto`; // Увеличил max-w до 5xl

const GreenLink = styled.p`
    color: #0ABD19;
    text-decoration: none;
    font-weight: bold;
`;

const HeadingDescription = styled.p`
    ${tw`font-bold`}
    font-size: 18px;
    line-height: 28px;
    
    font-weight: normal;
    text-align: left;
    margin: 0;

    @media (min-width: 768px) {
        font-size: 20px;
        line-height: 30px;
    }
`;

const Break = styled.div`
    ${tw`my-4`}
`;

export default () => {
    return (
        <>
            <AnimationRevealPage>
                <Header
                    heading="Для бизнеса"
                    paragraph="Мы рады предложить нашим клиентам-юридическим лицам возможность воспользоваться услугами Eparcel."
                    imageSrc={DressRoom}
                    roundedHeaderButton={false}
                />
                <Container>
                    <Content>
                        <HeadingColumn>
                            <HeadingDescription>
                                Если Вы занимаетесь бизнесом и хотите купить товары из США или Турции для своей деятельности, то мы поможем Вам с этим. Мы предоставляем услуги по выкупу товаров, их доставке и таможенному оформлению. Вам не нужно будет тратить время на поиск надежных поставщиков и заниматься таможенными процедурами.
                                <Break />
                                Наши клиенты могут рассчитывать на выгодные условия сотрудничества. Мы гарантируем быструю и надежную доставку товаров и возможность получить нужные товары из-за границы без лишних затрат времени и средств. Обратившись к нам, Вы можете быть уверены в качестве услуг и безопасности Вашего груза. <GreenLink >Свяжитесь с нами по телефону или напишите нам на почту!</GreenLink>
                            </HeadingDescription>
                        </HeadingColumn>
                    </Content>
                </Container>
                <Footer />
            </AnimationRevealPage>
        </>
    );
};
