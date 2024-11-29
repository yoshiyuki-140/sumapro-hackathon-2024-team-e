import { RestArea } from "@/types/api";
import { useState } from "react";

export default function DropdownMenu({ menuTitle, restArea }: { menuTitle: string; restArea: RestArea }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full flex flex-col">
      {/* メニューボタン */}
      <button
        onClick={toggleMenu}
        className={`w-full bg-red-300 text-black text-2xl py-5 px-6 text-left rounded-t-2xl mt-2 ${!isOpen ? "rounded-2xl" : ""}`}
      >
        {menuTitle}
      </button>

      {/* メニュー */}
      {isOpen && (
        <div
          role="menu"
          className="bg-green-100 p-2 text-black rounded-b-2xl"
        >
          <ul>
            <li
              className="m-3 bg-green-200 px-5 py-3 rounded-xl font-bold text-black text-lg"
              role="menuitem"
            >
              {restArea.cafe?.name || "カフェ情報なし"}
            </li>
            <li
              className="m-3 bg-green-200 px-5 py-3 rounded-xl font-bold text-black text-lg"
              role="menuitem"
            >
              {restArea.convenienceStore?.name || "コンビニ情報なし"}
            </li>
            <li
              className="m-3 bg-green-200 px-5 py-3 rounded-xl font-bold text-black text-lg"
              role="menuitem"
            >
              {restArea.toilet?.name || "トイレ情報なし"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
