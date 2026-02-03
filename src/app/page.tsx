'use client'

import { useEffect, useState } from "react";
import { Question } from "./features/types";
import { makeQuestion } from "./features/factories";
import { buildCheckTxt, formatDateShort } from "./features/serializer";
import { VStack } from "./components/ui";
import { Intro } from "./components/Intro";
import { OptionsBar } from "./components/OptionsBar";
import { QuestionSection } from "./components/QuestionSection";

export default function Home() {

  const [groupNum, setGroupNum] = useState(1);
  const [questionAmt, setQuestionAmt] = useState(1);
  const [questions, setQuestions] = useState<Question[]>(() => [makeQuestion()])
  // Default to today's date in YYYY-MM-DD for the date picker.
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date()
    return d.toISOString().slice(0, 10) // YYYY-MM-DD
  })

  useEffect(() => {
    document.title = `Question Maker`;
  });

  return (
    <div className="w-full mt-16 sm:mt-24 lg:mt-40 px-3 sm:px-6 lg:px-9 flex justify-center mb-16 sm:mb-20">
      <VStack className="items-center" spacing={40}>
        <Intro />
        <OptionsBar setGroupNum={setGroupNum} groupNum={groupNum} questionAmt={questionAmt} setQuestionAmt={setQuestionAmt} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setQuestions={setQuestions} />
        <QuestionSection questions={questions} setQuestions={setQuestions} />

        <button
          type="button"
          onClick={() => {
            // Generate a TSV-formatted file that matches the professor's checker.
            const text = buildCheckTxt(groupNum, questions)

            const blob = new Blob([text], {
              type: "text/plain;charset=utf-8",
            })

            // Trigger a client-side file download without a backend.
            const url = URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = `group-${groupNum}-${formatDateShort(selectedDate)}.txt`
            document.body.appendChild(a)
            a.click()
            a.remove()

            URL.revokeObjectURL(url)
          }}
          className="
            w-56
            cursor-pointer
            transition-transform duration-150 ease-out
            hover:scale-105
            active:scale-100
            inline-flex items-center justify-center
            rounded-full px-5 py-3
            font-semibold text-white
            bg-purple-600
            active:bg-purple-800
            transition
            shadow-sm
          "
        >
          Download .txt File
        </button>
      </VStack>
    </div>
  );
}











