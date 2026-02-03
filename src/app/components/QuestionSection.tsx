"use client"

import { VStack, Section, Text, HStack, AdaptiveHStack } from "./ui";
import { motion, AnimatePresence } from "framer-motion"
import { Question } from "../features/types";


export function QuestionSection({
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
    <Section className="w-full max-w-4xl min-w-0 rounded-[30px] items-center">
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
                  <AdaptiveHStack key={a.id} className="flex items-center" spacing={8}>
                    {/* Answer label + input */}
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
                  </AdaptiveHStack >
                ))}
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </VStack>
    </Section>
  )
}
