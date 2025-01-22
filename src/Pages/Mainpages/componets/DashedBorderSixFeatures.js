import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import defaultCardImage from "../../../images/icon/shield-icon.svg";


import BabyAspen from "../componets/BrandsIcon/Babyaspen.svg";
import Boba from "../componets/BrandsIcon/boba.svg";
import BYNX from "../componets/BrandsIcon/BYNXYb.svg";
import Carters from "../componets/BrandsIcon/Carters.svg";
import Cooksk from "../componets/BrandsIcon/Cooksk.svg";
import Cottonon from "../componets/BrandsIcon/Cottonon.svg";
import Disney from "../componets/BrandsIcon/Disney.svg";
import FatBrain from "../componets/BrandsIcon/FatBrain.svg";
import GapKids from "../componets/BrandsIcon/GapKids.svg";
import Gymboree from "../componets/BrandsIcon/Gymboree.svg";
import Lego from "../componets/BrandsIcon/Lego.svg";
import Lovevery from "../componets/BrandsIcon/Lovevery.svg";
import OshKosh from "../componets/BrandsIcon/OshKosh.svg";
import Children from "../componets/BrandsIcon/ChildrePlace.svg";
import ToysR from "../componets/BrandsIcon/ToysR.svg";
import Zulil from "../componets/BrandsIcon/Zulil.svg";
import BodyBuild from "../componets/BrandsIcon/Bodtbuld.svg";
import CVS from "../componets/BrandsIcon/CVS.svg";
import Terrara from "../componets/BrandsIcon/Terrara.svg";
import GNS from "../componets/BrandsIcon/GNS.svg";
import iHerb from "../componets/BrandsIcon/iHerb.svg";
import LuckyVitamin from "../componets/BrandsIcon/LuckyVitamin.svg";
import RiteAid from "../componets/BrandsIcon/RiteAid.svg";
import Swanson from "../componets/BrandsIcon/Swanson.svg";
import ThriveMarket from "../componets/BrandsIcon/ThriveMarket.svg";
import VitaminShoppe from "../componets/BrandsIcon/VitaminShoppe.svg";
import Walgreens from "../componets/BrandsIcon/Walgreens.svg";
import Bark from "../componets/BrandsIcon/Bark.svg";
import Chewy from "../componets/BrandsIcon/Chewy.svg";
import Petco from "../componets/BrandsIcon/Petco.svg";
import PetSmart from "../componets/BrandsIcon/PetSmart.svg";
import ABH from "../componets/BrandsIcon/ABH.svg";
import ArmaniBeauty from "../componets/BrandsIcon/ArmaniBeauty.svg";
import BathandBodyWorks from "../componets/BrandsIcon/BathandBodyWorks.svg";
import Beautylish from "../componets/BrandsIcon/Beautylish.svg";
import BobbyBrown from "../componets/BrandsIcon/BobbyBrown.svg";
import CharlotteTilbury from "../componets/BrandsIcon/CharlotteTilbury.svg";
import ColorPOP from "../componets/BrandsIcon/ColorPOP.svg";
import DermStore from "../componets/BrandsIcon/DermStore.svg";
import Ecosmetics from "../componets/BrandsIcon/Ecosmetics.svg";
import EstéeLauder from "../componets/BrandsIcon/EstéeLauder.svg";
import MAC from "../componets/BrandsIcon/MAC.svg";
import Morphe from "../componets/BrandsIcon/Morphe.svg";
import Sephora from "../componets/BrandsIcon/Sephora.svg";
import SkinStore from "../componets/BrandsIcon/SkinStore.svg";
import Tarte from "../componets/BrandsIcon/Tarte.svg";
import Thebodyshop from "../componets/BrandsIcon/Thebodyshop.svg";
import TomFord from "../componets/BrandsIcon/TomFord.svg";
import TooFaced from "../componets/BrandsIcon/TooFaced.svg";
import Ulta from "../componets/BrandsIcon/Ulta.svg";
import Amazon from "../componets/BrandsIcon/Amazon.svg";
import Newegg from "../componets/BrandsIcon/Newegg.svg";
import Overstock from "../componets/BrandsIcon/Overstock.svg";
import TheHomeDepot from "../componets/BrandsIcon/TheHomeDepot.svg";
import Ebay from "../componets/BrandsIcon/Ebay.svg";
import ETSY from "../componets/BrandsIcon/ETSY.svg";
import Kohls from "../componets/BrandsIcon/Kohls.svg";
import Mercari from "../componets/BrandsIcon/Mercari.svg";
import Target from "../componets/BrandsIcon/Target.svg";
import Walmart from "../componets/BrandsIcon/Walmart.svg";
import sixpm from "../componets/BrandsIcon/sixpm.svg";
import Abercrombie from "../componets/BrandsIcon/Abercrombie.svg"
import Adidas from "../componets/BrandsIcon/Adidas.svg"
import Aeropostale from "../componets/BrandsIcon/Aeropostale.svg"
import AldoShoes from "../componets/BrandsIcon/AldoShoes.svg"
import AmericanEagle from "../componets/BrandsIcon/American Eagle.svg"
import ASOS from "../componets/BrandsIcon/ASOS.svg"
import Cabelas from "../componets/BrandsIcon/Cabelas.svg"
import COACH from "../componets/BrandsIcon/COACH.svg"
import Crocs from "../componets/BrandsIcon/Crocs.svg"
import DSW from "../componets/BrandsIcon/DSW.svg"
import EddieBauer from "../componets/BrandsIcon/EddieBauer.svg"
import Fashionnova from "../componets/BrandsIcon/Fashionnova.svg"
import FootLocker from "../componets/BrandsIcon/FootLocker.svg"
import Forever21 from "../componets/BrandsIcon/Forever21.svg"
import Gap from "../componets/BrandsIcon/Gap.svg"
import HM from "../componets/BrandsIcon/HM.svg"
import JCPenney from "../componets/BrandsIcon/JCPenney.svg"
import Levis from "../componets/BrandsIcon/Levis.svg"
import MassimoDutti from "../componets/BrandsIcon/MassimoDutti.svg"
import MichaelKors from "../componets/BrandsIcon/MichaelKors.svg"
import MissGuided from "../componets/BrandsIcon/MissGuided.svg"
import NewBalance from "../componets/BrandsIcon/NewBalance.svg"
import Nike from "../componets/BrandsIcon/Nike.svg"
import Nordstrom from "../componets/BrandsIcon/Nordstrom.svg"
import OldNavy from "../componets/BrandsIcon/OldNavy.svg"
import RalphLauren from "../componets/BrandsIcon/RalphLauren.svg"
import Reebok from "../componets/BrandsIcon/Reebok.svg"
import Sketchers from "../componets/BrandsIcon/Sketchers.svg"
import SteveMadden from "../componets/BrandsIcon/SteveMadden.svg"
import TheNorthFace from "../componets/BrandsIcon/TheNorthFace.svg"
import Timberland from "../componets/BrandsIcon/Timberland.svg"
import TommyHilfiger from "../componets/BrandsIcon/TommyHilfiger.svg"
import UGG from "../componets/BrandsIcon/UGG.svg"
import UnderArmour from "../componets/BrandsIcon/UnderArmour.svg"
import Vans from "../componets/BrandsIcon/Vans.svg"
import VictoriasSecret from "../componets/BrandsIcon/VictoriasSecret.svg"
import Zappos from "../componets/BrandsIcon/Zappos.svg"
import Zara from "../componets/BrandsIcon/Zara.svg"
import ACADEMY from "../componets/BrandsIcon/ACADEMY.svg"
import ALOYoga from "../componets/BrandsIcon/ALOYoga.svg"
import DICKSSportingGoods from "../componets/BrandsIcon/DICKSSportingGoods.svg"
import EVO from "../componets/BrandsIcon/EVO.svg"
import GymShark from "../componets/BrandsIcon/GymShark.svg"
import JOANN from "../componets/BrandsIcon/JOANN.svg"
import LULULEMON from "../componets/BrandsIcon/LULULEMON.svg"
import Michaels from "../componets/BrandsIcon/Michaels.svg"
import SaveDollarStores from "../componets/BrandsIcon/SaveDollarStores.svg"
import SCHEELS from "../componets/BrandsIcon/SCHEELS.svg"
import Apple from "../componets/BrandsIcon/Apple.svg"
import BH from "../componets/BrandsIcon/BH.svg"
import BackMarket from "../componets/BrandsIcon/BackMarket.svg"
import BestBuy from "../componets/BrandsIcon/BestBuy.svg"
import DELL from "../componets/BrandsIcon/DELL.svg"
import IROBOT from "../componets/BrandsIcon/IROBOT.svg"
import Lenovo from "../componets/BrandsIcon/Lenovo.svg"
import Oculus from "../componets/BrandsIcon/Oculus.svg"
import Samsung from "../componets/BrandsIcon/Samsung.svg"
import TigerDirect from "../componets/BrandsIcon/TigerDirect.svg"
import Ebebek from "../componets/BrandsIcon/Ebebek.svg"
import Joker from "../componets/BrandsIcon/Joker.svg"
import Minycenter from "../componets/BrandsIcon/Minycenter.svg"
import Temel from "../componets/BrandsIcon/Temel.svg"
import ToyzzShop from "../componets/BrandsIcon/ToyzzShop.svg"
import Avansas from "../componets/BrandsIcon/Avansas.svg"
import Hepsiburada from "../componets/BrandsIcon/Hepsiburada.svg"
import Migros from "../componets/BrandsIcon/Migros.svg"
import n11 from "../componets/BrandsIcon/n11.svg"
import Avon from "../componets/BrandsIcon/Avon.svg"
import Boyner from "../componets/BrandsIcon/Boyner.svg"
import Brandroom from "../componets/BrandsIcon/Brandroom.svg"
import EtatPur from "../componets/BrandsIcon/EtatPur.svg"
import Eveshop from "../componets/BrandsIcon/Eveshop.svg"
import Flavus from "../componets/BrandsIcon/Flavus.svg"
import HaticeTeyze from "../componets/BrandsIcon/HaticeTeyze.svg"
import Kokoma from "../componets/BrandsIcon/Kokoma.svg"
import Naos from "../componets/BrandsIcon/Naos.svg"
import Oleamea from "../componets/BrandsIcon/Oleamea.svg"
import Sinoz from "../componets/BrandsIcon/Sinoz.svg"
import Tbrush from "../componets/BrandsIcon/Tbrush.svg"
import A101 from "../componets/BrandsIcon/A101.svg"
import aZall from "../componets/BrandsIcon/aZall.svg"
import Beymen from "../componets/BrandsIcon/Beymen.svg"
import Bpazar from "../componets/BrandsIcon/Bpazar.svg"
import CarrefourSA from "../componets/BrandsIcon/CarrefourSA.svg"
import ExxeSelection from "../componets/BrandsIcon/ExxeSelection.svg"
import Gratis from "../componets/BrandsIcon/Gratis.svg"
import Happy from "../componets/BrandsIcon/Happy.svg"
import Morhipo from "../componets/BrandsIcon/Morhipo.svg"
import PttAVM from "../componets/BrandsIcon/PttAVM.svg"
import Trendyol from "../componets/BrandsIcon/Trendyol.svg"
import Addax from "../componets/BrandsIcon/Addax.svg"
import Aker from "../componets/BrandsIcon/Aker.svg"
import Aris from "../componets/BrandsIcon/Aris.svg"
import Armine from "../componets/BrandsIcon/Armine.svg"
import Asics from "../componets/BrandsIcon/Asics.svg"
import Avva from "../componets/BrandsIcon/Avva.svg"
import AyakkabıDünyası from "../componets/BrandsIcon/AyakkabıDünyası.svg"
import Bershka from "../componets/BrandsIcon/Bershka.svg"
import Blackspade from "../componets/BrandsIcon/Blackspade.svg"
import BSL from "../componets/BrandsIcon/BSL.svg"
import Cacharel from "../componets/BrandsIcon/Cacharel.svg"
import Camper from "../componets/BrandsIcon/Camper.svg"
import Colins from "../componets/BrandsIcon/Colins.svg"
import Columbia from "../componets/BrandsIcon//Columbia.svg"
import ÇorapSepeti from "../componets/BrandsIcon/ÇorapSepeti.svg"
import ÇorapToptancisi from "../componets/BrandsIcon/ÇorapToptancisi.svg"
import DSdamat from "../componets/BrandsIcon/DSdamat.svg"
import Desa from "../componets/BrandsIcon/Desa.svg"
import Dilvin from "../componets/BrandsIcon/Dilvin.svg"
import Divarese from "../componets/BrandsIcon/Divarese.svg"
import Elmoda from "../componets/BrandsIcon/Elmoda.svg"
import EmelPırlanta from "../componets/BrandsIcon/EmelPırlanta.svg"
import EylulAlyans from "../componets/BrandsIcon/EylulAlyans.svg"
import Farfetch from "../componets/BrandsIcon/Farfetch.svg"
import FashFed from "../componets/BrandsIcon/FashFed.svg"
import Fitmoda from "../componets/BrandsIcon/Fitmoda.svg"
import Fivescarf from "../componets/BrandsIcon/Fivescarf.svg"
import Gaptr from "../componets/BrandsIcon/Gaptr.svg"
import Glingerie from "../componets/BrandsIcon/Glingerie.svg"
import GSStore from "../componets/BrandsIcon/GSStore.svg"
import Gülaylar from "../componets/BrandsIcon/Gülaylar.svg"
import Hemington from "../componets/BrandsIcon/Hemington.svg"
import Hotic from "../componets/BrandsIcon/Hotic.svg"
import Hummel from "../componets/BrandsIcon/Hummel.svg"
import iLVi from "../componets/BrandsIcon/iLVi.svg"
import InterSport from "../componets/BrandsIcon/InterSport.svg"
import Korayspor from "../componets/BrandsIcon/Korayspor.svg"
import Koton from "../componets/BrandsIcon/Koton.svg"
import Kuaybegider from "../componets/BrandsIcon/Kuaybegider.svg"
import Levidor from "../componets/BrandsIcon/Levidor.svg"
import LizayPırlanta from "../componets/BrandsIcon/LizayPırlanta.svg"
import Lovemybody from "../componets/BrandsIcon/Lovemybody.svg"
import LTBjeans from "../componets/BrandsIcon/LTBjeans.svg"
import Markastok from "../componets/BrandsIcon/Markastok.svg"
import MarksSpencer from "../componets/BrandsIcon/MarksSpencer.svg"
import Mavi from "../componets/BrandsIcon/Mavi.svg"
import Modanisa from "../componets/BrandsIcon/Modanisa.svg"
import MoonSports from "../componets/BrandsIcon/MoonSports.svg"
import Mudo from "../componets/BrandsIcon/Mudo.svg"
import NetWork from "../componets/BrandsIcon/NetWork.svg"
import NevzatOnay from "../componets/BrandsIcon/NevzatOnay.svg"
import Occasion from "../componets/BrandsIcon/Occasion.svg"
import PierreCardin from "../componets/BrandsIcon/PierreCardin.svg"
import PırlantaMerkezim from "../componets/BrandsIcon/PırlantaMerkezim.svg"
import PlaySports from "../componets/BrandsIcon/PlaySports.svg"
import Pomidik from "../componets/BrandsIcon/Pomidik.svg"
import PullBear from "../componets/BrandsIcon/PullBear.svg"
import Puma from "../componets/BrandsIcon/Puma.svg"
import SaatSaat from "../componets/BrandsIcon/SaatSaat.svg"
import SilkandCashmere from "../componets/BrandsIcon/SilkandCashmere.svg"
import Skechers from "../componets/BrandsIcon/Skechers.svg"
import Slazenger from "../componets/BrandsIcon/Slazenger.svg"
import SneaksCloud from "../componets/BrandsIcon/SneaksCloud.svg"
import Sporjinal from "../componets/BrandsIcon/Sporjinal.svg"
import Sporthink from "../componets/BrandsIcon/Sporthink.svg"
import Sportive from "../componets/BrandsIcon/Sportive.svg"
import Sportstyle from "../componets/BrandsIcon/Sportstyle.svg"
import SPX from "../componets/BrandsIcon/SPX.svg"
import Stradivarius from "../componets/BrandsIcon/Stradivarius.svg"
import SuperStep from "../componets/BrandsIcon/SuperStep.svg"
import Suwen from "../componets/BrandsIcon/Suwen.svg"
import Themoosebay from "../componets/BrandsIcon/Themoosebay.svg"
import TommyLife from "../componets/BrandsIcon/TommyLife.svg"
import TouchéPrivé from "../componets/BrandsIcon/TouchéPrivé.svg"
import Tudors from "../componets/BrandsIcon/Tudors.svg"
import USPoloASSN from "../componets/BrandsIcon/USPoloASSN.svg"
import UnitedColorsofBenetton from "../componets/BrandsIcon/UnitedColorsofBenetton.svg"
import Yalispor from "../componets/BrandsIcon/Yalispor.svg"
import Yargici from "../componets/BrandsIcon/Yargici.svg"
import Arçelik from "../componets/BrandsIcon/Arçelik.svg"
import Beko from "../componets/BrandsIcon/Beko.svg"
import Braunshop from "../componets/BrandsIcon/Braunshop.svg"
import Casper from "../componets/BrandsIcon/Casper.svg"
import Doremusic from "../componets/BrandsIcon/Doremusic.svg"
import Fakir from "../componets/BrandsIcon/Fakir.svg"
import KorkmazStore from "../componets/BrandsIcon/KorkmazStore.svg"
import MediaMarkt from "../componets/BrandsIcon/MediaMarkt.svg"
import Macys  from "../componets/BrandsIcon/Macys.svg"
import AAuto from "../componets/BrandsIcon/1alogo-w50-svg.svg"
import Advanceautoparts from "../componets/BrandsIcon/Advanceautoparts.jpeg"
import AutoZone from    "../componets/BrandsIcon/AutoZone.webp"
import  CAAutoParts from "../componets/BrandsIcon/CAAutoParts.png"
import PartsGeek from "../componets/BrandsIcon/partsgeek-logo@2x.png"
import RockAuto from "../componets/BrandsIcon/rock-auto.webp"
import TireRack from "../componets/BrandsIcon/tire-ruck.png"


const Container = tw.div`relative`;
const ThreeColumnContainer = styled.div`
    ${tw`grid gap-6 justify-center max-w-screen-xl mx-auto`}
    grid-template-columns: repeat(4, minmax(0, 1fr)); /* Ровно 4 карточки в ряд */
    margin-top: 10px;
    width: 100%;
    padding: 0 10px; /* Отступы по бокам */

    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr)); /* 3 карточки в ряд на средних экранах */
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2 карточки в ряд на маленьких экранах */
    }
    @media (max-width: 480px) {
        grid-template-columns: repeat(1, minmax(0, 1fr)); /* 1 карточка в ряд на очень маленьких экранах */
    }
`;

const Column = styled.div`
    ${tw`flex justify-center`}
    width: 100%;
`;
const Card = styled.a`
    ${tw`flex flex-col items-center px-3 py-3 w-full no-underline`}
    border: 2px dashed #0ABD19;
    ${tw`rounded-lg`}
    .imageContainer {
        ${tw`flex justify-center items-center w-full`}
        height: 160px;
        img {
            max-width: 160px;
            max-height: 160px;
        }
    }
    .textContainer {
        ${tw`mt-4 text-center w-full`}
    }
    .title {
        ${tw`font-bold text-xl leading-none text-black`}
        color: #243E63;
    }
    &:hover {
        text-decoration: none;
    }
`;



const transitionStyles = css`
  .fade-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .fade-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }
  .fade-exit {
    opacity: 1;
    transform: scale(1);
  }
  .fade-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;
const TransitionContainer = styled(TransitionGroup)`
  ${transitionStyles}
`;
const cardData = {
    "США": {
        "Детский мир": [
            {imageSrc: Boba, title: "Boba",url:"https://boba.com/"},
            {imageSrc: BabyAspen, title: "Baby Aspen",url:"https://www.babyaspen.com/"},
            {imageSrc: BYNX, title: "BYNXY baby",url:"https://binxybaby.com/"},
            {imageSrc: Carters, title: "Carter’s",url:"https://www.carters.com/"},
            {imageSrc: Cooksk, title: "Cookies Kids",url:"https://www.cookieskids.com/"},
            {imageSrc: Cottonon, title: "Cottonon",url: "https://cottonon.com/AU/"},
            {imageSrc: Disney, title: "Disney",url: "https://www.disneystore.com/"},
            {imageSrc: FatBrain, title: "Fat Brain Toys",url: "https://www.fatbraintoyco.com/"},
            {imageSrc: GapKids, title: "Gap Kids",url: "https://www.gap.com/browse/division.do?cid=6170"},
            {imageSrc: Gymboree, title: "Gymboree",url:"https://www.gymboree.com/us/home"},
            {imageSrc: Lego, title: "Lego US",url: "https://www.lego.com/en-us"},
            {imageSrc: Lovevery, title: "Lovevery",url: "https://lovevery.com/"},
            {imageSrc: OshKosh, title: "OshKosh",url: "https://www.carters.com/oshkosh"},
            {imageSrc: Children, title: "The Children Place",url:"https://www.childrensplace.com/us/home"},
            {imageSrc: ToysR, title: "Toys R us",url: "https://www.toysrus.com/"},
            {imageSrc: Zulil, title: "Zulil",url: "https://www.zulily.com/password"},
            // other cards
        ],
        "Здоровье": [
            {imageSrc: BodyBuild, title: "Bodybuilding",url:"https://shop.bodybuilding.com/"},
            {imageSrc: CVS, title: "CVS",url: "https://www.cvs.com/international.html"},
            {imageSrc: Terrara, title: "doTERRA",url: "https://www.doterra.com/US/en"},
            {imageSrc: GNS, title: "GNC",url: "https://www.gnc.com/"},
            {imageSrc: iHerb, title: "iHerb",url: "https://kz.iherb.com/"},
            {imageSrc: LuckyVitamin, title: "Lucky Vitamin",url: "https://www.fruitfulyield.com/brand/lucky-vitamin?redirectsrc=luckyvitamin.com"},
            {imageSrc: RiteAid, title: "Rite Aid",url: "https://www.riteaid.com/"},
            {imageSrc: Swanson, title: "Swanson",url: "https://swansoneurope.com/fr/"},
            {imageSrc: ThriveMarket, title: "Thrive Market",url: "https://www.thrivemarket.com/"},
            {imageSrc: VitaminShoppe, title: "Vitamin Shoppe",url: "https://www.vitaminshoppe.com/"},
            {imageSrc: Walgreens, title: "Walgreens",url: "https://walgreens.com/"},

            // other cards
        ],
        "Зоотовары": [
            {imageSrc: Bark, title: "Bark",url:"https://bark.com/"},
            {imageSrc: Chewy, title: "Chewy",url:"https://chewy.com"},
            {imageSrc: Petco, title: "Petco",url:"https://petco.com"},
            {imageSrc: PetSmart, title: "PetSmart",url:"http://www.petsmart.com/"},
        ],
        "Косметика и парфюмерия": [
            {imageSrc: ABH, title: "ABH",url: "https://www.anastasiabeverlyhills.com/"},
            {imageSrc: ArmaniBeauty, title: "Armani Beauty",url: "https://armanibeauty.com"},
            {imageSrc: BathandBodyWorks, title: "Bath and Body Works",url:"https://www.bathandbodyworks.com/"},
            {imageSrc: Beautylish, title: "Beautylish",url:"https://www.beautylish.com"},
            {imageSrc: BobbyBrown, title: "Bobby Brown",url:"https://m.bobbibrowncosmetics.com/"},
            {imageSrc: CharlotteTilbury, title: "Charlotte Tilbury",url:"https://charlotteTilbury.com"},
            {imageSrc: ColorPOP, title: "ColorPOP",url:"https://colourpop.com/"},
            {imageSrc: DermStore, title: "DermStore",url: "https://www.dermstore.com/"},
            {imageSrc: Ecosmetics, title: "Ecosmetics",url:"https://www.ecosmetics.com"},
            {imageSrc: EstéeLauder, title: "Estée Lauder",url: "https://www.esteelauder.com/"},
            {imageSrc: iHerb, title: "iHerb",url: "https://kz.iherb.com/"},
            {imageSrc: MAC, title: "MAC",url: "https://www.maccosmetics.com/"},
            {imageSrc: Morphe, title: "Morphe",url: "https://www.morphe.com/"},
            {imageSrc: Sephora, title: "Sephora",url: "https://sephora.com"},
            {imageSrc: SkinStore, title: "Skin Store",url: "https://www.skinstore.com/"},
            {imageSrc: Tarte, title: "Tarte",url: "https://tarte.com"},
            {imageSrc: Thebodyshop, title: "The body shop",url: "https://thebodyshop.com/"},
            {imageSrc: TomFord, title: "Tom Ford",url: "https://www.tomfordbeauty.com/"},
            {imageSrc: TooFaced, title: "Too Faced",url: "https://www.toofaced.com/"},
            {imageSrc: Ulta, title: "Ulta",url: "https://www.ulta.com"},
        ],
        "Магазины с оплатой криптовалютой": [
            {imageSrc: Amazon, title: "Amazon",url:"https://www.amazon.com/"},
            {imageSrc: Newegg, title: "Newegg",url:"https://newegg.com"},
            {imageSrc: Overstock, title: "Overstock",url:"https://overstock.com"},
            {imageSrc: TheHomeDepot, title: "The Home Depot",url:"https://theHomeDepot.com"},
        ],
        "Маркетплейсы": [
            {imageSrc: Ebay, title: "Ebay",url:"https://www.ebay.com/"},
            {imageSrc: ETSY, title: "ETSY",url:"https://www.etsy.com/"},
            {imageSrc: Kohls, title: "Kohl’s",url:"https://kohls.com"},
            {imageSrc: Mercari, title: "Mercari",url:"https://mercari.com"},
            {imageSrc: Overstock, title: "Overstock",url:"https://overstock.com"},
            {imageSrc: Target, title: "Target",url: "https://www.target.com/"},
            {imageSrc: Walmart, title: "Walmart",url:"https://walmart.com"},
        ],
        "Одежда, обувь, аксессуары": [
            {imageSrc: sixpm, title: "6pm",url:"https://www.6pm.com/"},
            {imageSrc: Abercrombie, title: "Abercrombie & Fitch",url:"https://www.abercrombie.com/shop/wd"},
            {imageSrc: Adidas, title: "Adidas",url:"https://www.adidas.com/us"},
            {imageSrc: Aeropostale, title: "Aeropostale",url:"https://www.aeropostale.com/"},
            {imageSrc: AldoShoes, title: "Aldo Shoes",url:"https://www.aldoshoes.com/us/en_US"},
            {imageSrc: AmericanEagle, title: "American Eagle",url:"https://www.ae.com/us/en"},
            {imageSrc: ASOS, title: "ASOS",url:"https://www.asos.com/us/"},
            {imageSrc: Cabelas, title: "Cabelas",url:"https://www.cabelas.com/shop/en#"},
            {imageSrc: COACH, title: "COACH",url:"https://coach.com"},
            {imageSrc: Crocs, title: "Crocs",url:"https://crocs.com"},
            {imageSrc: DSW, title: "DSW",url:"https://www.dsw.com"},
            {imageSrc: EddieBauer, title: "Eddie Bauer",url: "https://www.eddiebauer.com/"},
            {imageSrc: Fashionnova, title: "Fashion nova",url:"https://www.fashionnova.com"},
            {imageSrc: FootLocker, title: "Foot Locker",url:"https://www.footlocker.co.uk/"},
            {imageSrc: Forever21, title: "Forever 21",url: "https://www.forever21.com/"},
            {imageSrc: Gap, title: "Gap",url:"https://www.gap.com/"},
            {imageSrc: HM, title: "H&M",url:"https://hm.com"},
            {imageSrc: JCPenney, title: "TJCPenney",url:"https://www.tJCPenney.com"},
            {imageSrc: Levis, title: "Levi’s",url:"https://www.levis.com"},
            {imageSrc: Macys, title: "Macy’s",url:"https://www.macys.com/"},
            {imageSrc: MassimoDutti, title: "Massimo Dutti",url: "https://www.massimodutti.com/us"},
            {imageSrc: MichaelKors, title: "Michael Kors",url:"https://www.michaelkors.global/kz/en/"},
            {imageSrc: MissGuided, title: "Miss Guided",url:"https://www.missguided.com/us"},
            {imageSrc: NewBalance, title: "New Balance",url:"https://www.newbalance.com"},
            {imageSrc: Nike, title: "Nike",url: "https://www.nike.com/"},
            {imageSrc: Nordstrom, title: "Nordstrom",url:"https://www.nordstrom.com"},
            {imageSrc: OldNavy, title: "Old Navy ",url:"https://oldnavy.gap.com/"},
            {imageSrc: RalphLauren, title: "Ralph Lauren",url:"https://ralphlauren.com"},
            {imageSrc: Reebok, title: "Reebok",url:"https://www.reebok.ru/"},
            {imageSrc: Sketchers, title: "Sketchers",url:"https://www.sketchers.com"},
            {imageSrc: SteveMadden, title: "Steve Madden",url:"https://www.stevemadden.com"},
            {imageSrc: TheNorthFace, title: "The North Face",url:"https://www.theNorthFace.com"},
            {imageSrc: Timberland, title: "Timberland",url:"https://timberland.com"},
            {imageSrc: TommyHilfiger, title: "Tommy Hilfiger",url: "https://usa.tommy.com/en"},
            {imageSrc: UGG, title: "UGG",url:"https://UGG.com"},
            {imageSrc: UnderArmour, title: "Under Armour",url:"https://www.underarmour.com/en-us/"},
            {imageSrc: Vans, title: "Vans",url:"https://www.vans.com"},
            {imageSrc: VictoriasSecret, title: "Victoria’s Secret",url:"https://www.victoriassecret.com/us/"},
            {imageSrc: Zappos, title: "Zappos",url:"https://www.zappos.com"},
            {imageSrc: Zara, title: "Zara",url:"https://www.zara.com"},
        ],
        "Хобби и спорт": [
            {imageSrc: ACADEMY, title: "ACADEMY",url:"https://www.academy.com/"},
            {imageSrc: ALOYoga, title: "ALO Yoga",url:"https://www.aloyoga.com"},
            {imageSrc: Cabelas, title: "Cabelas",url:"https://www.cabelas.com/shop/en#"},
            {imageSrc: DICKSSportingGoods, title: "DICK'S Sporting Goods",url: "https://www.dickssportinggoods.com/"},
            {imageSrc: EVO, title: "EVO",url: "https://www.evo.com/"},
            {imageSrc: GymShark, title: "GymShark",url:"https://www.gymshark.com"},
            {imageSrc: JOANN, title: "JOANN",url:"https://www.joann.com"},
            {imageSrc: LULULEMON, title: "LULULEMON",url:"https://www.lululemon.com"},
            {imageSrc: Michaels, title: "Michaels",url:"https://michaels.com"},
            {imageSrc: NewBalance, title: "New Balance",url: "https://www.newbalance.com/"},
            {imageSrc: Nike, title: "Nike",url:"https://nike.com"},
            {imageSrc: Reebok, title: "Reebok",url:"https://www.reebok.ru/"},
            {imageSrc: SaveDollarStores, title: "Save Dollar Stores",url:"https://www.saveDollarStores.com"},
            {imageSrc: SCHEELS, title: "SCHEELS",url: "https://www.scheels.com/"},
            {imageSrc: UnderArmour, title: "Under Armour",url:"https://www.underarmour.com/en-us/"},
        ],
        "Электроника": [
            {imageSrc: Apple, title: "Apple",url:"https://www.apple.com/"},
            {imageSrc: BH, title: "B&H",url: "https://www.bhphotovideo.com/"},
            {imageSrc: BackMarket, title: "Back Market",url:"https://www.backmarket.com"},
            {imageSrc: BestBuy, title: "Best Buy",url:"https://www.bestbuy.com"},
            {imageSrc: DELL, title: "DELL",url: "https://www.dell.com/en-us"},
            {imageSrc: IROBOT, title: "IROBOT",url:"https://www.iROBOT.com"},
            {imageSrc: Lenovo, title: "Lenovo",url:"https://www.lenovo.com"},
            {imageSrc: Newegg, title: "Newegg",url:"https://newegg.com"},
            {imageSrc: Oculus, title: "Oculus",url:"https://oculus.com"},
            {imageSrc: Samsung, title: "Samsung",url:"https://www.samsung.com"},
            {imageSrc: TigerDirect, title: "Tiger Direct",url:"https://www.tigerDirect.com"},
            {imageSrc: Walmart, title: "Walmart ",url:"https://walmart.com/"},

        ],
        "Авто": [
            {imageSrc: AAuto , title: "1A Auto",url:"https://www.1aauto.com/"},
            {imageSrc: Advanceautoparts , title: "Advance Auto Parts",url: "https://corp.advanceautoparts.com/home/default.aspx"},
            {imageSrc: AutoZone, title: "AutoZone",url:"https://www.autozone.com/"},
            {imageSrc: CAAutoParts, title: "CA Auto Parts",url:"https://caautoparts.com/?srsltid=AfmBOopprIgB-DVhBa5gP8AjnTDT1Li8ejmu-zy63Cb4HA4UhNr5_cfU"},
            {imageSrc: PartsGeek, title: "Parts Geek",url: "https://www.partsgeek.com/"},
            {imageSrc: RockAuto, title: "Rock Auto",url:"https://www.rockauto.com/"},
            {imageSrc: TireRack, title: "Tire Rack",url:"https://www.tirerack.com/content/tirerack/desktop/en/homepage.html"},

        ],

    },
    "Турция": {
        "Детский мир": [
            {imageSrc: Ebebek, title: "Ebebek",url:"https://www.ebebek.com"},
            {imageSrc: Joker, title: "Joker",url:"https://www.joker.com.tr/"},
            {imageSrc: Minycenter, title: "Minycenter",url:"https://www.minycenter.com.tr/"},
            {imageSrc: Temel, title: "Temel",url: "https://www.temel.com.tr/"},
            {imageSrc: ToyzzShop, title: "Toyzz Shop",url:"https://www.toyzzshop.com"},
        ],
        "Здоровье": [
            {imageSrc: Avansas, title: "Avansas",url:"https://www.avansas.com/"},
            {imageSrc: Hepsiburada, title: "Hepsiburada",url:"https://www.hepsiburada.com/"},
            {imageSrc: Migros, title: "Migros",url: "https://www.migros.com.tr/"},
            {imageSrc: n11, title: "n11",url:"https://www.n11.com.tr/"},
        ],
        "Косметика и парфюмерия": [
            {imageSrc: Avon, title: "Avon",url:"https://kozmetik.avon.com.tr/"},
            {imageSrc: Boyner, title: "Boyner",url:"https://boyner.com.tr/"},
            {imageSrc: Brandroom, title: "Brandroom",url:"https://www.brandroom.com.tr/"},
            {imageSrc: EtatPur, title: "Etat Pur",url:"https://etatpur.com.tr/"},
            {imageSrc: Eveshop, title: "Eveshop",url:"https://eveshop.com.tr/"},
            {imageSrc: Flavus, title: "Flavus",url:"https://flavus.com/"},
            {imageSrc: HaticeTeyze, title: "Hatice Teyze",url:"https://www.haticeteyze.com/"},
            {imageSrc: Kokoma, title: "Kokoma",url:"https://www.kokoma.com.tr/"},
            {imageSrc: Naos, title: "Naos",url:"https://naos.com/tr/"},
            {imageSrc: Oleamea, title: "Oleamea",url:"https://oleamea.com.tr/"},
            {imageSrc: Sinoz, title: "Sinoz",url:"https://www.sinoz.com.tr/"},
            {imageSrc: Tbrush, title: "T-brush",url: "https://thetbrush.com/"},
        ],
        "Маркетплейсы": [
            {imageSrc: A101, title: "A 101",url:"https://www.a101.com.tr/"},
            {imageSrc: Avansas, title: "Avansas",url:"https://www.avansas.com.tr/"},
            {imageSrc: aZall, title: "aZall",url:"https://www.azall.com/"},
            {imageSrc: Beymen, title: "Beymen",url:"https://www.beymen.com.tr/"},
            {imageSrc: Bpazar, title: "Bpazar",url:"https://bpazar.com/"},
            {imageSrc: CarrefourSA, title: "Carrefour SA",url:"https://www.carrefour.com/"},
            {imageSrc: ExxeSelection, title: "Exxe Selection",url:"https://www.exxe.com.tr/"},
            {imageSrc: Gratis, title: "Gratis",url: "https://www.gratis.com/"},
            {imageSrc: Happy, title: "Happy",url:"https://www.happy.com.tr/"},
            {imageSrc: Hepsiburada, title: "Hepsiburada",url:"https://hepsiburada.com.tr/"},
            {imageSrc: Joker, title: "Joker"},
            {imageSrc: Migros, title: "Migros",url:"https://migros.com.tr/"},
            {imageSrc: Morhipo, title: "Morhipo",url:"https://www.boyner.com.tr/"},
            {imageSrc: n11, title: "n11",url:"https://www.n11.com.tr/"},
            {imageSrc: PttAVM, title: "PttAVM",url:"https://www.pttavm.com/"},
            {imageSrc: Trendyol, title: "Trendyol",url:"https://www.trendyol.com.tr/"},
        ],
        "Одежда, обувь, аксессуары": [
            {imageSrc: Addax, title: "Addax",url:"https://www.addax.com.tr/"},
            {imageSrc: Aker, title: "Aker",url:"https://www.aker.com.tr/"},
            {imageSrc: Aris, title: "Aris",url:"https://www.arisdiamond.com/"},
            {imageSrc: Armine, title: "Armine",url:"https://www.armine.com/"},
            {imageSrc: Asics, title: "Asics",url:"https://www.asics.com.tr/"},
            {imageSrc: Avva, title: "Avva",url:"https://www.avva.com.tr/"},
            {imageSrc: AyakkabıDünyası, title: "Ayakkabı Dünyası",url:"https://www.ayakkabidunyasi.com.tr/"},
            {imageSrc: Bershka, title: "Bershka",url:"https://www.bershka.com/tr/"},
            {imageSrc: Blackspade, title: "Blackspade",url:"https://www.blackspade.com.tr/"},
            {imageSrc: Boyner, title: "Boyner",url:"https://www.boyner.com.tr/"},
            {imageSrc: Brandroom, title: "Brandroom",url:"https://www.brandroom.com.tr/"},
            {imageSrc: BSL, title: "BSL",url:"https://www.bsl.com.tr/"},
            {imageSrc: Cacharel, title: "Cacharel",url:"https://www.cacharel.com.tr/"},
            {imageSrc: Camper, title: "Camper",url:"https://www.camper.com.tr/"},
            {imageSrc: Colins, title: "Colin's",url: "https://www.colins.com.tr/"},
            {imageSrc: Columbia, title: "Columbia",url:"https://www.columbia.com.tr/"},
            {imageSrc: ÇorapSepeti, title: "Çorap Sepeti",url: "https://www.corapsepeti.com/"},
            {imageSrc: ÇorapToptancisi, title: "Çorap Toptancisi",url: "https://www.coraptoptancisi.com/"},
            {imageSrc: DSdamat, title: "D'S damat",url:"https://www.dsdamat.com/"},
            {imageSrc: Desa, title: "Desa",url:"https://www.desa.com.tr/"},
            {imageSrc: Dilvin, title: "Dilvin",url:"https://www.dilvin.com.tr/"},
            {imageSrc: Divarese, title: "Divarese",url:"https://www.divarese.com.tr/"},
            {imageSrc: Elmoda, title: "Elmoda",url:"https://www.elmoda.com.tr/"},
            {imageSrc: EmelPırlanta, title: "Emel Pırlanta",url:"https://www.emelpirlanta.com/"},
            {imageSrc: ExxeSelection, title: "Exxe Selection",url:"https://www.exxeselection.com/"},
            {imageSrc: EylulAlyans, title: "Eylul Alyans",url:"https://www.eylulalyans.com/"},
            {imageSrc: Farfetch, title: "Farfetch",url:"https://www.farfetch.com/tr/"},
            {imageSrc: FashFed, title: "Fash Fed",url: "https://www.fashfed.com/"},
            {imageSrc: Fitmoda, title: "Fitmoda",url:"https://www.fitmoda.com/"},
            {imageSrc: Fivescarf, title: "Fivescarf",url:"https://www.fivescarf.com/"},
            {imageSrc: Gaptr, title: "Gap (tr)",url:"https://gap.com.tr/"},
            {imageSrc: Glingerie, title: "Glingerie",url:"https://www.glingerie.com/"},
            {imageSrc: GSStore, title: "GSStore",url:"https://www.gsstore.org/"},
            {imageSrc: Gülaylar, title: "Gülaylar",url: "https://www.gulaylar.com/"},
            {imageSrc: Hemington, title: "Hemington",url:"https://www.hemington.com.tr/"},
            {imageSrc: Hotic, title: "Hotic",url:"https://www.hotic.com.tr/"},
            {imageSrc: Hummel, title: "Hummel",url: "https://hummel.com.tr/"},
            {imageSrc: iLVi, title: "iLVi",url:"https://www.ilvi.com/ru"},
            {imageSrc: InterSport, title: "InterSport",url:"https://www.intersport.com.tr/"},
            {imageSrc: Korayspor, title: "Korayspor",url:"https://www.korayspor.com/"},
            {imageSrc: Koton, title: "Koton",url: "https://www.koton.com/"},
            {imageSrc: Kuaybegider, title: "Kuaybegider",url:"https://www.kuaybegider.com/"},
            {imageSrc: Levidor, title: "Levidor",url:"https://www.levidor.com.tr/"},
            {imageSrc: LizayPırlanta, title: "Lizay Pırlanta",url:"https://www.lizaypirlanta.com/"},
            {imageSrc: Lovemybody, title: "Love my body",url:"https://www.lovemybody.com.tr/"},
            {imageSrc: LTBjeans, title: "LTB jeans",url: "https://www.ltbjeans.com/tr-TR"},
            {imageSrc: Markastok, title: "Markastok",url:"https://markastok.com/"},
            {imageSrc: MarksSpencer, title: "Marks&Spencer",url:"https://www.marksandspencer.com.tr/"},
            {imageSrc: Mavi, title: "Mavi",url:"https://www.mavicompany.com/en"},
            {imageSrc: Modanisa, title: "Modanisa",url:"https://www.modanisa.com/"},
            {imageSrc: MoonSports, title: "Moon Sports",url: "https://www.moonsports.com.tr/"},
            {imageSrc: Mudo, title: "Mudo",url:"https://www.mudo.com.tr/"},
            {imageSrc: NetWork, title: "NetWork",url:"https://www.network.com.tr/"},
            {imageSrc: NevzatOnay, title: "Nevzat Onay",url:"https://nevzatOnay.com.tr/"}   ,
            {imageSrc: Occasion, title: "Occasion",url: "https://www.occasion.com.tr/"},
            {imageSrc: PierreCardin, title: "Pierre Cardin",url:"https://pierrecardin.com.tr/"},
            {imageSrc: PırlantaMerkezim, title: "Pırlanta Merkezim",url: "https://www.pirlantamerkezim.com/"},
            {imageSrc: PlaySports, title: "PlaySports",url:"https://www.playsports.com.tr/"},
            {imageSrc: Pomidik, title: "Pomidik",url: "https://pomidik.com/"},
            {imageSrc: PullBear, title: "Pull&Bear",url:"https://www.pullandbear.com/tr/"},
            {imageSrc: Puma, title: "Puma",url:"https://tr.puma.com/"},
            {imageSrc: SaatSaat, title: "Saat&Saat",url:"https://www.saatvesaat.com.tr/"},
            {imageSrc: SilkandCashmere, title: "Silk and Cashmere",url:"https://silkandcashmere.com/"},
            {imageSrc: Skechers, title: "Skechers",url: "https://www.skechers.com.tr/"},
            {imageSrc: Slazenger, title: "Slazenger",url:"https://www.slazenger.com.tr/"},
            {imageSrc: SneaksCloud, title: "Sneaks Cloud",url:"https://www.sneakscloud.com/"},
            {imageSrc: Sporjinal, title: "Sporjinal",url:"https://www.sporjinal.com/"},
            {imageSrc: Sporthink, title: "Sporthink",url:"https://www.sporthink.com/"},
            {imageSrc: Sportive, title: "Sportive",url: "https://www.sportive.com.tr/"},
            {imageSrc: Sportstyle, title: "Sportstyle",url:"https://www.sportstyle.com.tr/"},
            {imageSrc: SPX, title: "SPX",url:"https://www.spx.com.tr/"},
            {imageSrc: Stradivarius, title: "Stradivarius",url:"https://www.stradivarius.com/tr/"},
            {imageSrc: SuperStep, title: "SuperStep",url: "https://www.superstep.com.tr/"},
            {imageSrc: Suwen, title: "Suwen",url:"https://www.suwen.com.tr/"},
            {imageSrc: Themoosebay, title: "The moose bay",url:"https://www.themoosebay.com/"},
            {imageSrc: TommyLife, title: "Tommy Life",url: "https://www.tommylife.com.tr/"},
            {imageSrc: TouchéPrivé, title: "Touché Privé",url: "https://eu.toucheprive.com/"},
            {imageSrc: Tudors, title: "Tudors",url:"https://www.tudors.com/"},
            {imageSrc: USPoloASSN, title: "U.S. Polo ASSN.",url:"https://tr.uspoloassn.com/"},
            {imageSrc: UnderArmour, title: "Under Armour (tr)",url: "https://www.underarmour.com.tr/"},
            {imageSrc: UnitedColorsofBenetton, title: "United Colors of Benetton",url:"https://tr.benetton.com/"},
            {imageSrc: Yalispor, title: "Yalispor",url:"https://www.yalispor.com.tr/"},
            {imageSrc: Yargici, title: "Yargici",url:"https://www.yargici.com/"},
        ],
        "Хобби и спорт": [
            {imageSrc: Asics, title: "Asics",url:"https://www.asics.com.tr/"},
            {imageSrc: GSStore, title: "GSStore",url:"https://www.gsstore.org/"},
            {imageSrc: InterSport, title: "InterSport",url:"https://www.intersport.com/"},
            {imageSrc: PlaySports, title: "PlaySports",url: "https://www.playsports.com.tr/"},
            {imageSrc: Sporjinal, title: "Sporjinal",url:"https://www.sporjinal.com/"},
            {imageSrc: Sportive, title: "Sportive",url:"https://www.sportive.com.tr/"},
            {imageSrc: SPX, title: "SPX",url:"https://www.spx.com.tr/"},
            {imageSrc: SuperStep, title: "SuperStep",url:"https://www.superstep.com.tr/"},
            {imageSrc: UnderArmour, title: "Under Armour (tr)",url: "https://www.underarmour.com.tr/"},
        ],
        "Электроника": [
            {imageSrc: Arçelik, title: "Arçelik",url:"https://www.arcelik.com.tr/"},
            {imageSrc: Beko, title: "Beko",url:"https://www.beko.com.tr/"},
            {imageSrc: Braunshop, title: "Braun-shop",url: "https://www.braunshop.com.tr/"},
            {imageSrc: Casper, title: "Casper",url:"https://casper.com/"},
            {imageSrc: Doremusic, title: "Doremusic",url:  "https://www.doremusic.com.tr/"},
            {imageSrc: Fakir, title: "Fakir",url:"https://www.fakir.com.tr/"},
            {imageSrc: KorkmazStore, title: "Korkmaz Store",url: "https://www.korkmazstore.com.tr/"},
            {imageSrc: MediaMarkt, title: "MediaMarkt",url:"https://mediamarkt.com.tr/"},
        ],
        "Авто": [
            {imageSrc: Arçelik, title: "Arçelik",url:"https://www.arcelik.com.tr/"},
            {imageSrc: Beko, title: "Beko",url:"https://www.beko.com.tr/"},
            {imageSrc: Braunshop, title: "Braun-shop",url: "https://www.braunshop.com.tr/"},
            {imageSrc: Casper, title: "Casper",url:"https://casper.com/"},
            {imageSrc: Doremusic, title: "Doremusic",url:  "https://www.doremusic.com.tr/"},
            {imageSrc: Fakir, title: "Fakir",url:"https://www.fakir.com.tr/"},
            {imageSrc: KorkmazStore, title: "Korkmaz Store",url: "https://www.korkmazstore.com.tr/"},
            {imageSrc: MediaMarkt, title: "MediaMarkt",url:"https://mediamarkt.com.tr/"},
        ]
    }
};
export default ({selectedCountry, selectedCategory}) => {
    const cardsToShow = cardData[selectedCountry]?.[selectedCategory] || [];
    return (
        <Container>
            <ThreeColumnContainer>
                <TransitionContainer component={null}>
                    {cardsToShow.map((card, i) => (
                        <CSSTransition key={i} timeout={300} classNames="fade">
                            <Column key={i}>
                                <Card href={card.url} target="_blank" rel="noopener noreferrer">
                                    <span className="imageContainer">
                                        <img src={card.imageSrc || defaultCardImage} alt={card.title} />
                                    </span>
                                    <span className="textContainer">
                                        <span className="title">{card.title}</span>
                                    </span>
                                </Card>
                            </Column>
                        </CSSTransition>
                    ))}
                </TransitionContainer>
            </ThreeColumnContainer>
        </Container>
    );
};
