/**
 * desc: 文件下载 导出结果处理  type:文件类型 zip .xls .xlsx ...
 */
enum FileType {
    '.zip',
    '.xls',
    '.xlsx',
}
export function handleDownLoadFile(response: any, type: FileType, fileName: string) {
    let blob = new Blob([response], {
        type: type + ';charset=utf-8'
    });
    let src = window.URL.createObjectURL(blob);
    if (src) {
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = src;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); //下载完成移除元素
    }
}


/**
 * 根据地址下载文件
 * @param src
 * @param fileName
 */
export function downFileFromUrl(src:string,fileName: string){
    // const base = import.meta.env.VITE_APP_FILE_API
    // const src = base + api
    // console.log('src', src)
    if(src) {
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = src;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); //下载完成移除元素
        window.URL.revokeObjectURL(src); //释放掉blob对象
    }
}
