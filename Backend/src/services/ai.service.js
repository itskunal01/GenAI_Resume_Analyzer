const { GoogleGenAI, Type } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


/*
|--------------------------------------------------------------------------
| ZOD SCHEMA
|--------------------------------------------------------------------------
| This is the schema your application trusts.
| Gemini response will be validated against this schema.
|--------------------------------------------------------------------------
*/

const interviewReportSchema = z.object({

    matchScore: z
        .number()
        .min(0)
        .max(100),

    technicalQuestions: z
        .array(
            z.object({
                question: z.string(),
                intention: z.string(),
                answer: z.string()
            })
        )
        .min(5),

    behavioralQuestions: z
        .array(
            z.object({
                question: z.string(),
                intention: z.string(),
                answer: z.string()
            })
        )
        .min(5),

    skillGaps: z
        .array(
            z.object({
                skill: z.string(),
                severity: z.enum([
                    "low",
                    "medium",
                    "high"
                ])
            })
        )
        .min(1),

    preparationPlan: z
        .array(
            z.object({
                day: z.number(),
                focus: z.string(),
                tasks: z
                    .array(z.string())
                    .min(1)
            })
        )
        .length(7),

    title: z.string()
});


/*
|--------------------------------------------------------------------------
| GEMINI RESPONSE SCHEMA
|--------------------------------------------------------------------------
| This schema tells Gemini exactly what JSON structure to generate.
| We use Gemini's native schema format here.
|
| Zod is still used below to validate the final response.
|--------------------------------------------------------------------------
*/

const geminiResponseSchema = {
    type: Type.OBJECT,

    properties: {

        matchScore: {
            type: Type.NUMBER,
            description:
                "Score from 0 to 100 indicating how well the candidate matches the job."
        },

        technicalQuestions: {
            type: Type.ARRAY,

            items: {
                type: Type.OBJECT,

                properties: {

                    question: {
                        type: Type.STRING
                    },

                    intention: {
                        type: Type.STRING
                    },

                    answer: {
                        type: Type.STRING
                    }
                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        behavioralQuestions: {
            type: Type.ARRAY,

            items: {
                type: Type.OBJECT,

                properties: {

                    question: {
                        type: Type.STRING
                    },

                    intention: {
                        type: Type.STRING
                    },

                    answer: {
                        type: Type.STRING
                    }
                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        skillGaps: {
            type: Type.ARRAY,

            items: {
                type: Type.OBJECT,

                properties: {

                    skill: {
                        type: Type.STRING
                    },

                    severity: {
                        type: Type.STRING,

                        enum: [
                            "low",
                            "medium",
                            "high"
                        ]
                    }
                },

                required: [
                    "skill",
                    "severity"
                ]
            }
        },

        preparationPlan: {
            type: Type.ARRAY,

            items: {
                type: Type.OBJECT,

                properties: {

                    day: {
                        type: Type.NUMBER
                    },

                    focus: {
                        type: Type.STRING
                    },

                    tasks: {
                        type: Type.ARRAY,

                        items: {
                            type: Type.STRING
                        }
                    }
                },

                required: [
                    "day",
                    "focus",
                    "tasks"
                ]
            }
        },

        title: {
            type: Type.STRING
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
        "title"
    ]
};


/*
|--------------------------------------------------------------------------
| GENERATE INTERVIEW REPORT
|--------------------------------------------------------------------------
*/

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
You are an expert technical interviewer and career advisor.

Generate a complete interview preparation report for the candidate.

IMPORTANT OUTPUT RULES:

1. matchScore
   - Must be a number between 0 and 100.

2. technicalQuestions
   - Must contain at least 5 questions.
   - Every item MUST be an object.
   - Every object MUST contain:
       question
       intention
       answer
   - Questions must be relevant to the technologies in the job description.

3. behavioralQuestions
   - Must contain at least 5 questions.
   - Every item MUST be an object.
   - Every object MUST contain:
       question
       intention
       answer

4. skillGaps
   - Must contain at least 1 item.
   - Every item MUST be an object.
   - Every object MUST contain:
       skill
       severity
   - severity MUST be one of:
       low
       medium
       high

5. preparationPlan
   - Must contain exactly 7 objects.
   - Every object MUST contain:
       day
       focus
       tasks
   - tasks MUST be an array of strings.

6. title
   - Must be a string containing the job title.

VERY IMPORTANT:

Do NOT return technicalQuestions as an array of strings.

WRONG:
[
    "What is React?",
    "What is Node.js?"
]

CORRECT:
[
    {
        "question": "What is React?",
        "intention": "Test React fundamentals",
        "answer": "Explain..."
    }
]

Do NOT return behavioralQuestions as strings.

Do NOT return skillGaps as strings.

Do NOT return preparationPlan as numbers.

Do NOT omit any required field.

Do not return null values.

Base the report on the actual candidate information.
Do not invent skills or experience that are not present in the resume.

--------------------------------------------------

CANDIDATE RESUME:

${resume}

--------------------------------------------------

SELF DESCRIPTION:

${selfDescription}

--------------------------------------------------

JOB DESCRIPTION:

${jobDescription}

--------------------------------------------------

Generate the complete report now.
`;


    try {

        /*
        |--------------------------------------------------------------------------
        | CALL GEMINI
        |--------------------------------------------------------------------------
        */

        const response = await ai.models.generateContent({

            model: "gemini-3.5-flash",

            contents: prompt,

            config: {

                responseMimeType: "application/json",

                responseSchema: geminiResponseSchema,

                temperature: 0.2
            }
        });


        /*
        |--------------------------------------------------------------------------
        | LOG RAW RESPONSE
        |--------------------------------------------------------------------------
        */

        console.log(
            "========== GEMINI RAW RESPONSE =========="
        );

        console.log(response.text);

        console.log(
            "=========================================="
        );


        /*
        |--------------------------------------------------------------------------
        | PARSE JSON
        |--------------------------------------------------------------------------
        */

        let parsedResponse;

        try {

            parsedResponse = JSON.parse(response.text);

        } catch (jsonError) {

            console.error(
                "Gemini returned invalid JSON:"
            );

            console.error(response.text);

            throw new Error(
                "Gemini returned invalid JSON"
            );
        }


        /*
        |--------------------------------------------------------------------------
        | LOG PARSED RESPONSE
        |--------------------------------------------------------------------------
        */

        console.log(
            "========== PARSED RESPONSE =========="
        );

        console.dir(
            parsedResponse,
            {
                depth: null
            }
        );

        console.log(
            "======================================"
        );


        /*
        |--------------------------------------------------------------------------
        | ZOD VALIDATION
        |--------------------------------------------------------------------------
        |
        | THIS IS THE IMPORTANT PART.
        |
        | Gemini generated the JSON.
        | Zod verifies that the JSON actually matches our application schema.
        |
        |--------------------------------------------------------------------------
        */

        const validationResult =
            interviewReportSchema.safeParse(
                parsedResponse
            );


        /*
        |--------------------------------------------------------------------------
        | HANDLE ZOD ERROR
        |--------------------------------------------------------------------------
        */

        if (!validationResult.success) {

            console.error(
                "========== ZOD VALIDATION ERROR =========="
            );

            console.error(
                JSON.stringify(
                    validationResult.error.issues,
                    null,
                    2
                )
            );

            console.error(
                "=========================================="
            );

            throw new Error(
                "Gemini generated an invalid interview report"
            );
        }


        /*
        |--------------------------------------------------------------------------
        | VALID DATA
        |--------------------------------------------------------------------------
        */

        console.log(
            "Zod validation successful."
        );


        return validationResult.data;


    } catch (error) {

        console.error(
            "Error generating interview report:"
        );

        console.error(error);

        throw error;
    }
}


module.exports = generateInterviewReport;