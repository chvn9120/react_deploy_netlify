const apiReq = async (url = '', optsObj = null, errMsg = null) => {
	try {
		const response = await fetch(url, optsObj);
		if (!response.ok) throw Error('Please reload the app!');
	} catch (error) {
		errMsg = error.message;
	} finally {
		return errMsg;
	}
};

export default apiReq;
