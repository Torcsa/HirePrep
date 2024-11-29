/* eslint-disable prefer-const */
declare global {
    interface ReadableStream<R> {
        [Symbol.asyncIterator](): AsyncIterableIterator<R>;
    }
}

export default class HRService {


    private async postRequest(requestEndpoint: string, data: any): Promise<string> {
        // Adjusted to accept a generic data object for POST body
        const response = await fetch(`/api/HR/${requestEndpoint}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Failed to fetch", { requestEndpoint });
            throw new Error("Failure at fetch");
        }

        const result = await response.json();
        return result.text;
    }   

    private async *streamRequest(requestEndpoint: string, cv: string): AsyncGenerator<string> {
        const response = await fetch(`/api/Stream/HR/${requestEndpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cv }), // Only sends cv as a string
        });

        if (!response.body) {
            throw new Error("No response body received");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        while (true) {
            const { value, done } = await reader!.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            buffer = buffer.replace(/[[\]]/g, '');

            let parts = buffer.split(/(?<=\})(?=\{)/);
            parts = parts[0].split(',');


            // Process each part
            for (let part of parts) {
                try {
                    const json = JSON.parse(part.trim());

                    yield json.text;
                } catch (e) {
                    console.log(e)
                    buffer = part;
                }
            }

            buffer = "";
        }
    }


    private async *streamRequestWithData(requestEndpoint: string, data: any): AsyncGenerator<string> {
        const response = await fetch(`/api/Stream/HR/${requestEndpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        while (true) {
            const { value, done } = await reader!.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            buffer = buffer.replace(/[[\]]/g, '');

            let parts = buffer.split(/(?<=\})(?=\{)/);
            parts = parts[0].split(',');


            // Process each part
            for (let part of parts) {
                try {
                    const json = JSON.parse(part.trim());

                    yield json.text;
                } catch (e) {
                    console.log(e)
                    buffer = part;
                }
            }

            buffer = "";
        }
    }


    public async questions(data: { cv: string; question: string }): Promise<string> {
        const requestEndpoint = "chatbot";
        console.log("Request payload:", data);

        return await this.postRequest(requestEndpoint, data);
    }


    public streamquestions(data: { cv: string; question: string }): AsyncGenerator<string> {
        const requestEndpoint = "chatbot";
        console.log("Request payload:", data);

        return this.streamRequestWithData(requestEndpoint, data);
    }



    public async getCompetences(cv: string): Promise<string> {
        const requestEndpoint = 'competences'

        return this.postRequest(requestEndpoint, cv);
    }

    public streamCompetences(cv: string): AsyncGenerator<string> {
        const requestEndpoint = 'competences';

        return this.streamRequest(requestEndpoint, cv);
    }



    public async getPositions(cv: string): Promise<string> {
        const requestEndpoint = 'positions'

        return this.postRequest(requestEndpoint, cv);
    }

    public streamPositions(cv: string): AsyncGenerator<string> {
        const requestEndpoint = 'positions';

        return this.streamRequest(requestEndpoint, cv);
    }



    public async getData(cv: string): Promise<string> {
        const requestEndpoint = 'data'

        return this.postRequest(requestEndpoint, cv);
    }

    public streamData(cv: string): AsyncGenerator<string> {
        const requestEndpoint = 'data';

        return this.streamRequest(requestEndpoint, cv);
    }



    public async getQuestions(cv: string): Promise<string> {
        const requestEndpoint = 'questions'

        return this.postRequest(requestEndpoint, cv);
    }


    public async getInvitation(cv: string): Promise<string> {
        const requestEndpoint = 'invitation'

        return this.postRequest(requestEndpoint, cv);
    }

    public streamInvitation(cv: string): AsyncGenerator<string> {
        const requestEndpoint = 'invitation';

        return this.streamRequest(requestEndpoint, cv);
    }
}