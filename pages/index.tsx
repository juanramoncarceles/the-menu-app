import Link from "next/link";
import { styled } from "../styles";

import { locales, languageNames } from "../translations/config";
import CustomLayout from "../components/layouts/CustomLayout";

const StyledBackground = styled.div`
  background-color: ${({ theme }) => theme.textColor};
  background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.85)),
    url("/dishes_pexels_valeria_boltneva.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const MainContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  height: 70vh;
  display: flex;
  align-items: center;
  line-height: 6rem;
  font-size: 6rem;
  font-family: ${({ theme }) => theme.headingFont};
  font-weight: bold;
  color: ${({ theme }) => theme.textColorInverted};
  text-shadow: 0px 6px 14px #000;
`;

const LanguagesLinksContainer = styled.div`
  > a {
    font-size: ${({ theme }) => theme.typeScale.header3};
    color: ${({ theme }) => theme.textColorInverted};
    text-shadow: 0 2px 8px #000;
  }

  > a:not(:last-child) {
    margin-right: 4rem;
  }
`;

const Home = () => {
  return (
    <CustomLayout bgStyle={StyledBackground}>
      <MainContainer>
        <Heading>
          tasty
          <br />
          taste
        </Heading>
        <LanguagesLinksContainer>
          {locales.map((locale) => (
            <Link href={`/${locale}/menu`} key={locale}>
              <a>{languageNames[locale].toLowerCase()}</a>
            </Link>
          ))}
        </LanguagesLinksContainer>
      </MainContainer>
    </CustomLayout>
  );
};

export default Home;
