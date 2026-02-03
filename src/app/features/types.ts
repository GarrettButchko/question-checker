import React from "react"

export type Answer = {
  id: string
  text: string
  isCorrect: boolean
}

export type Question = {
  id: string
  questionText: string
  answers: Answer[] // we will always create 4
}

export type SetQuestions = React.Dispatch<React.SetStateAction<Question[]>>

export type SetQuestionCount = (
  nextCount: number,
  setQuestionAmt: React.Dispatch<React.SetStateAction<number>>,
  setQuestions: SetQuestions
) => void