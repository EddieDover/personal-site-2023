"use client";
import { useState, useEffect } from 'react'
import { JsonResume } from '@/types/JsonResume';

export const useResume = () => {
  const [resumeData, setResumeData] = useState<JsonResume | null>(null);
  useEffect(() => {
    async function getResumeData() {
      const response = await fetch('/resume.json');
      const data = (await response.json()) as JsonResume;
      return data;
    }
    getResumeData()
      .then((data) => {
        setResumeData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])
    return resumeData;
}