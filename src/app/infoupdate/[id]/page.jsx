import EditDashboard from "@/app/editdashboard/page"
import TakeId from "@/app/operations/update"

export default async function StudentData({params}){
      const { id } = await params;
    if(!id){
        return <div>id is required</div>
    }
    const data = await TakeId(id)
 return(
    <EditDashboard data= {data} />
)}