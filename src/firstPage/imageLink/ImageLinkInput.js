import React from 'react';
import './ImageLink.css';

const ImageLinkInput = ({inputListener , detectListener}) => {
    return (
        <div>
            <p className={'f2 white'}>
                {'Try the face detection by entering a picture URL!'}
            </p>
            <div className={'center'}>
                <div className={'form center pa4 br3 shadow-5'}>
                    <input type={'text'} className={'f4 pa2 w-70 center'} onChange={inputListener}/>
                    <button className={'w-30 grow f4 link ph3 pv2 dib white bg-blue'}
                            onClick={detectListener}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkInput;