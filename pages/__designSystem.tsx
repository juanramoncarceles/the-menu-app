import { PrimaryButton, SecondaryButton, TertiaryButton, SuccessButton, WarningButton, ErrorButton, IconButton } from "../components/Buttons";
import { CloseIcon } from "../components/Icons";

const DesignSystem = () => (
  <div className="root">
    <div><PrimaryButton>Hello World</PrimaryButton></div>
    <div><PrimaryButton disabled>Hello World</PrimaryButton></div>
    <div><SecondaryButton>Hello World</SecondaryButton></div>
    <div><SecondaryButton disabled>Hello World</SecondaryButton></div>
    <div><TertiaryButton>Hello World</TertiaryButton></div>
    <div><TertiaryButton disabled>Hello World</TertiaryButton></div>
    <div><SuccessButton>Hello World</SuccessButton></div>
    <div><SuccessButton disabled>Hello World</SuccessButton></div>
    <div><WarningButton>Hello World</WarningButton></div>
    <div><WarningButton disabled>Hello World</WarningButton></div>
    <div><ErrorButton>Hello World</ErrorButton></div>
    <div><ErrorButton disabled>Hello World</ErrorButton></div>
    <div><IconButton><CloseIcon /></IconButton></div>
    <div><IconButton disabled><CloseIcon /></IconButton></div>
    <style jsx>{`
      .root {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: minmax(100px, auto);
        gap: 20px;
        max-width: 1000px;
        margin: 4rem auto;
        align-items: center;
        text-align: center;
      }
      .item {
        min-height: 80px;
      }
    `}</style>
  </div>
)

export default DesignSystem;