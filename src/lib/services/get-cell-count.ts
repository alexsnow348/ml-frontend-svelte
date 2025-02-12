export const getCellCountSummary = async (transactionId: string, wellName: string, ) => {
	try {
		const response = await fetch(`http://mlserver1.lpkf.com:5051/api/v1/dashboard/cellcounting/count_summary/${transactionId}/${wellName}`)
		const isJson = response.headers.get('content-type')?.includes('application/json')
		const res = isJson ? await response.json() : await response.text()
		if (res?.status > 399) {
			throw { status: res.status, message: res }
		} else if (response?.status > 399) {
			throw { status: response.status, message: res }
		} else {
			return res.results
		}
	} catch (e) {
		// console.log(`/lib/utils/server.ts getBigcommerceApi(${HTTP_ENDPOINT + '/api/' + endpoint})`, e)
		throw e
	}
}