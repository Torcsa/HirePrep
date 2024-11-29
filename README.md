# Job Interview Preparation Assistant

This repository contains the source code for the **Job Interview Preparation Assistant**, a web-based application designed to help individuals prepare for job interviews using an AI-powered chatbot. The application processes user-provided resumes (in Markdown format) and provides tailored suggestions, interview questions, and responses.

## Table of Contents

- [About the Project](#about-the-project)
  - [Key Features](#key-features)
  - [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Usage](#usage)
  - [Editor Tab](#editor-tab)
  - [Overview Tab](#overview-tab)
  - [Interview Tab](#interview-tab)
- [Architecture Overview](#architecture-overview)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Generative AI Model](#generative-ai-model)
- [Interesting Insights](#interesting-insights)
- [Future Enhancements](#future-enhancements)

---

## About the Project

The **Job Interview Preparation Assistant** is a web application aimed at simplifying and enhancing the interview preparation process. By leveraging a generative large language model (LLM), the app analyzes resumes and provides tailored insights, suggestions, and answers to user queries. It is designed to provide real-time responses while maintaining a user-friendly experience.

### Key Features

- **Markdown Resume Editor**: Edit and preview your resume in Markdown format.
- **HR-Focused Insights**: Get suggestions for key competences, job positions, and a summarized table of resume highlights.
- **AI-Powered Chatbot**: Interact with a chatbot that provides tailored answers to interview-related questions using your resume as context.
- **Streaming Responses**: Enjoy a seamless user experience with real-time streaming answers from the AI model.

### Technologies Used

- **Frontend**: React, TypeScript, Bootstrap
- **Backend**: .NET Core Web API
- **AI Model**: [Hugging Face Llama-3.2 Instruct](https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF)
- **Markdown Rendering**: React Markdown with `remark-gfm` plugin
- **Communication**: REST API with streaming support