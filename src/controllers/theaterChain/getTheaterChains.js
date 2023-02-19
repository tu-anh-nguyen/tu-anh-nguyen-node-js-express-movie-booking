const resp = require('../../helpers/response');
const theaterChainServices = require('../../services/theaterChain');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.body;
	try {
		const theaterChain = await theaterChainServices.getTheaterChains({ limit, offset });
		resp({
			res,
			data: theaterChain,
		});
	} catch (error) {
		next(error);
	}
};
