"use client"

import { VStack, Section, Text } from "./ui";
import { motion } from "framer-motion";

export function Intro() {
    return (
      <Section className="w-full max-w-4xl bg-foreground rounded-[30px] items-center py-5">
        <VStack className="items-start" spacing={8}>
          <motion.p
            className="
                lg:text-4xl
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
          <Text variant="body" className="lg:text-lg sm:text-base text-center sm:text-left text-sub2">
            This application is designed to help you create and manage questions for your CIS 340 course. Whether you're stuck or just want an easy way to create them, our tool provides an easy and efficient way to generate and organize questions.
          </Text>

          <Text variant="body" className="lg:text-lg sm:text-base text-center sm:text-left text-accent">
            Author: Garrett Butchko (with assistance from ChatGPT)
          </Text>
        </VStack>
      </Section>
    );
  }