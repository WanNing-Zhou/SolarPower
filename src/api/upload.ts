import Request from "@/utils/request.ts";

export function uploadFile(data: any){
    return Request('/api/file/upload',{
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
