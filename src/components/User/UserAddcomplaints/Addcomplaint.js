import React from "react";
import './Addcomplaint.css';
import CloseIcon from '@mui/icons-material/Close';
// import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';

const Addcomplaint = ({setAddpopup}) => {
    return(
        <div className="addcom-main">
            <div className="CloseIcon" onClick={ () => setAddpopup("close") }>
            <CloseIcon/>
            </div>
            <h2>" Tell me , What's your PROBLEM 🤔?? 👇 "</h2>
            <textarea name="com-box" >Type here..</textarea>
            <button type="submit">POST</button>
            <input type="file" />
            </div>
    )
};

export default Addcomplaint;