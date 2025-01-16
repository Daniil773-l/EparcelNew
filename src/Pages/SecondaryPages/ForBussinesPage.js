import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header from '../../components/headers/MainHeader';
import Footer from "../../components/footers/MainFooterWithLinks";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import DressRoom from "../../images/img/Для бизнеса. КЗ.png";

const Container = tw.div`relative `;
const Content = tw.div`max-w-screen-xl mx-auto py-12 lg:py-16`; // Уменьшенные отступы
const HeadingColumn = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;



const GreenLink = styled.a`
  ${tw``} // Зеленый цвет
  text-decoration: none;
color:  #0ABD19;
    font: bold;
`;

const HeadingDescription = styled.p`
    ${tw`my-5 md:text-5xl lg:my-8 text-base text-black xl:text-xl`}
    font-size: 18px; // Decrease the font size
    line-height: 28px; // Adjust the line height
    color: #2D2D2D;
    font-family: 'Gilroy Medium', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    // Set the font family, ensure a fallback
    font-weight: normal; // Regular text less bold than HighlightedText
    max-width: 80%; // Restrict the width to make the text block more stretched horizontally
    margin: 0 auto; // Center the text block

    @media(min-width: 768px) {
        font-size: 20px; // Adjust the font size for larger screens
        line-height: 30px; // Adjust the line height for larger screens
        max-width: 70%; // Further restrict the width for larger screens
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
                                Если Вы занимаетесь бизнесом и хотите купить товары из США или Турции для своей деятельности, то мы поможем Вам с <br/>
                                этим. Мы предоставляем услуги по выкупу товаров, их доставке и таможенному оформлению. Вам не нужно будет тратить <br/>
                                время на поиск надежных поставщиков и заниматься таможенными процедурами. <br/> <br/>
                                <Break />

                                Наши клиенты могут рассчитывать на выгодные условия сотрудничества. Мы гарантируем быструю и надежную доставку <br/>
                                товаров и возможность получить нужные товары из-за границы без лишних затрат времени и средств. Обратившись к <br/>
                                нам, Вы можете быть уверены в качестве услуг и безопасности Вашего груза.  <GreenLink href="https://eparcel-logistics.ru/">Начните работать с нами в один клик!!!</GreenLink>
                            </HeadingDescription>
                        </HeadingColumn>
                    </Content>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>

    );
};
