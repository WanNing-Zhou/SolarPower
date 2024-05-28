import Request from "@/utils/request.ts";
import {fileParams} from '@/type/request/worksheet'
export function uploadFile(data: any){
    return Request('/api/file/upload',{
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

//上传文件
export async function uploadPhotoAndVideo(params:fileParams)
{
    return Request('api/file/upload',{
        method:'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data :params
    })
}

//删除文件
export function deleteFile(type:string,id:string)
{
    return Request.delete(`/api/file/${type}/${id}`)
}
