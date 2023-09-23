let TRACK_DATA = []

export default (() => {
	const addTrack = (trackInfo) => {
		TRACK_DATA.push(trackInfo)
	}
	
	const getTracks = () => TRACK_DATA;

	return {addTrack, getTracks}
})()
