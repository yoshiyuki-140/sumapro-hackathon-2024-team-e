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
        className={`w-full bg-red-300 text-black py-4 px-5 text-left font-bold rounded-t-2xl mt-2 ${!isOpen ? "rounded-2xl" : ""}`}
      >
        {menuTitle}
      </button>

      {/* メニュー */}
      {isOpen && (
        <div
          role="menu"
          className="bg-green-100 p-2 text-black rounded-b-md"
        >
          <ul>
            <li
              className="m-2 bg-green-200 px-3 py-2 rounded-md font-bold text-gray-600"
              role="menuitem"
            >
              {restArea.cafe?.name || "カフェ情報なし"}
            </li>
            <li
              className="m-2 bg-green-200 px-3 py-2 rounded-md font-bold text-gray-600"
              role="menuitem"
            >
              {restArea.convenienceStore?.name || "コンビニ情報なし"}
            </li>
            <li
              className="m-2 bg-green-200 px-3 py-2 rounded-md font-bold text-gray-600"
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
