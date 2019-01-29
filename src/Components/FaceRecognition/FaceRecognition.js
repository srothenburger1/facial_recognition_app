import React from 'react';

const FacialRecognition = ({ imageUrl})=>{
    return(
        <div>
            <div className='center ma'>
            <div className='absolute mt2'>
            <img id='inputImage'src={imageUrl} alt='' width='500px' height='auto'/>
            </div>
            </div>
        </div>
    )
};
export default FacialRecognition; 