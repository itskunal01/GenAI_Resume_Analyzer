const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require ("../models/interviewReport.model")



/**
 * @description Controller  to generate interview report based on user self description ,resume and job description
 *  
 */




async function generateInterviewReportController(req,res){

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription} = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })


    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume :resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message:"Interview report generated successfully.",
        interviewReport
    })

}


/**
 * @description Controller to get interview report by interviewId 
 */

async function getInterviewReportByIdController(req,res){
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})
        
        if(!interviewReport){
            return res.status(404).json({
                message:"Interview report not found",
            })
        }
    

    res.status(200).json({
        message:"Interview report fetch successfully.",
        interviewReport
    })

}






module.exports = {generateInterviewReportController,getInterviewReportByIdController}