export const POST=async(req)=>{
    try {
        const res=await req.json()
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}
