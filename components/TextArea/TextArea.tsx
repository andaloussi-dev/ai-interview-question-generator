import React from "react";
import Instruction from "../Instruction/Instruction";
function TextArea({subject , setSubject}: {subject: string, setSubject: (newSubject: string) => void}) {
  return (
    <div className="max-w-xl w-full mt-10 p-5">
      <Instruction
        image="/2-black.png"
        content="Write down your interview subject"
      ></Instruction>
      <textarea
        className="w-full mt-5 border-2 border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        rows={5}
        placeholder="Redux, React, Next.js."
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      ></textarea>
    </div>
  );
}

export default TextArea;
