'use client'

import { VStack, Section, HStack, Spacer, Text, AdaptiveHStack } from "./Components/components";
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";


type Answer = {
  id: string
  text: string
  isCorrect: boolean
}

type Question = {
  id: string
  questionText: string
  answers: Answer[] // we will always create 4
}

const makeAnswer = (): Answer => ({ id: Math.random().toString(36).substring(2, 9), text: "", isCorrect: false })

const makeQuestion = (): Question => ({
  id: Math.random().toString(36).substring(2, 9),
  questionText: "",
  answers: [makeAnswer(), makeAnswer(), makeAnswer(), makeAnswer()],
})



export default function Home() {

  const [groupNum, setGroupNum] = useState(1);
  const [questionAmt, setQuestionAmt] = useState(1);
  const [questions, setQuestions] = useState<Question[]>(() => [makeQuestion()])
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date()
    return d.toISOString().slice(0, 10) // YYYY-MM-DD
  })

  function formatDateShort(dateStr: string): string {
    // dateStr is "YYYY-MM-DD"
    const [y, m, d] = dateStr.split("-").map(Number)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[m - 1]}${d}`
  }

  useEffect(() => {
    document.title = `Question Maker`;
  });

  return (
    <div className="w-full mt-40 px-3 sm:px-6 md:px-9 flex justify-center mb-20">
      <VStack className="items-center" spacing={40}>
        <Intro />
        <QuestionsSelection />
        <QuestionSection questions={questions} setQuestions={setQuestions} />

        <button
          type="button"
          onClick={() => {
            const text = buildCheckTxt(groupNum, questions)

            const blob = new Blob([text], {
              type: "text/plain;charset=utf-8",
            })

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
            bg-purple-600 hover:bg-purple-700
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

  function Intro() {
    return (
      <Section className="w-full max-w-4xl bg-foreground rounded-[30px] items-center py-5">
        <VStack className="items-start" spacing={8}>
          <motion.p
            className="
                md:text-4xl
                sm:text-3xl
                text-2xl
                font-bold
                text-accent
                transition-all
                ease-in-out
                duration-100
                text-center
            "
          >
            Welcome to CIS 340 Question Maker!
          </motion.p>
          <Text variant="body" className="md:text-lg sm:text-base text-center sm:text-left text-sub2">
            This application is designed to help you create and manage questions for your CIS 340 course. Whether you're an instructor looking to build a question bank or a student preparing for exams, our tool provides an easy and efficient way to generate and organize questions.
          </Text>

          <Text variant="body" className="md:text-md sm:text-base text-center sm:text-left text-accent">
            Author: Garrett Butchko (with assistance from ChatGPT)
          </Text>
        </VStack>
      </Section>
    );
  }

  function QuestionsSelection() {
    return (
      <Section className="w-full max-w-4xl bg-foreground rounded-[30px] items-center py-5">
        <AdaptiveHStack className="items-center" spacing={8}>
          <motion.p
            className="
                md:text-3xl
                sm:text-2xl
                text-1xl
                font-bold
                text-accent
                transition-all
                ease-in-out
                duration-100
                text-center
            "
          >
            Question Options:
          </motion.p>

          <Spacer />

          <HStack spacing={8}>
            <GroupNumDropdown setGroupNum={setGroupNum} groupNum={groupNum} />
            <QuestionNumDropdown
              questionAmt={questionAmt}
              setQuestionCount={handleQuestionCountChange}
            />
          </HStack>

          <FileDatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </AdaptiveHStack>
      </Section>
    );
  }

  function handleQuestionCountChange(nextCount: number) {
    setQuestionAmt(nextCount)
    setQuestionCount(nextCount, setQuestions)
  }
}



type SetQuestions = React.Dispatch<React.SetStateAction<Question[]>>

function setQuestionCount(nextCount: number, setQuestions: SetQuestions) {
  setQuestions(prev => {
    if (prev.length === nextCount) return prev

    if (prev.length < nextCount) {
      const toAdd = Array.from(
        { length: nextCount - prev.length },
        () => makeQuestion()
      )
      return [...prev, ...toAdd]
    }

    return prev.slice(0, nextCount)
  })
}


function GroupNumDropdown({
  groupNum,
  setGroupNum,
}: {
  groupNum: number
  setGroupNum: (value: number) => void
}) {

  const groupNumbers: number[] = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10,
  ];


  return (
    <div className="flex rounded-full bg-sub1 px-4 items-center justify-center h-full p-3">
      <select
        title="Sort projects by what languages were used"
        value={groupNum}
        onChange={(e) => {
          setGroupNum(Number(e.target.value));
        }}
        className="text-sub2 bg-transparent outline-none md:text-[16px] sm:text-[14px] text-[12px] cursor-pointer"
      >
        {groupNumbers.map((language, i) => (
          <option key={i} value={language}>Group {language}</option>
        ))}
      </select>
    </div>
  );
}


function QuestionNumDropdown({
  questionAmt,
  setQuestionCount,
}: {
  questionAmt: number
  setQuestionCount: (value: number) => void
}) {

  const questionAmount: number[] = [
    1, 2, 3, 4
  ];

  return (
    <div className="flex rounded-full bg-sub1 px-4 items-center justify-center h-full p-3">
      <select
        title="Sort projects by what languages were used"
        value={questionAmt}
        onChange={(e) => {
          setQuestionCount(Number(e.target.value));
        }}
        className="text-sub2 bg-transparent outline-none md:text-[16px] sm:text-[14px] text-[12px] cursor-pointer"
      >
        {questionAmount.map((amount, i) => (
          <option key={i} value={amount}>{amount} {amount == 1 ? "Question" : "Questions"}</option>
        ))}
      </select>
    </div>
  );
}


function FileDatePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string
  setSelectedDate: (value: string) => void
}) {
  return (
    <div className="flex rounded-full bg-sub1 px-4 items-center justify-center h-full p-3">
      <HStack>
        <Text className="text-sub2 md:text-[16px] sm:text-[14px] text-[12px] mr-2">
          Date Due:
        </Text>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="
              text-sub2 bg-transparent outline-none
              md:text-[16px] sm:text-[14px] text-[12px]
              cursor-pointer
            "
        />
      </HStack>


    </div>
  )
}

/**
 * Creates the TAB-delimited .txt content expected by check.class.
 * Format per line:
 *   MA<TAB>(gX) question text<TAB>ans1<TAB>CORRECT|INCORRECT<TAB>ans2<TAB>... (4 answers total)
 */
function buildCheckTxt(groupNum: number, questions: Question[]): string {
  const TAB = "\t"

  const normalize = (s: string) =>
    (s ?? "")
      // normalize "smart" quotes/dashes that sometimes break the checker
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[–—]/g, "-")
      // strip newlines (each question must be ONE line)
      .replace(/\r?\n/g, " ")
      // collapse extra whitespace
      .replace(/\s+/g, " ")
      .trim()

  const containsAngleTag = (s: string) => /<[^>]*>/.test(s) // forbidden by instructions

  const lines = questions.map((q, qi) => {
    const qTextRaw = normalize(q.questionText)
    if (!qTextRaw) {
      throw new Error(`Question ${qi + 1} is empty.`)
    }
    if (containsAngleTag(qTextRaw)) {
      throw new Error(
        `Question ${qi + 1} contains "<...>" which is not allowed (e.g., "<stdio.h>").`
      )
    }

    const questionText = `(g${groupNum}) ${qTextRaw}`

    // exactly 4 answers required
    const answers = q.answers
    if (answers.length !== 4) {
      throw new Error(`Question ${qi + 1} must have exactly 4 answers.`)
    }

    const parts: string[] = ["MA", questionText]

    answers.forEach((a, ai) => {
      const aText = normalize(a.text)
      if (!aText) {
        throw new Error(`Question ${qi + 1}, Answer ${ai + 1} is empty.`)
      }
      if (containsAngleTag(aText)) {
        throw new Error(
          `Question ${qi + 1}, Answer ${ai + 1} contains "<...>" which is not allowed.`
        )
      }

      parts.push(aText)
      parts.push(a.isCorrect ? "CORRECT" : "INCORRECT") // must be uppercase
    })

    return parts.join(TAB)
  })

  // Join lines with newline. (TSV “rows”.)
  return lines.join("\n") + "\n"
}

function QuestionSection({
  questions,
  setQuestions,
}: {
  questions: Question[]
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
}) {
  function updateQuestionText(questionId: string, text: string) {
    setQuestions(prev =>
      prev.map(q => (q.id === questionId ? { ...q, questionText: text } : q))
    )
  }

  function updateAnswerText(questionId: string, answerId: string, text: string) {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id !== questionId) return q
        const nextAnswers = q.answers.map(a =>
          a.id === answerId ? { ...a, text } : a
        ) as Question["answers"]
        return { ...q, answers: nextAnswers }
      })
    )
  }

  // Toggle correct/incorrect for THIS answer (checkbox behavior: multiple can be correct)
  function toggleAnswerCorrect(questionId: string, answerId: string) {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id !== questionId) return q
        const nextAnswers = q.answers.map(a =>
          a.id === answerId ? { ...a, isCorrect: !a.isCorrect } : a
        ) as Question["answers"]
        return { ...q, answers: nextAnswers }
      })
    )
  }

  const numToLetter: string[] = ["a", "b", "c", "d"];
  return (
    <Section className="w-full max-w-4xl rounded-[30px] items-center">
        <VStack className="items-center w-full" spacing={16}>
          <AnimatePresence initial={true} mode="popLayout">
          {questions.map((q, qi) => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full rounded-[30px] bg-foreground p-5"
            >
              <Text className="text-accent font-semibold mb-2">
                Question {qi + 1}
              </Text>

              <input
                className="w-full rounded-2xl bg-sub1 text-sub3 px-4 py-3 outline-none"
                value={q.questionText}
                placeholder="Enter question text..."
                onChange={(e) => updateQuestionText(q.id, e.target.value)}
              />

              <div className="mt-4 flex flex-col gap-3">
                {q.answers.map((a, ai) => (
                  <div key={a.id} className="flex items-center gap-3">
                    {/* Toggle correct/incorrect */}

                    <HStack spacing={8} className="items-center w-full">
                      <Text className="text-sub2 font-semibold">
                        {numToLetter[ai]}.
                      </Text>
                      <input
                        className="flex-1 rounded-2xl bg-sub1 text-sub2 px-4 py-3 outline-none"
                        value={a.text}
                        placeholder={`Answer ${numToLetter[ai]}`}
                        onChange={(e) => updateAnswerText(q.id, a.id, e.target.value)}
                      />
                    </HStack>

                    <button
                      type="button"
                      onClick={() => toggleAnswerCorrect(q.id, a.id)}
                      className={`
                        w-40
  rounded-full px-3 py-2 text-sm font-semibold
  cursor-pointer
  transition-transform duration-150 ease-out
  hover:scale-105
  active:scale-100
  ${a.isCorrect ? "bg-green-600 text-white" : "bg-sub1 text-sub2"}
`}
                    >
                      {a.isCorrect ? "Correct" : "Incorrect"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </VStack>
    </Section>
  )
}






