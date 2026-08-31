import {getAllInterviewReports,generateInterviewReport,getInterviewReportById} from "../services/interview.api"
import {useContext,useEffect} from "react";
import {InterviewContext} from "../interview.context"
import {useParams} from "react-router"


export const useInterview = ()=>{

    const {interviewId} = useParams()

    const context = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }


    const { loading, setLoading ,report ,setReport , reports , setReports}=context

    const generateReport = async ({jobDescription, selfDescription, resumeFile})=>{
        setLoading(true)
        try{
            const response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)
        }catch(error){
           console.log(error) 
        } finally{
            setLoading(false)
        }
    }


    const getReportById = async (interviewId) =>{

        setLoading(true)
        try{
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }


    }


    const getReports = async()=>{
        setLoading(true)
        try{
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
        if (interviewId){
            getReportById(interviewId)
        } else {
            getReports()
        }
    },[interviewId])


    return { loading, report, reports, generateReport, getReportById, getReports}


}