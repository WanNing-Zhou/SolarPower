/*
 * @Author: buildgods 15564595518@163.com
 * @Date: 2024-05-18 16:46:41
 * @LastEditors: buildgods 15564595518@163.com
 * @LastEditTime: 2024-05-22 12:46:22
 * @FilePath: \SolarPower\src\utils\imageUtils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function compressImg(file:any){
  return new Promise((resolve, reject) => {

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string
      img.onload = () => {
        // 图片宽高
        const w = img.width
        const h = img.height
        const canvas = document.createElement("canvas")
        // canvas对图片进行裁剪，这里设置原始尺寸
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        // canvas中，png转jpg会变黑底，所以先给画布铺上一层白底
        ctx!.fillStyle = '#fff'
        // fillRect()方法绘制一个填充了内容的矩形，这个矩形的开始点（左上点）在
        // (x, y) ，它的宽度和高度分别由width 和 height 确定，填充样式由当前的fillStyle 决定
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        // 绘制图像
        ctx!.drawImage(img, 0, 0, w, h);
        // canvas转图片达到图片压缩效果
        // 返回一个包含图片展示的 data URI base64 在指定图片格式为 image/jpeg 或 image/webp的情况下，
        // 可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
        let dataUrl = ''
        let quality  = 1
        if(file.size / (1024 * 1024) > 1){
          quality = 1 / Math.ceil(file.size / (1024 * 1024)) // 默认到1m以下
        }
        // quality /= 2
        dataUrl = canvas.toDataURL("image/jpeg", quality)
        resolve(dataUrl)
      }
    }
    reader.onerror = error => {
      reject(error)
    }

  })
}

// canvas生成的格式为base64，需要进行转化, base64->file
export function dataURLtoFile(dataUrl:string,fileName:string){
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while(n--){
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr],fileName,{type:mime})
}
// canvas生成的格式为base64，需要进行转化, base64->blob
export function dataURLtoBlob(dataurl:string) {
    const arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }