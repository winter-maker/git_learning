/*
 * @Description: 页面
 * @Author: 许彭
 * @Date: 2023-04-18 09:36:14
 * @LastEditors: 许彭
 * @LastEditTime: 2023-05-05 20:59:01
 * @FilePath: \apps\app-report\src\views\energyEffciencyReport\output-as-pdf.js
 */
import domToImage from "./node_modules/dist/dom-to-image.min.js";
import JsPdf from "./node_modulesjspdf";
import { base64ToTmpUrl, base64ToUint8Arr } from "./node_modulesakaba-tool-env-browser";
//import { appPageDivider } from "@js-pces-vue-v3/shared-report/utils/pager-divider/PageDivider";

const a4PageSize = {
  width: 624,
  height: 883,
};

function loadAsImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.addEventListener("error", (err) => {
      reject(err);
    });
    img.src = src;
  });
}

// 1. body.style.width = a4.width
// 2. check page divide okay
// 3. ouput

export async function doOutPutAsPdf() {
  /**
   * body width: 1257px（其中，滚动轴宽度占了17px）时最佳
   */
  const body = document.body;
  body.style.width = a4PageSize.width + "px";
  //if (appPageDivider.isTriggerDivide) {
    const jsPdf = new JsPdf({
      unit: "px",
      format: [a4PageSize.width, a4PageSize.height],
    });
    const dataUrl = await domToImage.toJpeg(body, {
      width: body.offsetWidth,
      height: body.offsetHeight,
    });
    // window.open(base64ToTmpUrl(dataUrl), "img");
    const img = await loadAsImg(dataUrl);
    const pageNum = Math.ceil(body.offsetHeight / a4PageSize.height);
    const canvas = document.createElement("canvas");
    canvas.width = a4PageSize.width;
    canvas.height = a4PageSize.height;
    const drawer = canvas.getContext("2d");
    for (let i = 0; i < pageNum; i++) {
      if (i) {
        jsPdf.addPage();
      }
      drawer.clearRect(0, 0, canvas.width, canvas.height);
      drawer.drawImage(
        img,
        0,
        i * a4PageSize.height,
        a4PageSize.width,
        a4PageSize.height,
        0,
        0,
        a4PageSize.width,
        a4PageSize.height
      );
      const nowBase64 = canvas.toDataURL("image/jpeg");
      jsPdf.addImage(base64ToUint8Arr(nowBase64).uint8Array, "JEPG", 0, 0, a4PageSize.width, a4PageSize.height);
      // window.open(base64ToTmpUrl(canvas.toDataURL()), `img_` + i);
    }
    //  jsPdf.save(`公共机构能效助手报告-app-${a4PageSize.width}x${a4PageSize.height}.pdf`)
    body.style.width = "100%";
    return jsPdf.output("dataurlstring", `公共机构能效助手报告-app-${a4PageSize.width}x${a4PageSize.height}.pdf`);
  //}
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      doOutPutAsPdf()
        .then(() => resolve())
        .catch((err) => reject(err));
    }, 400);
  });
}
