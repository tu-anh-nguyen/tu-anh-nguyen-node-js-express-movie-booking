const resp = require('../../helpers/response');
const theaterChainServices = require('../../services/theaterChain');

module.exports = async (req, res, next) => {
	const { id } = req.params;
	const args = req.body;
	try {
		const theaterChain = await theaterChainServices.updateTheaterChain(id, args);
		resp({
			res,
			data: theaterChain,
		});
	} catch (error) {
		next(error);
	}
};
