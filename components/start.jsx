import { useState, useEffect, useRef } from "react";
import React from "react";
import { ButtonCost } from "./upgrades";
import { formatCost } from "./upgrades";
import { BPSButton } from "./autoButtons";
import { Message } from "./Message";


export const Start = () => {
  const [GameOver,setGameOver] = useState(false)
  // Entire Game Value//
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("storage"), 10) || 0
  );
  // -------------------- //
  // States for class and timeout properties//

  

  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('items')) ?? [
    {cost:1000 ,value:966,autoincrease:.5},
    {cost:15000 ,value:772,autoincrease:.4},
    {cost:100000 ,value:650,autoincrease:.3},
    {cost:1000000 ,value:400,autoincrease:.2},
    {cost:25000000 ,value:200,autoincrease:.1},
    {cost:25000000,value:966,autoincrease:.5}
  ]);

  const [currentItem, setCurrentItem] = useState(() => JSON.parse(localStorage.getItem('currentItem')) || 0);
  const [maxUpgrade,setMaxUpgrade] = useState(null)


  const [cantBuy, setCantBuy] = useState(null);
  const [highlightedButton, setHighlightedButton] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  // Rest of game properties //

  const [ButtonPerClick, SetButtonPerClick] = useState(
    JSON.parse(localStorage.getItem("ButtonsPerClick")) || 1
  );

  const [ButtonPerSecond, SetButtonPerSecond] = useState(
    JSON.parse(localStorage.getItem("ButtonPerSecond")) || 0
  );

  const [AutoButton, SetAutoButton] = useState(
    JSON.parse(localStorage.getItem("AutoButton")) || 3000
  );
  useEffect(() => {
    localStorage.setItem("storage", JSON.stringify(value));
    localStorage.setItem("ButtonsPerClick", JSON.stringify(ButtonPerClick));
    localStorage.setItem("AutoButton", JSON.stringify(AutoButton));
    localStorage.setItem("ButtonPerSecond", JSON.stringify(ButtonPerSecond));
    // autoButton page upgrade//
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('currentItem', currentItem);
  }, [value,currentItem,items]);
  //-------------------- //
  //Auto Button feature//
  useEffect(() => {
    const AutoIncrement = setInterval(() => {
      if (!isClicked) {
        setValue((prevValue) => prevValue + ButtonPerSecond);
      }
    }, AutoButton);

    if (value >= 1e18){
      setGameOver(true)
    }
    return () => clearInterval(AutoIncrement);
  }, [isClicked, AutoButton, ButtonPerSecond]);
  // ------------- //
  //all upgrades //
  const increment = () => {
    setValue(value + ButtonPerClick);
  };

  const ButtonPerSecondUpgrade = (ButtonCost, ButtonValue, index) => {
    if (value >= ButtonCost) {
      SetButtonPerSecond(ButtonPerSecond + ButtonValue);
      setValue(value - value / 5.5);
      
    } else {
      setCantBuy(index);
      setTimeout(() => {
        setCantBuy(null);
      }, 1000);
      
    }
  };
  //Specifically the Auto Button index needed//
  const currentUpgrade = items[currentItem]
  const nextUpgrade = items[currentItem + 1];
  const AutoButtonUpgrade = (currentItemCost,currentItemValue) => {
   
   if (!nextUpgrade){

    return
   } 
    if (value >= currentUpgrade.cost){
      SetAutoButton(AutoButton - currentUpgrade.value);
      setValue(value - value)
      setCurrentItem(currentItem + 1)
    }
    
    // setCurrentItem(currentItem + 1)
    console.log(currentItemCost)
    console.log(currentUpgrade.value);
    console.log(currentUpgrade.cost)
  };
  // --------------------- //
  // All Upgrade buttons and the formatting //

  const CostCleanUp = ButtonCost.map((item) => {
    const ValueLength = formatCost(item.cost);
    const symbol = ValueLength.length > 3;
    const MultiLength = formatCost(item.value);

    return {
      ...item,
      ValueLength,
      symbol,
      MultiLength,
    };
  });
  // buttonCost is the object cost and buttonValue is the button value //

  const ButtonPerClickUpgrade = (ButtonCost, buttonValue, index) => {
    //c console.log(value)

    if (value >= ButtonCost) {
      SetButtonPerClick(ButtonPerClick + buttonValue);
      setValue(value - value);
     
    } else {
     
      setHighlightedButton(index);
      setTimeout(() => {
        setHighlightedButton(null);
      }, 1000);
    }
  };
  return (
    // Score Display//
    <div>
      

          
      {GameOver && <div className="GameFinished">Congratulations You have Pressed Every Button The Game Has To Offer!</div>}
          <div className="GameContainer">
        <div className="CountDisplay">
          <div className="Value">
            {value ? formatCost(value) : value.toFixed(2)}
          </div>
          <h2 className="text-center font-extrabold">Click The Button!</h2>
        </div>
        <div className="stats">
          <p>Buttons per Click: {formatCost(ButtonPerClick)}</p>
          <p>Buttons Per Second: {ButtonPerSecond ?formatCost(ButtonPerSecond) : ButtonPerSecond.toFixed(2)}</p>
        </div>

<div  className="AutoButton">
  {!nextUpgrade &&(
          
    <Message /> 
    
    )}
        <button onClick={() => AutoButtonUpgrade(currentItem)}    className={ !nextUpgrade ? 'LastAutoUpgrade': 'LastAutoCLass'}>
          
            <p>

              Cost: {formatCost(currentUpgrade.cost)}
            </p>
              
         <p>
          Per Second Increase:{currentUpgrade.autoincrease}s
          </p>
            
          </button>
      </div>

    </div>
<div className="GameButtonPosition">
        <button className="buttonpos" onClick={increment}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="256"
            fill="currentColor"
            className="ButtonSvg"
            viewBox="0 0 16 16"
            >
            <path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
          </svg>
        </button>
      </div>
      {/* Auto Button Upgrades */}
      <div className="grid-rows-6 AutoButtonPosition">
        {BPSButton.map((button, index) => {
          const buttonClass =
          cantBuy === index && value < button.cost
          ? "upgradeError"
          : "AutoButtonCost";
          return (
            <div key={index}>
              <button
                onClick={() =>
                  ButtonPerSecondUpgrade(button.cost, button.value, index)
                }
                className={buttonClass}
                >
                Cost :{formatCost(button.cost)}
                <span className="Multi v2">
                  Button Per Second +{formatCost(button.value)}
                </span>
              </button>
            </div>
          );
        })}
      </div>

<div className="grid grid-cols-2  upgrades sm:grid-cols-6 gap-4">
        {CostCleanUp.map((cost, index) => {
          const buttonClass =
          highlightedButton === index && value < cost.cost
          ? "upgradeError"
          : "cost";
          return (
            <button
            className={buttonClass}
            key={index}
            onClick={() =>
              ButtonPerClickUpgrade(cost.cost, cost.value, index)
            }
            >
              Cost:{cost.ValueLength}
              <span className="Multi">Multi x{cost.MultiLength}</span>
            </button>
          );
        })}
      </div>
     
     
    </div>
  );
};
