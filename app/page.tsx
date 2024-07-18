'use client';
import Image from "next/image";
import Groq from "groq-sdk";
import { Suspense, useState } from "react";

const groq = new Groq({ apiKey: process.env['NEXT_PUBLIC_GROQ_KEY'], dangerouslyAllowBrowser: true });

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
          "role": "system",
          "content": "you are a helpful assistant."
      },
      {
          "role": "user",
          "content": "explain the importance of fast language models"
      }
    ],
    model: "llama3-8b-8192",
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1,
    stop: null,
    stream: false
    }
  );
}

async function GroqComp() {
  const chatCompletion = await getGroqChatCompletion();
  const response = chatCompletion.choices[0]?.message?.content;
  return (
    <div>
      <h3>Answer: {response}</h3>
    </div>
  )
}

function Loading() {
  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
}

export default function Home() {
  const [spComp, setSpComp] = useState(<div />);
  const loadSpComp = () => {
    return (
    <Suspense fallback={<Loading />}>
      <GroqComp />
    </Suspense>
    );
  };

  return (
    <>
      <div className="flex place-items-center flex-col mx-auto w-full justify-center mt-6 p-2">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" id="updateData" onClick={() => setSpComp(<div>{loadSpComp()}</div>)}>Update Smartpark Data</button>
        {spComp}
      </div>
    </>
  )
}
