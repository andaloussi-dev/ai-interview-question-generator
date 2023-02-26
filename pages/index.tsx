import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header/Header";
import Github from "@/components/Github/Github";
import Hero from "@/components/Hero/Hero";
import DropDown, { difficultyType } from "@/components/DropDown/DropDown";
import TextArea from "@/components/TextArea/TextArea";
import GenerateButton from "@/components/GenerateButton/GenerateButton";
import ResizablePanel from "@/components/ResizablePanel/ResizablePanel";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

import { useState } from "react";
export default function Home() {
  const [difficulty, setDifficulty] = useState<difficultyType>("Advanced");
  const [subject, setSubject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<String>("");

  const prompt = `Generate 3 ${difficulty} interview questions about ${subject} and clearly labeled "1." , "2." and "3.". Make sure each generated quations is clear and concise unique and not too long.`;
  const generateQuestions = async (e: any) => {
    e.preventDefault();
    setGeneratedQuestions("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      console.log(chunkValue);

      setGeneratedQuestions((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className=" ">
      <Header></Header>
      <div className=" flex flex-col items-center justify-center mt-20 text-center">
        <Github></Github>
        <Hero></Hero>
        <DropDown
          difficulty={difficulty}
          setDifficulty={(newDifficulty) => setDifficulty(newDifficulty)}
        ></DropDown>
        <TextArea
          subject={subject}
          setSubject={(newSubject) => setSubject(newSubject)}
        ></TextArea>
        <GenerateButton
          loading={loading}
          generateQuestions={generateQuestions}
        ></GenerateButton>

        <Toaster position="top-center" reverseOrder={true} />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10 mx-5">
              {generatedQuestions && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your generated questions
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {generatedQuestions
                      .substring(generatedQuestions.indexOf("1") + 2)
                      .split(/(?<=\d\.)\s/)
                      .map((generatedQuestion) => {
                        // remove any number that have a dot after it
                        const cleandQuestion = generatedQuestion
                          .replace(/\d\./g, "")
                          .replace("}", "");
                        // remove \n from the string
                        cleandQuestion.replace(/(\r\n|\n|\r)/gm, "");
                        return (
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(cleandQuestion);
                              toast(
                                " The question have been copied to your clipboard",
                                {
                                  icon: "✂️",
                                  style: {
                                    borderRadius: "10px",
                                    background: "#333",
                                    color: "#fff",
                                  },
                                }
                              );
                            }}
                            key={cleandQuestion}
                          >
                            <p>{cleandQuestion}</p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </div>
    </div>
  );
}
