import React from 'react';
import './FaceRecognition.css';

const DemographicDisplay = ({demographics}) => {
    let gender = null
    demographics.gender.gender === "masculine" ? gender = "male" : gender = "female"
    return (
		<div>
			
				<div>
					<p>
						Age: {demographics.age.age} at {Math.round(demographics.age.percentage)}% certainty
					</p>
					<p>
						Gender: {gender} at {Math.round(demographics.gender.percentage)}% certainty
					</p>
					<p>
						Ethnicity: {demographics.demographic.demographic} at{' '}
						{Math.round(demographics.demographic.percentage)}% certainty
					</p>
				</div>
			
		</div>
	);
};

export default DemographicDisplay;
