import { useState } from "react";
import HRService from "../services/HRService.ts";
import Module from "./Module.tsx";

export default function Interview(props: { cv: string }) {

    const service = new HRService();

    const [question, setQuestion] = useState<string>("");

    // Custom getter for streaming the chatbot response
    function getStreamAnswer() {
        const data = { cv: props.cv, question };
        console.log("Streaming data:", data);
        return service.streamquestions(data);
    }

    async function getAnswer(): Promise<string> {
        const data = { cv: props.cv, question };
        console.log("Sending data:", data);
        return await service.questions(data);
    }


    return (
        <div>
            <div className="mb-4">
                <label htmlFor="question-input" className="form-label">
                    Ask the Chatbot:
                </label>
                <textarea
                    id="question-input"
                    className="form-control mb-3"
                    rows={3}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                />
            </div>
            <Module title="Chatbot" getter={getAnswer} streamGetter={getStreamAnswer} />
        </div>
    );
}
