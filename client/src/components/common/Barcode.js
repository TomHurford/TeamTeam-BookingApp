import React, {useEffect} from 'react';
import JsBarcode from 'jsbarcode';

function Barcode() {

    useEffect(() => {
        textToBase64Barcode(this.props.ticketData);
    },[]);

    function textToBase64Barcode(text){
        text = Buffer.from(text).toString('base64')
        var canvas = document.getElementById("canvas");
        JsBarcode(canvas, text, {format: "CODE39"});
        return canvas.toDataURL("image/png");
      }

    return (
        <canvas id='canvas' className='barcodeCanvas'></canvas>
    )
}
export default Barcode
