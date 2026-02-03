import { Question, Answer } from "./types";

const makeAnswer = (): Answer => ({ id: Math.random().toString(36).substring(2, 9), text: "", isCorrect: false })

export const makeQuestion = (): Question => ({
  id: Math.random().toString(36).substring(2, 9),
  questionText: "",
  answers: [makeAnswer(), makeAnswer(), makeAnswer(), makeAnswer()],
})