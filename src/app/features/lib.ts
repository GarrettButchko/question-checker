import { Question, SetQuestions } from "./types"
import { makeQuestion } from "./factories"

export function setQuestionCount(nextCount: number, setQuestions: SetQuestions) {
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

export function handleQuestionCountChange(nextCount: number, setQuestionAmt: React.Dispatch<React.SetStateAction<number>>, setQuestions: React.Dispatch<React.SetStateAction<Question[]>>) {
  setQuestionAmt(nextCount)
  setQuestionCount(nextCount, setQuestions)
}