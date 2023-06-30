import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
// import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { animateNumber } from "../utils/animateNumber";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [vehHud, setVehVisiblity] = useState(false);
  const [framework, setframework] = useState(false);
  const [id, setid] = useState(false);
  const [seatbelt, setSeatbelt] = useState(false);
  const [userId, setUserId] = useState("");
  useNuiEvent("setVisible", setVisible);
  useNuiEvent("framework", setframework);
  useNuiEvent("id", setid);
  useNuiEvent("seatbelt", setSeatbelt);
  useNuiEvent("setUserId", setUserId);
  useNuiEvent("setVehV", setVehVisiblity);
  useNuiEvent("hudStats", (retData) => {
    const userHealth = document.getElementById(
      "user-health"
    ) as HTMLSpanElement;
    const userArmour = document.getElementById(
      "user-armour"
    ) as HTMLSpanElement;
    const micStatus = document.getElementById("mic") as HTMLLIElement;
    // Health
    var health = Math.floor(retData.hp / 2);
    animateNumber(userHealth, health, "%");

    // Armour
    animateNumber(userArmour, retData.armour, "%");

    // Mic
    if (retData.micActive) {
      micStatus.style.color = "cyan";
    } else if (!retData.micActive) {
      micStatus.style.color = "white";
    }

    // Debug
    console.log(JSON.stringify(retData));
  });

  useNuiEvent("vehHud", (retData) => {
    const mph = document.getElementById("mph") as HTMLSpanElement;
    const gear = document.getElementById("gear") as HTMLSpanElement;
    const fuel = document.getElementById("fuel") as HTMLSpanElement;
    const seatBelt = document.getElementById("seatbelt") as HTMLLIElement;
    console.log(JSON.stringify(retData));

    if (seatbelt && retData.seatbeltOn) {
      seatBelt.style.color = "white";
      seatBelt.classList.replace("fa-user-slash", "fa-user");
    } else if (seatbelt && !retData.seatbeltOn) {
      seatBelt.style.color = "red";
      seatBelt.classList.replace("fa-user", "fa-user-slash");
    }
    // MPH Text
    // mph.textContent = ` ${speed} MP/H`;
    animateNumber(mph, retData.speed, " MP/H");

    // Gear
    gear.textContent = ` Gear ${retData.gear}`;
    // Fuel
    // fuel.textContent = `${retData.fuel}%`;
    animateNumber(fuel, retData.fuel, "%");
  });

  useNuiEvent("frameworkStatus", (data) => {
    const userHunger = document.getElementById(
      "user-hunger"
    ) as HTMLSpanElement;
    const userThirst = document.getElementById(
      "user-thirst"
    ) as HTMLSpanElement;

    animateNumber(userHunger, data.hunger, "%");

    animateNumber(userThirst, data.thirst, "%");
  });

  return (
    <>
      {/* Hud */}
      <div
        className="ui"
        style={{ visibility: visible ? "visible" : "hidden" }}
      >
        <div className="health">
          <div className="flex gap-2 justify-center align-center mt-4 text-center">
            <p className="font-bold bg-black p-2 rounded wid">
              <i className="fa-solid fa-heart text-red-500"></i>{" "}
              <span id="user-health"> 0%</span>
            </p>
            <p
              className="font-bold bg-black p-2 rounded wid"
              style={{ display: framework ? "block" : "none" }}
            >
              <i className="fa-solid fa-burger text-yellow-500"></i>{" "}
              <span id="user-hunger"> 100%</span>
            </p>
            <p className="font-bold bg-black p-2 rounded w-10">
              <i className="fa-solid fa-microphone mt-1" id="mic"></i>
            </p>
            <p
              className="font-bold bg-black p-2 rounded wid"
              style={{ display: framework ? "block" : "none" }}
            >
              <i className="fa-solid fa-droplet text-blue-600"></i>{" "}
              <span id="user-thirst"> 100%</span>
            </p>
            <p className="font-bold bg-black p-2 rounded wid">
              <i className="fa-solid fa-shield-alt text-blue-500"></i>{" "}
              <span id="user-armour"> 0%</span>
            </p>
          </div>
        </div>
      </div>

      {/* CarHud */}
      <div
        className="centerig"
        style={{ visibility: vehHud ? "visible" : "hidden" }}
      >
        <div
          className={`grid ${
            id && seatbelt ? "grid-cols-3" : id ? "grid-cols-2" : "grid-cols-2"
          } gap-2 text-center`}
        >
          <p className="font-bold bg-black p-2 rounded">
            <i className="fa-solid fa-gauge text-purple-500"></i>{" "}
            <span id="mph">0 MP/H</span>
          </p>
          <p className="font-bold bg-black p-2 rounded">
            <i className="fa-solid fa-gears text-gray-500"></i>{" "}
            <span id="gear"> Gear 1</span>
          </p>
          {id && (
            <p className="font-bold bg-black p-2 rounded smallIcons">
              <i className="fa-solid fa-user"></i>
              <span id="userId"> ID: {userId}</span>
            </p>
          )}
          <p
            className={`font-bold bg-black p-2 rounded ${
              id && seatbelt ? "col-span-2" : "col-span-1"
            }`}
          >
            <i className="fa-solid fa-gas-pump text-white"></i>{" "}
            <span id="fuel">0%</span>
          </p>
          {seatbelt && (
            <p className="font-bold bg-black p-2 rounded">
              <i
                className="fa-solid fa-user-slash text-red-500"
                id="seatbelt"
              ></i>
            </p>
          )}
        </div>
      </div>

      {/* Id Without CarHud */}
      {id && !vehHud && (
        <div className="id w-24 text-center">
          <p className="font-bold bg-black p-2 rounded smallIcons">
            <i className="fa-solid fa-user"></i>
            <span id="userId"> ID: {userId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default App;
