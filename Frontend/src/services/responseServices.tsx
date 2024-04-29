import { FieldValues } from "react-hook-form";
import { ReferencerWithQuestions } from "../Types";

export async function postResponse(data: FieldValues){
    const response = await fetch("http://localhost:5136/api/responses",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    // const result = await response.json() as Response;
    if(!response.ok){
        throw new Error("Failed to post new candidate!")
    }
    return response;
}

export async function postRatingResponse(content: string, questionGuid: string){
    const response = await fetch("http://localhost:5136/api/responses",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            content:content,
            questionGuid: questionGuid
        })
    });
    if(!response.ok){
        throw new Error("Failed to post new candidate!")
    }
}

export async function getReferencerWithQuestions(guid: string): Promise<ReferencerWithQuestions>{
    const response = await fetch(`http://localhost:5136/api/referencers/${guid}/questions`, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}