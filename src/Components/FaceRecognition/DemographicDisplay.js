import React from 'react';
import './FaceRecognition.css';

const DemographicDisplay = ({demographics}) => {
    let gender = null
    demographics.gender.gender === "masculine" ? gender = "male" : gender = "female"
    return (
		<div>
			{/* The returned numbers are a bit too long, so they get rounded */}
				<div>
					<p>
						Age: {demographics.age.age} at a {Math.round(demographics.age.percentage)}% probability
					</p>
					<p>
						Gender: {gender} at a {Math.round(demographics.gender.percentage)}% probability
					</p>
					<p>
					
						Ethnicity: {demographics.demographic.demographic} at a {Math.round(demographics.demographic.percentage)}% probability
					</p>
				</div>
			
		</div>
	);
};

export default DemographicDisplay;
