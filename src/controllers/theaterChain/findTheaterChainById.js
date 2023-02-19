const resp = require('../../helpers/response');
const theaterChainServices = require('../../services/theaterChain');

module.exports = async (req, res, next) => {
	const { id } = req.params;
	try {
		const theaterChain = await theaterChainServices.findTheaterChainById(id);
		resp({
			res,
			data: theaterChain,
		});
	} catch (error) {
		next(error);
	}
};
