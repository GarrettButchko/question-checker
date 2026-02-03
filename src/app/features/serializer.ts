
import { Question } from "./types";

/**
 * Creates the TAB-delimited .txt content expected by check.class.
 * Format per line:
 *   MA<TAB>(gX) question text<TAB>ans1<TAB>CORRECT|INCORRECT<TAB>ans2<TAB>... (4 answers total)
 */
export function buildCheckTxt(groupNum: number, questions: Question[]): string {
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

  // One line per question, with 4 answer pairs (text + CORRECT/INCORRECT).
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

export function formatDateShort(dateStr: string): string {
    // dateStr is "YYYY-MM-DD"
    const [y, m, d] = dateStr.split("-").map(Number)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[m - 1]}${d}`
  }
