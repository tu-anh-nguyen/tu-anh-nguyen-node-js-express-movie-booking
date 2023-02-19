//DO NOT EDIT: code generated from 'tools/gen-err-code.go'

const { SugarError } = require('../helpers/errors');

const errNameToAppError = {
 ErrUnknown: { statusCode: 500, code: 1000, message: "Something went wrong" },
 ErrInvalidArgument: { statusCode: 200, code: 1001, message: "Invalid argument" },
 ErrLogin: { statusCode: 200, code: 1002, message: "Invalid email or password" },
 ErrUnauthenticated: { statusCode: 401, code: 1003, message: "Unauthentication" },
 ErrPermissionDenied: { statusCode: 403, code: 1006, message: "Permission denied" },
 ErrAccountExisted: { statusCode: 409, code: 1007, message: "Account already existed" },
 ErrSeatBooked: { statusCode: 409, code: 1008, message: "Seat already booked" },
 ErrUserNotFound: { statusCode: 404, code: 2000, message: "User not found" },
 ErrTheaterBrandNotFound: { statusCode: 404, code: 2001, message: "Theater Brand not found" },
 ErrTheaterChainNotFound: { statusCode: 404, code: 2002, message: "Theater Chain not found" },
 ErrTheaterNotFound: { statusCode: 404, code: 2003, message: "Theater not found" },
 ErrMovieNotFound: { statusCode: 404, code: 2004, message: "Movie not found" },
 ErrSeatNotFound: { statusCode: 404, code: 2005, message: "Seat not found" },
 ErrShowTimeNotFound: { statusCode: 404, code: 2006, message: "Show Time not found" },
 ErrShowTimeDuplicated: { statusCode: 404, code: 2007, message: "Show Time duplicated" },
 ErrBookingNotFound: { statusCode: 404, code: 2008, message: "Booking not found" },
 ErrTicketNotFound: { statusCode: 404, code: 2009, message: "Ticket not found" }
 
}

module.exports = errNameToAppError;
