const {GoogleGenAI} = require("@google/genai");
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");



const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});


 

const interviewReportSchema = z.object({

    matchScore: z.number().describe("The match score between the job description and the candidate's resume and self description"),

    techinicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer begind asking this question"),
        answer: z.string().describe("How to answer this question ,what points to cover,what approach to take etc.")
    })).describe("The technical questions that can be asked in the interview along with the intention of the interviewer and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer begind asking this question"),
        answer: z.string().describe("How to answer this question ,what points to cover,what approach to take etc.")
    })).describe("The behavioral questions that can be asked in the interview along with the intention of the interviewer and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap"),
    })).describe("List of skill gaps in the candidates's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day of the preparation plan"),
        focus: z.string().describe("The focus of the preparation plan for that day"),
        tasks: z.array(z.string()).describe("The tasks to be done on that day")
    })).describe("The preparation plan for the candidate to improve their skills and prepare for the interview")



});

async function generateInterviewReport({jobDescription, resume, selfDescription}) {

    const prompt = `Generate an interview report for a candidate with the following details:
                Resume:${resume}
                Self Description:${selfDescription}
                Job Description:${jobDescription}
    `

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    }) 


    return JSON.parse(response.text);

}

 

module.exports = generateInterviewReport;
