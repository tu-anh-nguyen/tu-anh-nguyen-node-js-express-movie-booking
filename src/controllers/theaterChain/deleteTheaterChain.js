const resp = require('../../helpers/response');
const theaterChainServices = require('../../services/theaterChain');

module.exports = async (req, res, next) => {
  const { id } = req.params;

	try {
		const theaterChain = await theaterChainServices.deleteTheaterChain(id);
		resp({
			res,
			data: theaterChain,
		});
	} catch (error) {
		next(error);
	}
};
