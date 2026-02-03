"use client"

import { Section, HStack, Text  } from "./ui";
import { motion } from "framer-motion";
import { Question, SetQuestionCount } from "../features/types";
import { handleQuestionCountChange } from "../features/lib";


type OptionsBarProps = {
  setGroupNum: React.Dispatch<React.SetStateAction<number>>;
  groupNum: number;
  questionAmt: number;
  setQuestionAmt: React.Dispatch<React.SetStateAction<number>>;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>; // Adjust type as needed
};

export function OptionsBar({
  setGroupNum,
  groupNum,
  questionAmt,
  setQuestionAmt,
  selectedDate,
  setSelectedDate,
  setQuestions,
}: OptionsBarProps) {

    return (
    <Section className="w-full max-w-4xl bg-foreground rounded-[30px] items-center py-5">
      <div className="w-full px-2 sm:px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center sm:gap-6">
          <motion.p
            className="
              text-xl sm:text-2xl lg:text-3xl
              font-bold text-accent
              text-center lg:text-left
              whitespace-nowrap
            "
          >
            Question Options:
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:ml-auto gap-3 lg:gap-4">
            
              <GroupNumDropDown setGroupNum={setGroupNum} groupNum={groupNum} />
              {/* Question count updates impact both UI state and question list length */}
              <QuestionNumDropDown
                questionAmt={questionAmt}
                setQuestionCount={handleQuestionCountChange}
                setQuestions={setQuestions}
                setQuestionAmt={setQuestionAmt}
              />
            

            <FileDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
        </div>
      </div>
    </Section>
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
          <Text className="text-sub2 lg:text-[16px] sm:text-[14px] text-[12px] mr-2 whitespace-nowrap">
            Date Due:
          </Text>
  
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="
                text-sub2 bg-transparent outline-none
                lg:text-[16px] sm:text-[14px] text-[12px]
                cursor-pointer
              "
          />
        </HStack>
      </div>
    )
  }

  function QuestionNumDropDown({
    questionAmt,
    setQuestionCount,
    setQuestions,
    setQuestionAmt,
  }: {
    questionAmt: number
    setQuestionCount: SetQuestionCount
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
    setQuestionAmt: React.Dispatch<React.SetStateAction<number>>
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
            setQuestionCount(Number(e.target.value), setQuestionAmt, setQuestions);
          }}
          className="text-sub2 bg-transparent outline-none lg:text-[16px] sm:text-[14px] text-[12px] cursor-pointer"
        >
          {questionAmount.map((amount, i) => (
            <option key={i} value={amount}>{amount} {amount == 1 ? "Question" : "Questions"}</option>
          ))}
        </select>
      </div>
    );
  }

  function GroupNumDropDown({
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
          className="text-sub2 bg-transparent outline-none lg:text-[16px] sm:text-[14px] text-[12px] cursor-pointer"
        >
          {groupNumbers.map((language, i) => (
            <option key={i} value={language}>Group {language}</option>
          ))}
        </select>
      </div>
    );
  }

  
  
  
