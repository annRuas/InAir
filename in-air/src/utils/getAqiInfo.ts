export function getAqiInfo(aqiLevel: number) {
    if (isNaN(aqiLevel)) {
    	return {
			color: '#000000',
			classification: 'Undefined',
			classificationMessage: '',
            message: 'Unable to determine air quality information.'
		}; 
    }

    if (aqiLevel >= 0 && aqiLevel <= 49) {
		return {
			color: '#40A43F',
			classification: 'Good',
			classificationMessage: '',
            message: 'Good air quality does not require any advisory whatsoever. Remember to stay hydrated.'
	  	} 
    } 
	if (aqiLevel >= 50 && aqiLevel <= 99) {
    	return {
			color: '#F8B50D',
			classification: 'Moderate',
			classificationMessage: '',
            message: `Moderate air quality. It's generally acceptable, but there may be some pollutants.`
		} 	  
    } 
	if (aqiLevel >= 100 && aqiLevel <= 149) {
		return {
			color: '#F38337',
			classification: 'Unhealthy',
			classificationMessage: 'for Sensitive Groups',
            message: 'Unhealthy for Sensitive Groups. People with respiratory or heart conditions, children, and older adults may be more affected.'
		}
    }
	
	if (aqiLevel >= 150 && aqiLevel <= 199) {
		return {
			color: '#EF0009',
			classification: 'Unhealthy',
			classificationMessage: '',
            message: 'Unhealthy air quality. Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
		}
    } 
	if (aqiLevel >= 200 && aqiLevel <= 299) {
		return {
			color: '#AF2AA7',
			classification: 'Very Unhealthy',
			classificationMessage: '',
            message: 'Very Unhealthy air quality. Health alert: everyone may experience more serious health effects.'
		}
    } 
	if (aqiLevel >= 300) {
		return {
			color: '#B00003',
			classification: 'Hazardous',
			classificationMessage: '',
            message: 'Hazardous air quality. Health warnings of emergency conditions; the entire population is more likely to be affected.'
		}
    } 

    return {
		color: '#000000',
		classification: 'Unknown',
		classificationMessage: '',
        message: 'Unable to determine air quality information.'
	} 
}