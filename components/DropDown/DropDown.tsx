import React from "react";
import Instruction from "../Instruction/Instruction";
import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";

export type difficultyType = "Advanced" | "Intermediate" | "Beginner";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropDownProps {
  difficulty: difficultyType;
  setDifficulty: (newDifficulty: difficultyType) => void;
}

let difficulties: difficultyType[] = ["Advanced", "Intermediate", "Beginner"];

function DropDown({difficulty , setDifficulty}: DropDownProps) {
  return (
    <div className=" max-w-xl w-full mt-10 p-5">
      <Instruction image="/1-black.png" content="Pick the Interview difficulty"></Instruction>
      <Menu as="div" className="relative inline-block text-left w-full mt-5 ">
        <div>
          <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
            {difficulty}
            <ChevronUpIcon
              className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
              aria-hidden="true"
            />
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          key={difficulty}
        >
          <div className="">
            {difficulties.map((difficultyItem) => (
              <Menu.Item key={difficultyItem}>
                {({ active }) => (
                  <button
                    onClick={() => setDifficulty(difficultyItem)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      difficulty === difficultyItem ? "bg-gray-200" : "",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                    )}
                  >
                    <span>{difficultyItem}</span>
                    {difficulty === difficultyItem ? (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
      </Menu>
    </div>
  );
}

export default DropDown;
